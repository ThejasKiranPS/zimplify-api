import { FastifyInstance } from "fastify/types/instance";
import { $projectRef } from "./project.schema";
import { createProjectHandler, deleteProjectHandler, getProjectByIdHandler, getProjectsHandler } from "./project.controller";

export async function projectRoutes(server: FastifyInstance) {
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
}
