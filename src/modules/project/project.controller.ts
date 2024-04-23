import { FastifyReply, FastifyRequest } from "fastify";
import { ByProjectID, CreateProjectInput } from "./project.schema";
import { createProject, deleteProject, deployProject, getProjectById, getProjects } from "./project.service";

export async function createProjectHandler(
  req: FastifyRequest<{
    Body: CreateProjectInput
  }>,
  res: FastifyReply
) {
  const userId = req.user.id;
  const project = await createProject(userId, req.body)
  project.template = project.template.toLowerCase()
  await deployProject(project);
  console.log('deployed')
  res.send(project)
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
