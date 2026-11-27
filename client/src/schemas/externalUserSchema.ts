
import { z } from 'zod'

export const externalUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  company: z.object({
    name: z.string(),
  }),
})

export const externalUsersSchema = z.array(externalUserSchema)

export type ExternalUser = z.infer<typeof externalUserSchema>
