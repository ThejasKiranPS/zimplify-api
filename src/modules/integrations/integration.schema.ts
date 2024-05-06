import { z } from 'zod'
import { ProjectSourceType } from '../../../types/enums'

const byPlatformSchema = z.object({
  platform: z.nativeEnum(ProjectSourceType)
})

export type ByPlatformSchema = z.infer<typeof byPlatformSchema>