import { FastifyInstance } from "fastify/types/instance";
import { githubAuthSchemas } from "./auth/github-auth.schema";
import { githubAuthRoutes } from "./auth/github-auth.route";
import { githubRepoRoutes } from "./repo/repo.route";
import { githubUserRoutes } from "./user/gh-user.route";

export async function githubRoutes(server: FastifyInstance) {
  const modules = [
    githubAuthSchemas
  ]

  for (const module of modules) {
    for (const schema of module) {
      server.addSchema(schema);
    }
  }

  server.register(githubAuthRoutes, { prefix: '/auth' })
  server.register(githubRepoRoutes, { prefix: '/repos' })
  server.register(githubUserRoutes, { prefix: '/user' })
}
