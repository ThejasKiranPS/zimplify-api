import { buildJsonSchemas } from 'fastify-zod';
import {z} from 'zod';

const repoNameSchema = z.object({
    repo: z.string()
})
const repoIdSchema = z.object({
    repoId: z.number()
})

export const {schemas: gh_repoSchemas, $ref: $ghRepoRef} = buildJsonSchemas({
    repoNameSchema,
    repoIdSchema
}, {
    $id: 'gh-repo'
})

export type RepoNameSchema = z.infer<typeof repoNameSchema>
export type RepoIdSchema = z.infer<typeof repoIdSchema>
