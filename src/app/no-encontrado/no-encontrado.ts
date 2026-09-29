import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-no-encontrado',
  imports: [RouterLink],
  template: `<main class="panel">
    <p class="eyebrow">Página no encontrada · 404</p>
    <h1>Esta dirección no existe</h1>
    <p class="muted">Revisa el enlace o vuelve al inicio para continuar.</p>
    <a class="btn" routerLink="/">Volver al inicio</a>
  </main>`,
  styles: [
    `
      main {
        max-width: 650px;
        margin: 12vh auto;
        padding: 32px;
      }
    `,
  ],
})
export class NoEncontrado {}
