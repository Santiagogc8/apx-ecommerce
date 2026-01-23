import { firestore } from "src/lib/firestore";
import z from "zod";
import { User, UserSchema } from "src/models/user";
import { ApiError } from "src/models/apiError";

// Guardamos la coleccion de users en una variable para manipularla
const userCollection = firestore.collection("users");

// Creamos nuestra funcion para obtener nuestro user mediante su email
async function getOrCreateUser(email: string){
    try {
        // Intentamos parsear el email y verificar si cumple con lo que dice zod (basicamente que si es un email y no algo raro)
        const emailVerified = z.email().parse(email);

        // Luego busca en la userCollection donde esta el email que es igual al emailVerified. Le decimos que queremos un limite de solo un documento y lo traemos
        const results = await userCollection.where("email", "==", emailVerified).limit(1).get()

        // Si no habian resultados
        if (results.empty) {
            return await createUser(emailVerified); // Creamos el user
		} 

        // Si si hay resultados, recuperamos el primer doc
        const first = results.docs[0];

        // Y retornamos el id y la data del primer doc
        return { 
            id: first.id, 
            ...first.data() 
        } as User;
    } catch(error){ // Si hay un error, lo tiramos como una instancia de ApiError
        throw new ApiError(error.message, 500);
    }
}

// Para crear el user, recibimos un email
async function createUser(email: string) {
    // Validamos la data con el UserSchema de zod. Le pasamos el email y la fecha de creacion
    const validData = UserSchema.parse({
        email,
        createdAt: new Date()
    });

    // Luego, agregamos una referencia a la userCollection y le pasamos la data validada
    const ref = await userCollection.add(validData);

    // Por ultimo, respondemos con el id y la data que validamos (y le decimos que es de tipo User, model)
    return {id: ref.id, ...validData} as User;
}

export { getOrCreateUser, createUser }