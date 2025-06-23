import { createAuthClient } from 'better-auth/client'
import type { auth } from './auth.ts'
import { inferAdditionalFields } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: 'http://192.168.1.107:3000',
  plugins: [inferAdditionalFields<typeof auth>()]
});
