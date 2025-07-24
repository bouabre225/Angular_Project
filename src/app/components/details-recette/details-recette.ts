import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Recette } from '../../recettes/recettes-module';
import { RecetteService } from '../../services/recettes';

/**
 * Composant de détail d'une recette
 * Affiche toutes les informations d'une recette spécifique
 * Permet la navigation vers l'édition et la suppression
 */
@Component({
  selector: 'app-details-recette',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details-recette.html',
  styleUrls: ['./details-recette.css']
})
export class DetailsRecetteComponent implements OnInit {
  recette: Recette | null = null;
  protected readonly title = 'Détails de la Recette';
  chargement = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetteService: RecetteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.chargerRecette(id);
    } else {
      this.router.navigate(['/']);
    }
  }

  /**
   * Charge les détails de la recette
   */
  private chargerRecette(id: string): void {
    const foundRecette = this.recetteService.getRecetteById(id);
    this.recette = foundRecette !== undefined ? foundRecette : null;
    this.chargement = false;

    if (!this.recette) {
      this.router.navigate(['/']);
    }
  }

  /**
   * Supprime la recette avec confirmation
   */
  deleteRecette(): void {
    if (!this.recette) return;

    if (confirm(`Êtes-vous sûr de vouloir supprimer la recette "${this.recette.titre}" ?`)) {
      this.recetteService.deleteRecette(this.recette.id);
      this.router.navigate(['/']);
    }
  }

  /**
   * Formate la durée en format lisible
   */
  formatDeLaDuree(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const heures = Math.floor(minutes / 60);
    const minutesRestants = minutes % 60;
    return minutesRestants > 0 ? `${heures}h ${minutesRestants}min` : `${heures}h`;
  }

  /**
   * Retourne la classe CSS pour la difficulté
   */
  getDifficulteeClass(difficultee: string): string {
    switch (difficultee) {
      case 'Facile': return 'difficulty-easy';
      case 'Moyen': return 'difficulty-medium';
      case 'Difficile': return 'difficulty-hard';
      default: return '';
    }
  }

  /**
   * Navigue vers la page d'accueil
   */
  goBack(): void {
    this.router.navigate(['/']);
  }
}
