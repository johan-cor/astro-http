#  Astro Blog HTTP - Blog Dinámico con Rutas API

Un proyecto **Astro 5** completo que demuestra cómo construir un blog moderno con soporte para **rutas API dinámicas**, **gestión de contenido** mediante Markdown/MDX, y **respuestas JSON estructuradas**.

##  Características Principales

-  **Blog con Markdown/MDX** - Gestión de contenido con schema validation
-  **API REST personalizada** - Rutas API dinámicas para obtener datos JSON
-  **Pre-renderización dinámica** - prerender = false para contenido dinámico
-  **Feed RSS automático** - Generación automática de feeds
-  **Sitemap dinámico** - SEO optimizado con sitemap automático
-  **Componentes reutilizables** - Layouts y componentes Astro organizados
-  **Integración Node.js** - Adapter Node para servidor backend
-  **Procesamiento de imágenes** - Sharp integrado para optimización

##  Estructura del Proyecto

```
src/
 pages/
    index.astro              # Página principal
    about.astro              # Página de información
    rss.xml.js               # Feed RSS dinámico
    blog/
       [slug].astro         # Ruta dinámica para posts
    api/
        get-person.json.ts   # API: Obtener datos de persona
        posts.json.ts        # API: Consultar posts con query params
 content/
    blog/                    # Archivos Markdown/MDX de posts
        first-post.md
        second-post.md
        ...
 layouts/
    BlogPost.astro           # Layout para artículos
 components/
    BaseHead.astro           # Meta tags y SEO
    Header.astro             # Navegación
    Footer.astro             # Pie de página
    FormattedDate.astro      # Formateador de fechas
    HeaderLink.astro         # Enlaces de navegación
 styles/
    global.css               # Estilos globales
 assets/                      # Imágenes y recursos
 consts.ts                    # Constantes del sitio
 content.config.ts            # Esquema de colecciones
```

##  Inicio Rápido

### Instalación

`bash
npm install
`

### Desarrollo

`bash
npm run dev
`

Accede a http://localhost:3000

### Build & Preview

`bash
npm run build
npm run preview
`

Accede a http://localhost:4321

##  API Endpoints

### 1. Obtener Datos de Persona

**Endpoint:** GET /api/get-person.json

**Respuesta:**

`json
{
  "name": "John Doe",
  "age": 30,
  "email": "johan"
}
`

### 2. Consultar Posts

**Endpoint:** GET /api/posts.json?slug=first-post

**Parámetros:**

- slug (opcional) - Slug del post a buscar

**Respuesta:**

`json
{
  "slug": "first-post",
  "allParams": {
    "slug": "first-post"
  },
  "message": "Post encontrado: first-post"
}
`

##  Gestión de Contenido

### Crear un Nuevo Post

1. Crea un archivo en src/content/blog/ con extensión .md o .mdx
2. Añade el frontmatter requerido:

`markdown
---
title: 'Mi Nuevo Post'
description: 'Descripción breve del post'
pubDate: 'Dic 05 2025'
updatedDate: 'Dic 05 2025'
heroImage: '../../assets/mi-imagen.jpg'
---

Contenido del post en Markdown...
`

##  Dependencias Principales

`json
{
  "astro": "^5.16.4",
  "@astrojs/mdx": "^4.3.12",
  "@astrojs/rss": "^4.0.14",
  "@astrojs/sitemap": "^3.6.0",
  "@astrojs/node": "^9.5.1",
  "sharp": "^0.34.3"
}
`

##  Configuración

### astro.config.mjs

`javascript
export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [mdx(), sitemap()],
  output: 'static',
  adapter: node({
    mode: 'standalone',
  }),
});
`

### content.config.ts

Define esquemas de validación para contenido Markdown:

`typescript
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
    }),
});
`

##  Conceptos Clave Implementados

### Pre-renderización Dinámica

La página principal usa export const prerender = false para permitir contenido dinámico:

`typescript
export const prerender = false;
`

### API Routes

Las rutas API usan APIRoute de Astro para manejar peticiones HTTP:

`typescript
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  // Lógica de la API
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
`

### Query Parameters

Acceso a parámetros de URL mediante URL API:

`typescript
const url = new URL(request.url);
const slug = url.searchParams.get('slug');
`

##  Comandos Disponibles

| Comando | Descripción |
|---------|-----------|
| npm run dev | Inicia servidor de desarrollo |
| npm run build | Construye la aplicación para producción |
| npm run preview | Vista previa de la build |
| npm run astro | Acceso directo a CLI de Astro |

##  Rutas Disponibles

- / - Página principal
- /about - Página de información
- /blog/[slug] - Artículos individuales
- /rss.xml - Feed RSS
- /api/get-person.json - API de persona
- /api/posts.json - API de posts

##  Para Aprender Más

- [Documentación de Astro](https://docs.astro.build)
- [Integración MDX](https://docs.astro.build/es/guides/integrations-guide/mdx/)
- [API Routes](https://docs.astro.build/es/guides/endpoints/)
- [Colecciones de Contenido](https://docs.astro.build/es/guides/content-collections/)

##  Licencia

Proyecto educativo - Libre para usar y modificar.
