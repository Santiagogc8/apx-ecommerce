# APX Ecommerce API 🚀

Esta es una API RESTful robusta diseñada para gestionar un e-commerce moderno. Utiliza una arquitectura híbrida y serverless para ofrecer escalabilidad, búsqueda rápida y procesamiento de pagos seguro.

El sistema maneja el flujo completo de una tienda en línea: desde la autenticación de usuarios sin contraseñas (passwordless) hasta la sincronización de inventario y el procesamiento de pagos en tiempo real.

## 📚 Documentación de la API
La documentación completa de los endpoints, incluyendo ejemplos de request y response, está disponible en nuestra colección de Postman.

**Link de la documentacion:** [Click aqui](https://documenter.getpostman.com/view/48981749/2sBXVmgpWo)

## 🛠 Tech Stack

El proyecto está construido con las siguientes tecnologías:

* **Framework:** [Next.js](https://nextjs.org/) (App Router & API Routes)
* **Lenguaje:** TypeScript
* **Base de Datos (Usuarios):** Google Firestore (Firebase Admin)
* **Base de Datos (Productos & Ordenes):** Airtable
* **Búsqueda:** Algolia (para indexado y búsqueda full-text)
* **Pagos:** MercadoPago (Checkout Pro & Webhooks/IPN)
* **Emails:** Resend
* **Validación:** Zod

## ✨ Características Principales

* **Autenticación Segura:** Sistema de login "Passwordless" mediante códigos de un solo uso (OTP) enviados por email.
* **Gestión de Usuarios:** Endpoints protegidos para visualizar y editar perfil y direcciones de envío.
* **Sincronización de Inventario:** Sistema automatizado para sincronizar productos desde Airtable hacia Algolia para búsquedas instantáneas.
* **Control de Stock:** Verificación de stock en tiempo real antes de generar órdenes y devolución automática de stock si un pago es rechazado.
* **Pagos Automatizados:** Integración completa con MercadoPago, incluyendo notificaciones IPN para confirmar el estado de las transacciones automáticamente.

## ⚙️ Variables de Entorno

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