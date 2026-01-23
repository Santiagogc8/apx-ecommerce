import { firestore } from "src/lib/firestore";
import { getOrCreateUser } from "./user";
import { randomInt } from "crypto";
import { z } from "zod";
import { AuthSchema, Auth } from "src/models/auth";

const authCollection = firestore.collection("auth");

async function getOrCreateAuth(email: string) {
	const emailVerified = z.email().parse(email);
	const user = await getOrCreateUser(emailVerified);

	return await createAuth(user.id, email);
}

async function createAuth(userId: string, email:string) {
	const expiredAt = new Date();
	expiredAt.setMinutes(expiredAt.getMinutes() + 20);
	const code = randomInt(100000, 1000000);

	const validData = AuthSchema.parse({
		userId,
        email,
		expiredAt,
		code,
	});

	await authCollection.doc(userId).set(validData);

	return {
        email,
		code,
		expiredAt,
	};
}

async function verifyAuth(email: string, code: string) {
	try{
        const results = await authCollection.where("email", "==", email).limit(1).get();

        if (results.empty) {
            return null;
        } 

        const authData = results.docs[0].data();
        const expiresMillis = authData.expiredAt.toMillis();
        const isExpired = Date.now() > expiresMillis;

        if(authData.code == code && !isExpired){
            return generateToken(authData);
        } else {
            return null
        }
    }   catch(error){
        return error.message;
    }
}

async function generateToken(data: any) {
	return "false-token"
}

export { getOrCreateAuth, createAuth, verifyAuth };
