import { createAuthClient } from 'better-auth/client'
import type { auth } from './auth.ts'
import { inferAdditionalFields } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: 'http://192.168.1.107:3333',
  basePath: '/api/v1/auth',
  plugins: [inferAdditionalFields<typeof auth>()]
});
