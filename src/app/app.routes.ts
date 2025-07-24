import { Routes } from '@angular/router';
import { ListeRecette } from './liste-recette/liste-recette';
import { DetailRecette } from './detail-recette/detail-recette';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/liste-recette/liste-recette')
      .then(m => m.ListeRecetteComponent),
    title: 'Mes Recettes'
  },
  {
    path: 'recette/new',
    loadComponent: () => import('./components/recette-formulaire/recette-formulaire')
      .then(m => m.RecetteFormulaireComponent),
    title: 'Nouvelle Recette'
  },
  {
    path: 'recette/edit/:id',
    loadComponent: () => import('./components/recette-formulaire/recette-formulaire')
      .then(m => m.RecetteFormulaireComponent),
    title: 'Modifier Recette'
  },
  {
    path: 'recette/:id',
    loadComponent: () => import('./components/details-recette/details-recette')
      .then(m => m.DetailsRecetteComponent),
    title: 'Détail Recette'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: '', 
    component: ListeRecette 
  },
    { path: 'recette/:id', 
    component: DetailRecette 
  },
    { path: '**', 
    redirectTo: '' 
  }
];
