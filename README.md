# Sistema de Gestión de Comisiones CRM

Este proyecto es una aplicación web desarrollada con [Next.js](https://nextjs.org) que permite la integración y procesamiento de datos de ventas desde diferentes sistemas CRM. La aplicación estandariza los datos de ventas, calcula comisiones automáticamente y presenta la información en una interfaz amigable.

## Características Principales

- **Importación de datos**: Soporta múltiples formatos (JSON para CRM A, CSV para CRM B)
- **Transformación de datos**: Convierte datos de diferentes fuentes a un formato estandarizado
- **Cálculo de comisiones**: Aplica reglas de negocio para calcular comisiones de ventas
- **Visualización de datos**: Muestra las ventas y comisiones en tablas interactivas
- **Internacionalización**: Soporte para múltiples idiomas

## Requisitos Previos

- Node.js 18.x o superior
- npm, yarn, pnpm o bun
- Git instalado en el sistema
- Editor de código (VS Code recomendado)
- Navegador web moderno (Chrome, Firefox, Edge)
- Conexión a Internet para instalar dependencias

## Guía de Instalación y Ejecución

1. Clone el repositorio:
   ```bash
   git clone https://github.com/Visual2024/challenge.git
   cd challenge
   ```

2. Instale las dependencias:
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```


3. Ejecute el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

4. Acceda a la aplicación:
   Abra su navegador y visite `http://localhost:3000/es`

5. Para construir la versión de producción:
   ```bash
   pnpm build
   pnpm dev
   # o
   yarn build
   yarn dev
   ```

## Solución de problemas comunes

- Si encuentra errores de dependencias, intente eliminar la carpeta `node_modules` y el archivo `package-lock.json` (o `yarn.lock`) y vuelva a ejecutar el comando de instalación.
- Asegúrese de que su versión de Node.js sea compatible (verifique con `node -v`).
- Para problemas de internacionalización, verifique que los archivos de idioma estén correctamente configurados en la carpeta de traducciones.
