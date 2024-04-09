import { TCreate, TDelete, TGet, TQuery, TUpdate } from '../../../global/types'
import { IUser } from './user.interface'
import { User } from './user.model'

const createOperation: TCreate<IUser> = async data => {
  const result = await User.create(data)

  return { data: result }
}

const queryOperation: TQuery<IUser> = async () => {
  const query = {}

  const result = await User.find(query)
  const count = await User.countDocuments(query)

  return {
    meta: { page: 0, limit: 0, count },
    data: result
  }
}

const getOperation: TGet<IUser> = async id => {
  const result = await User.findById(id, '', {
    mongooseNullError: true
  })

  return { data: result }
}

const updateOperation: TUpdate<IUser> = async (id, payload) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    mongooseNullError: true,
    runValidators: true,
    new: true
  })

  return { data: result }
}

const deleteOperation: TDelete<IUser> = async id => {
  const result = await User.findByIdAndDelete(id, {
    mongooseNullError: true
  })

  return { data: result }
}

export const UserService = {
  createOperation,
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
