import { createAuthClient } from 'better-auth/react'

export const auth = createAuthClient({
  baseURL: 'http://192.168.1.107:3333',
  basePath: '/api/v1/auth'
})