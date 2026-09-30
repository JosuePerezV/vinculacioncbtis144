import { Routes } from '@angular/router';
import { panelGuard } from './core/session';
import { Inicio } from './inicio/inicio';

export const routes: Routes = [
  { path: '', component: Inicio, title: 'SiVi · Vinculación DGETI' },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
    title: 'Iniciar sesión · SiVi',
  },
  { path: 'primer-acceso', pathMatch: 'full', redirectTo: 'vinculacion/resumen' },
  {
    path: 'vinculacion',
    canActivate: [panelGuard],
    canActivateChild: [panelGuard],
    loadComponent: () => import('./vinculacion/vinculacion').then((m) => m.Vinculacion),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'resumen' },
      {
        path: 'resumen',
        loadComponent: () => import('./resumen/resumen').then((m) => m.Resumen),
        title: 'Inicio del panel · SiVi',
      },
      {
        path: 'documentos',
        loadComponent: () => import('./documentos/documentos').then((m) => m.Documentos),
        title: 'Documentos · SiVi',
      },
      {
        path: 'practicas',
        loadComponent: () => import('./practicas/practicas').then((m) => m.Practicas),
        title: 'Prácticas · SiVi',
      },
      {
        path: 'servicio-social',
        loadComponent: () =>
          import('./servicio-social/servicio-social').then((m) => m.ServicioSocial),
        title: 'Servicio social · SiVi',
      },
      {
        path: 'becas',
        loadComponent: () => import('./becas/becas').then((m) => m.Becas),
        title: 'Becas · SiVi',
      },
      {
        path: 'colaboracion',
        loadComponent: () => import('./colaboracion/colaboracion').then((m) => m.Colaboracion),
        title: 'Colaboración · SiVi',
      },
      {
        path: 'directorio',
        loadComponent: () => import('./directorio/directorio').then((m) => m.Directorio),
        title: 'Directorio · SiVi',
      },
      {
        path: 'educacion-dual',
        loadComponent: () => import('./educacion-dual/educacion-dual').then((m) => m.EducacionDual),
        title: 'Educación dual · SiVi',
      },
      {
        path: 'bolsa-trabajo',
        loadComponent: () => import('./bolsa-trabajo/bolsa-trabajo').then((m) => m.BolsaTrabajo),
        title: 'Bolsa de trabajo · SiVi',
      },
      {
        path: 'egresados',
        loadComponent: () => import('./egresados/egresados').then((m) => m.Egresados),
        title: 'Egresados · SiVi',
      },
      {
        path: 'convocatorias',
        loadComponent: () => import('./convocatorias/convocatorias').then((m) => m.Convocatorias),
        title: 'Convocatorias · SiVi',
      },
      {
        path: 'apoyo',
        loadComponent: () => import('./apoyo/apoyo').then((m) => m.Apoyo),
        title: 'Apoyo · SiVi',
      },
      {
        path: 'visitas',
        loadComponent: () => import('./visitas/visitas').then((m) => m.Visitas),
        title: 'Visitas · SiVi',
      },
      {
        path: 'alidet',
        loadComponent: () => import('./alidet/alidet').then((m) => m.Alidet),
        title: 'ALIDET · SiVi',
      },
      {
        path: 'comite',
        loadComponent: () => import('./comite/comite').then((m) => m.Comite),
        title: 'Comité vinculador · SiVi',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./no-encontrado/no-encontrado').then((m) => m.NoEncontrado),
    title: 'Página no encontrada · SiVi',
  },
];
