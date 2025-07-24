export interface Recette {
    id: number;
    titre: string;
    image: string;
    duree: number;
    cuisson: number;
    difficulte: 'Facile' | 'Moyenne' | 'Difficile';
    categorie: 'Entrée' | 'Plat' | 'Dessert';
    jour: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
    type: 'Petit-déjeuner' | 'Déjeuner' | 'Dîner' | 'Dessert';
    ingredients: string[];
    preparation: string[];
    nutrition?: string;
}
