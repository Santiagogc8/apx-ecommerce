import { firestore } from "src/lib/firestore";
import z from "zod";
import { User, UserSchema, UserUpdatePayload, UserUpdateSchema, AddressSchema, UserAddress } from "src/models/user";
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

// Obtener la informacion actualizada del user
async function getUser(userId: string){
    try{
        // Obtenemos el doc con el userId recibido
        const user = await userCollection.doc(userId).get();

        // Si no existe, tiramos error
        if(!user.exists){
            throw new ApiError("user not found", 404);
        }

        // Retornamos la data
        return user.data();
    } catch(error){ // Si hay un error diferente, tiramos 500
        throw new ApiError(error.message, 500);
    }
}

// La funcion para actualizar al user recibe una nueva data y un userId
async function patchUserData(newData: UserUpdatePayload, userId: string){
    try{
        // Obtenemos el doc con el userId recibido
        const userDoc = await userCollection.doc(userId);
        // Obtenemos la data del doc
        const userData = await userDoc.get();

        // Verificamos si el user existe. Si no, tiramos error
        if(!userData.exists){
            throw new ApiError("user not found", 404);
        }

        // Obtenemos la data valida parseando la data recibida con el UserUpdateSchema
        const validData = UserUpdateSchema.parse(newData);
        await userDoc.update(validData); // Le pedimos a firestore que actualice el documento

        // Y retornamos un objeto con informacion
        return {
            success: true,
            message: "User updated successfully",
            updatedFields: Object.keys(validData),
            updatedLines: Object.keys(validData).length,
            id: userId
        };
    } catch(error){ // Si hay un error diferente, tiramos 500
        throw new ApiError(error.message, 500);
    }
}

// Funcion para actualizar el address
async function patchUserAddress(address: UserAddress, userId: string) {
    try{
        // Obtenemos el doc con el userId recibido
        const userDoc = await userCollection.doc(userId);
        // Obtenemos la data del doc
        const userData = await userDoc.get();

        // Verificamos si el user existe. Si no, tiramos error
        if(!userData.exists){
            throw new ApiError("user not found", 404);
        }

        const validAddress = AddressSchema.parse(address);
        await userDoc.update({address: validAddress}); // Le pedimos a firestore que actualice el documento

        // Y retornamos un objeto con informacion
        return {
            success: true,
            message: "User address updated successfully",
            id: userId
        };
    } catch(error){ // Si hay un error diferente, tiramos 500
        if (error instanceof z.ZodError) {
            throw new ApiError('incomplete information in body', 400);
        }

        throw new ApiError(error.message, 500);
    }
}

export { getOrCreateUser, createUser, getUser, patchUserData, patchUserAddress }