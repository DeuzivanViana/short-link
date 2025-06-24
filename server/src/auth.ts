import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from './generated/prisma'
import { jwt } from 'better-auth/plugins'
import { betterAuth } from 'better-auth'

const client = new PrismaClient();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: '/api/v1/auth',
  database: prismaAdapter(client, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true
  },
  appName: 'short-link',
  plugins: [jwt()],
  trustedOrigins: [
    process.env.HOST_URL || 'http://localhost'
  ]
});
