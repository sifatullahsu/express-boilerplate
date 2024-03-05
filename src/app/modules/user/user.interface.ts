import { JwtPayload, Secret } from 'jsonwebtoken'
import { Model } from 'mongoose'
import { IRole } from '../../../interface/main'

export type IUser = {
  name: string
  email: string
  password: string
  role: IRole
}

export type IUserModel = {
  hashGenerator(password: string): Promise<string>
  checkPassword(givenPassword: string, savedPassword: string): Promise<boolean>
  createToken(paylod: Record<string, unknown>, secret: string, expireTime: string): string
  verifyToken(token: string, secret: Secret): JwtPayload
} & Model<IUser>
