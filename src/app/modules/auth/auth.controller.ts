import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import { apiResponse } from '../../../shared'
import { IUser } from '../user/user.interface'
import { User } from '../user/user.model'
import { AuthService as service } from './auth.service'

const registration = asyncHandler(async (req, res) => {
  const { data } = await service.registration(req.body)

  apiResponse<Partial<IUser>>(res, {
    success: true,
    status: httpStatus.OK,
    message: `${User.modelName} registration successfully.`,
    data
  })
})

const login = asyncHandler(async (req, res) => {
  const { data } = await service.login(req.body)

  apiResponse<Partial<IUser>>(res, {
    success: true,
    status: httpStatus.OK,
    message: `${User.modelName} login successfully.`,
    data
  })
})

export const AuthController = {
  registration,
  login
}
