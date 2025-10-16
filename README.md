# Sistema-de-Registro-de-Usuarios

Sistema de registro de usuarios con formulario multi-paso que almacena los datos en un archivo JSON.

## Características

- 📝 Formulario de registro multi-paso (Información Personal, Contacto, Confirmación)
- 💾 Almacenamiento persistente en archivo JSON
- 📊 Visualización de todos los usuarios registrados
- 🗑️ Funcionalidad para eliminar usuarios
- 🎨 Interfaz responsive y amigable

## Estructura del Proyecto

```
├── client/          # Frontend React + Vite
│   └── src/
│       ├── components/
│       │   ├── Home.jsx
│       │   └── register/
│       │       ├── Register.jsx
│       │       ├── PersonalInfo.jsx
│       │       ├── ContactInfo.jsx
│       │       └── Confirmation.jsx
│       └── App.jsx
└── server/          # Backend Node.js + Express
    ├── server.js
    └── users.json   # Base de datos JSON
```

## Instalación y Ejecución

### 1. Instalar dependencias del servidor

```bash
cd server
npm install
```

### 2. Instalar dependencias del cliente

```bash
cd client
npm install
```

### 3. Ejecutar el servidor (Terminal 1)

```bash
cd server
npm start
```

El servidor se ejecutará en `http://localhost:3001`

### 4. Ejecutar el cliente (Terminal 2)

```bash
cd client
npm run dev
```

El cliente se ejecutará en `http://localhost:5173`

## Uso

1. Abre `http://localhost:5173` en tu navegador
2. Haz clic en "Registrarse" para iniciar el proceso de registro
3. Completa los tres pasos del formulario:
   - Información Personal (nombre, apellido, fecha de nacimiento, género)
   - Información de Contacto (email, teléfono, dirección, ciudad)
   - Confirmación (revisión de datos)
4. Los usuarios registrados aparecerán en la página de inicio
5. Puedes eliminar usuarios haciendo clic en el botón "Eliminar"

## Tecnologías

### Frontend
- React 18
- React Router DOM
- Vite

### Backend
- Node.js
- Express
- CORS

## API Endpoints

- `GET /api/users` - Obtener todos los usuarios
- `POST /api/users` - Registrar nuevo usuario
- `DELETE /api/users/:id` - Eliminar usuario por ID
