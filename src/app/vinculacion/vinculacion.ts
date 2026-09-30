import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PanelProfile } from '../core/session';
import { FormsModule, NgForm } from '@angular/forms';
import { Modal } from '../shared/modal';
import { navigation } from '../core/navigation';
@Component({
  selector: 'app-vinculacion',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, Modal],
  templateUrl: './vinculacion.html',
  styleUrl: './vinculacion.css',
})
export class Vinculacion {
  readonly session = inject(PanelProfile);
  private router = inject(Router);
  readonly links = navigation;
  readonly profileOpen = signal(false);
  readonly profileError = signal('');
  readonly profileMessage = signal('');
  profileDraft = { ...this.session.profile() };
  openProfile() {
    this.profileDraft = { ...this.session.profile() };
    this.profileError.set('');
    this.profileMessage.set('');
    this.profileOpen.set(true);
  }
  saveProfile(form: NgForm) {
    if (form.invalid || !this.profileDraft.name.trim()) {
      form.control.markAllAsTouched();
      this.profileError.set('Escribe tu nombre y un correo válido.');
      this.profileMessage.set('');
      return;
    }
    this.session.updateProfile(this.profileDraft);
    this.profileError.set('');
    this.profileMessage.set('Datos actualizados.');
  }
  readonly menuOpen = signal(false);
  closeMenu() {
    this.menuOpen.set(false);
  }
  logout() {
    this.profileOpen.set(false);
    this.closeMenu();
    this.session.logout();
    void this.router.navigateByUrl('/login');
  }
}
