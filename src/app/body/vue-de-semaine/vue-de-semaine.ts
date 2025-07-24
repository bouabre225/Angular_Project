import { Component } from '@angular/core';
import { PlanningApiService } from '../../services/planning-api.service';

@Component({
  selector: 'app-vue-de-semaine',
  imports: [],
  templateUrl: './vue-de-semaine.html',
  styleUrl: './vue-de-semaine.css'
})
export class VueDeSemaine {
  planning: any = {};
  private readonly STORAGE_KEY = 'planning-semaine';
  private readonly userId = 'utilisateur-demo'; // À remplacer par l'ID utilisateur réel

  constructor(private planningApi: PlanningApiService) {
    this.chargerPlanningLocal();
  }

  // Synchronisation API : charger le planning depuis l'API
  chargerPlanningApi() {
    this.planningApi.getPlanning(this.userId).subscribe({
      next: (data) => {
        this.planning = data || this.planningParDefaut();
        this.sauvegarderPlanningLocal();
      },
      error: () => {
        // fallback local en cas d'erreur réseau
        this.chargerPlanningLocal();
      }
    });
  }

  // Synchronisation API : sauvegarder le planning sur l'API
  sauvegarderPlanningApi() {
    this.planningApi.savePlanning(this.userId, this.planning).subscribe();
    this.sauvegarderPlanningLocal();
  }

  // LocalStorage (fallback ou usage hors-ligne)
  sauvegarderPlanningLocal() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.planning));
  }

  chargerPlanningLocal() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.planning = JSON.parse(stored);
    } else {
      this.planning = this.planningParDefaut();
      this.sauvegarderPlanningLocal();
    }
  }

  planningParDefaut() {
    return {
      lundi: [],
      mardi: [],
      mercredi: [],
      jeudi: [],
      vendredi: [],
      samedi: [],
      dimanche: []
    };
  }

}
