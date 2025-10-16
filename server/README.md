# Servidor Backend - Sistema de Registro

Este es el servidor backend para el sistema de registro de usuarios.

## Instalación

```bash
cd server
npm install
```

## Ejecución

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3001`

## API Endpoints

- `GET /api/users` - Obtener todos los usuarios
- `POST /api/users` - Registrar nuevo usuario
- `DELETE /api/users/:id` - Eliminar usuario

## Archivo de datos

Los usuarios se almacenan en `users.json`
