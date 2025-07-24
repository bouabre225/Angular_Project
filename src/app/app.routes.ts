import { Routes } from '@angular/router';
import { ListeRecetteComponent } from './liste-recette/liste-recette';
import { DetailRecetteComponent } from './detail-recette/detail-recette';

export const routes: Routes = [
    { path: '', component: ListeRecetteComponent },
    { path: 'recette/:id', component: DetailRecetteComponent },
    { path: '**', redirectTo: '' }
];