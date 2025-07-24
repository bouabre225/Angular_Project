import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"

interface ForumSection {
  id: string
  titre: string
  description: string
  icon: string
  topics: number
  posts: number
  lastPost?: {
    titre: string
    auteur: string
    date: Date
  }
  comingSoon: boolean
}

@Component({
  selector: "app-communaute",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./communaute.html",
  styleUrls: ["./communaute.css"],
})
export class CommunauteComponent implements OnInit {
  forumSections: ForumSection[] = [
    {
      id: "1",
      titre: "Discussions Générales",
      description: "Partagez vos expériences culinaires et posez vos questions",
      icon: "fas fa-comments",
      topics: 0,
      posts: 0,
      comingSoon: true,
    },
    {
      id: "2",
      titre: "Partage de Recettes",
      description: "Partagez vos créations et découvrez celles des autres",
      icon: "fas fa-utensils",
      topics: 0,
      posts: 0,
      comingSoon: true,
    },
    {
      id: "3",
      titre: "Conseils et Astuces",
      description: "Échangez vos meilleurs conseils culinaires",
      icon: "fas fa-lightbulb",
      topics: 0,
      posts: 0,
      comingSoon: true,
    },
    {
      id: "4",
      titre: "Matériel et Équipement",
      description: "Discussions sur les ustensiles et équipements de cuisine",
      icon: "fas fa-tools",
      topics: 0,
      posts: 0,
      comingSoon: true,
    },
    {
      id: "5",
      titre: "Événements Culinaires",
      description: "Organisez et participez à des événements culinaires",
      icon: "fas fa-calendar-alt",
      topics: 0,
      posts: 0,
      comingSoon: true,
    },
    {
      id: "6",
      titre: "Questions des Débutants",
      description: "Un espace bienveillant pour les questions de base",
      icon: "fas fa-question-circle",
      topics: 0,
      posts: 0,
      comingSoon: true,
    },
  ]

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeAnimations()
  }

  private initializeAnimations(): void {
    setTimeout(() => {
      const cards = document.querySelectorAll(".forum-section-card")
      cards.forEach((card: Element, index: number) => {
        ;(card as HTMLElement).style.animationDelay = `${index * 0.1}s`
      })
    }, 100)
  }

  navigateToRecettes(): void {
    this.router.navigate(["/"])
  }

  navigateToApprentissage(): void {
    this.router.navigate(["/apprentissage"])
  }

  openSection(section: ForumSection): void {
    if (section.comingSoon) {
      console.log(`Section "${section.titre}" bientôt disponible !`)
      return
    }
    // Navigation vers la section du forum
    console.log(`Ouverture de la section: ${section.titre}`)
  }
}
