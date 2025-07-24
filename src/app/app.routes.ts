import { Routes } from '@angular/router';
import { ListeRecette } from './liste-recette/liste-recette';
import { DetailRecette } from './detail-recette/detail-recette';
import { AjoutRecette } from './ajout-recette/ajout-recette';

export const routes: Routes = [
    { path: '', component: ListeRecette },
    { path: 'recette/:id', component: DetailRecette },
    { path: 'ajout-recette', component: AjoutRecette },
    { path: '**', redirectTo: '' }
];