import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';
import { ProjectSourceType } from '../../../types/enums';

const createProjectSchema = z.object({
    name: z.string(),
    source: z.object({
        type: z.nativeEnum(ProjectSourceType),
        github: z.object({
            repo: z.number(),
        }).optional()
    }),
    buildDir: z.string(),
    buildCommand: z.string(),
    rootDir: z.string(),
    subDomain: z.string(),
    template: z.string(),
    env: z.string()
})

const byProjectId = z.object({
    projectId: z.string()
})

export const {
    schemas: projectSchemas,
    $ref: $projectRef
} = buildJsonSchemas({
    createProjectSchema,
    byProjectId
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type ByProjectID = z.infer<typeof byProjectId>;
