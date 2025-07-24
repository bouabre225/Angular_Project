import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./liste-recette/liste-recette').then((m) => m.ListeRecetteComponent),
    title: 'Mes Recettes',
  },
  {
    path: 'recette/new',
    loadComponent: () =>
      import('./components/recette-formulaire/recette-formulaire').then((m) => m.RecetteFormulaireComponent),
    title: 'Nouvelle Recette',
    canActivate: [AuthGuard],
  },
  {
    path: 'recette/edit/:id',
    loadComponent: () =>
      import('./components/recette-formulaire/recette-formulaire').then((m) => m.RecetteFormulaireComponent),
    title: 'Modifier Recette',
    canActivate: [AuthGuard],
  },
  {
    path: 'recette/:id',
    loadComponent: () => import('./detail-recette/detail-recette').then((m) => m.DetailRecetteComponent),
    title: 'Détail Recette',
  },
  {
    path: 'apprentissage',
    loadComponent: () => import('./body/apprentissage/apprentissage').then((m) => m.ApprentissageComponent),
    title: 'Apprentissage Culinaire',
  },
  {
    path: 'communaute',
    loadComponent: () => import('./body/communaute/communaute').then((m) => m.CommunauteComponent),
    title: 'Communauté',
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/login/login').then((m) => m.LoginComponent),
    title: 'Connexion',
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./auth/register/register').then((m) => m.RegisterComponent),
    title: 'Inscription',
  },
  {
    path: 'deplacement',
    loadComponent: () =>
      import('./body/deplacement-des-recettes/deplacement-des-recettes').then((m) => m.DeplacementDesRecettes),
    title: 'Déplacement des Recettes',
    canActivate: [AuthGuard],
  },
  {
    path: 'suppression',
    loadComponent: () => import('./body/suppression-rapide/suppression-rapide').then((m) => m.SuppressionRapideComponent),
    title: 'Suppression Rapide',
    canActivate: [AuthGuard],
  },
  {
    path: 'planning',
    loadComponent: () => import('./body/vue-de-semaine/vue-de-semaine').then((m) => m.VueDeSemaine),
    title: 'Vue de Semaine',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
