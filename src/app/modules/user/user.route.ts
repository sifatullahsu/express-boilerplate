import { Router } from 'express'
import { validateRole } from '../../middlewares/validateRole'
import { UserController as controller } from './user.controller'

const router = Router()

router.get('/', controller.getAllData)
router.get('/:id', controller.getData)
router.post('/', validateRole(['super_admin']), controller.createData)
router.post('/auth/login', controller.login)

export const UserRoute = router
