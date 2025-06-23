import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from './generated/prisma'
import { jwt } from 'better-auth/plugins'
import { betterAuth } from 'better-auth'

const client = new PrismaClient();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(client, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true
  },
  appName: 'short-link',
  plugins: [jwt()],
  trustedOrigins: [
    'http://192.168.1.107',
    'http://localhost'
  ],
  logger: {
    level: 'debug'
  }
});
