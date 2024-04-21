import asyncHandler from 'express-async-handler'
import { apiResponse } from '../../../shared'
import { IUser as IType } from './user.interface'
import { User } from './user.model'
import { UserService as service } from './user.service'

const queryOperation = asyncHandler(async (req, res) => {
  const { data, meta } = await service.queryOperation()

  apiResponse<Partial<IType>[]>(res, {
    message: `${User.modelName} fetched successfully.`,
    data,
    meta
  })
})

const getOperation = asyncHandler(async (req, res) => {
  const { data } = await service.getOperation(req.params.id)

  apiResponse<Partial<IType>>(res, {
    message: `${User.modelName} fetched successfully.`,
    data
  })
})

const updateOperation = asyncHandler(async (req, res) => {
  const { data } = await service.updateOperation(req.params.id, req.body)

  apiResponse<Partial<IType>>(res, {
    message: `${User.modelName} updated successfully.`,
    data
  })
})

const deleteOperation = asyncHandler(async (req, res) => {
  const { data } = await service.deleteOperation(req.params.id)

  apiResponse<Partial<IType>>(res, {
    message: `${User.modelName} deleted successfully.`,
    data
  })
})

export const UserController = {
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
