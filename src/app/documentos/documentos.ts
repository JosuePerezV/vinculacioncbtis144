import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-documentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentos.html',
  styleUrl: './documentos.css'
})
export class Documentos {
  tabActiva: string = 'oficios';
  
  // Variable para el modal de "Nuevo Oficio"
  mostrarModalNuevo: boolean = false; 
  // Variable para el modal de "Subir Plantilla"
  mostrarModalPlantilla: boolean = false;

  cambiarTab(nuevaTab: string) {
    this.tabActiva = nuevaTab;
  }

  // --- Funciones Modal Nuevo ---
  abrirModalNuevo() { this.mostrarModalNuevo = true; }
  cerrarModalNuevo() { this.mostrarModalNuevo = false; }

  // --- Funciones Modal Plantilla ---
  abrirModalPlantilla() { this.mostrarModalPlantilla = true; }
  cerrarModalPlantilla() { this.mostrarModalPlantilla = false; }
  // --- Función para texto dinámico del modal ---
  obtenerTipoDoc() {
    if (this.tabActiva === 'oficios') return 'Oficio';
    if (this.tabActiva === 'circulares') return 'Circular';
    if (this.tabActiva === 'constancias') return 'Constancia';
    return 'Documento';
  }
}