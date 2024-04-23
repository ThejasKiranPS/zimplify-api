import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUser, SignIn } from "./user.schema";
import { createUser, getUser, getUserByEmail } from "./user.service";

export async function signUpHandler(
    req: FastifyRequest<{
        Body: CreateUser
    }>,
    rep: FastifyReply
) {
    const user = await createUser(req.body);
    rep
        // implement JWT
        .setCookie('userId', user.id, {
            path: '/',
        })
        .send(user);
}

export async function signInHandler(
    req: FastifyRequest<{
        Body: SignIn
    }>,
    rep: FastifyReply
) {
    // implement JWT
    const user = await getUserByEmail(req.body.email);
    if (!user) {
        rep.status(401).send({ message: "User not found" });
        return;
    } else if (user.password !== req.body.password) {
        rep.status(401).send({ message: "Invalid password" });
    } else {
        rep
            .setCookie('userId', user.id, {
                path: '/',
            })
            .send({ message: "Logged in" });
    }
}

export async function whoamiHandler(
    req: FastifyRequest,
    rep: FastifyReply
) {
    const cookies = req.cookies;
    const userId = cookies.userId;
    if (!userId) {
        rep.status(401).send({ message: "Not logged in" });
        return;
    }
    const user = await getUser(userId);
    if (!user) {
        rep.status(401).send({ message: "User not found" });
    } else {
        rep.send(user);
    }
}
