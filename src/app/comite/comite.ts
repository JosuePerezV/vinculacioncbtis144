import { Component } from '@angular/core';
import { ModuleOverview } from '../shared/module-overview';
@Component({
  selector: 'app-comite',
  imports: [ModuleOverview],
  template: `<app-module-overview
    title="Comité vinculador"
    description="Espacio reservado para el proceso del Comité vinculador."
    [sections]="sections"
  />`,
})
export class Comite {
  readonly sections = [
    {
      title: 'Comité vinculador',
      description:
        'Espacio de coordinación del comité de vinculación institucional.',
    },
  ];
}
