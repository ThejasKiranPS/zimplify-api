import { FastifyInstance } from "fastify/types/instance";
import { projectSchemas } from "./modules/project/project.schema";
import { projectRoutes } from "./modules/project/project.route";
import { userRoutes } from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

export function registerRoutes(server: FastifyInstance) {
    const modules = [
        projectSchemas,
        userSchemas
    ];

    for (const module of modules) {
        for (const schema of module) {
            server.addSchema(schema);
        }
    }

    server.register(userRoutes, { prefix: '/api/user' })
    server.register(projectRoutes, { prefix: '/api/project' })
}
