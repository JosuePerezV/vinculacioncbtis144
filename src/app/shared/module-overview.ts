import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-module-overview',
  imports: [RouterLink],
  template: `<section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Vinculación / {{ title }}</p>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </div>
    </header>

    <div class="cards section-gap">
      @for (item of sections; track item.title) {
        <article class="panel">
          <h2>{{ item.title }}</h2>
          <p class="muted small">{{ item.description }}</p>
        </article>
      }
    </div>
    <p class="section-gap">
      <a class="btn secondary" routerLink="/vinculacion/resumen">← Volver al inicio del panel</a>
    </p>
  </section>`,
})
export class ModuleOverview {
  @Input() title = '';
  @Input() description = '';
  @Input() sections: { title: string; description: string }[] = [];
}
