import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { DeplacementDesRecettes } from './body/deplacement-des-recettes/deplacement-des-recettes';
import { VueDeSemaine } from './body/vue-de-semaine/vue-de-semaine';
//import { SuppressionRapide} from './body/suppression-rapide/suppression-rapide';
import { RecetteService } from './recette';
import { ListeRecette } from './liste-recette/liste-recette';
import { CommonModule } from '@angular/common';
import { DetailRecette } from './detail-recette/detail-recette';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule, FormsModule, Header, Footer, DeplacementDesRecettes, VueDeSemaine,],
  templateUrl: './app.html',
  styleUrl: './app.css',
  template: `<router-outlet></router-outlet>`
})
export class App {
  title = signal('Recette_Project');


  constructor(public recetteService: RecetteService) {}
}

