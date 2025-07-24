import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RecettesModule { }

/**
 * Interface définissant la structure d'une recette
 * Utilisée dans toute l'application pour typer les données des recettes
 */
export interface Recette {
  id: string;
  titre: string;
  image: string;
  duree: number; // en minutes
  cuisson: number; // en minutes
  difficulte: 'Facile' | 'Moyen' | 'Difficile';
  categorie: 'Entrée' | 'Plat' | 'Dessert' | 'Boisson';
  ingredients: string[];
  etapes: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface pour les filtres de recherche
 * Utilisée par le composant filter-bar et le service
 */
export interface FiltreRecette {
  chercheTerm?: string;
  ingredient?: string;
  categories?: string;
  DureeMax?: number;
  difficultees?: string;
}
