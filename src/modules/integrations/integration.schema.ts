import { z } from 'zod'
import { IntegrationPlatform } from '../../../types/enums'

const byPlatformSchema = z.object({
  platform: z.nativeEnum(IntegrationPlatform)
})

export type ByPlatformSchema = z.infer<typeof byPlatformSchema>