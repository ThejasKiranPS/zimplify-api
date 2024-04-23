import { FastifyRequest, FastifyReply } from 'fastify';
import { getGithubConfig } from "../auth/github-auth.service";
import { getRepositories, getRepository } from "./repo.service";
import { RepoNameSchema } from './repo.schema';
import { getAuthenticatedUser } from '../user/gh-user.service';

export async function getGithubReposHandler(
  req: FastifyRequest,
  rep: FastifyReply
) {
  try {
    const userId = req!.user.id;
    const integration = await getGithubConfig(userId);
    const repos = await getRepositories(integration.config.accessToken);
    rep.send(repos)
  } catch (error) {
    console.log('error => ', error)
    rep.status(500).send({ message: 'Internal Server Error' })
  }
}

export async function downloadGithubRepoHandler(
  req: FastifyRequest<{
    Body: RepoNameSchema
  }>,
  rep: FastifyReply
) {

  const userId = req!.user.id;
  const integration = await getGithubConfig(userId);
  const { login } = await getAuthenticatedUser(integration.config.accessToken);

  const res = await getRepository({
    owner: login,
    accessToken: integration.config.accessToken,
    repo: req.body.repo,
  })

  rep.send(res)
}
