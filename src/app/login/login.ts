import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PanelProfile } from '../core/session';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly router = inject(Router);
  private readonly session = inject(PanelProfile);
  username = '';
  password = '';
  error = '';
  submit(form: NgForm) {
    if (form.invalid || !this.username.trim() || !this.password.trim()) {
      form.control.markAllAsTouched();
      this.error = 'Ingresa tu correo y tu contraseña.';
      return;
    }
    if (!this.session.login(this.username, this.password)) {
      this.error = 'Correo o contraseña incorrectos.';
      this.password = '';
      return;
    }
    this.password = '';
    void this.router.navigateByUrl('/vinculacion/resumen');
  }
}
