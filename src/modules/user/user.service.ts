import { prisma } from "../../utils/prisma";
import { CreateUser, UpdateUser } from "./user.schema";

export async function createUser(data: CreateUser) {
    return await prisma.user.create({
        data: data
    })
}

export async function getUser(id: string) {
    return await prisma.user.findUnique({
        where: {
            id: id
        }
    })
}

export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

export async function deleteUser(id: string) {
    return await prisma.user.delete({
        where: {
            id: id
        }
    })
}

export async function updateUser(id: string, data: UpdateUser) {
    return await prisma.user.update({
        where: {
            id: id
        },
        data: data
    })
}