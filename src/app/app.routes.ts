import { Routes } from '@angular/router';
import { ListeRecette } from './liste-recette/liste-recette';
import { DetailRecette } from './detail-recette/detail-recette';

export const routes: Routes = [
    { path: '', component: ListeRecette },
    { path: 'recette/:id', component: DetailRecette },
    { path: '**', redirectTo: '' }
];