import { Component } from '@angular/core';
import { RecetteService } from '../recette';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Recette } from '../models/recette';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detail-recette',
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-recette.html',
  styleUrl: './detail-recette.css'
})
export class DetailRecette {
  recette: Recette | undefined;

  constructor(private route: ActivatedRoute, private recetteService: RecetteService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recette = this.recetteService.getRecetteById(id);
  }
}
