import httpStatus from 'http-status'
import config from '../../../config'
import { ApiError } from '../../../shared'
import { IUser as IType } from '../user/user.interface'
import { User as Model } from '../user/user.model'

const registration = async (data: IType) => {
  const result = await Model.create(data)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userinfo } = result.toObject()

  return { data: userinfo }
}

const login = async (data: Pick<IType, 'email' | 'password'>) => {
  // get user information
  const result = await Model.findOne({ email: data.email }).select('+password')

  if (!result) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
  }

  // password verification
  const isPasswordValid = await Model.checkPassword(data.password, result.password)

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, createdAt, updatedAt, ...userinfo } = result.toObject()

  // generate tokens
  const tokenData = { _id: userinfo._id, role: userinfo.role }
  const accessToken = Model.createToken(tokenData, config.jwt.secret!, config.jwt.expiresIn!)
  const refreshToken = Model.createToken(tokenData, config.jwt.secret!, config.jwt.expiresIn!)

  const payload = {
    ...userinfo,
    access_token: accessToken,
    refresh_token: refreshToken
  }

  return { data: payload }
}

export const AuthService = {
  registration,
  login
}
