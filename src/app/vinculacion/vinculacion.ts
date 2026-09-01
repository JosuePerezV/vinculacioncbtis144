import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-vinculacion',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // Activamos las herramientas
  templateUrl: './vinculacion.html',
  styleUrl: './vinculacion.css'
})
export class Vinculacion { }