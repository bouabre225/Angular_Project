import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecetteService } from './recette';
import { ListeRecette } from './liste-recette/liste-recette';
import { CommonModule } from '@angular/common';
import { DetailRecette } from './detail-recette/detail-recette';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListeRecette, CommonModule, DetailRecette, RouterModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  template: `<router-outlet></router-outlet>`
})
export class App {
  title = signal('Recette_Project');


  constructor(public recetteService: RecetteService) {}
}

