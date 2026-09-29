import { Component } from '@angular/core';
import { ModuleOverview } from '../shared/module-overview';
@Component({
  selector: 'app-egresados',
  imports: [ModuleOverview],
  template: `<app-module-overview
    title="Egresados"
    description="Continuidad de la relación con cada generación."
    [sections]="sections"
  />`,
})
export class Egresados {
  readonly sections = [
    {
      title: 'Generaciones',
      description: 'Consulta de egresados y su historial académico.',
    },
    {
      title: 'Seguimiento',
      description: 'Registro de seguimiento durante dos ciclos escolares.',
    },
    {
      title: 'Comunicaciones',
      description: 'Mensajes e historial de seguimiento.',
    },
  ];
}
