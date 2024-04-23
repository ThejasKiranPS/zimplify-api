import { FastifyInstance } from "fastify";
import { downloadGithubRepoHandler } from "../github/repo/repo.controller";
import { $projectRef } from "./project.schema";

export async function goProjectRoutes(server: FastifyInstance) {
  server.post(
    '/:projectId/download',
    {
      schema: {
        params: $projectRef('byProjectId')
      }
    },
    downloadGithubRepoHandler
  )
}