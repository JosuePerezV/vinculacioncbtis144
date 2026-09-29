import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocumentsStore } from '../core/documents-store';
import { PracticesStore } from '../core/practices-store';
import { schoolContext } from '../core/calendar';
@Component({
  selector: 'app-resumen',
  imports: [RouterLink],
  template: `<section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Vinculación / Inicio</p>
        <h1>Un nuevo ciclo, nuevas oportunidades.</h1>
        <p>Organiza los documentos y acompaña cada etapa de las prácticas profesionales.</p>
      </div>
      <span class="badge wine">{{ context.cycle }} / {{ context.period }}</span>
    </header>
    <div class="cards">
      <article class="panel metric">
        <span>Expedientes registrados</span><strong>{{ practices.records().length }}</strong
        ><a routerLink="/vinculacion/practicas">Consultar prácticas →</a>
      </article>
      <article class="panel metric">
        <span>Borradores de documentos</span><strong>{{ documents.records().length }}</strong
        ><a routerLink="/vinculacion/documentos">Ir a documentos →</a>
      </article>
      <article class="panel metric">
        <span>Entregas por revisar</span><strong>{{ pending() }}</strong
        ><a routerLink="/vinculacion/practicas">Revisar expedientes →</a>
      </article>
    </div>
    <div class="grid section-gap">
      <article class="panel">
        <p class="eyebrow">Empieza aquí</p>
        <h2>Del borrador a la vista previa</h2>
        <p class="muted">
          Prepara un oficio o circular con campos propios, revisa su contenido y guarda un borrador.
        </p>
        <a class="btn" routerLink="/vinculacion/documentos">Crear documento</a>
      </article>
      <article class="panel">
        <p class="eyebrow">Seguimiento académico</p>
        <h2>Cada entrega, en su expediente</h2>
        <p class="muted">
          Consulta las once entregas de prácticas, selecciona un PDF y registra su revisión con
          observaciones.
        </p>
        <a class="btn secondary" routerLink="/vinculacion/practicas">Abrir prácticas</a>
      </article>
    </div>
  </section>`,
  styles: [
    `
      .metric {
        display: grid;
        gap: 12px;
      }
      .metric > span {
        color: var(--muted);
        font-size: 0.82rem;
      }
      .metric > strong {
        font-size: 2.8rem;
        font-weight: 650;
        letter-spacing: -0.06em;
      }
      .metric > a {
        font-size: 0.8rem;
        text-decoration: none;
      }
    `,
  ],
})
export class Resumen {
  readonly practices = inject(PracticesStore);
  readonly documents = inject(DocumentsStore);
  readonly context = schoolContext();
  readonly pending = computed(
    () =>
      this.practices
        .records()
        .flatMap((p) => p.requirements)
        .filter((r) => r.status === 'Entregado' || r.status === 'En revisión').length,
  );
}
