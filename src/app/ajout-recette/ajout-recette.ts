import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecetteService } from '../recette';
import { RouterModule } from '@angular/router';
import { Recette } from '../models/recette';

@Component({
  selector: 'ajout-recette',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ajout-recette.html'
})
export class AjoutRecette {
  nouvelleRecette = {
    titre: '',
    image: '',
    duree: 0,
    cuisson: 0,
    difficulte: 'Facile',
    ingredients: '',
    preparation: '',
    nutrition: ''
  };

  constructor(private recetteService: RecetteService, private router: Router) {}

  ajouter() {
    const recette = {
      ...this.nouvelleRecette,
      id: Date.now(),
      ingredients: this.nouvelleRecette.ingredients.split('\n'),
      preparation: this.nouvelleRecette.preparation.split('\n')
    };
    this.recetteService.ajouterRecette(recette as Recette);
    this.router.navigate(['/']);
  }
}
