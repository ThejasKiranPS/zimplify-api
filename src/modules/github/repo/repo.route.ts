import { FastifyInstance } from "fastify/types/instance";
import { getGithubRepoBranches, getGithubReposHandler } from "./repo.controller";
import { verifySession } from "../../../utils/auth";

export async function githubRepoRoutes(server: FastifyInstance) {
  server.addHook('preHandler', verifySession)

  server.get('/', getGithubReposHandler)
  server.get('/:repoId/branches', getGithubRepoBranches)
}
