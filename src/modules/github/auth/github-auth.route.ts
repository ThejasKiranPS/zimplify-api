import { FastifyInstance } from "fastify/types/instance";
import { $ghAuthRef } from "./github-auth.schema";
import { exchangeCodeHandler } from "./github-auth.controller";
import { verifySession } from "../../../utils/auth";

export async function githubAuthRoutes(server: FastifyInstance) {

  server.addHook('preHandler', verifySession)
  server.post(
    '/exchange-code',
    {
      schema: {
        body: $ghAuthRef('exchangeCodeInput')
      }
    },
    exchangeCodeHandler
  )
}
