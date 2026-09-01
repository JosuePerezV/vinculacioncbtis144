import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. Importar la herramienta de rutas

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink], // 2. Activarla dentro del componente
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio { }