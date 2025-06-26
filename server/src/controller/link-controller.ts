import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../lib/auth'
import { validator } from '../model/validator'
import { type Request, type Response } from 'express'
import { db } from '../lib/database'
import cuid from 'cuid'
import { notHasRole } from '../utils/role'
import { ApiError } from '../erros/api-error'

export const addLink = async (req: Request, res: Response) => {
  try {
    const data = validator.link.parse(req.body)
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers)})
    
    if(!session?.user) throw new ApiError('User not found', 404)
    
    const not_has_write_role = await notHasRole(session?.user, 'write')
    if(not_has_write_role) throw new ApiError('You don\' have permission to use write feature', 401)
      
    const link = await db.link.create({
      data: {
        id: cuid(),
        redirect: data.redirect,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: session?.user.id
      }
    })
      
    res.status(200).json(data)
  } catch(err) {
    if(err instanceof ApiError) {
      res.status(err.statusCode).json({message: err.message})
    } else {
      res.status(500).json({ message: 'Unknow error'})
    }
  }
}


export const getMyLinks = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers)})
    
    if(!session?.user) throw new ApiError('User not found', 404)
    const not_has_write_role = await notHasRole(session?.user, 'read')
    if(not_has_write_role) throw new ApiError('You don\' have permission to use read feature', 401)

    const links = await db.link.findMany({
      where: { userId: session?.user.id }
    })

    res.status(200).json(links)
  } catch(err) {
    if(err instanceof ApiError) {
      res.status(err.statusCode).json({message: err.message})
    } else {
      res.status(500).json({ message: 'Unknow error'})
    }
  }
}

export const accessLinkById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const link = await db.link.findFirst({
      where: {
        id: id
      }
    })

    if(!link) throw new ApiError('Link not found', 404)

    await db.link.update({
      data: {
        clicks: link.clicks + 1
      },
      where: {
        id: link.id
      }
    })

    res.status(200).json(link)
  } catch(err) {
    if(err instanceof ApiError) {
      res.status(err.statusCode).json({message: err.message})
    } else {
      res.status(500).json({ message: 'Unknow error'})
    }
  }

}

export const addClicksByLinkId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const link = await db.link.findFirst({
      where: { id: id }
    })

    if(!link) throw new ApiError('This link does not exist', 404)

    await db.link.update({
      data: {
        clicks: link?.clicks + 1
      },
      where: {
        id: id
      }
    })

    res.status(200).end()
  } catch(err) {
    if(err instanceof ApiError) {
      res.status(err.statusCode).json({message: err.message})
    } else {
      res.status(500).json({ message: 'Unknow error'})
    }
  }
}

export const deleteLinkByAuth = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers)})
    const id = req.params.id
    
    if(!session?.user) throw new ApiError('User not found', 404)
    const not_has_write_role = await notHasRole(session?.user, 'write')

    if(not_has_write_role) throw new ApiError('You don\' have permission to use write feature', 401)
      
    const link = await db.link.delete({
      where: {
        id: id,
        userId: session?.user.id
      }
    })

    res.status(200).json(link)

  } catch(err) {
    if(err instanceof ApiError) {
      res.status(err.statusCode).json({message: err.message})
    } else {
      res.status(500).json({ message: 'Unknow error'})
    }
  }
}