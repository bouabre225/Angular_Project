export interface Recette {
  id: number;
  titre: string;
  image: string;
  duree: number;
  cuisson: number;
  difficulte: string;
  categorie: string;
  jour: string;
  type: string;
  ingredients: string[];
  preparation: string[];
  nutrition?: string;
}

export type FiltreRecette = {
  nom: string;
  ingredient: string;
  categorie: string;
  difficulte: string;
  maxTemps: number;
};
