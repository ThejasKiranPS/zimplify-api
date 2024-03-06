import { FastifyReply, FastifyRequest } from "fastify";
import { ByProjectID, CreateProjectInput } from "./project.schema";
import { createProject, getProjectById, getProjects } from "./project.service";

export async function createProjectHandler(
    req: FastifyRequest<{
        Body: CreateProjectInput
    }>,
    res: FastifyReply
) {
    const project =  await createProject(req.body)
    res.send(project)
}

export async function getProjectByIdHandler(
    req: FastifyRequest<{
        Params: ByProjectID
    }>,
    res: FastifyReply
) {
    const project = await getProjectById(req.params.projectId);
    res.send(project);
}

export async function getProjectsHandler
(
    req: FastifyRequest,
    res: FastifyReply
) {
    const projects = await getProjects();
    res.send(projects)
}
