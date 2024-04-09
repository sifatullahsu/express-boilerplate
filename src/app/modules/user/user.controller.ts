import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import { apiResponse } from '../../../shared'
import { IUser } from './user.interface'
import { UserService as service } from './user.service'

const queryOperation = asyncHandler(async (req, res) => {
  const { data, meta } = await service.queryOperation()

  apiResponse<Partial<IUser>[]>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'User fetched successfull.',
    data,
    meta
  })
})

const getOperation = asyncHandler(async (req, res) => {
  const { data } = await service.getOperation(req.params.id)

  apiResponse<Partial<IUser>>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'User fetched successfull.',
    data
  })
})

const updateOperation = asyncHandler(async (req, res) => {
  const { data } = await service.updateOperation(req.params.id, req.body)

  apiResponse<Partial<IUser>>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'User updated successfull.',
    data
  })
})

const deleteOperation = asyncHandler(async (req, res) => {
  const { data } = await service.deleteOperation(req.params.id)

  apiResponse<Partial<IUser>>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'User deleted successfull.',
    data
  })
})

export const UserController = {
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
