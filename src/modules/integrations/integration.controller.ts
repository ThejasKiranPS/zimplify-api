import { FastifyReply, FastifyRequest } from "fastify";
import { ByPlatformSchema } from "./integration.schema";
import { getIntegrationByPlatform } from "./intgeration.service";

export async function getIntegrationByPlatformHandler(
  req: FastifyRequest<{
    Params: ByPlatformSchema
  }>,
  rep: FastifyReply
) {
  const userId = req.user.id;
  console.log('userId => ', userId)
  console.log('platform => ', req.params.platform)
  const integration = await getIntegrationByPlatform({
    userId,
    platform: req.params.platform
  })
  rep.send(integration)
}