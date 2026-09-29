import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  PracticesStore,
  PracticeInput,
  Requirement,
  ReviewStatus,
  blankPractice,
} from '../core/practices-store';
import { ageFromDate, localDate } from '../core/calendar';
import { Modal } from '../shared/modal';
import { PdfPreview, validatePdf } from '../shared/pdf-preview';
@Component({
  selector: 'app-practicas',
  imports: [FormsModule, DatePipe, Modal, PdfPreview],
  templateUrl: './practicas.html',
  styleUrl: './practicas.css',
})
export class Practicas {
  readonly store = inject(PracticesStore);
  readonly search = signal('');
  readonly status = signal('');
  readonly page = signal(1);
  readonly selectedId = signal('');
  readonly activeTab = signal('resumen');
  readonly newOpen = signal(false);
  readonly step = signal(0);
  readonly requirementId = signal('');
  readonly mode = signal<'file' | 'calendar'>('file');
  readonly pdf = signal<File | null>(null);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly message = signal('');
  readonly filtered = computed(() =>
    this.store
      .records()
      .filter(
        (p) =>
          (!this.status() || p.status === this.status()) &&
          `${p.name} ${p.control} ${p.company} ${p.career}`
            .toLocaleLowerCase('es')
            .includes(this.search().toLocaleLowerCase('es')),
      ),
  );
  readonly pages = computed(() => Math.max(1, Math.ceil(this.filtered().length / 6)));
  readonly rows = computed(() => this.filtered().slice((this.page() - 1) * 6, this.page() * 6));
  readonly selected = computed(() => this.store.records().find((p) => p.id === this.selectedId()));
  readonly requirement = computed(() =>
    this.selected()?.requirements.find((r) => r.id === this.requirementId()),
  );
  readonly steps = [
    'Estudiante',
    'Inscripción académica',
    'Institución y programa',
    'Tutor y confirmación',
  ];
  readonly today = localDate();
  readonly age = ageFromDate;
  form: PracticeInput = blankPractice();
  confirmed = false;
  note = '';
  reviewStatus: ReviewStatus = 'En revisión';
  opens = '';
  closes = '';
  until = '';
  reason = '';
  openNew() {
    this.form = blankPractice();
    this.step.set(0);
    this.confirmed = false;
    this.error.set('');
    this.newOpen.set(true);
  }
  openDetail(id: string) {
    this.selectedId.set(id);
    this.activeTab.set('resumen');
    this.message.set('');
  }
  back() {
    this.selectedId.set('');
    this.message.set('');
  }
  progress(requirements: Requirement[]) {
    return requirements.filter((r) => r.status === 'Aprobado').length;
  }
  deadline(r: Requirement) {
    return r.exception?.until || r.closes;
  }
  dateState(r: Requirement) {
    return this.today < r.opens
      ? 'Aún no abre'
      : this.today > this.deadline(r)
        ? 'Plazo cerrado'
        : 'Entrega abierta';
  }
  submit(form: NgForm) {
    this.error.set('');
    if (form.invalid) {
      form.control.markAllAsTouched();
      this.error.set('Completa los campos obligatorios con información válida.');
      return;
    }
    if (
      this.step() === 0 &&
      (this.form.birth > this.today || !this.form.name.trim() || !this.form.control.trim())
    ) {
      this.error.set('Revisa el nombre, número de control y fecha de nacimiento.');
      return;
    }
    if (
      this.step() === 0 &&
      this.store
        .records()
        .some(
          (p) =>
            p.control.toLowerCase() === this.form.control.trim().toLowerCase() &&
            p.cycle === this.form.cycle &&
            p.period === this.form.period,
        )
    ) {
      this.error.set('Ya hay un expediente con ese número de control en este ciclo y periodo.');
      return;
    }
    if (this.step() === 1 && !/^\d{4}-\d{4}$/.test(this.form.cycle)) {
      this.error.set('Escribe el ciclo con formato AAAA-AAAA.');
      return;
    }
    if (this.step() === 1) {
      const [a, b] = this.form.cycle.split('-').map(Number);
      if (b !== a + 1) {
        this.error.set('El año final del ciclo debe ser el siguiente al inicial.');
        return;
      }
    }
    if (this.step() === 2 && this.form.end < this.form.start) {
      this.error.set('La terminación debe ser igual o posterior al inicio.');
      return;
    }
    if (this.step() < 3) {
      this.step.update((s) => s + 1);
      return;
    }
    if (!this.confirmed) {
      this.error.set('Confirma que has revisado los datos antes de crear el expediente.');
      return;
    }
    if (
      this.store
        .records()
        .some(
          (p) =>
            p.control.toLowerCase() === this.form.control.trim().toLowerCase() &&
            p.cycle === this.form.cycle &&
            p.period === this.form.period,
        )
    ) {
      this.error.set('Ya existe el expediente para este alumno, ciclo y periodo.');
      return;
    }
    const result = this.store.create(this.form);
    this.newOpen.set(false);
    this.selectedId.set(result.id);
    this.activeTab.set('resumen');
    this.message.set('Solicitud creada. Los requisitos siguen pendientes de entrega y revisión.');
  }
  manage(r: Requirement, mode: 'file' | 'calendar') {
    this.requirementId.set(r.id);
    this.mode.set(mode);
    this.error.set('');
    this.note = '';
    this.reviewStatus = 'En revisión';
    this.opens = r.opens;
    this.closes = r.closes;
    this.until = r.exception?.until || '';
    this.reason = r.exception?.reason || '';
  }
  closeRequirement() {
    this.requirementId.set('');
    this.pdf.set(null);
    this.error.set('');
  }
  async upload(event: Event) {
    const input = event.target as HTMLInputElement,
      file = input.files?.[0];
    if (!file) return;
    const practiceId = this.selectedId(),
      requirementId = this.requirementId();
    this.error.set('');
    this.loading.set(true);
    try {
      const error = await validatePdf(file);
      if (error) {
        this.error.set(error);
        return;
      }
      if (!this.store.deliver(practiceId, requirementId, file)) {
        this.error.set('El plazo está cerrado o aún no abre. Configura una excepción autorizada.');
        return;
      }
      this.message.set('PDF entregado. Pendiente de revisión.');
    } catch {
      this.error.set('No se pudo leer el PDF. Inténtalo de nuevo.');
    } finally {
      this.loading.set(false);
      input.value = '';
    }
  }
  review() {
    if (!this.store.review(this.selectedId(), this.requirementId(), this.reviewStatus, this.note)) {
      this.error.set(
        'Primero adjunta un PDF. Para solicitar corrección debes escribir una observación.',
      );
      return;
    }
    this.error.set('');
    this.note = '';
    this.message.set('Revisión registrada en el historial del requisito.');
  }
  saveCalendar() {
    if (
      !this.store.calendar(
        this.selectedId(),
        this.requirementId(),
        this.opens,
        this.closes,
        this.until,
        this.reason,
      )
    ) {
      this.error.set(
        'Revisa el orden de las fechas. La excepción necesita una justificación y no puede terminar antes del cierre ordinario.',
      );
      return;
    }
    this.closeRequirement();
    this.message.set('Calendario actualizado para este alumno.');
  }
}
