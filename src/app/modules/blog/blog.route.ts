import { Router } from 'express'
import { validateZod } from '../../middlewares'
import { BlogController as controller } from './blog.controller'
import { BlogZod as zod } from './blog.zod'

const router = Router()

router.get('/', validateZod(zod.queryOperation), controller.queryOperation)
router.get('/:id', validateZod(zod.getOperation), controller.getOperation)
router.patch('/:id', validateZod(zod.updateOperation), controller.updateOperation)
router.delete('/:id', validateZod(zod.deleteOperation), controller.deleteOperation)

export const UserRoute = router
