import { Project } from "@prisma/client";
import { ProjectStatus } from "../../../types/enums";
import { dAxios } from "../../utils/axios";
import { prisma } from "../../utils/prisma";
import { CreateProjectInput } from "./project.schema";

export async function createProject(data: CreateProjectInput) {
  return await prisma.project.create({
    data: {
      ...data,
      status: ProjectStatus.deploying
    }
  })
}

export async function getProjects() {
  return await prisma.project.findMany({})
}

export async function getProjectById(projectId: string) {
  return await prisma.project.findUnique({
    where: {
      id: projectId
    }
  })
}

export async function deleteProject(projectId: string) {
  return await prisma.project.delete({
    where: {
      id: projectId
    }
  })
}

const backend = `https://go.zimplify.tech`
export async function getProjectStatus(projectId: string) {
  const data = (await dAxios.get(projectId)).data;
  return data;
}

export async function deployProject(project: Project) {
  console.log('deploying', project)
  return await dAxios.post(`${backend}/deploy`, project);
}
