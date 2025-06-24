import { redirect } from 'react-router-dom'
import { z } from 'zod'

export const validator = {
  sign_in: z.object({
    email: z.string().max(256).min(5),
    password: z.string().max(71).min(8)
  }),
  sign_up_form: z.object({
    email: z.string().max(256).min(5),
    password: z.string().max(71).min(8),
    name: z.string().max(100).min(5)
  }),
  link: z.object({
    redirect: z.string().max(1028).min(5)
  })
}