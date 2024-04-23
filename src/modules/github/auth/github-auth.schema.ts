import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const exchangeCodeInput = z.object({
  code: z.string(),
})

export const {
  schemas: githubAuthSchemas,
  $ref: $ghAuthRef
} = buildJsonSchemas({
  exchangeCodeInput
}, {
  $id: 'github-auth',
})
export type ExchangeCodeInput = z.infer<typeof exchangeCodeInput>
