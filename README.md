# SiVi · Frontend de vinculación DGETI

Primera entrega del frontend en Angular. El backend, la base de datos y la autenticación real se integrarán por separado.

## Ejecutar

Con las dependencias instaladas:

```powershell
node node_modules/@angular/cli/bin/ng.js serve --host 127.0.0.1 --port 4200
node node_modules/@angular/cli/bin/ng.js build
node node_modules/@angular/cli/bin/ng.js test --watch=false
```

Acceso directo: http://localhost:4200/vinculacion/resumen. No se solicita contraseña. La ruta /login conserva el formulario visual original y un enlace directo al panel; /primer-acceso redirige al panel. El formulario valida campos obligatorios y navega sin autenticar: no compara, guarda ni envía contraseñas. Al integrar, sustituir Login.submit por una llamada al servicio de autenticación y añadir las guardas de sesión correspondientes.

## Incluido

- Panel adaptable y navegación a todos los módulos; acceso directo y página 404.
- Documentos: formularios diferenciados para oficios, circulares y constancias, cuerpo editable, vista previa, borradores y versiones, selección local de plantillas DOCX y visor de PDF adjuntos.
- Prácticas: búsqueda y filtros, solicitud por etapas, expediente con ciclo y periodo, once requisitos, entrega local de PDF, revisión, observaciones, corrección y nueva entrega, calendario y excepciones individuales justificadas.
- Estructura inicial de Educación dual, Bolsa de trabajo, Egresados, Convocatorias, Apoyo, Visitas, ALIDET y Comité vinculador. Servicio social muestra sus pendientes. Becas, Colaboración y Directorio conservan sus vistas de muestra con acciones pendientes deshabilitadas.

## Límites e integración

Todos los datos y archivos viven exclusivamente en memoria y se pierden al recargar. No hay llamadas a un backend, envío de correos, guardado persistente ni documentos oficiales generados. La selección de DOCX no interpreta ni aplica su contenido. La constancia tiene estructura provisional pendiente de formato institucional.

Los servicios `src/app/core/session.ts`, `documents-store.ts` y `practices-store.ts` separan el estado de las vistas para facilitar la futura integración. Sus tipos describen los datos usados por el frontend; no constituyen un contrato de API acordado.

Antes de conectar: acordar autenticación y permisos por rol, identificadores y catálogos, historial académico por ciclo/periodo, estados y transiciones de revisión, zona horaria de plazos, almacenamiento de archivos y generación documental. El servidor deberá validar permisos, archivos y reglas de negocio; el acceso actual es libre para construir las vistas.

## Verificación

Las pruebas cubren navegación del menú, acceso directo y redirecciones, historial de borradores, revisión y correcciones de entregas, y bloqueo de plazos con excepciones individuales.


## Publicación del avance

Repositorio: https://github.com/JosuePerezV/vinculacioncbtis144

Sitio: https://josueperezv.github.io/vinculacioncbtis144/

Panel: https://josueperezv.github.io/vinculacioncbtis144/#/vinculacion/resumen

Cada push a main ejecuta las pruebas, compila y publica mediante GitHub Actions. En Settings > Pages, la fuente de publicación debe ser GitHub Actions. La configuración github-pages aplica la ruta base del repositorio y navegación con # para permitir enlaces directos y recargas; ng serve conserva las direcciones locales habituales.

Compilación para Pages: `npm run build -- --configuration production,github-pages`.

El remoto origin corresponde al repositorio del avance. El remoto anterior conserva la referencia a dgeti-sivi y no recibe las publicaciones de este proyecto. Para actualizar el avance: `git push origin main`.
