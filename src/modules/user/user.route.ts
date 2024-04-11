import { FastifyInstance } from "fastify";
import { $userRef } from "./user.schema";
import { signInHandler, signUpHandler, whoamiHandler } from "./user.controller";

export async function userRoutes(server: FastifyInstance) {
    server.post(
        '/sign-up',
        {
            schema: {
                body: $userRef('createUserSchema')
            }
        },
        signUpHandler
    )

    server.post(
        '/sign-in',
        {
            schema: {
                body: $userRef('signInSchema')
            }
        },
        signInHandler
    )

    server.get(
        '/whoami',
        whoamiHandler
    )
}
