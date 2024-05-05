import { ProjectSourceType } from "./enums";

export interface GithubConfig {
    accessToken: string
}


export interface ProjectSource {
    type: ProjectSourceType;
    github?: {
        repo: number;
        branch: string;
    }
}

declare global {
    namespace PrismaJson {
        type PProjectSource = ProjectSource
    }
}

declare module "fastify" {
    interface FastifyRequest {
        user: {
            id: string
        }
    }
    interface FastifyReply {

    }
}
