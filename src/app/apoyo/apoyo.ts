import { Component } from '@angular/core';
import { ModuleOverview } from '../shared/module-overview';
@Component({
  selector: 'app-apoyo',
  imports: [ModuleOverview],
  template: `<app-module-overview
    title="Apoyo al departamento"
    description="Organización de eventos y participación de docentes y grupos."
    [sections]="sections"
  />`,
})
export class Apoyo {
  readonly sections = [
    {
      title: 'Eventos',
      description: 'Institución, tipo de evento, lugar y fecha.',
    },
    {
      title: 'Participación docente',
      description: 'Asignación de profesores y registro de las actividades realizadas.',
    },
    {
      title: 'Grupos y asistencia',
      description: 'Semestre, grupo, especialidad y conteos de participantes, mujeres y hombres.',
    },
  ];
}
