import { FastifyRequest, FastifyReply } from 'fastify';
import { getGithubConfig } from "../auth/github-auth.service";
import { getRepositories, getRepository, getRepositoryDownloadLink } from "./repo.service";
import { RepoIdSchema, RepoNameSchema } from './repo.schema';
import { getAuthenticatedUser } from '../user/gh-user.service';
import { ByProjectID } from '../../project/project.schema';
import { getProjectById } from '../../project/project.service';
import { prisma } from '../../../utils/prisma';

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
    Params: ByProjectID
  }>,
  rep: FastifyReply
) {

  const project = await prisma.project.findUnique({
    where: {
      id: req.params.projectId
    }
  })
  if (!project) {
    req.log.error('Project not found');
    return rep.status(404).send({ message: 'Project not found' })
  }
  const integration = await getGithubConfig(project.userId);
  if (!integration) {
    req.log.error('Integration not found');
    return rep.status(404).send({ message: 'Integration not found' })
  }

  if (!project.source?.github?.repo) {
    throw new Error('Repo not found')
  }
  const repo = await getRepository(integration.config.accessToken, project.source?.github?.repo)

  const res = await getRepositoryDownloadLink({
    owner: repo.owner.login,
    accessToken: integration.config.accessToken,
    repo: repo.name,
  })

  rep.send(res)
}
