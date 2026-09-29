import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-primer-acceso',
  imports: [RouterLink],
  template: '<a class="btn" routerLink="/vinculacion/resumen">Ir al panel</a>',
})
export class PrimerAcceso {}
