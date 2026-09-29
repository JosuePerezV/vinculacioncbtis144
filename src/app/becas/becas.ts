import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-becas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './becas.html',
  styleUrl: './becas.css'
})
export class Becas {
  // Iniciamos en la pestaña principal de becas
  tabActiva: string = 'becas';

  cambiarTab(nuevaTab: string) {
    this.tabActiva = nuevaTab;
  }
}