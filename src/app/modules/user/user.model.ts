import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { IRole } from '../../../interface/main'
import { IUser, IUserModel } from './user.interface'

const xRole: IRole[] = ['super_admin', 'admin', 'buyer', 'seller']

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, required: true, enum: xRole }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.statics.hashGenerator = async password => {
  return await bcrypt.hash(password, Number(config.soltRounds))
}

userSchema.statics.checkPassword = async (givenPassword, savedPassword) => {
  return await bcrypt.compare(givenPassword, savedPassword)
}

userSchema.statics.createToken = (payload, secret, expireTime) => {
  return jwt.sign(payload, secret, { expiresIn: expireTime })
}

userSchema.statics.verifyToken = (token, secret) => {
  return jwt.verify(token, secret) as JwtPayload
}

userSchema.pre('save', async function () {
  this.password = await User.hashGenerator(this.password)
})

export const User = model<IUser, IUserModel>('User', userSchema)
