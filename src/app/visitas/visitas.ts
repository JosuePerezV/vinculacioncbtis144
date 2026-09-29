import { Component } from '@angular/core';
import { ModuleOverview } from '../shared/module-overview';
@Component({
  selector: 'app-visitas',
  imports: [ModuleOverview],
  template: `<app-module-overview
    title="Visitas"
    description="Solicitud y revisión de visitas a instituciones y empresas."
    [sections]="sections"
  />`,
})
export class Visitas {
  readonly sections = [
    {
      title: 'Solicitud docente',
      description: 'Registro de la visita y carga del documento de solicitud.',
    },
    {
      title: 'Gestión de oficios',
      description: 'Oficio dirigido a la institución y documento de respuesta.',
    },
    {
      title: 'Revisión',
      description: 'Aceptación o rechazo con observaciones y posibilidad de nueva solicitud.',
    },
  ];
}
