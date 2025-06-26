import express from 'express'
import {
  addLink,
  getMyLinks,
  addClicksByLinkId,
  deleteLinkByAuth,
  accessLinkById
} from '../controller/link-controller'

const linkRouter = express.Router()

linkRouter.post('/', addLink)
linkRouter.get('/', getMyLinks)
linkRouter.get('/:id', accessLinkById)
linkRouter.post('/:id', addClicksByLinkId)
linkRouter.delete('/:id', deleteLinkByAuth)

export { linkRouter }