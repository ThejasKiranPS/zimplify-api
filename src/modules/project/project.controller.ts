import { FastifyReply, FastifyRequest } from "fastify";
import { ByProjectID, CreateProjectInput } from "./project.schema";
import { createProject, deleteProject, deployProject, getProjectById, getProjects } from "./project.service";
import { getRepository } from "../github/repo/repo.service";
import { getIntegrationByPlatform } from "../integrations/intgeration.service";
import { ProjectSourceType } from "../../../types/enums";
import { GithubConfig } from "../../../types/types";
import { subscribeToGHRepoWebhook } from "../github/repo/webhook/gh_repo_webhook.service";
import { getEnv } from "../../utils/env";

const API_URL = getEnv(`API_URL`)
export async function createProjectHandler(
  req: FastifyRequest<{
    Body: CreateProjectInput
  }>,
  res: FastifyReply
) {
  const userId = req.user.id;
  const project = await createProject(userId, req.body)
  project.template = project.template.toLowerCase()
  if (project.source.type === ProjectSourceType.GITHUB) {
    const integration = await getIntegrationByPlatform({ userId, platform: project.source.type })
    if (!integration) {
      req.log.error('Integration not found')
      return res.status(404).send({ message: 'Integration not found' })
    }
    const { accessToken } = integration.config as GithubConfig
    if (!project.source.github?.repo) {
      throw new Error('Repo not found in project source')
    }
    const repo = await getRepository(accessToken, project.source.github?.repo)
    if (!repo) {
      req.log.error('Repo not found')
      return res.status(404).send({ message: 'Repo not found' })
    }
    res.send(project)
    req.log.trace('Subscribing to push event for repo %s', "")
    await subscribeToGHRepoWebhook({
      accessToken,
      owner: repo.owner.login,
      repoName: repo.name,
      webhookUrl: `${API_URL}/api/github/webhook`,
    })
  }
  req.log.trace('Deploying project \n', project)
  await deployProject(project);
  req.log.trace('Project deployed successfully')
}

export async function getProjectByIdHandler(
  req: FastifyRequest<{
    Params: ByProjectID
  }>,
  res: FastifyReply
) {
  const userId = req.user.id;
  const project = await getProjectById(userId, req.params.projectId);
  res.send(project);
}

export async function getProjectsHandler
  (
    req: FastifyRequest,
    res: FastifyReply
  ) {
  const userId = req.user.id;
  const projects = await getProjects(userId);
  res.send(projects)
}

export async function deleteProjectHandler(
  req: FastifyRequest<{
    Params: ByProjectID
  }>,
  res: FastifyReply
) {
  const userId = req.user.id;
  return await deleteProject(userId, req.params.projectId)
}
