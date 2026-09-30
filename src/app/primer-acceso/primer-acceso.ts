import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-primer-acceso',
  imports: [RouterLink],
  template: '<a class="btn" routerLink="/login">Iniciar sesión</a>',
})
export class PrimerAcceso {}
