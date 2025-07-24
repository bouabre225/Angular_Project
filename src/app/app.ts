import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { Header } from "./header/header"
import { Footer } from "./footer/footer"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { ConnexionComponent } from "./connexion.component/connexion.component"
import { InscriptionComponent } from "./inscription.component/inscription.component"
import { BarDeFiltreComponent } from "./components/bar-de-filtre/bar-de-filtre"
import { ListeRecetteComponent } from "./components/liste-recette/liste-recette"
import { DetailsRecetteComponent } from "./components/details-recette/details-recette"
import { RecetteService } from "./services/recettes"


@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, Header, Footer, FormsModule, RouterModule, DetailsRecetteComponent, ConnexionComponent, InscriptionComponent, ListeRecetteComponent, BarDeFiltreComponent],
  template: `
        <router-outlet></router-outlet>
  `,
  styleUrls: ["./app.css"],
})
export class App {
  title = "Recette_Project"
}
