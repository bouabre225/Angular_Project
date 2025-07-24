import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { DeplacementDesRecettes } from './body/deplacement-des-recettes/deplacement-des-recettes';
import { VueDeSemaine } from './body/vue-de-semaine/vue-de-semaine';
import { SuppressionRapide } from './body/suppression-rapide/suppression-rapide';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, DeplacementDesRecettes, VueDeSemaine, SuppressionRapide],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Recette_Project');
}
