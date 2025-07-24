import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importation des composants globaux de la page
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { VueDeSemaine } from './body/vue-de-semaine/vue-de-semaine';
import { DeplacementDesRecettes } from './body/deplacement-des-recettes/deplacement-des-recettes';

/**
 * @description Composant racine de l'application.
 * C'est le point d'entrée principal qui orchestre l'affichage des autres composants.
 */
@Component({
  selector: 'app-root',
  standalone: true, // Déclare le composant comme autonome (standalone).
  imports: [
    // Modules et composants nécessaires pour le template de ce composant.
    CommonModule,
    RouterOutlet, // Affiche le composant correspondant à la route active.
    RouterModule,
    Header,
    Footer,
    VueDeSemaine,
    DeplacementDesRecettes,
    FormsModule,
    // Les composants structurels de la page sont déjà importés ci-dessus.
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  // Le titre n'est pas utilisé actuellement, mais conservé pour référence.
  public title = 'Recette_Project';

  /**
   * @description Le constructeur est vide car aucune initialisation complexe n'est requise ici.
   * Le RecetteService est injecté au niveau root et n'a pas besoin d'être déclaré ici.
   */
  constructor() {}
}


