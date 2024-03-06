import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const createProjectSchema = z.object({
    name: z.string(),
    source: z.string(),
    buildDir: z.string(),
    buildCommand: z.string(),
    rootDir: z.string()
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
