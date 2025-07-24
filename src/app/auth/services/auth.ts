import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { delay, map } from "rxjs/operators"
import type { User, LoginCredentials, RegisterData, AuthResponse } from "../user/user-module"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly STORAGE_KEY = "auth_user"
  private readonly TOKEN_KEY = "auth_token"

  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable()

  // Utilisateurs factices pour la démo
  private mockUsers: User[] = [
    {
      id: "1",
      email: "demo@recettes.com",
      username: "demo",
      firstName: "Utilisateur",
      lastName: "Démo",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      createdAt: new Date("2024-01-01"),
      lastLogin: new Date(),
    },
    {
      id: "2",
      email: "chef@recettes.com",
      username: "chef",
      firstName: "Marie",
      lastName: "Dupont",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
      createdAt: new Date("2024-01-15"),
      lastLogin: new Date(),
    },
  ]

  constructor() {
    this.loadUserFromStorage()
  }

  /**
   * Charge l'utilisateur depuis le localStorage
   */
  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem(this.STORAGE_KEY)
    const storedToken = localStorage.getItem(this.TOKEN_KEY)

    if (storedUser && storedToken) {
      const user = JSON.parse(storedUser)
      user.createdAt = new Date(user.createdAt)
      if (user.lastLogin) {
        user.lastLogin = new Date(user.lastLogin)
      }

      this.currentUserSubject.next(user)
      this.isAuthenticatedSubject.next(true)
    }
  }

  /**
   * Sauvegarde l'utilisateur dans le localStorage
   */
  private saveUserToStorage(user: User, token: string): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  /**
   * Supprime l'utilisateur du localStorage
   */
  private removeUserFromStorage(): void {
    localStorage.removeItem(this.STORAGE_KEY)
    localStorage.removeItem(this.TOKEN_KEY)
  }

  /**
   * Connexion utilisateur
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Simulation d'un appel API
    return of(null).pipe(
      delay(1000), // Simule la latence réseau
      map(() => {
        // Vérification des identifiants
        const user = this.mockUsers.find((u) => u.email === credentials.email)

        if (!user) {
          throw new Error("Email non trouvé")
        }

        // Simulation de vérification du mot de passe
        // En réalité, le mot de passe serait vérifié côté serveur
        if (credentials.password !== "password123") {
          throw new Error("Mot de passe incorrect")
        }

        // Mise à jour de la dernière connexion
        user.lastLogin = new Date()

        // Génération d'un token factice
        const token = this.generateMockToken()

        // Sauvegarde
        this.saveUserToStorage(user, token)
        this.currentUserSubject.next(user)
        this.isAuthenticatedSubject.next(true)

        return {
          user,
          token,
          expiresIn: 3600, // 1 heure
        }
      }),
    )
  }

  /**
   * Inscription utilisateur
   */
  register(registerData: RegisterData): Observable<AuthResponse> {
    return of(null).pipe(
      delay(1000),
      map(() => {
        // Vérification si l'email existe déjà
        const existingUser = this.mockUsers.find((u) => u.email === registerData.email)
        if (existingUser) {
          throw new Error("Cet email est déjà utilisé")
        }

        // Vérification si le nom d'utilisateur existe déjà
        const existingUsername = this.mockUsers.find((u) => u.username === registerData.username)
        if (existingUsername) {
          throw new Error("Ce nom d'utilisateur est déjà pris")
        }

        // Création du nouvel utilisateur
        const newUser: User = {
          id: this.generateId(),
          email: registerData.email,
          username: registerData.username,
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          createdAt: new Date(),
          lastLogin: new Date(),
        }

        // Ajout à la liste des utilisateurs
        this.mockUsers.push(newUser)

        // Génération d'un token
        const token = this.generateMockToken()

        // Sauvegarde et connexion automatique
        this.saveUserToStorage(newUser, token)
        this.currentUserSubject.next(newUser)
        this.isAuthenticatedSubject.next(true)

        return {
          user: newUser,
          token,
          expiresIn: 3600,
        }
      }),
    )
  }

  /**
   * Déconnexion utilisateur
   */
  logout(): void {
    this.removeUserFromStorage()
    this.currentUserSubject.next(null)
    this.isAuthenticatedSubject.next(false)
  }

  /**
   * Obtient l'utilisateur actuel
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value
  }

  /**
   * Génère un ID unique
   */
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }

  /**
   * Génère un token factice
   */
  private generateMockToken(): string {
    return "mock_token_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
  }
}
