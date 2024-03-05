/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../../config'
import { ICreateData, IGetAll, IGetData, ILogin } from '../../../interface/main'
import { IUser } from './user.interface'
import { User } from './user.model'

const getAllData: IGetAll<IUser> = async queryResult => {
  const { query, pagination, select, populate } = queryResult
  const { page, limit, skip, sort } = pagination

  const result = await User.find(query, select, { limit, skip, sort, populate })
  const count = await User.countDocuments(query)

  return {
    meta: { page, limit, count },
    data: result
  }
}

const getData: IGetData<IUser> = async (id, queryResult) => {
  const { select, populate } = queryResult
  const result = await User.findById(id, select, { populate })

  return { data: result }
}

const createData: ICreateData<IUser> = async data => {
  return await User.create(data)
}

export const login: ILogin = async data => {
  // get user information
  const result = await User.findOne({ email: data.email }).select('+password')
  if (!result) throw new Error('Unauthorized access')

  // password verification
  const isPasswordValid = await User.checkPassword(data.password, result.password)
  if (!isPasswordValid) throw new Error('Unauthorized access.')

  const { password: removePassword, ...userinfo } = result.toObject()

  // generate tokens
  const tokenData = { _id: userinfo._id, role: userinfo.role }
  const accessToken = User.createToken(tokenData, config.jwt.secret!, config.jwt.expiresIn!)

  const payload = {
    ...userinfo,
    accessToken
  }

  return payload
}

export const UserService = {
  getAllData,
  getData,
  createData,
  login
}
