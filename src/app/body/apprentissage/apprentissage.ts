import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"

interface Tutorial {
  id: string
  titre: string
  description: string
  niveau: "Débutant" | "Intermédiaire" | "Avancé"
  duree: number
  categorie: string
  image: string
  etapes: number
}

interface Technique {
  id: string
  nom: string
  description: string
  difficultee: "Facile" | "Moyen" | "Difficile"
  categorie: string
  icon: string
}

@Component({
  selector: "app-apprentissage",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./apprentissage.html",
  styleUrls: ["./apprentissage.css"],
})
export class ApprentissageComponent implements OnInit {
  selectedLevel = "Tous"
  selectedCategory = "Toutes"

  levels = ["Tous", "Débutant", "Intermédiaire", "Avancé"]
  categories = ["Toutes", "Bases", "Pâtisserie", "Viandes", "Légumes", "Sauces"]

  tutorials: Tutorial[] = [
    {
      id: "1",
      titre: "Les bases de la cuisine",
      description: "Apprenez les techniques fondamentales pour débuter en cuisine",
      niveau: "Débutant",
      duree: 30,
      categorie: "Bases",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      etapes: 8,
    },
    {
      id: "2",
      titre: "Maîtriser les cuissons",
      description: "Découvrez les différents modes de cuisson et leurs applications",
      niveau: "Intermédiaire",
      duree: 45,
      categorie : "Bases",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      etapes : 12,
    },
    {
      id: "3",
      titre: "Pâtisserie pour débutants",
      description: "Les secrets d'une pâtisserie réussie, étape par étape",
      niveau: "Débutant",
      duree: 60,
      categorie: "Pâtisserie",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
      etapes: 15,
    },
    {
      id: "4",
      titre: "Techniques avancées de découpe",
      description: "Perfectionnez vos techniques de découpe comme un chef",
      niveau: "Avancé",
      duree: 40,
      categorie: "Bases",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      etapes: 10,
    },
    {
      id: "5",
      titre: "Les sauces mères",
      description: "Maîtrisez les 5 sauces mères de la cuisine française",
      niveau: "Intermédiaire",
      duree: 90,
      categorie: "Sauces",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      etapes: 20,
    },
    {
      id: "6",
      titre: "Cuisson parfaite des viandes",
      description: "Apprenez à cuire parfaitement tous types de viandes",
      niveau: "Intermédiaire",
      duree: 50,
      categorie: "Viandes",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      etapes: 14,
    },
  ]

  techniques: Technique[] = [
    {
      id: "1",
      nom: "Brunoise",
      description: "Technique de découpe en très petits dés",
      difficultee: "Moyen",
      categorie: "Découpe",
      icon: "fas fa-cut",
    },
    {
      id: "2",
      nom: "Julienne",
      description: "Découpe en fins bâtonnets",
      difficultee: "Facile",
      categorie: "Découpe",
      icon: "fas fa-cut",
    },
    {
      id: "3",
      nom: "Émulsion",
      description: "Technique pour lier eau et huile",
      difficultee: "Difficile",
      categorie: "Sauces",
      icon: "fas fa-blender",
    },
    {
      id: "4",
      nom: "Saisir",
      description: "Cuisson rapide à haute température",
      difficultee: "Facile",
      categorie: "Cuisson",
      icon: "fas fa-fire",
    },
    {
      id: "5",
      nom: "Confit",
      description: "Cuisson lente dans la graisse",
      difficultee: "Moyen",
      categorie: "Cuisson",
      icon: "fas fa-thermometer-half",
    },
    {
      id: "6",
      nom: "Tempérage chocolat",
      description: "Technique pour travailler le chocolat",
      difficultee: "Difficile",
      categorie: "Pâtisserie",
      icon: "fas fa-candy-cane",
    },
  ]

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeAnimations()
  }

  private initializeAnimations(): void {
    setTimeout(() => {
      const cards = document.querySelectorAll(".tutorial-card, .technique-card")
      cards.forEach((card: Element, index: number) => {
        ;(card as HTMLElement).style.animationDelay = `${index * 0.1}s`
      })
    }, 100)
  }

  get filteredTutorials(): Tutorial[] {
    return this.tutorials.filter((tutorial) => {
      const niveauMatch = this.selectedLevel === "Tous" || tutorial.niveau === this.selectedLevel
      const categorieMatch = this.selectedCategory === "Toutes" || tutorial.categorie === this.selectedCategory
      return niveauMatch && categorieMatch
    })
  }

  get filteredTechniques(): Technique[] {
    return this.techniques.filter((technique) => {
      return this.selectedCategory === "Toutes" || technique.categorie === this.selectedCategory
    })
  }

  getLevelClass(niveau: string): string {
    switch (niveau) {
      case "Débutant":
        return "level-beginner"
      case "Intermédiaire":
        return "level-intermediate"
      case "Avancé":
        return "level-advanced"
      default:
        return ""
    }
  }

  getDifficulteeClass(difficultee: string): string {
    switch (difficultee) {
      case "Facile":
        return "difficulty-easy"
      case "Moyen":
        return "difficulty-medium"
      case "Difficile":
        return "difficulty-hard"
      default:
        return ""
    }
  }

  formatDuration(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min`
    }
    const heures = Math.floor(minutes / 60)
    const minutesRestants = minutes % 60
    return minutesRestants > 0 ? `${heures}h ${minutesRestants}min` : `${heures}h`
  }

  startTutorial(tutorial: Tutorial): void {
    console.log(`Démarrage du tutoriel: ${tutorial.titre}`)
    // Ici on pourrait naviguer vers une page de tutoriel détaillée
  }

  learnTechnique(technique: Technique): void {
    console.log(`Apprentissage de la technique: ${technique.nom}`)
    // Ici on pourrait ouvrir un modal ou naviguer vers une page détaillée
  }

  navigateToRecettes(): void {
    this.router.navigate(["/"])
  }

  navigateToCommunaute(): void {
    this.router.navigate(["/communaute"])
  }
}
