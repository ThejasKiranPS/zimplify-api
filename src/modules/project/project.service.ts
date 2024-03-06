import { prisma } from "../../utils/prisma";
import { CreateProjectInput } from "./project.schema";

export async function createProject(data: CreateProjectInput) {
    return await prisma.project.create({
        data
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
