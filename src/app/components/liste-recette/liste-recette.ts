import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Recette, FiltreRecette } from '../../recettes/recettes-module';
import { RecetteService } from '../../services/recettes';
import { BarDeFiltreComponent } from '../bar-de-filtre/bar-de-filtre';

/**
 * Composant principal d'affichage de la liste des recettes
 * Gère l'affichage en grille, les filtres et la navigation
 * Point d'entrée principal de l'application
 */
@Component({
  selector: 'app-liste-recette',
  standalone: true,
  imports: [CommonModule, RouterModule, BarDeFiltreComponent],
  templateUrl: './liste-recette.html',
  styleUrls: ['./liste-recette.css']
})
export class ListeRecetteComponent implements OnInit, OnDestroy {
  recettes: Recette[] = [];
  filtrerParRecettes: Recette[] = [];
  private destroy$ = new Subject<void>();

  constructor(private recetteService: RecetteService) {}

  ngOnInit(): void {
    // S'abonner aux changements de recettes
    this.recetteService.chargerToutesLesRecettes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(recettes => {
        this.recettes = recettes;
        this.filtrerParRecettes = recettes;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Gère les changements de filtres depuis la barre de filtres
   */
  FiltreChange(filtre: FiltreRecette): void {
    this.recetteService.filtrerRecettes(filtre)
      .pipe(takeUntil(this.destroy$))
      .subscribe(recettes => {
        this.filtrerParRecettes = recettes;
      });
  }

  /**
   * Supprime une recette avec confirmation
   */
  deleteRecette(recette: Recette, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (confirm(`Êtes-vous sûr de vouloir supprimer la recette "${recette.titre}" ?`)) {
      this.recetteService.deleteRecette(recette.id);
    }
  }

  /**
   * Formate la durée en format lisible
   */
  formatDuree(minutes: number): string {
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
  getDifficultesClass(difficulte: string): string {
    switch (difficulte) {
      case 'Facile': return 'difficulty-easy';
      case 'Moyen': return 'difficulty-medium';
      case 'Difficile': return 'difficulty-hard';
      default: return '';
    }
  }
}
