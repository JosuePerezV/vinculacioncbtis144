import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly router = inject(Router);
  username = '';
  password = '';
  error = '';
  submit(form: NgForm) {
    if (form.invalid || !this.username.trim() || !this.password.trim()) {
      form.control.markAllAsTouched();
      this.error = 'Ingresa tu email o matrícula y tu contraseña.';
      return;
    }
    // Recorrido de interfaz: reemplazar por autenticación del servidor al integrar.
    // No almacenar ni transmitir las credenciales desde esta versión del frontend.
    this.password = '';
    void this.router.navigateByUrl('/vinculacion/resumen');
  }
}
