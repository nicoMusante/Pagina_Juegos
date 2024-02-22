# LowNic Juegos

<img src="images/LowNic_Juegos.webp" alt="LowNic Juegos"/>

Bienvenido a **LowNic Juegos**, tu destino para explorar una amplia variedad de juegos. Desde emocionantes aventuras hasta desafiantes rompecabezas, nuestra plataforma tiene algo para todos los amantes de los juegos. Aquí te proporcionamos una guía rápida sobre el funcionamiento de nuestra página y cómo puedes ponerla en marcha en tu entorno local.

## 🚀 Funcionalidades Principales

### 🎮 Catálogo de Juegos

- Explora nuestra amplia colección de juegos que se cargan dinámicamente desde nuestra base de datos.
- Descubre nuevas experiencias de juego y encuentra tus favoritos.

### 🕹 Géneros

- Sumérgete en distintos géneros de juegos gracias a nuestra sección de géneros.
- Personaliza la lista de géneros según tus preferencias.

### 🖥 Plataformas

- Descubre juegos específicos para tu plataforma favorita con nuestra sección de plataformas.
- Personaliza la lista de plataformas según tus necesidades.

### ⚙ Modificación de Géneros y Plataformas

- Toma el control total de tu experiencia de usuario al modificar o eliminar géneros y plataformas según tus preferencias.

## 📦 Uso de la Base de Datos con XAMPP y MySQL

### Requisitos Previos

Asegúrate de tener instalado [XAMPP](https://www.apachefriends.org/index.html) en tu máquina antes de seguir estos pasos.

### Configuración de la Base de Datos

1. Clona este repositorio a tu máquina local:

    ```bash
    git clone https://tu-repositorio.git
    ```

2. Abre XAMPP y asegúrate de que el servidor Apache y MySQL estén activos.

3. Accede a `http://localhost/phpmyadmin` en tu navegador.

4. Crea una nueva base de datos llamada `juegos`.

5. En la interfaz de phpMyAdmin, selecciona la base de datos recién creada y haz clic en la pestaña "Importar".

6. Haz clic en "Seleccionar archivo" y elige el archivo SQL proporcionado en este repositorio (`juegos.sql`).

7. Haz clic en "Continuar" para importar los datos en la base de datos.

## 🌐 Levantar la Página Localmente

1. Clona este repositorio a tu máquina local (si no lo has hecho antes):

    ```bash
    git clone https://tu-repositorio.git
    ```

2. Navega a la carpeta `plataforma-juegos`:

    ```bash
    cd plataforma-juegos
    ```

3. Instala las dependencias utilizando npm:

    ```bash
    npm install
    ```

4. Inicia la aplicación localmente:

    ```bash
    npm start
    ```

5. La aplicación estará disponible en `http://localhost:3000`.

## 📡 Endpoints PHP

La carpeta `API` contiene todos los endpoints PHP que nuestra aplicación utiliza para interactuar con la base de datos SQL. Asegúrate de tener un entorno de servidor PHP para que estos endpoints funcionen correctamente.

- `/api/generos.php`: Endpoints relacionados con la gestión de géneros.
  - `GET /api/generos.php`: Obtener la lista de géneros.
  - `POST /api/generos.php`: Agregar un nuevo género.
  - `PUT /api/generos.php`: Actualizar información de un género.
  - `DELETE /api/generos.php`: Eliminar un género.

- `/api/plataformas.php`: Endpoints relacionados con la gestión de plataformas.
  - `GET /api/plataformas.php`: Obtener la lista de plataformas.
  - `POST /api/plataformas.php`: Agregar una nueva plataforma.
  - `PUT /api/plataformas.php`: Actualizar información de una plataforma.
  - `DELETE /api/plataformas.php`: Eliminar una plataforma.

Asegúrate de ajustar la configuración de la base de datos en los archivos PHP según tu entorno de desarrollo.

¡**Disfruta de tu experiencia de juego en LowNic Juegos**!
