import { Component } from '@angular/core';
import { ModuleOverview } from '../shared/module-overview';
@Component({ selector: 'app-servicio-social', imports: [ModuleOverview], template: `<app-module-overview title="Servicio social" description="Seguimiento de expedientes, entregas y revisión por ciclo escolar." [sections]="sections" />` })
export class ServicioSocial {
  readonly sections = [{ title: 'Expedientes', description: 'Datos del estudiante y contexto académico del servicio social.' }, { title: 'Documentación y plazos', description: 'Requisitos, apertura, cierre y excepciones propios de este proceso.' }, { title: 'Revisión', description: 'Entregas, observaciones y seguimiento. Documentación y horas correspondientes al servicio social.' }];
}
