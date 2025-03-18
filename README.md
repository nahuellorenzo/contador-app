# Contador con Persistencia en Base de Datos

Este proyecto es una aplicación web desarrollada con **Next.js 15.2.2**, **Drizzle ORM** y **SQLite**, que implementa un contador con persistencia en una base de datos relacional, almacenando un historial de cambios tambien en la base de datos y exportando el historial a PDF cuando se lo requiera.

## 🚀 Características
- Contador con valor almacenado en **SQLite**.
- Persistencia de datos entre sesiones.
- Botones para incrementar, decrementar y resetear el contador.
- Historial de cambios
- Exportacion a PDF
- Backend manejado con **Server Actions** en Next.js.
- Estilos con **TailwindCSS**.

## 🔧 Instalación y Configuración
1. **Clonar el repositorio:**
   ```sh
   git clone https://github.com/nahuellorenzo/contador-app.git
   cd contador-app
   ```

2. **Instalar dependencias:**
   ```sh
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y agrega:
   ```env
   DB_FILE_NAME=file:./src/app/db/database.sqlite
   ```

4. **Generar la base de datos y migraciones:**
   ```sh
   npx drizzle-kit generate
   npx drizzle-kit migrate
   ```

5. **Iniciar el servidor de desarrollo:**
   ```sh
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:3000`.

## 📌 Decisiones Técnicas
1. **Next.js 15.2.2**: Se eligió por su soporte para Server Actions, facilitando la comunicación con la base de datos sin necesidad de API endpoints tradicionales.
2. **Drizzle ORM con SQLite**: Drizzle proporciona un ORM ligero y tipado para TypeScript, y SQLite permite una configuración sencilla sin necesidad de un servidor externo.
3. **TypeScript**: El código está desarrollado en TypeScript para una mejor seguridad y mantenimiento.
4. **TailwindCSS**: Se usó para agilizar la implementación del diseño.

## 🔄 Funcionalidad Adicional Implementada
- Implementación de un historial de cambios indicando la acción que se ejecuto en el contador y el número en el que quedo seteado junto con la fecha y hora en que se ejecuto dicha acción. Ademas en caso de requerirlo el historial puede ser eliminado.
- Exportacion del historial de cambios a PDF, conteniendo todo el historial con una fila por accion junto con su fecha correspondiente.

## 📝 Notas Importantes
- El archivo `.env` **no se sube al repositorio** por razones de seguridad. Si se necesita ejecutar el proyecto, debe crearlo manualmente siguiendo las instrucciones.

---

Cualquier duda o sugerencia, ¡no dudes en contactarme! 😊