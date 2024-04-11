import { buildJsonSchemas } from 'fastify-zod';
import {z} from 'zod';

const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    createdAt: z.string(),
})

const createUserSchema = userSchema.omit({id: true, createdAt: true});
const updateUserSchema = userSchema.omit({id: true, createdAt: true, email: true}).partial();
const signInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const {
    schemas: userSchemas,
    $ref: $userRef
} = buildJsonSchemas({
    createUserSchema,
    updateUserSchema,
    signInSchema
}, {
    $id: 'userSchema'
})

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type SignIn = z.infer<typeof signInSchema>;
