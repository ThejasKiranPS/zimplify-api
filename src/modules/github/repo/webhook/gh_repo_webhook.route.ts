import { FastifyInstance } from "fastify";
import { GH_RepoWebhookHandler } from "./gh_repo_webhook.controller";

export async function GH_RepoWebhookRoutes(server: FastifyInstance) {
  server.post('/', GH_RepoWebhookHandler)
}