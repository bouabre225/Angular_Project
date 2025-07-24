import { Injectable, signal } from '@angular/core';
import { Recette } from './models/recette.model';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  /**
   * @description Source de vérité pour la liste des recettes.
   * Utilise un signal pour une gestion réactive de l'état.
   */
  private readonly recettes = signal<Recette[]>([
    {
      id: 1,
      titre: 'Pizza Margherita',
      image: 'assets/pizza.png',
      duree: 20,
      cuisson: 15,
      difficulte: 'Facile',
      categorie: 'Plat',
      jour: 'Mardi',
      type: 'Petit-déjeuner',
      ingredients: ['Pâte à pizza', 'Tomate', 'Mozzarella', 'Basilic'],
      preparation: [
        'Préchauffer le four à 220°C',
        'Étaler la pâte',
        'Ajouter les ingrédients',
        'Enfourner pendant 15 minutes'
      ],
      nutrition: '500 kcal / portion'
    },
    {
      id: 2,
      titre: 'Salade César',
      image: 'assets/salade.png',
      duree: 15,
      cuisson: 0,
      difficulte: 'Facile',
      categorie: 'Entrée',
      jour: 'Samedi',
      type: 'Dîner',
      ingredients: ['Laitue', 'Poulet grillé', 'Parmesan', 'Croûtons', 'Sauce César'],
      preparation: [
        'Laver la laitue',
        'Griller le poulet',
        'Assembler les ingrédients',
        'Ajouter la sauce'
      ],
      nutrition: '350 kcal / portion'
    },
    {
      id: 3,
      titre: 'Poulet rôti aux herbes',
      image: 'assets/Poulet.png',
      duree: 15,
      cuisson: 60,
      difficulte: 'Moyenne',
      categorie: 'Plat',
      jour: 'Dimanche',
      type: 'Petit-déjeuner',
      ingredients: ['Poulet entier', 'Herbes de Provence', 'Ail', 'Citron', 'Beurre'],
      preparation: [
        'Préchauffer le four à 180°C',
        'Badigeonner le poulet de beurre et herbes',
        'Mettre au four pendant 1 heure',
        'Laisser reposer avant de servir'
      ],
      nutrition: '600 kcal / portion'
    },
    {
      id: 4,
      titre: 'Ratatouille',
      image: 'assets/Ratatouille.png',
      duree: 30,
      cuisson: 45,
      difficulte: 'Moyenne',
      categorie: 'Plat',
      jour: 'Mercredi',
      type: 'Déjeuner',
      ingredients: ['Aubergine', 'Courgette', 'Poivron', 'Tomate', 'Oignon', 'Ail'],
      preparation: [
        'Couper tous les légumes en dés',
        'Faire revenir les oignons et l\'ail',
        'Ajouter les légumes et laisser mijoter',
        'Assaisonner à votre goût'
      ],
      nutrition: '250 kcal / portion'
    },
    {
      id: 5,
      titre: 'Tarte aux pommes',
      image: 'assets/Tartes.png',
      duree: 25,
      cuisson: 35,
      difficulte: 'Facile',
      categorie: 'Dessert',
      jour: 'Jeudi',
      type: 'Dessert',
      ingredients: ['Pâte brisée', 'Pommes', 'Sucre', 'Beurre', 'Cannelle'],
      preparation: [
        'Étaler la pâte dans un moule',
        'Éplucher et couper les pommes',
        'Disposer les pommes sur la pâte',
        'Saupoudrer de sucre et cannelle',
        'Cuire 35 minutes à 180°C'
      ],
      nutrition: '400 kcal / portion'
    },
    {
      id: 6,
      titre: 'Omelette aux champignons',
      image: 'assets/omolette.png',
      duree: 10,
      cuisson: 10,
      difficulte: 'Facile',
      categorie: 'Entrée',
      jour: 'Lundi',
      type: 'Petit-déjeuner',
      ingredients: ['Œufs', 'Champignons', 'Persil', 'Beurre', 'Sel', 'Poivre'],
      preparation: [
        'Battre les œufs en omelette',
        'Faire revenir les champignons',
        'Verser les œufs dans la poêle',
        'Cuire à feu doux'
      ],
      nutrition: '300 kcal / portion'
    }
  ]);

  /**
   * @description Source de vérité pour les jours de la semaine.
   */
  private readonly joursSemaine = signal<string[]>([
    'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
  ]);

  /**
   * @description Renvoie un snapshot de toutes les recettes.
   * @returns {Recette[]} La liste de toutes les recettes.
   */
  public getRecettes(): Recette[] {
    return this.recettes();
  }

  /**
   * @description Renvoie la liste des jours de la semaine.
   * @returns {string[]} Les jours de la semaine.
   */
  public getJoursSemaine(): string[] {
    return this.joursSemaine();
  }

  /**
   * @description Recherche et renvoie une recette par son identifiant unique.
   * @param {number} id L'ID de la recette à trouver.
   * @returns {Recette | undefined} La recette si elle est trouvée, sinon undefined.
   */
  public getRecetteById(id: number): Recette | undefined {
    return this.recettes().find(r => r.id === id);
  }

  /**
   * @description Ajoute une nouvelle recette à la liste existante.
   * @param {Recette} recette La nouvelle recette à ajouter.
   */
  public ajouterRecette(recette: Recette): void {
    this.recettes.update(recettesActuelles => [...recettesActuelles, recette]);
  }
}