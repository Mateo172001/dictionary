# Aplicación de Diccionario

Este es un proyecto de [Next.js](https://nextjs.org) creado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Descripción

Esta aplicación es un diccionario interactivo que permite buscar definiciones de palabras. Cuenta con las siguientes características:

- Búsqueda de definiciones de palabras
- Historial de búsquedas
- Selector de fuentes (serif, sans-serif, monospace)
- Cambio entre tema claro y oscuro

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm, yarn, pnpm o bun como gestor de paquetes

## Instalación

1. Clona este repositorio o descarga los archivos del proyecto

2. Navega hasta la carpeta del proyecto:

```bash
cd dictionary
```

3. Instala las dependencias:

```bash
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

## Ejecución del proyecto

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

Puedes comenzar a editar la página modificando `src/app/page.tsx`. La página se actualiza automáticamente cuando editas el archivo.

## Tecnologías utilizadas

- [Next.js 15](https://nextjs.org/) - Framework de React
- [React 19](https://react.dev/) - Biblioteca para interfaces de usuario
- [Redux Toolkit](https://redux-toolkit.js.org/) - Gestión de estado
- [Tailwind CSS 4](https://tailwindcss.com/) - Framework CSS
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript

## Construcción para producción

Para construir la aplicación para producción:

```bash
npm run build
# o
yarn build
# o
pnpm build
# o
bun build
```

Para iniciar la versión de producción:

```bash
npm start
# o
yarn start
# o
pnpm start
# o
bun start
```

## Despliegue en Vercel

La forma más sencilla de desplegar tu aplicación Next.js es utilizar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
