/**
 * Interface définissant la structure d'un utilisateur
 */
export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  avatar?: string
  createdAt: Date
  lastLogin?: Date
}

/**
 * Interface pour les données de connexion
 */
export interface LoginCredentials {
  email: string
  password: string
}

/**
 * Interface pour les données d'inscription
 */
export interface RegisterData {
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

/**
 * Interface pour la réponse d'authentification
 */
export interface AuthResponse {
  user: User
  token: string
  expiresIn: number
}
