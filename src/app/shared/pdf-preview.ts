import { Component, Input, OnChanges, OnDestroy, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export async function validatePdf(file: File): Promise<string> {
  if (!file.name.toLowerCase().endsWith('.pdf')) return 'Selecciona un archivo PDF.';
  if (file.size > 10 * 1024 * 1024) return 'El PDF debe pesar como máximo 10 MB.';
  const header = new TextDecoder().decode(await file.slice(0, 5).arrayBuffer());
  return header === '%PDF-' ? '' : 'El archivo no tiene una cabecera PDF válida.';
}
@Component({
  selector: 'app-pdf-preview',
  template: `@if (url) {
    <p class="small muted">{{ file.name }} · Puedes recorrer todas sus páginas en el visor.</p>
    <p>
      <a class="btn secondary" [href]="url" target="_blank" rel="noopener"
        >Abrir PDF en otra pestaña</a
      >
    </p>
    <iframe [src]="safeUrl" title="Vista previa del PDF seleccionado"></iframe>
  }`,
  styles: [
    `
      iframe {
        width: 100%;
        height: 60dvh;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #eee;
      }
    `,
  ],
})
export class PdfPreview implements OnChanges, OnDestroy {
  @Input({ required: true }) file!: File;
  private sanitizer = inject(DomSanitizer);
  url = '';
  safeUrl: SafeResourceUrl | null = null;
  ngOnChanges() {
    this.release();
    this.url = URL.createObjectURL(this.file);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
  private release() {
    if (this.url) URL.revokeObjectURL(this.url);
  }
  ngOnDestroy() {
    this.release();
  }
}
