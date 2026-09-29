import { Injectable, signal } from '@angular/core';
import { localDate, relativeDate, schoolContext } from './calendar';
export type ReviewStatus =
  'Pendiente' | 'Entregado' | 'En revisión' | 'Requiere corrección' | 'Aprobado';
export interface Delivery {
  file: File;
  at: string;
}
export interface Requirement {
  id: string;
  name: string;
  opens: string;
  closes: string;
  status: ReviewStatus;
  exception?: { until: string; reason: string };
  deliveries: Delivery[];
  history: { at: string; text: string }[];
}
export interface PracticeInput {
  name: string;
  control: string;
  birth: string;
  email: string;
  phone: string;
  address: string;
  career: string;
  semester: string;
  group: string;
  shift: string;
  cycle: string;
  period: string;
  company: string;
  sector: string;
  companyAddress: string;
  supervisor: string;
  supervisorRole: string;
  program: string;
  area: string;
  days: string;
  schedule: string;
  hours: number;
  start: string;
  end: string;
  tutor: string;
  tutorPhone: string;
}
export interface Practice extends PracticeInput {
  id: string;
  status: 'En curso' | 'Solicitud';
  requirements: Requirement[];
}
export const requirementNames = [
  'Solicitud',
  'Autorización del tutor',
  'Programa de prácticas',
  'Carta de presentación',
  'Carta de aceptación',
  'Primer reporte mensual',
  'Segundo reporte mensual',
  'Tercer reporte mensual',
  'Informe final',
  'Carta de agradecimiento',
  'Carta de terminación',
];
export function blankPractice(): PracticeInput {
  const context = schoolContext();
  return {
    name: '',
    control: '',
    birth: '',
    email: '',
    phone: '',
    address: '',
    career: '',
    semester: '6',
    group: '',
    shift: 'Matutino',
    cycle: context.cycle,
    period: context.period,
    company: '',
    sector: 'Público',
    companyAddress: '',
    supervisor: '',
    supervisorRole: '',
    program: '',
    area: '',
    days: 'Lunes a viernes',
    schedule: '',
    hours: 240,
    start: localDate(),
    end: relativeDate(90),
    tutor: '',
    tutorPhone: '',
  };
}
function requirements(): Requirement[] {
  return requirementNames.map((name, index) => ({
    id: `${index + 1}`,
    name,
    opens: relativeDate(-14),
    closes: relativeDate(index < 5 ? 7 : (index - 4) * 20),
    status: 'Pendiente',
    deliveries: [],
    history: [],
  }));
}
@Injectable({ providedIn: 'root' })
export class PracticesStore {
  readonly records = signal<Practice[]>([
    {
      ...blankPractice(),
      id: 'exp-1',
      name: 'Lucía Hernández',
      control: '001',
      birth: `${new Date().getFullYear() - 18}-01-15`,
      email: 'lucia@example.test',
      phone: '0000000000',
      address: 'Sin domicilio registrado',
      career: 'Ofimática',
      group: 'A',
      company: 'Centro de formación',
      companyAddress: 'Dirección de ejemplo',
      supervisor: 'Responsable Ejemplo',
      supervisorRole: 'Coordinación',
      program: 'Apoyo administrativo',
      area: 'Administración',
      schedule: '14:00 a 18:00',
      tutor: 'Tutor de ejemplo',
      tutorPhone: '0000000000',
      status: 'En curso',
      requirements: requirements(),
    },
    {
      ...blankPractice(),
      id: 'exp-2',
      name: 'Diego Martínez',
      control: '002',
      birth: `${new Date().getFullYear() - 19}-03-12`,
      email: 'diego@example.test',
      career: 'Programación',
      group: 'B',
      company: 'Laboratorio de programación',
      program: 'Apoyo digital',
      area: 'Sistemas',
      supervisor: 'Asesor de prácticas',
      schedule: '09:00 a 13:00',
      status: 'Solicitud',
      requirements: requirements(),
    },
  ]);
  create(input: PracticeInput) {
    const record: Practice = {
      ...input,
      name: input.name.trim(),
      control: input.control.trim(),
      id: crypto.randomUUID(),
      status: 'Solicitud',
      requirements: requirements(),
    };
    this.records.update((list) => [record, ...list]);
    return record;
  }
  private change(
    practiceId: string,
    requirementId: string,
    update: (r: Requirement) => Requirement,
  ) {
    this.records.update((list) =>
      list.map((p) =>
        p.id !== practiceId
          ? p
          : {
              ...p,
              requirements: p.requirements.map((r) => (r.id === requirementId ? update(r) : r)),
            },
      ),
    );
  }
  canDeliver(r: Requirement) {
    const today = localDate();
    return today >= r.opens && today <= (r.exception?.until || r.closes);
  }
  deliver(practiceId: string, requirementId: string, file: File) {
    const requirement = this.records()
      .find((p) => p.id === practiceId)
      ?.requirements.find((r) => r.id === requirementId);
    if (!requirement || !this.canDeliver(requirement)) return false;
    this.change(practiceId, requirementId, (r) => ({
      ...r,
      status: 'Entregado',
      deliveries: [...r.deliveries, { file, at: new Date().toISOString() }],
      history: [
        ...r.history,
        { at: new Date().toISOString(), text: `Entrega ${r.deliveries.length + 1}: ${file.name}` },
      ],
    }));
    return true;
  }
  review(practiceId: string, requirementId: string, status: ReviewStatus, note: string) {
    const requirement = this.records()
      .find((p) => p.id === practiceId)
      ?.requirements.find((r) => r.id === requirementId);
    if (
      !requirement?.deliveries.length ||
      status === 'Pendiente' ||
      status === 'Entregado' ||
      (status === 'Requiere corrección' && !note.trim())
    )
      return false;
    this.change(practiceId, requirementId, (r) => ({
      ...r,
      status,
      history: [
        ...r.history,
        { at: new Date().toISOString(), text: `${status}${note.trim() ? ': ' + note.trim() : ''}` },
      ],
    }));
    return true;
  }
  calendar(
    practiceId: string,
    requirementId: string,
    opens: string,
    closes: string,
    until: string,
    reason: string,
  ) {
    if (!opens || !closes || opens > closes || (until && (until < closes || !reason.trim())))
      return false;
    this.change(practiceId, requirementId, (r) => ({
      ...r,
      opens,
      closes,
      exception: until ? { until, reason: reason.trim() } : undefined,
      history: [
        ...r.history,
        {
          at: new Date().toISOString(),
          text: `Calendario actualizado: ${opens} a ${closes}${until ? '. Excepción hasta ' + until + ': ' + reason : ''}`,
        },
      ],
    }));
    return true;
  }
}
