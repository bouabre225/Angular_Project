import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Recette } from '../../models/recette.model';
import { RecetteService } from '../../recette';

@Component({
  standalone: true,
  selector: 'app-vue-de-semaine',
  templateUrl: './vue-de-semaine.html',
  styleUrls: ['./vue-de-semaine.css'],
  imports: [CommonModule]  
})
export class VueDeSemaine {
  // 👇 Injection du service (avec inject API si standalone)
  private recetteService = inject(RecetteService);

  jourSelectionne: string | null = null;

  jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  categories = ['Entrée', 'Plat', 'Dessert'];

  // 👇 Toutes les recettes récupérées depuis le service
  recettes: Recette[] = [];

  constructor() {
    // On récupère les recettes une fois au démarrage
    this.recettes = this.recetteService.getRecettes(); // adapte selon ton service
  }

  selectionnerJour(jour: string): void {
    this.jourSelectionne = jour;
  }

  getRecettes(categorie: string): Recette[] {
    return this.recettes.filter(
      r => r.categorie === categorie && r.jour === this.jourSelectionne
    );
  }
}

