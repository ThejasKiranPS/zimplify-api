import { Project } from "@prisma/client";
import { ProjectStatus } from "../../../types/enums";
import { dAxios } from "../../utils/axios";
import { prisma } from "../../utils/prisma";
import { CreateProjectInput } from "./project.schema";

export async function createProject(userId: string, data: CreateProjectInput) {
  return await prisma.project.create({
    data: {
      userId,
      ...data,
      status: ProjectStatus.deploying
    }
  })
}

export async function getProjects(userId: string) {
  return await prisma.project.findMany({
    where: {
      userId
    }
  })
}

export async function getProjectById(userId: string, projectId: string) {
  return await prisma.project.findUnique({
    where: {
      userId,
      id: projectId
    }
  })
}

export async function deleteProject(userId: string, projectId: string) {
  try {
    const res = await dAxios.delete(`${backend}/project/delete/${projectId}`);
  } catch (e) {
    console.error(e);
  }
  return await prisma.project.delete({
    where: {
      userId,
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
  return await dAxios.post(`${backend}/project/deploy`, project);
}
