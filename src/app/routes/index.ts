import express from 'express'
import { CourseRoute } from '../modules/course/course.route'
import { UserRoute } from '../modules/user/user.route'

const AppRouter = express.Router()

AppRouter.use('/api/courses', CourseRoute)
AppRouter.use('/api/users', UserRoute)

export default AppRouter
