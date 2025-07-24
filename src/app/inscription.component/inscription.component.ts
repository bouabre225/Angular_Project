import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class InscriptionComponent {
  utilisateur: any = {
    nom: '',
    email: '',
    mot_de_passe: '',
    date_naissance: '',
    sexe: '',
    objectif: '',
    regime: '',
    allergies: '',
    preferences: '',
    niveau_cuisine: '',
    recettesFavoris: [] as number[],
    planning: {} as any,
    cgu: false
  };

  // Stockage des utilisateurs dans le localStorage
  onSubmit() {
    const utilisateurs = JSON.parse(localStorage.getItem('utilisateurs') || '[]');
    utilisateurs.push(this.utilisateur);
    localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
    alert('Inscription réussie !');

    // Optionnel : réinitialiser le formulaire
    this.utilisateur = {
      nom: '',
      email: '',
      mot_de_passe: '',
      date_naissance: '',
      sexe: '',
      objectif: '',
      regime: '',
      allergies: '',
      preferences: '',
      niveau_cuisine: '',
      cgu: false
    };
  }
}
