import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Recette } from '../../models/recette.model';
import { RecetteService } from '../../recette';
import { PlanningApiService } from '../../services/planning-api.service';

@Component({
  standalone: true,
  selector: 'app-vue-de-semaine',
  templateUrl: './vue-de-semaine.html',
  styleUrls: ['./vue-de-semaine.css'],
  imports: [CommonModule]
})
export class VueDeSemaine {
  // Injection des services
  private recetteService = inject(RecetteService);
  private planningApi = inject(PlanningApiService);

  // Propriétés pour la gestion du planning
  planning: any = {};
  private readonly STORAGE_KEY = 'planning-semaine';
  private readonly userId = 'utilisateur-demo'; // À remplacer par l'ID utilisateur réel

  // Propriétés pour l'affichage et la sélection
  jourSelectionne: string | null = null;
  jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  categories = ['Entrée', 'Plat', 'Dessert'];
  recettes: Recette[] = [];

  constructor() {
    // Charger les données au démarrage
    this.recettes = this.recetteService.getRecettes();
    this.chargerPlanningLocal(); // ou chargerPlanningApi() selon la stratégie
  }

  // --- Méthodes de gestion du planning ---

  chargerPlanningApi() {
    this.planningApi.getPlanning(this.userId).subscribe({
      next: (data) => {
        this.planning = data || this.planningParDefaut();
        this.sauvegarderPlanningLocal();
      },
      error: () => { this.chargerPlanningLocal(); }
    });
  }

  sauvegarderPlanningApi() {
    this.planningApi.savePlanning(this.userId, this.planning).subscribe();
    this.sauvegarderPlanningLocal();
  }

  sauvegarderPlanningLocal() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.planning));
  }

  chargerPlanningLocal() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.planning = stored ? JSON.parse(stored) : this.planningParDefaut();
  }

  planningParDefaut() {
    return { lundi: [], mardi: [], mercredi: [], jeudi: [], vendredi: [], samedi: [], dimanche: [] };
  }

  // --- Méthodes de sélection et de filtrage ---

  selectionnerJour(jour: string): void {
    this.jourSelectionne = jour;
  }

  getRecettes(categorie: string): Recette[] {
    return this.recettes.filter(
      r => r.categorie === categorie && r.jour === this.jourSelectionne
    );
  }
}

