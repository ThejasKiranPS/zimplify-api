import { FastifyRequest } from "fastify/types/request";
import { ExchangeCodeInput } from "./github-auth.schema";
import { FastifyReply } from "fastify/types/reply";
import { createGithubConfig, exchangeCode, upsertGithubConfig } from "./github-auth.service";

export async function exchangeCodeHandler(
  req: FastifyRequest<{ Body: ExchangeCodeInput }>,
  rep: FastifyReply
) {
  try {
    const accessToken = await exchangeCode(req.body.code);
    const userId = req.user.id;
    if (!userId) {
      throw new Error('User not found');
    }

    await upsertGithubConfig(userId, accessToken);

    rep.send();
  } catch (error) {
    console.log('error => ', error)
    rep.status(500).send({ message: 'Internal Server Error' })
  }
}
