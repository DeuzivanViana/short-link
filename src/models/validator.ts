import { z } from 'zod'

export const validator = {
  sign_in_form: z.object({
    email: z.string().max(256).min(5),
    password: z.string().max(71).min(8)
  }),
  sign_up_form: z.object({
    email: z.string().max(256).min(5),
    password: z.string().max(71).min(8),
  })
}