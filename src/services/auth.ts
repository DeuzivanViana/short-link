import { createAuthClient } from 'better-auth/react'

export const auth = createAuthClient({
  baseURL: 'http://192.168.1.107:3333',
})