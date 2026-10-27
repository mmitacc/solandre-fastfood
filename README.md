# 🍔 Solandre Fast-Food - Frontend

API de consumo: `https://backend-solandre.onrender.com`

Frontend moderno, rápido y tipado desarrollado para el sistema de delivery de comida **Solandre**. Diseñado con una paleta corporativa vibrante basada en los colores naranja y verde, garantizando una experiencia visual atractiva y una interfaz altamente intuitiva para cada rol del ecosistema.

---

## 🛠️ Tecnologías y Librerías Utilizadas

El proyecto está construido sobre las herramientas más modernas y eficientes del desarrollo web actual:

- **React 19 & Vite 8:** Entorno de desarrollo ultra rápido y biblioteca base para la interfaz de componentes.
- **TypeScript 6:** Tipado estricto en toda la aplicación para reducir errores en tiempo de desarrollo y asegurar autocompletado robusto.
- **Tailwind CSS v4 (Motor Nativo `@tailwindcss/vite`):** Estilos ultra rápidos configurados mediante variables CSS directas sin archivos de configuración antiguos.
- **Zustand v5:** Manejo de estado global ligero y persistente en `localStorage` para la sesión del usuario.
- **Axios v1.20:** Cliente HTTP optimizado con interceptores automáticos para inyección de Tokens Bearer y deslogueo en respuestas `401`.
- **React Router v8:** Manejo de enrutamiento dinámico, estructuras de Layout anidadas y protección de rutas.
- **React Hook Form v7 & Zod v4:** Gestión de formularios optimizada y validaciones estrictas con resolutores tipados.
- **Sonner v2:** Sistema de notificaciones flotantes estéticas (`toast`) y con soporte nativo de colores temáticos.
- **Oxlint v1:** Linter de última generación con rendimiento quirúrgico en código TypeScript.

---

## 👥 Usuarios de Prueba para Interacción

Para explorar las diferentes interfaces dinámicas y comprobar el sistema de enrutamiento protegido por `rol_id`, utiliza las siguientes credenciales de prueba en el módulo de ingreso (`/login`):

### 🧑‍🍳 Personal de Cocina (rol_id: 2)
Permite visualizar el monitor de órdenes en cola para preparación inmediata.
- **Correo Electrónico:** `cockman@delinut.com`
- **Contraseña:** `123456`

### 🛵 Personal de Delivery / Repartidor (rol_id: 3)
Permite gestionar las rutas de reparto asignadas y marcar despachos como entregados.
- **Correo Electrónico:** `delivman@delinut.com`
- **Contraseña:** `123456`

---

## 🚀 Pasos para la Instalación y Despliegue Local

Sigue estas sencillas instrucciones para clonar e inicializar el entorno de desarrollo en tu máquina local:

### 1. Clonar el repositorio e ingresar a la carpeta
```bash
git clone https://github.com/mmitacc/solandre-fastfood.git
cd solandre-fastfood
```

### 2. Configurar las Variables de Entorno
Crea un archivo llamado `.env` en la raíz del proyecto y define la URL base de la API:
```env
VITE_API_URL=https://backend-solandre.onrender.com
```

### 3. Instalar las dependencias con PNPM
Este proyecto utiliza `pnpm` como gestor de paquetes por su eficiencia en disco y velocidad. Si no lo tienes instalado globalmente, puedes activarlo con `corepack enable` o usar `npm i -g pnpm`.
```bash
pnpm install
```

### 4. Levantar el servidor de desarrollo local
Inicia el entorno de ejecución de Vite. La aplicación se compilará e inyectará los estilos de Tailwind v4 de forma nativa.
```bash
pnpm dev
```
Abre tu navegador e ingresa a la dirección local que te provee la consola (habitualmente `http://localhost:5173`).

También tenemos una ruta con el despliegue en github: `https://mmitacc.github.io/solandre-fastfood/`

### 5. Compilar para producción (Build)
Para generar los entregables estáticos optimizados y verificar que no existan errores de compilación en el tipado de TypeScript:
```bash
pnpm build
```

---

## 📁 Estructura Básica del Proyecto

- `src/constants/roles.ts`: Diccionario para mapear los códigos numéricos de la base de datos (`1`, `2`, `3`, `4`) con sus respectivos nombres y vistas.
- `src/components/RutaProtegida.tsx`: Guardián de seguridad que intercepta la navegación basándose en el estado de Zustand y restringe el renderizado por arreglos de roles permitidos.
- `src/layouts/MainLayout.tsx`: Estructura global compartida que contiene el encabezado dinámico del restaurante y el espacio de inyección de rutas.
- `src/axios.ts`: Instancia centralizada de Axios que adjunta automáticamente los encabezados de autorización JWT a cada petición saliente.

solandre-fastfood/
├── 📁 .vscode/                   # Configuraciones del editor (ej: validaciones de CSS para v4)
├── 📁 node_modules/              # Dependencias del proyecto
├── 📁 public/                    # Archivos estáticos públicos (logos, iconos)
├── 📁 src/
│   ├── 📁 api/                   # Servicios y configuración HTTP
│   │   └── 📄 axios.ts           # Instancia de Axios con interceptores de tokens y 401
│   │
│   ├── 📁 components/            # Componentes reutilizables de la interfaz
│   │   ├── 📄 ProductCard.tsx    # Tarjeta de producto sincronizada con tu JSON
│   │   └── 📄 RutaProtegida.tsx  # Guardián de rutas por coincidencia de rol_id numérico
│   │
│   ├── 📁 constants/             # Constantes y diccionarios globales
│   │   └── 📄 roles.ts           # Mapeo de rol_id (1, 2, 3, 4) a nombres y rutas
│   │
│   ├── 📁 layouts/               # Plantillas estructurales de página
│   │   └── 📄 MainLayout.tsx     # Layout global con Navbar dinámico por rol y Footer
│   │
│   ├── 📁 lib/                   # Funciones utilitarias independientes
│   │   └── 📄 errorHandle.ts     # Extractor seguro de mensajes de error de la API
│   │
│   ├── 📁 pages/                 # Componentes de página (Vistas completas)
│   │   ├── 📄 AdminDashboard.tsx # Estadísticas hardcodeadas para Administrador (rol_id: 1)
│   │   ├── 📄 KitchenOrders.tsx  # Monitor de pedidos para Cocina (rol_id: 2)
│   │   ├── 📄 DeliveryDashboard.tsx # Hojas de ruta para Delivery (rol_id: 3)
│   │   ├── 📄 Menu.tsx           # Catálogo de platos consumido mediante Axios
│   │   └── 📄 LoginPage.tsx      # Formulario de login adaptado a la marca Solandre
│   │
│   ├── 📁 schemas/               # Validaciones de formularios de datos
│   │   └── 📄 loginSchema.ts     # Esquema Zod y tipos inferidos para las credenciales
│   │
│   ├── 📁 stores/                # Manejadores de estado global (Zustand)
│   │   └── 📄 useAuthStore.ts    # Persistencia de token e información del usuario
│   │
│   ├── 📁 types/                 # Definiciones de tipos e interfaces de TypeScript
│   │   └── 📄 index.ts           # Tipado de Producto, Ingredientes, etc.
│   │
│   ├── 📄 App.tsx                # Enrutador central con React Router v7/v8 y Toaster
│   ├── 📄 index.css              # CSS Global con inyección @import "tailwindcss" y @theme
│   └── 📄 main.tsx               # Punto de entrada de React con StrictMode
│
├── 📄 .env                       # Variables de entorno locales (VITE_API_URL)
├── 📄 index.html                 # Raíz HTML del sitio (apunta a /src/main.tsx)
├── 📄 package.json               # Dependencias, scripts y herramientas del proyecto
├── 📄 pnpm-lock.yaml             # Candado de versiones estricto de pnpm
├── 📄 README.md                  # Documentación del proyecto y credenciales de prueba
└── 📄 vite.config.ts             # Configuración de plugins de Vite (Tailwind v4 primero)

## 🤖💻 Desarrollo y Co-creación
Desarrollado como práctica de laboratorio por @mmitacc con la asistencia de Inteligencia Artificial (Modelos de Lenguaje de Google), actuando como copiloto en el diseño de arquitectura, tipado de TypeScript y componentes de UI.
