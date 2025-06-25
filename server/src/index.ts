import express from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth'
import { rateLimit } from 'express-rate-limit'
import { linkRouter } from './routes/link-routes'

const app = express()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-8',
	legacyHeaders: false,
})

app.use(cors({
  origin: 'http://192.168.1.107:3000',
  credentials: true
}))

app.all('/api/v1/auth/*splat', toNodeHandler(auth))
app.use(express.json())
app.use(limiter)

app.use('/api/v1/link', linkRouter)

app.listen(3333, () => {
  console.log('Backend is running at port 3333...')
})