import { buildJsonSchemas } from 'fastify-zod';
import {z} from 'zod';

const repoNameSchema = z.object({
    repo: z.string()
})

export const {schemas: gh_repoSchemas, $ref: $ghRepoRef} = buildJsonSchemas({
    repoNameSchema
}, {
    $id: 'gh-repo'
})

export type RepoNameSchema = z.infer<typeof repoNameSchema>
