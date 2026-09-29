import { Component } from '@angular/core';
import { ModuleOverview } from '../shared/module-overview';
@Component({
  selector: 'app-educacion-dual',
  imports: [ModuleOverview],
  template: `<app-module-overview
    title="Educación dual"
    description="Formación en empresa con seguimiento académico y validaciones por etapa."
    [sections]="sections"
  />`,
})
export class EducacionDual {
  readonly sections = [
    {
      title: 'Postulaciones',
      description: 'Solicitudes a varias empresas y documentación de preselección.',
    },
    {
      title: 'Validaciones',
      description:
        'Docente, escolares, psicología, tutor, empresa, curso y semana de prueba. Todas deben estar validadas para el alta.',
    },
    {
      title: 'Seguimiento',
      description: 'Historial de altas y bajas, reportes del estudiante y visitas del tutor.',
    },
    {
      title: 'Matriz de actividades',
      description: 'Documento de la empresa actualizado en cada ciclo escolar.',
    },
  ];
}
