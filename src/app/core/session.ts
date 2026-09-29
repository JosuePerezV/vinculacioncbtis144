import { Injectable, signal } from '@angular/core';
// Contexto visual; la autenticación se integrará con el backend.
@Injectable({ providedIn: 'root' })
export class PanelProfile {
  readonly profile = signal({ name: 'Vinculación', email: '' });
}
