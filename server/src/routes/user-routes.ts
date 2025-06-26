import express from 'express'
import {
  getAllUserByPage,
  getUserById
} from '../controller/user-controller'

const userRouter = express.Router()

userRouter.get('/:id', getUserById)
userRouter.get('/', getAllUserByPage)

export { userRouter }