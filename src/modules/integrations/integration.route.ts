import { FastifyInstance } from "fastify";
import { verifySession } from "../../utils/auth";
import { getIntegrationByPlatformHandler } from "./integration.controller";

export async function integrationRoutes(server: FastifyInstance) {
  server.addHook('preHandler', verifySession)

  server.get('/:platform', getIntegrationByPlatformHandler);
}