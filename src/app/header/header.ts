import { Component, type AfterViewInit } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  templateUrl: "./header.html",
  styleUrls: ["./header.css"],
})
export class Header implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.animateHeaderBoxes()
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
}
