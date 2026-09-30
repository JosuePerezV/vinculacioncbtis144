import { Injectable, inject, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}
// Adaptador temporal del frontend. Sustituir login/profile por la API al integrar.
// Las credenciales incluidas en el cliente no proporcionan seguridad real.
@Injectable({ providedIn: 'root' })
export class PanelProfile {
  readonly profile = signal<UserProfile>({
    name: 'Vinculador',
    email: 'vinculacion@cbtis144.local',
    phone: '',
  });
  readonly signedIn = signal(false);
  login(email: string, password: string) {
    const valid =
      email.trim().toLowerCase() === this.profile().email.toLowerCase() &&
      password === 'Cbtis144!2026';
    this.signedIn.set(valid);
    return valid;
  }
  updateProfile(input: UserProfile) {
    this.profile.set({
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
    });
  }
  logout() {
    this.signedIn.set(false);
  }
}
export const panelGuard: CanActivateFn = () =>
  inject(PanelProfile).signedIn() || inject(Router).createUrlTree(['/login']);
