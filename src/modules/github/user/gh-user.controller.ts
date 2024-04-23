import { FastifyRequest, FastifyReply } from "fastify";
import { getGithubConfig } from "../auth/github-auth.service";
import { getAuthenticatedUser } from "./gh-user.service";

export async function getAuthenticatedGithubUserHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const userId  = request.user.id;
    const githubConfig = await getGithubConfig(userId);

    const res = await getAuthenticatedUser(githubConfig.config.accessToken);
    reply.send(res);
}
