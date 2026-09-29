import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PanelProfile } from '../core/session';
import { schoolContext } from '../core/calendar';
import { navigation } from '../core/navigation';
@Component({
  selector: 'app-vinculacion',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './vinculacion.html',
  styleUrl: './vinculacion.css',
})
export class Vinculacion {
  readonly session = inject(PanelProfile);
  private router = inject(Router);
  readonly links = navigation;
  readonly context = schoolContext();
  readonly menuOpen = signal(false);
  closeMenu() {
    this.menuOpen.set(false);
  }
  logout() {
    this.closeMenu();
    void this.router.navigateByUrl('/');
  }
}
