import { FastifyReply, FastifyRequest } from "fastify"

interface GithubConfig {
    accessToken: string
}

declare module "fastify" {
    interface FastifyRequest extends FastifyRequest {
        user: {
            id: string
        }
    }
    interface FastifyReply extends FastifyReply {

    }
}
