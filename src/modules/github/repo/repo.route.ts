import { FastifyInstance } from "fastify/types/instance";
import { downloadGithubRepoHandler, getGithubReposHandler } from "./repo.controller";
import { verifySession } from "../../../utils/auth";

export async function githubRepoRoutes(server: FastifyInstance) {
  server.addHook('preHandler', verifySession)

  server.get('/', getGithubReposHandler)
}
