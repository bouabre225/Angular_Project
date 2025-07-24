import { Component, OnInit, computed } from '@angular/core';
import { RecetteService } from '../recette';
import { Recette } from '../models/recette';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-liste-recette',
  imports: [CommonModule, RouterModule],
  templateUrl: './liste-recette.html',
  styleUrl: './liste-recette.css'
})
export class ListeRecette implements OnInit {
  recettes: Recette[] = [];
  
  recettesFiltrees = computed(() => this.recetteService.getRecettes());
  constructor(private recetteService: RecetteService) {}

  ngOnInit(): void {
    this.recettes = this.recetteService.getRecettes();
  }
}
