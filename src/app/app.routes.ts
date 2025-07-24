import type { Routes } from "@angular/router"

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./components/liste-recette/liste-recette").then((m) => m.ListeRecetteComponent),
    title: "Mes Recettes",
  },
  {
    path: "recette/new",
    loadComponent: () =>
      import("./components/recette-formulaire/recette-formulaire").then((m) => m.RecetteFormulaireComponent),
    title: "Nouvelle Recette",
  },
  {
    path: "recette/edit/:id",
    loadComponent: () =>
      import("./components/recette-formulaire/recette-formulaire").then((m) => m.RecetteFormulaireComponent),
    title: "Modifier Recette",
  },
  {
    path: "recette/:id",
    loadComponent: () => import("./components/details-recette/details-recette").then((m) => m.DetailsRecetteComponent),
    title: "Détail Recette",
  },
  {
    path: "apprentissage",
    loadComponent: () => import("./body/apprentissage/apprentissage").then((m) => m.ApprentissageComponent),
    title: "Apprentissage Culinaire",
  },
  {
    path: "communaute",
    loadComponent: () => import("./body/communaute/communaute").then((m) => m.CommunauteComponent),
    title: "Communauté",
  },
  {
    path: "deplacement",
    loadComponent: () =>
      import("./body/deplacement-des-recettes/deplacement-des-recettes").then((m) => m.DeplacementDesRecettes),
    title: "Déplacement des Recettes",
  },
  {
    path: "suppression",
    loadComponent: () => import("./body/suppression-rapide/suppression-rapide").then((m) => m.SuppressionRapide),
    title: "Suppression Rapide",
  },
  {
    path: "planning",
    loadComponent: () => import("./body/vue-de-semaine/vue-de-semaine").then((m) => m.VueDeSemaine),
    title: "Vue de Semaine",
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
]
