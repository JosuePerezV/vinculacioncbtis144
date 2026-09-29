import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  blankDocument,
  DocumentDraft,
  DocumentKind,
  DocumentsStore,
  SavedDocument,
} from '../core/documents-store';
import { Modal } from '../shared/modal';
import { PdfPreview, validatePdf } from '../shared/pdf-preview';
@Component({
  selector: 'app-documentos',
  imports: [FormsModule, DatePipe, Modal, PdfPreview],
  templateUrl: './documentos.html',
  styleUrl: './documentos.css',
})
export class Documentos {
  readonly store = inject(DocumentsStore);
  readonly kind = signal<DocumentKind>('oficio');
  readonly search = signal('');
  readonly page = signal(1);
  readonly editor = signal(false);
  readonly preview = signal(false);
  readonly templatesOpen = signal(false);
  readonly pdf = signal<File | null>(null);
  readonly selectedRecord = signal<SavedDocument | null>(null);
  readonly message = signal('');
  readonly error = signal('');
  readonly reading = signal(false);
  readonly kinds: { id: DocumentKind; label: string }[] = [
    { id: 'oficio', label: 'Oficios' },
    { id: 'circular', label: 'Circulares' },
    { id: 'constancia', label: 'Constancias' },
  ];
  draft: DocumentDraft = blankDocument('oficio');
  readonly filtered = computed(() =>
    this.store
      .records()
      .filter(
        (d) =>
          d.kind === this.kind() &&
          `${d.folio} ${d.subject} ${d.recipient}`
            .toLocaleLowerCase('es')
            .includes(this.search().toLocaleLowerCase('es')),
      ),
  );
  readonly pages = computed(() => Math.max(1, Math.ceil(this.filtered().length / 6)));
  readonly rows = computed(() => this.filtered().slice((this.page() - 1) * 6, this.page() * 6));
  label(kind: DocumentKind) {
    return kind === 'oficio' ? 'Oficio' : kind === 'circular' ? 'Circular' : 'Constancia';
  }
  switchKind(kind: DocumentKind) {
    this.kind.set(kind);
    this.page.set(1);
    this.search.set('');
    this.message.set('');
  }
  open(record?: SavedDocument) {
    if (record) {
      const { revisions, attachment, ...draft } = record;
      this.draft = { ...draft };
    } else {
      this.draft = blankDocument(this.kind());
    }
    this.error.set('');
    this.preview.set(false);
    this.editor.set(true);
  }
  closeEditor() {
    this.editor.set(false);
    this.preview.set(false);
    this.error.set('');
  }
  validate(form?: NgForm) {
    if (
      form?.invalid ||
      !this.draft.subject.trim() ||
      !this.draft.recipient.trim() ||
      !this.draft.body.trim() ||
      !this.draft.signer.trim() ||
      !this.draft.signerRole.trim() ||
      !this.draft.location.trim() ||
      !this.draft.date ||
      (this.draft.kind === 'constancia' && !this.draft.activity.trim())
    ) {
      form?.control.markAllAsTouched();
      this.error.set('Completa los campos obligatorios, incluidos el cuerpo y los datos de firma.');
      return false;
    }
    this.error.set('');
    return true;
  }
  showPreview(form: NgForm) {
    if (this.validate(form)) this.preview.set(true);
  }
  save(form?: NgForm) {
    if (!this.validate(form)) return;
    const saved = this.store.save(this.draft);
    this.closeEditor();
    this.search.set('');
    this.page.set(1);
    this.message.set(
      `${this.label(saved.kind)} guardado como borrador. Versión ${saved.revisions.length}.`,
    );
  }
  async selectTemplate(event: Event) {
    const input = event.target as HTMLInputElement,
      file = input.files?.[0];
    if (!file) return;
    this.error.set('');
    this.reading.set(true);
    try {
      if (!file.name.toLowerCase().endsWith('.docx') || file.size > 10 * 1024 * 1024) {
        this.error.set('Selecciona una plantilla .docx de hasta 10 MB.');
        return;
      }
      const signature = new Uint8Array(await file.slice(0, 4).arrayBuffer());
      if (signature[0] !== 0x50 || signature[1] !== 0x4b) {
        this.error.set('El archivo no tiene el formato esperado de un DOCX.');
        return;
      }
      this.store.templates.update((list) => [
        ...list.filter((t) => !(t.name === file.name && t.kind === this.kind())),
        { name: file.name, kind: this.kind(), file },
      ]);
      this.message.set('Plantilla de referencia seleccionada.');
    } catch {
      this.error.set('No se pudo leer el archivo. Vuelve a seleccionarlo.');
    } finally {
      this.reading.set(false);
      input.value = '';
    }
  }
  async attachPdf(event: Event, record: SavedDocument) {
    const input = event.target as HTMLInputElement,
      file = input.files?.[0];
    if (!file) return;
    this.error.set('');
    this.reading.set(true);
    try {
      const error = await validatePdf(file);
      if (error) {
        this.error.set(error);
        return;
      }
      this.store.attach(record.id, file);
      this.message.set('PDF adjuntado.');
    } catch {
      this.error.set('No se pudo leer el PDF.');
    } finally {
      this.reading.set(false);
      input.value = '';
    }
  }
}
