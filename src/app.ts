import compression from 'compression'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import httpStatus from 'http-status'
import { errorHandler, reqUser } from './app/middlewares'
import AppRouter from './app/routes'

const app: Application = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Global Application Routes
app.use('/', reqUser(), AppRouter)

// Global Error Handler
app.use(errorHandler)

// 404 Route Handler
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found'
      }
    ],
    stack: ''
  })
})

export default app
