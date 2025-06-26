import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../lib/auth'
import { type Request, type Response } from 'express'
import { ApiError } from '../erros/api-error'
import { notHasRole } from '../utils/role'
import { db } from '../lib/database'

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers)})
    const not_has_admin_role = await notHasRole(session, 'admin')

    if(!session?.user) throw new ApiError('Session invalid', 404)

    if(not_has_admin_role) throw new ApiError('You don\' have admin permission to use it', 401)

    const user = db.user.findFirst({
      where: {
        id: id
      }
    })

    if(!user) throw new ApiError('User not found', 404)

    res.status(200).json(user)
  } catch(err) {
    if(err instanceof ApiError) {
      res.status(err.statusCode).json({message: err.message})
    } else {
      res.status(500).json({ message: 'Unknow error'})
    }
  }
}

export const getAllUserByPage = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers)})
    const not_has_admin_role = await notHasRole(session, 'admin')

    if(!session?.user) throw new ApiError('Session invalid', 404)

    if(not_has_admin_role) throw new ApiError('You don\' have admin permission to use it', 401)

    const users = await db.user.findMany()
      
    res.status(200).json(users)
  } catch(err) {
    if(err instanceof ApiError) {
      res.status(err.statusCode).json({message: err.message})
    } else {
      res.status(500).json({ message: 'Unknow error'})
    }
  }
}