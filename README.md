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

El contenido editable se encuentra en los archivos de datos `src/data.json` (castellano por defecto), `src/data_en.json` (inglés), `src/data_de.json` (alemán) y `src/data_gl.json` (gallego). Desde ahí se pueden modificar:

- Datos personales y enlaces.
- Mensajes de la portada.
- Traducciones de la interfaz y del contenido en `src/i18n.js` (castellano, inglés, alemán y gallego).
- Aptitudes.
- Proyectos.
- Experiencia y formación.
- Certificaciones y cursos.

Las imágenes utilizadas por el portfolio están en [public/images](./public/images). Las rutas del JSON deben comenzar por `/images/`.

## Idiomas

El portfolio está disponible en cuatro idiomas: castellano (por defecto), inglés, alemán y gallego. El idioma se puede cambiar desde el selector del header. La selección se conserva en el navegador y los nombres propios, entidades, tecnologías, enlaces y títulos públicos se mantienen sin traducir.

Cada idioma utiliza su propio archivo de datos:

| Archivo            | Idioma                |
| ------------------ | --------------------- |
| `src/data_de.json` | Deutsch               |
| `src/data_en.json` | English               |
| `src/data.json`    | Español (por defecto) |
| `src/data_gl.json` | Galego                |

## Formulario de contacto

El formulario utiliza EmailJS. Si se reutiliza esta plantilla, hay que sustituir en `src/App.js` los identificadores del servicio, plantilla y clave pública por los de la cuenta de EmailJS correspondiente.

## Estructura principal

```text
public/
  images/
src/
  App.js
  data.json
  data_de.json
  data_en.json
  data_gl.json
  i18n.js
  index.js
  styles.css
package.json
```
