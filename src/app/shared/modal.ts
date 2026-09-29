import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
@Component({
  selector: 'app-modal',
  template: `<dialog #dialog aria-labelledby="modal-heading" (cancel)="cancel($event)">
    <header>
      <h2 id="modal-heading">{{ title }}</h2>
      <button class="btn quiet" type="button" aria-label="Cerrar ventana" (click)="closed.emit()">
        Cerrar ×
      </button>
    </header>
    <ng-content />
  </dialog>`,
  styles: [
    `
      dialog {
        width: min(940px, calc(100% - 28px));
        max-height: 90dvh;
        overflow-y: auto;
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 24px;
        color: var(--ink);
        box-shadow: 0 24px 100px #17251d40;
      }
      dialog::backdrop {
        background: #17251d99;
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 20px;
      }
      h2 {
        margin: 0;
      }
      @media (max-width: 600px) {
        dialog {
          padding: 16px;
        }
      }
    `,
  ],
})
export class Modal implements AfterViewInit, OnDestroy {
  @Input() title = '';
  @Output() closed = new EventEmitter<void>();
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  private originalOverflow = '';
  ngAfterViewInit() {
    this.originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.dialog.nativeElement.showModal();
  }
  cancel(event: Event) {
    event.preventDefault();
    this.closed.emit();
  }
  ngOnDestroy() {
    this.dialog.nativeElement.close();
    document.body.style.overflow = this.originalOverflow;
  }
}
