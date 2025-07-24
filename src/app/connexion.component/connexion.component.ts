import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  utilisateur = {
    email: '',
    mot_de_passe: ''
  };

  erreur: string | null = null;

  constructor(private router: Router) {}

  onSubmit() {
    const utilisateurs = JSON.parse(localStorage.getItem('utilisateurs') || '[]');

    const user = utilisateurs.find((u: any) =>
      u.email === this.utilisateur.email &&
      u.mot_de_passe === this.utilisateur.mot_de_passe
    );

    if (user) {
      localStorage.setItem('utilisateurConnecte', JSON.stringify(user));
      this.erreur = null;
      alert('Connexion réussie !');
       this.router.navigate(['/profil']);  // à la place de navigate(['/'])
      //this.router.navigate(['/']); // Redirection vers l'accueil ou dashboard
    } else {
      this.erreur = "Email ou mot de passe incorrect.";
    }
  }
}
