export interface Recette {
    id: number;
    titre: string;
    image: string;
    duree: number;
    cuisson: number;
    difficulte: 'Facile' | 'Moyenne' | 'Difficile';
    categorie: 'Entrée' | 'Plat' | 'Dessert';
    ingredients: string[];
    preparation: string[];
    nutrition?: string;
}
