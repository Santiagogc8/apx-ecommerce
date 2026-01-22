import { firestore } from "src/lib/firestore";
import { getOrCreateUser } from "./user";
import { randomInt } from "crypto";
import { z } from "zod";
import { AuthSchema, Auth } from "src/models/auth";

const authCollection = firestore.collection("auth");

async function getOrCreateAuth(email: string) {
	try {
		const emailVerified = z.email().parse(email);

		const user = await getOrCreateUser(emailVerified);

		const authResult = await authCollection.doc(user.id).get();

        if(!authResult.data()){
            const newAuth = await createAuth(user.id);
            console.log(newAuth)
        }
	} catch (error) {
		return error.message;
	}
}

async function createAuth(userId: string) {
    try{
        const expiredAt = new Date();
        expiredAt.setMinutes(expiredAt.getMinutes() + 20);
        const code = randomInt(100000, 1000000);

        const validData = AuthSchema.parse({
            userId,
            expiredAt,
            code
        });

        await authCollection.doc(userId).set(validData);

        return code
    } catch (error) {
		return error.message;
	}
}

export { getOrCreateAuth, createAuth }