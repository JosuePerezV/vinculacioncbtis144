import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio'; // Importamos la nueva vista
import { Login } from './login/login';
import { Vinculacion } from './vinculacion/vinculacion';
import { Practicas } from './practicas/practicas';
import { ServicioSocial } from './servicio-social/servicio-social';

export const routes: Routes = [
  // Ruta por defecto (carga la vista de los estudiantes)
  { path: '', component: Inicio },
  
  // Ruta al Login
  { path: 'login', component: Login },
  
  // Ruta Padre (El cascarón maestro del panel)
  { 
    path: 'vinculacion', 
    component: Vinculacion, 
    children: [
      { path: 'practicas', component: Practicas },
      { path: 'servicio-social', component: ServicioSocial }
    ]
  }
];