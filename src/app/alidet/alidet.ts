import { Component } from '@angular/core';
import { ModuleOverview } from '../shared/module-overview';
@Component({
  selector: 'app-alidet',
  imports: [ModuleOverview],
  template: `<app-module-overview
    title="ALIDET"
    description="Integración de la academia y seguimiento de su plan de trabajo."
    [sections]="sections"
  />`,
})
export class Alidet {
  readonly sections = [
    {
      title: 'Academia y nombramientos',
      description: 'Generación, convocatoria, candidatos, reunión y cargos con vigencia.',
    },
    {
      title: 'Actas y plan',
      description: 'Actas de los integrantes y plan de trabajo.',
    },
    {
      title: 'Eventos y clubes',
      description: 'Seminarios, actividades culturales, semana nacional, ciencias y emprendedores.',
    },
    {
      title: 'Concursos',
      description: 'Registro, entrega, participación y pases estatal y nacional.',
    },
  ];
}
