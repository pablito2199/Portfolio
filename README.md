# Portfolio React

Portfolio personal construido con React y Create React App.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm start
```

La aplicación se abrirá en `http://localhost:3000`.

## Compilación para producción

```bash
npm run build
```

La versión optimizada se genera en la carpeta `build/`.

## Despliegue en Vercel

El proyecto incluye [vercel.json](./vercel.json) con la configuración de producción:

- Instalación: `npm ci`
- Build: `npm run build`
- Directorio publicado: `build/`

Para desplegarlo, importa el repositorio en Vercel y deja que detecte esta configuración. Si lo configuras manualmente en **Settings > Build and Deployment**, usa esos mismos valores. No subas la carpeta `build/` al repositorio: Vercel la genera en cada despliegue.

## Personalización

El contenido editable se encuentra en [src/data.json](./src/data.json). Desde ahí se pueden modificar:

- Datos personales y enlaces.
- Mensajes de la portada.
- Aptitudes.
- Proyectos.
- Experiencia y formación.
- Certificaciones y cursos.

Las imágenes utilizadas por el portfolio están en [public/images](./public/images). Las rutas del JSON deben comenzar por `/images/`.

## Formulario de contacto

El formulario utiliza EmailJS. Si se reutiliza esta plantilla, hay que sustituir en `src/App.js` los identificadores del servicio, plantilla y clave pública por los de la cuenta de EmailJS correspondiente.

## Estructura principal

```text
public/
  images/
src/
  App.js
  data.json
  index.js
  styles.css
package.json
```
