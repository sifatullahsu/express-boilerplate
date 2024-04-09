import express from 'express'
import { AuthRoute } from '../modules/auth/auth.route'
import { UserRoute } from '../modules/user/user.route'

const AppRouter = express.Router()

AppRouter.use('/api/v1/auth', AuthRoute)
AppRouter.use('/api/v1/users', UserRoute)

export default AppRouter
