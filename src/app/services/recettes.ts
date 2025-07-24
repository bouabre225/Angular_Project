import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recette, FiltreRecette } from '../recettes/recettes-module';

/**
 * Service principal pour la gestion des recettes
 * Gère le stockage local, les opérations CRUD et les filtres
 * Utilise localStorage pour la persistance des données
 */
@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private readonly STORAGE_KEY = 'recipes';
  private recetteSubject = new BehaviorSubject<Recette[]>([]);
  public recettes$ = this.recetteSubject.asObservable();

  constructor() {
    this.chargerRecettes();
  }

  /**
   * Charge les recettes depuis localStorage
   * Si aucune recette n'existe, charge des données factices
   */
  private chargerRecettes(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const recipes = JSON.parse(stored);
      this.recetteSubject.next(recipes);
    } else {
      this.chargerDonneesFactices();
    }
  }

  /**
   * Sauvegarde les recettes dans localStorage
   */
  private sauvegarderRecettes(recipes: Recette[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recipes));
    this.recetteSubject.next(recipes);
  }

  /**
   * Charge des données factices au premier lancement
   */
  private chargerDonneesFactices(): void {
    const donneesRecettes: Recette[] = [
      {
        id: '1',
        titre: 'Salade César',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
        duree: 15,
        difficulte: 'Facile',
        categorie: 'Entrée',
        ingredients: ['Salade romaine', 'Parmesan', 'Croûtons', 'Sauce César', 'Anchois'],
        etapes: [
          'Laver et couper la salade romaine',
          'Préparer les croûtons',
          'Mélanger avec la sauce César',
          'Ajouter le parmesan râpé'
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        titre: 'Spaghetti Carbonara',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400',
        duree: 25,
        difficulte: 'Moyen',
        categorie: 'Plat',
        ingredients: ['Spaghetti', 'Lardons', 'Œufs', 'Parmesan', 'Poivre noir'],
        etapes: [
          'Cuire les spaghetti al dente',
          'Faire revenir les lardons',
          'Mélanger œufs et parmesan',
          'Incorporer le tout hors du feu'
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        titre: 'Tiramisu',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
        duree: 30,
        difficulte: 'Difficile',
        categorie: 'Dessert',
        ingredients: ['Mascarpone', 'Biscuits à la cuillère', 'Café', 'Œufs', 'Sucre', 'Cacao'],
        etapes: [
          'Préparer le café fort',
          'Monter les blancs en neige',
          'Mélanger mascarpone et jaunes',
          'Tremper les biscuits',
          'Monter en couches',
          'Réfrigérer 4h minimum'
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    this.sauvegarderRecettes(donneesRecettes);
  }

  /**
   * Récupère toutes les recettes
   */
  chargerToutesLesRecettes(): Observable<Recette[]> {
    return this.recettes$;
  }

  /**
   * Récupère une recette par son ID
   */
  getRecetteById(id: string): Recette | undefined {
    return this.recetteSubject.value.find(recette => recette.id === id);
  }

  /**
   * Ajoute une nouvelle recette
   */
  addRecette(recette: Omit<Recette, 'id' | 'createdAt' | 'updatedAt'>): void {
    const newRecette: Recette = {
      ...recette,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const recettes = [...this.recetteSubject.value, newRecette];
    this.sauvegarderRecettes(recettes);
  }

  /**
   * Met à jour une recette existante
   */
  updateRecette(id: string, updatedRecette: Partial<Recette>): void {
    const recettes = this.recetteSubject.value.map(recette =>
      recette.id === id
        ? { ...recette, ...updatedRecette, updatedAt: new Date() }
        : recette
    );
    this.sauvegarderRecettes(recettes);
  }

  /**
   * Supprime une recette
   */
  deleteRecette(id: string): void {
    const recettes = this.recetteSubject.value.filter(recette => recette.id !== id);
    this.sauvegarderRecettes(recettes);
  }

  /**
   * Filtre les recettes selon les critères donnés
   */
  filtrerRecettes(filtre: FiltreRecette): Observable<Recette[]> {
    return new BehaviorSubject(
      this.recetteSubject.value.filter(recette => {
        if (filtre.chercheTerm && !recette.titre.toLowerCase().includes(filtre.chercheTerm.toLowerCase())) {
          return false;
        }
        if (filtre.ingredient && !recette.ingredients.some(ing =>
          ing.toLowerCase().includes(filtre.ingredient!.toLowerCase()))) {
          return false;
        }
        if (filtre.categories && recette.categorie !== filtre.categories) {
          return false;
        }
        if (filtre.DureeMax && recette.duree > filtre.DureeMax) {
          return false;
        }
        if (filtre.difficultees && recette.difficulte !== filtre.difficultees) {
          return false;
        }
        return true;
      })
    ).asObservable();
  }

  /**
   * Génère un ID unique pour les nouvelles recettes
   */
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
