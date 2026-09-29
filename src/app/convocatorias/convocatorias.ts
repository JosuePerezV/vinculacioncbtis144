import { Component } from '@angular/core';
import { ModuleOverview } from '../shared/module-overview';
@Component({
  selector: 'app-convocatorias',
  imports: [ModuleOverview],
  template: `<app-module-overview
    title="Convocatorias"
    description="Publicaciones dirigidas a públicos específicos y seguimiento de solicitudes."
    [sections]="sections"
  />`,
})
export class Convocatorias {
  readonly sections = [
    {
      title: 'Publicación',
      description: 'Destinatarios, requisitos y periodo de postulación.',
    },
    {
      title: 'Solicitantes',
      description: 'Consulta y revisión por convocatoria.',
    },
    {
      title: 'Historial',
      description:
        'Consulta las convocatorias y su periodo de recepción de solicitudes.',
    },
  ];
}
