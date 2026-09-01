import { Component } from '@angular/core';
// 1. Tienes que importar RouterOutlet
import { RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Tienes que meterlo en este arreglo de imports
  imports: [RouterOutlet], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }