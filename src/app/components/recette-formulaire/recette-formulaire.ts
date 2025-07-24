import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recette } from '../../recettes/recettes-module';
import { RecetteService } from '../../services/recettes';

/**
 * Composant de formulaire pour créer/modifier une recette
 * Gère la validation des données et la soumission
 * Supporte les modes création et édition
 */
@Component({
  selector: 'app-recette-formulaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recette-formulaire.html',
  styleUrls: ['./recette-formulaire.css']
})
export class RecetteFormulaireComponent implements OnInit {
  recetteForm: FormGroup;
  isEditMode = false;
  recetteId: string | null = null;
  loading = false;

  // Options pour les select
  categories = ['Entrée', 'Plat', 'Dessert', 'Boisson'];
  difficulties = ['Facile', 'Moyen', 'Difficile'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recetteService: RecetteService
  ) {
    this.recetteForm = this.createFormulaire();
  }

  ngOnInit(): void {
    // Vérifier si on est en mode édition
    this.recetteId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.recetteId !== null && this.recetteId !== 'new';

    if (this.isEditMode && this.recetteId) {
      this.loadRecettePourEdit(this.recetteId);
    }
  }

  /**
   * Crée le formulaire réactif avec validation
   */
  private createFormulaire(): FormGroup {
    return this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      duree: [30, [Validators.required, Validators.min(1), Validators.max(600)]],
      difficulte: ['Facile', Validators.required],
      categorie: ['Plat', Validators.required],
      ingredients: this.fb.array([this.creeIngredientControlleur()], Validators.required),
      etapes: this.fb.array([this.creeEtapeControlleur()], Validators.required)
    });
  }

  /**
   * Crée un contrôle pour un ingrédient
   */
  private creeIngredientControlleur(): FormGroup {
    return this.fb.group({
      value: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  /**
   * Crée un contrôle pour une étape
   */
  private creeEtapeControlleur(): FormGroup {
    return this.fb.group({
      value: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  /**
   * Charge une recette existante pour l'édition
   */
  private loadRecettePourEdit(id: string): void {
    const recette = this.recetteService.getRecetteById(id);
    if (!recette) {
      this.router.navigate(['/']);
      return;
    }

    // Remplir le formulaire avec les données existantes
    this.recetteForm.patchValue({
      titre: recette.titre,
      image: recette.image,
      duree: recette.duree,
      difficulte: recette.difficulte,
      categorie: recette.categorie
    });

    // Remplir les ingrédients
    const ingredientsArray = this.ingredients;
    ingredientsArray.clear();
    recette.ingredients.forEach(ingredient => {
      ingredientsArray.push(this.fb.group({ value: [ingredient, Validators.required] }));
    });

    // Remplir les étapes
    const etapes = this.etapes;
    etapes.clear();
    recette.etapes.forEach(step => {
      etapes.push(this.fb.group({ value: [step, Validators.required] }));
    });
  }

  /**
   * Getters pour accéder aux FormArray
   */
  get ingredients(): FormArray {
    return this.recetteForm.get('ingredients') as FormArray;
  }

  get etapes(): FormArray {
    return this.recetteForm.get('etapes') as FormArray;
  }

  /**
   * Ajoute un nouvel ingrédient
   */
  addIngredient(): void {
    this.ingredients.push(this.creeIngredientControlleur());
  }

  /**
   * Supprime un ingrédient
   */
  retirerIngredient(index: number): void {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  /**
   * Ajoute une nouvelle étape
   */
  addEtape(): void {
    this.etapes.push(this.creeEtapeControlleur());
  }

  /**
   * Supprime une étape
   */
  retirerEtape(index: number): void {
    if (this.etapes.length > 1) {
      this.etapes.removeAt(index);
    }
  }

  /**
   * Vérifie si un champ a une erreur spécifique
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.recetteForm.get(fieldName);
    return field ? field.hasError(errorType) && (field.dirty || field.touched) : false;
  }

  /**
   * Vérifie si un champ de FormArray a une erreur
   */
  hasArrayError(arrayName: string, index: number, errorType: string): boolean {
    const array = this.recetteForm.get(arrayName) as FormArray;
    const field = array.at(index).get('value');
    return field ? field.hasError(errorType) && (field.dirty || field.touched) : false;
  }

  /**
   * Soumission du formulaire
   */
  onSubmit(): void {
    if (this.recetteForm.valid) {
      this.loading = true;

      const formValue = this.recetteForm.value;
      const recetteDonnees = {
        titre: formValue.titre,
        image: formValue.image,
        duree: formValue.duree,
        difficulte: formValue.difficulte,
        categorie: formValue.categorie,
        ingredients: formValue.ingredients.map((ing: any) => ing.value),
        etapes: formValue.etapes.map((step: any) => step.value)
      };

      try {
        if (this.isEditMode && this.recetteId) {
          this.recetteService.updateRecette(this.recetteId, recetteDonnees);
        } else {
          this.recetteService.addRecette(recetteDonnees);
        }

        this.router.navigate(['/']);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        alert('Une erreur est survenue lors de la sauvegarde.');
      } finally {
        this.loading = false;
      }
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      this.marquerFormulaireGroupeTouchee(this.recetteForm);
    }
  }

  /**
   * Marque tous les champs du formulaire comme touchés
   */
  private marquerFormulaireGroupeTouchee(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.marquerFormulaireGroupeTouchee(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.marquerFormulaireGroupeTouchee(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      } else {
        control?.markAsTouched();
      }
    });
  }

  /**
   * Annule et retourne à la liste
   */
  cancel(): void {
    this.router.navigate(['/']);
  }
}
