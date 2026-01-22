import { firestore } from "src/lib/firestore";
import z from "zod";
import { User, UserSchema } from "src/models/user";

// Guardamos la coleccion de users en una variable para manipularla
const userCollection = firestore.collection("users");

// Creamos nuestra funcion para obtener nuestro user mediante su email
async function getOrCreateUser(email: string){
    try{
        const emailVerified = z.email().parse(email);

        const results = await userCollection.where("email", "==", emailVerified).limit(1).get()

        if (results.empty) {
            return await createUser(emailVerified);
		} 

        const first = results.docs[0];

        return { 
            id: first.id, 
            ...first.data() 
        } as User;
    } catch(error){
        return error.message;
    }
}

async function createUser(email: string) {
    const validData = UserSchema.parse({
        email,
        createdAt: new Date()
    });

    const ref = await userCollection.add(validData);

    return {id: ref.id, ...validData} as User;
}

export { getOrCreateUser, createUser }