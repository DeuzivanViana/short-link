import express from 'express'
import {
  addLink,
  getMyLinks,
  addClicksByLinkId,
  deleteLinkByAuth
} from '../controller/link-controller'

const linkRouter = express.Router()

linkRouter.post('/', addLink)
linkRouter.get('/', getMyLinks)
linkRouter.post('/:id', addClicksByLinkId)
linkRouter.delete('/:id', deleteLinkByAuth)

export { linkRouter }