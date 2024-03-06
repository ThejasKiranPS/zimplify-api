import { FastifyInstance } from "fastify/types/instance";
import { projectSchemas } from "./modules/project/project.schema";
import { projectRoutes } from "./modules/project/project.route";

export function registerRoutes(server: FastifyInstance) {
    const modules = [
        projectSchemas
    ];

    for (const module of modules) {
        for (const schema of module) {
            server.addSchema(schema);
        }
    }

    server.register(projectRoutes, { prefix: '/api/project' })
}
