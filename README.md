# APX Ecommerce API 🚀

Esta es una API RESTful robusta diseñada para gestionar un e-commerce moderno. Utiliza una arquitectura híbrida y serverless para ofrecer escalabilidad, búsqueda rápida y procesamiento de pagos seguro.

El sistema maneja el flujo completo de una tienda en línea: desde la autenticación de usuarios sin contraseñas (passwordless) hasta la sincronización de inventario y el procesamiento de pagos en tiempo real.

## 🔗 Demo y Documentación

* **Deploy en Producción:** [Ver Proyecto en Vercel](https://apx-ecommerce.vercel.app)
* **Documentación API (Postman):** [Explorar Endpoints y Esquemas](https://documenter.getpostman.com/view/48981749/2sBXVmgpWo)

---

## ✨ Características de Ingeniería

### 🔐 Seguridad y Autenticación (Passwordless)
* **Login OTP:** Autenticación mediante códigos de un solo uso enviados por email (Resend), eliminando la vulnerabilidad de contraseñas estáticas.
* **Sesiones JWT:** Manejo seguro de estado de usuario mediante JSON Web Tokens almacenados en cookies/headers.
* **Middlewares:** Protección de rutas y verificación de roles a nivel de Edge.

### 💳 Pasarela de Pagos & Transacciones
* **MercadoPago Checkout Pro:** Integración completa para pagos seguros.
* **Webhooks (IPN):** Endpoint dedicado (`/api/ipn/mercadopago`) que escucha notificaciones asíncronas para confirmar pagos.
* **Control de Stock Atómico:**
    1.  Verifica stock disponible antes de generar la preferencia.
    2.  Si el pago es aprobado -> Se confirma la orden y se notifica.
    3.  Si el pago es rechazado -> El sistema **restaura automáticamente** el stock inventariado (Rollback).

### ⚡ Rendimiento y Búsqueda
* **Algolia Sync:** Sincronización automática entre la base de datos de productos (Airtable) y el motor de búsqueda (Algolia) para resultados en milisegundos.
* **Server Components:** Renderizado del lado del servidor (RSC) para optimizar el SEO y la carga inicial (LCP).

---

## 🛠 Tech Stack

**Core:**
* **Framework:** [Next.js 14](https://nextjs.org/) (App Router & Server Actions)
* **Lenguaje:** TypeScript
* **Estilizado:** Tailwind CSS + Componentes UI personalizados

**Backend & Datos:**
* **Usuarios:** Google Firestore (Firebase Admin SDK).
* **CMS & Productos:** Airtable (usado como base de datos relacional-like).
* **Validación:** Zod (Esquemas estrictos para API Requests).

**Integraciones:**
* **Pagos:** MercadoPago SDK.
* **Emails:** Resend API.
* **Búsqueda:** Algolia Search.

---

## 📂 Arquitectura del Proyecto

El proyecto sigue una arquitectura **MVC (Model-View-Controller)** adaptada al App Router de Next.js, separando claramente la lógica de negocio de la interfaz de usuario.

```bash
src/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Rutas públicas de autenticación (Login)
│   ├── (main)/           # Rutas de la tienda (Home)
│   ├── item/[slug]/      # Página de detalle de producto (SSR)
│   ├── me/               # Rutas protegidas (Profile, Orders)
│   ├── search/           # Página de búsqueda (Client + Algolia)
│   └── api/              # Endpoints REST (Webhooks, Sync, Auth)
├── components/           # Componentes lógicos y wrappers (AuthWrapper)
├── controllers/          # Lógica de negocio (Orquestación de datos)
├── lib/                  # Conexiones a servicios externos (Firestore, Algolia, MP)
├── models/               # Acceso directo a datos (Data Access Layer)
└── ui/                   # Componentes de presentación puros (Botones, Inputs)
```

## ⚙️ Configuración Local
Sigue estos pasos para levantar el proyecto en tu entorno local.
1. **Prerrequisitos**
  * Node.js 18+
  * Una cuenta en MercadoPago Developers (para obtener credenciales de prueba).
  * Una cuenta en Algolia, Airtable y Firebase.

2. **Clonar el repositorio**

  ```bash
  git clone [https://github.com/tu-usuario/apx-ecommerce.git](https://github.com/tu-usuario/apx-ecommerce.git)
  cd apx-ecommerce
  ```

3. **Instalar dependencias**
  ```bash
  npm install
  ```

4. **Variables de Entorno**

Para ejecutar este proyecto, necesitarás configurar las siguientes variables de entorno en tu archivo `.env.local`:

```bash
# Configuración del Servidor
JWT_SECRET=secreto_para_jwt
SYNC_SECRET=tu_secreto_para_cronjobs

# Firebase (Firestore)
FIREBASE_CONNECTION=json_de_credenciales

# Airtable
AIRTABLE_TOKEN=api_key_de_airtable

# Algolia
ALGOLIA_APP_ID=app_id
ALGOLIA_API_KEY=api_key

# MercadoPago
MP_TOKEN=access_token_de_mercadopago

# Resend (Emails)
RESEND_API_KEY=api_key_de_resend
```

5. **Ejecutar el servidor de desarrollo**
  ```bash
  npm run dev
  ```
El servidor iniciará en http://localhost:3000

### 👨‍💻 Autor
Desarrollado por Santiago Guzman - Systems Engineer & Fullstack Developer
