# Zootique - Frontend

Tienda online de productos de mascotas, donde los usuarios podran ver los productos, añadirlos al carrito y realizar compras.

---

## Tecnologías
- Lenguajes: React
- Frameworks: Talwind

# Práctica: Instalación de React + Vite y Tailwind CSS (v4)

## 1. Estructura de carpetas recomendada

```
zootique/
├── backend/ # Carpeta para backend (Node.js)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── package.json
└── frontend/ # Carpeta para frontend (React)
    ├── src/
    │   ├── components/
    │   │   └── TwitterFollowCard.jsx
    │   ├── pages/
    │   │   └── Home.jsx
    │   ├── App.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

---

## 2. Crear el proyecto React con Vite

1. Abrir la terminal y moverse a la carpeta `frontend`.
2. Ejecutar el comando para crear un proyecto React con Vite:

```bash
npm create vite@latest zootique_frontend -- --template react
```

Entrar en la carpeta del proyecto:

```bash
cd zootique_frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto para verificar que funciona:

```bash
npm run dev
```

Abrir en el navegador: [http://localhost:5173](http://localhost:5173)

Deberías ver la interfaz base de React.

---

## 3. Instalar Tailwind CSS (v4) con Vite

### Paso 1: Instalar Tailwind y el plugin de Vite

```bash
npm install tailwindcss @tailwindcss/vite
```

### Paso 2: Configurar Vite para usar Tailwind

Editar `vite.config.js` y añadir el plugin:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### Paso 3: Crear el CSS principal y añadir Tailwind

Crear o editar `src/index.css`:

```css
@import "tailwindcss";
```

### Paso 4: Importar el CSS en el punto de entrada de React

En `src/main.jsx` (o `src/index.jsx`):

```javascript
import './index.css'  // <- Aquí se carga Tailwind
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
```

---

## 4. Probar que Tailwind funciona

En `src/pages/Home.jsx`, añade un div simple:

```javascript
export default function Home() {
  return (
    <div className="bg-red-500 text-white p-10 text-2xl">
      Si ves este fondo rojo, Tailwind funciona ✅
    </div>
  )
}
```

Ejecuta `npm run dev` y abre [http://localhost:5173](http://localhost:5173).
Si el fondo es rojo y el texto blanco, Tailwind está funcionando.
