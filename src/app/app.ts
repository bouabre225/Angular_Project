import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { Header } from "./header/header"
import { Footer } from "./footer/footer"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, Header, Footer],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ["./app.css"],
})
export class App {
  title = "Recette_Project"
}
