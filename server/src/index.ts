import express from 'express'
import cors from 'cors'
import { fromNodeHeaders, toNodeHandler } from 'better-auth/node'
import { auth } from './auth'
import { validator } from './models/validator'
import { authClient } from './auth-client'
import { db } from './lib/database'
import cuid from 'cuid'

const app = express()

app.use(cors({
  origin: 'http://192.168.1.107:3000',
  credentials: true
}))
app.all('/api/v1/auth/*splat', toNodeHandler(auth))
app.use(express.json())

app.post('/api/v1/link', async (req, res) => {
  try {
    const data = validator.link.parse(req.body)
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers )})
    
    // TODO - Specify owner ID
    const link = await db.link.create({
      data: {
        id: cuid(),
        redirect: data.redirect,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    if(link) {
      res.status(200).json(data)

    } else {
      throw Error('Unknow error')

    }
  } catch(err) {

    res.status(500).end()
  }
})

app.listen(3333, () => {
  console.log('Backend is running at port 3333...')
})