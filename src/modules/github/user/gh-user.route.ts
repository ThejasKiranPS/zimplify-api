import { FastifyInstance } from "fastify/types/instance";
import { getAuthenticatedGithubUserHandler } from "./gh-user.controller";
import { verifySession } from "../../../utils/auth";

export async function githubUserRoutes(server: FastifyInstance) {
    server.addHook('preHandler', verifySession)
    server.get('/', getAuthenticatedGithubUserHandler)
}
