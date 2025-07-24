import { Component, type AfterViewInit, type OnInit, type OnDestroy, Inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, Router } from "@angular/router"
import { Subject, takeUntil } from "rxjs"
import { AuthService } from "../auth/services/auth"
import type { User } from "../auth/user/user-module"


@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./header.html",
  styleUrls: ["./header.css"],
})
export class Header implements AfterViewInit, OnInit, OnDestroy {
  currentUser: User | null = null
  isAuthenticated = false
  showUserMenu = false
  private destroy$ = new Subject<void>()

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // S'abonner aux changements d'authentification
    this.authService.isAuthenticated$.pipe(takeUntil(this.destroy$)).subscribe((isAuth) => {
      this.isAuthenticated = isAuth
    })

    // S'abonner aux changements d'utilisateur
    this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.currentUser = user
    })
  }

  ngAfterViewInit(): void {
    this.animateHeaderBoxes()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private animateHeaderBoxes(): void {
    const headerBoxes = document.querySelectorAll(".header-box")

    headerBoxes.forEach((box: Element, index: number) => {
      ;(box as HTMLElement).style.animationDelay = `${index * 0.2}s`
    })
  }

  navigateToRecettes(): void {
    this.router.navigate(["/"])
  }

  navigateToApprentissage(): void {
    this.router.navigate(["/apprentissage"])
  }

  navigateToCommunaute(): void {
    this.router.navigate(["/communaute"])
  }

  navigateToLogin(): void {
    this.router.navigate(["/auth/login"])
  }

  navigateToRegister(): void {
    this.router.navigate(["/auth/register"])
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu
  }

  closeUserMenu(): void {
    this.showUserMenu = false
  }

  logout(): void {
    this.authService.logout()
    this.showUserMenu = false
    this.router.navigate(["/"])
  }

  // Fermer le menu utilisateur quand on clique ailleurs
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement
    if (!target.closest(".user-menu-container")) {
      this.showUserMenu = false
    }
  }
}
