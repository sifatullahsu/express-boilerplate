import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import { apiResponse } from '../../../shared'
import { IUser } from '../user/user.interface'
import { AuthService as service } from './auth.service'

const registration = asyncHandler(async (req, res) => {
  const { data } = await service.registration(req.body)

  apiResponse<Partial<IUser>>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'User registration successfull.',
    data
  })
})

const login = asyncHandler(async (req, res) => {
  const { data } = await service.login(req.body)

  apiResponse<Partial<IUser>>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'User login successfull.',
    data
  })
})

export const AuthController = {
  registration,
  login
}
