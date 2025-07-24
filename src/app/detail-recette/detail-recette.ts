import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RecetteService } from '../recette';
import { Recette } from '../models/recette.model';

@Component({
  selector: 'app-detail-recette',
  standalone: true, // Les composants modernes sont de préférence autonomes (standalone).
  imports: [CommonModule, RouterModule], // Importations nécessaires pour le template.
  templateUrl: './detail-recette.html',
  styleUrls: ['./detail-recette.css'] // Utilisation de styleUrls (pluriel) par convention.
})
export class DetailRecetteComponent implements OnInit {

  // Propriété pour stocker les détails de la recette à afficher.
  public recette: Recette | undefined;

  /**
   * @description Injection des dépendances nécessaires au composant.
   * @param route Service pour accéder aux informations de la route active.
   * @param recetteService Service pour obtenir les données des recettes.
   */
  constructor(
    private route: ActivatedRoute,
    private recetteService: RecetteService
  ) {}

  /**
   * @description Hook du cycle de vie d'Angular, appelé après la création du composant.
   * Idéal pour la récupération des données initiales.
   */
  ngOnInit(): void {
    // Récupère l'ID de la recette depuis les paramètres de l'URL.
    // Le '+' est une astuce pour convertir la chaîne en nombre.
    const id = +this.route.snapshot.paramMap.get('id')!;

    // Utilise le service pour trouver la recette correspondante.
    this.recette = this.recetteService.getRecetteById(id);
  }
}

