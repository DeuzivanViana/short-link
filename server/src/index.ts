import express from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './auth'

const app = express()

app.use(cors({
  origin: 'http://192.168.1.107:3000',
  credentials: true,
  methods: ['get', 'post', 'delete', 'put']
}))
app.all('/api/auth/*splat', toNodeHandler(auth))
app.use(express.json())

app.listen(3333, () => {
  console.log('Backend is running at port 3333...')
})