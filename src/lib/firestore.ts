import admin from "firebase-admin";

// Verificamos si ya hay apps inicializadas
if (!admin.apps.length) {
    // En caso de que no hayan, parseamos la FIREBASE_CONNECTION (del .env) y la guardamos en una variable
    const serviceAccount = JSON.parse(process.env.FIREBASE_CONNECTION);

    // Luego, inicializamos la app con las credenciales correspondientes
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

// Empezamos firestore (con la creada o la iniciada)
const firestore = admin.firestore();

export { firestore }