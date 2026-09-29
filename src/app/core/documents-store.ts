import { Injectable, signal } from '@angular/core';
import { localDate } from './calendar';
export type DocumentKind = 'oficio' | 'circular' | 'constancia';
export interface DocumentDraft {
  id: string;
  kind: DocumentKind;
  folio: string;
  date: string;
  subject: string;
  recipient: string;
  recipientRole: string;
  signer: string;
  signerRole: string;
  phone: string;
  body: string;
  activity: string;
  location: string;
  template: string;
}
export interface SavedDocument extends DocumentDraft {
  revisions: { date: string; draft: DocumentDraft }[];
  attachment?: File;
}
export function blankDocument(kind: DocumentKind): DocumentDraft {
  return {
    id: '',
    kind,
    folio: '',
    date: localDate(),
    subject: '',
    recipient: '',
    recipientRole: '',
    signer: 'Responsable de vinculación',
    signerRole: 'Vinculación',
    phone: '',
    body: '',
    activity: '',
    location: 'Tuxtla Gutiérrez, Chiapas',
    template: '',
  };
}
@Injectable({ providedIn: 'root' })
export class DocumentsStore {
  readonly records = signal<SavedDocument[]>([]);
  readonly templates = signal<{ name: string; kind: DocumentKind; file: File }[]>([]);
  save(input: DocumentDraft) {
    const old = this.records().find((d) => d.id === input.id);
    const clean = blankDocument(input.kind);
    for (const key of Object.keys(clean) as (keyof DocumentDraft)[]) {
      Object.assign(clean, { [key]: input[key] });
    }
    const draft = {
      ...clean,
      id: input.id || crypto.randomUUID(),
      folio: input.folio.trim() || `BORRADOR-${this.records().length + 1}`,
    };
    const saved: SavedDocument = {
      ...draft,
      attachment: old?.attachment,
      revisions: [
        ...(old?.revisions ?? []),
        { date: new Date().toISOString(), draft: { ...draft } },
      ],
    };
    this.records.update((list) =>
      old ? list.map((d) => (d.id === old.id ? saved : d)) : [saved, ...list],
    );
    return saved;
  }
  attach(id: string, file: File) {
    this.records.update((list) => list.map((d) => (d.id === id ? { ...d, attachment: file } : d)));
  }
}
