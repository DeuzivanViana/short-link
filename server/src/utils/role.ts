import type { Session, User } from 'better-auth'
import { db } from '../lib/database'

export const notHasRole = async (sessino: any, role: string) => {
  const roles = (await db.user.findFirst({
    where: {
      id: sessino.userId
    },
    select: {
      roles: true
    }
  }))?.roles.split(':')

  return roles ? !roles.includes(role) : true
}

export const hasRole = async (sessino: any, role: string) => {
  return !notHasRole(sessino, role)
}