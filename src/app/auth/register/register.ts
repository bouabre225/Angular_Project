import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from "../services/auth"
import type { RegisterData } from "../user/user-module"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./register.html",
  styleUrls: ["./register.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  loading = false
  errorMessage = ""
  showPassword = false
  showConfirmPassword = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.createForm()
  }

  ngOnInit(): void {
    // Si l'utilisateur est déjà connecté, rediriger vers l'accueil
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/"])
    }
  }

  private createForm(): FormGroup {
    return this.fb.group(
      {
        firstName: ["", [Validators.required, Validators.minLength(2)]],
        lastName: ["", [Validators.required, Validators.minLength(2)]],
        username: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
        acceptTerms: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    )
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get("password")
    const confirmPassword = form.get("confirmPassword")

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true })
    } else if (confirmPassword?.hasError("passwordMismatch")) {
      confirmPassword.setErrors(null)
    }

    return null
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true
      this.errorMessage = ""

      const registerData: RegisterData = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword,
      }

      this.authService.register(registerData).subscribe({
        next: (response) => {
          console.log("Inscription réussie:", response.user.username)
          this.router.navigate(["/"])
        },
        error: (error) => {
          this.errorMessage = error.message || "Erreur lors de l'inscription"
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

  togglePasswordVisibility(field: "password" | "confirmPassword"): void {
    if (field === "password") {
      this.showPassword = !this.showPassword
    } else {
      this.showConfirmPassword = !this.showConfirmPassword
    }
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.registerForm.get(fieldName)
    return field ? field.hasError(errorType) && (field.dirty || field.touched) : false
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach((key) => {
      const control = this.registerForm.get(key)
      control?.markAsTouched()
    })
  }
}
