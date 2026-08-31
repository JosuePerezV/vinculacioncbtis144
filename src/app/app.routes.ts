import { Routes } from '@angular/router';
// Importamos solo "Login" en lugar de "LoginComponent"
import { Login } from './login/login'; 

export const routes: Routes = [
  // Usamos "Login" aquí también
  { path: 'login', component: Login }
];