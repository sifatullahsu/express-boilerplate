import { JwtPayload, Secret } from 'jsonwebtoken'
import { Model, Types } from 'mongoose'
import { TQueryExecutor } from 'mongoose-query-maker'
import { TRole } from '../../../global/types'

export type IUser = {
  _id: Types.ObjectId
  name: string
  email: string
  password: string
  role: TRole
  createdAt: Date
  updatedAt: Date
}

export type IUserModel = {
  queryExecutor: TQueryExecutor
  hashGenerator(password: string): Promise<string>
  checkPassword(givenPassword: string, savedPassword: string): Promise<boolean>
  createToken(paylod: Record<string, unknown>, secret: string, expireTime: string): string
  verifyToken(token: string, secret: Secret): JwtPayload
} & Model<IUser>
