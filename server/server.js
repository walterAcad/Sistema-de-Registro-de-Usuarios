import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar archivo de usuarios si no existe
async function initializeUsersFile() {
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2));
  }
}

// Leer usuarios
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo usuarios:', error);
    return [];
  }
}

// Escribir usuarios
async function writeUsers(users) {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error escribiendo usuarios:', error);
    throw error;
  }
}

// Rutas
// GET - Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const users = await readUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// POST - Registrar nuevo usuario
app.post('/api/users', async (req, res) => {
  try {
    const users = await readUsers();
    const newUser = {
      id: Date.now().toString(),
      ...req.body,
      registeredAt: new Date().toISOString()
    };
    users.push(newUser);
    await writeUsers(users);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// DELETE - Eliminar usuario
app.delete('/api/users/:id', async (req, res) => {
  try {
    const users = await readUsers();
    const filteredUsers = users.filter(user => user.id !== req.params.id);
    await writeUsers(filteredUsers);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

// Iniciar servidor
app.listen(PORT, async () => {
  await initializeUsersFile();
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
