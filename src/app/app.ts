// Import des modules Angular de base
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importation des composants globaux et structurels
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { ConnexionComponent } from './connexion.component/connexion.component';
import { InscriptionComponent } from './inscription.component/inscription.component';

/**
 * @description Composant racine de l'application.
 * C'est le point d'entrée principal qui orchestre l'affichage des autres composants via le routing.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // Modules Angular essentiels
    CommonModule,
    RouterModule,
    RouterOutlet,
    FormsModule,

    // Composants structurels de la page
    Header,
    Footer,
    ConnexionComponent,
    InscriptionComponent,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {
  title = 'Recette_Project';
}
