import { FastifyInstance } from "fastify/types/instance";
import { $projectRef } from "./project.schema";
import { createProjectHandler, deleteProjectHandler, getProjectByIdHandler, getProjectsHandler } from "./project.controller";
import { downloadGithubRepoHandler } from "../github/repo/repo.controller";
import { verifySession } from "../../utils/auth";

export async function projectRoutes(server: FastifyInstance) {
    server.addHook('preHandler', verifySession)
    server.post(
        '/',
        {
            schema: {
                body: $projectRef('createProjectSchema')
            }
        },
        createProjectHandler
    );

    server.get('/', getProjectsHandler)

    server.get(
        '/:projectId',
        {
            schema: {
                params: $projectRef('byProjectId')
            }
        },
        getProjectByIdHandler
    )
    server.delete(
        '/:projectId',
        {
            schema: {
                params: $projectRef('byProjectId')
            }
        },
        deleteProjectHandler
    )
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
