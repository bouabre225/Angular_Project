import { Injectable, signal } from '@angular/core';
import { Recette } from './models/recette';


type FiltreRecette = {
  nom: string;
  ingredient: string;
  categorie: string;
  difficulte: string;
  maxTemps: number;
};
@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  // 📦 Liste réactive des recettes
  private recettes = signal<Recette[]>([
    {
      id: 1,
      titre: 'Pizza Margherita',
      image: 'assets/images/pizza.jpg',
      duree: 20,
      cuisson: 15,
      difficulte: 'Facile',
      categorie: 'Plat',
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
      image: 'assets/images/cesar.jpg',
      duree: 15,
      cuisson: 0,
      difficulte: 'Facile',
      categorie: 'Entrée',
      ingredients: ['Laitue', 'Poulet grillé', 'Parmesan', 'Croûtons', 'Sauce César'],
      preparation: [
        'Laver la laitue',
        'Griller le poulet',
        'Assembler les ingrédients',
        'Ajouter la sauce'
      ]
    }
  ]);

  // ✅ Obtenir toutes les recettes (non filtrées)
  getRecettes(): Recette[] {
    return this.recettes();
  }

  // ✅ Par ID
  getRecetteById(id: number): Recette | undefined {
    return this.recettes().find(r => r.id === id);
  }

  // ✅ Ajouter une recette dynamiquement
  ajouterRecette(recette: Recette): void {
    this.recettes.update(r => [...r, recette]);
  }
}
