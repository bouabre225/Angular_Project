import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from "../services/auth"
import type { LoginCredentials } from "../user/user-module"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./login.html",
  styleUrls: ["./login.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loading = false
  errorMessage = ""
  showPassword = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.createForm()
  }

  ngOnInit(): void {
    // Si l'utilisateur est déjà connecté, rediriger vers l'accueil
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/"])
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true
      this.errorMessage = ""

      const credentials: LoginCredentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }

      this.authService.login(credentials).subscribe({
        next: (response: { user: { username: string } }) => {
          console.log("Connexion réussie:", response.user.username)
          this.router.navigate(["/"])
        },
        error: (error: any) => {
          this.errorMessage = error.message || "Erreur de connexion"
          this.loading = false
        },
        complete: () => {
          this.loading = false
        },
      })
    } else {
      this.markFormGroupTouched()
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.loginForm.get(fieldName)
    return field ? field.hasError(errorType) && (field.dirty || field.touched) : false
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key)
      control?.markAsTouched()
    })
  }

  // Méthode pour remplir automatiquement avec les identifiants de démo
  fillDemoCredentials(): void {
    this.loginForm.patchValue({
      email: "demo@recettes.com",
      password: "password123",
    })
  }
}
