import { TCreate, TDelete, TGet, TQuery, TUpdate } from '../../../global/types'
import { IBlog as IType } from './blog.interface'
import { Blog as Model } from './blog.model'
import { BlogRule as rule } from './blog.rule'

const createOperation: TCreate<IType> = async data => {
  const result = await Model.create(data)

  return { data: result }
}

const queryOperation: TQuery<IType> = async (query, user) => {
  const result = await Model.queryExecutor(query, user, rule.authRules)

  return {
    data: result.data,
    pagination: result.pagination
  }
}

const getOperation: TGet<IType> = async id => {
  const result = await Model.findById(id, '', {
    mongooseNullError: true
  })

  return { data: result }
}

const updateOperation: TUpdate<IType> = async (id, payload) => {
  const result = await Model.findByIdAndUpdate(id, payload, {
    mongooseNullError: true,
    runValidators: true,
    new: true
  })

  return { data: result }
}

const deleteOperation: TDelete<IType> = async id => {
  const result = await Model.findByIdAndDelete(id, {
    mongooseNullError: true
  })

  return { data: result }
}

export const BlogService = {
  createOperation,
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
