import { Component, EventEmitter, Output, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import type { FiltreRecette } from "../../recettes/recettes-module"

/**
 * Composant de barre de filtres avec design harmonisé
 * Permet de filtrer les recettes par différents critères
 * Émet les changements de filtres vers le composant parent
 */
@Component({
  selector: "app-bar-de-filtre",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./bar-de-filtre.html",
  styleUrls: ["./bar-de-filtre.css"],
})
export class BarDeFiltreComponent {
  @Output() filtreChange = new EventEmitter<FiltreRecette>()
  @Input() resultCount = 0

  // Propriétés du filtre
  chercheTerm = ""
  ingredient = ""
  categories = ""
  DureeMax: number | null = null
  difficultees = ""

  // Options pour les select
  categorie = ["", "Entrée", "Plat", "Dessert", "Boisson"]
  difficultes = ["", "Facile", "Moyen", "Difficile"]
  durees = [
    { label: "Toutes", value: null },
    { label: "Moins de 15 min", value: 15 },
    { label: "Moins de 30 min", value: 30 },
    { label: "Moins de 1h", value: 60 },
  ]

  /**
   * Émet les filtres actuels vers le composant parent
   */
  FiltreChange(): void {
    const filtre: FiltreRecette = {
      chercheTerm: this.chercheTerm || undefined,
      ingredient: this.ingredient || undefined,
      categories: this.categories || undefined,
      DureeMax: this.DureeMax || undefined,
      difficultees: this.difficultees || undefined,
    }
    this.filtreChange.emit(filtre)
  }

  /**
   * Remet à zéro tous les filtres
   */
  reinitialiserFiltres(): void {
    this.chercheTerm = ""
    this.ingredient = ""
    this.categories = ""
    this.DureeMax = null
    this.difficultees = ""
    this.FiltreChange()
  }
}
