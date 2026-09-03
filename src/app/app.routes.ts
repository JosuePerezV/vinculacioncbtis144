import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio'; 
import { Login } from './login/login';
import { Vinculacion } from './vinculacion/vinculacion';
import { Practicas } from './practicas/practicas';
import { ServicioSocial } from './servicio-social/servicio-social';
import { Becas } from './becas/becas';
import { Documentos } from './documentos/documentos';
import { Colaboracion } from './colaboracion/colaboracion';
import { Directorio } from './directorio/directorio'; // 1. Importar Directorio

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'login', component: Login },
  { 
    path: 'vinculacion', 
    component: Vinculacion, 
    children: [
      { path: 'practicas', component: Practicas },
      { path: 'servicio-social', component: ServicioSocial },
      { path: 'becas', component: Becas },
      { path: 'documentos', component: Documentos },
      { path: 'colaboracion', component: Colaboracion },
      { path: 'directorio', component: Directorio } // 2. Registrar la ruta (coincide con tu routerLink)
    ]
  }
];