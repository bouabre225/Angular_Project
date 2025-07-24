import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RecetteService } from '../recette';
import { Recette } from '../models/recette.model';

@Component({
  selector: 'app-liste-recette',
  standalone: true, // Les composants modernes sont de préférence autonomes.
  imports: [CommonModule, RouterModule], // Dépendances requises par le template.
  templateUrl: './liste-recette.html',
  styleUrls: ['./liste-recette.css']
})
export class ListeRecetteComponent implements OnInit {

  // Propriété pour stocker la liste des recettes à afficher.
  public recettes: Recette[] = [];

  /**
   * @description Injection du service de recettes.
   * @param recetteService Le service pour obtenir les données des recettes.
   */
  constructor(private recetteService: RecetteService) {}

  /**
   * @description Hook de cycle de vie, appelé à l'initialisation du composant.
   * Récupère la liste complète des recettes depuis le service.
   */
  ngOnInit(): void {
    this.recettes = this.recetteService.getRecettes();
  }
}

