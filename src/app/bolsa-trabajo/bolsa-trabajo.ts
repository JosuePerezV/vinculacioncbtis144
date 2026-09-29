import { Component } from '@angular/core';
import { ModuleOverview } from '../shared/module-overview';
@Component({
  selector: 'app-bolsa-trabajo',
  imports: [ModuleOverview],
  template: `<app-module-overview
    title="Bolsa de trabajo"
    description="Oportunidades y postulaciones según la situación académica."
    [sections]="sections"
  />`,
})
export class BolsaTrabajo {
  readonly sections = [
    {
      title: 'Cartera de estudiantes',
      description: 'Vacantes, CV y postulaciones para quienes continúan estudiando.',
    },
    {
      title: 'Bolsa de egresados',
      description: 'Oportunidades para egresados y seguimiento de candidaturas.',
    },
    {
      title: 'Historial',
      description: 'Consulta de solicitantes por ciclo escolar y periodo.',
    },
  ];
}
