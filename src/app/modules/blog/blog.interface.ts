import { Model, Types } from 'mongoose'
import { TQueryExecutor } from 'mongoose-query-maker'

export type IBlog = {
  _id: Types.ObjectId
  title: string
  description: string
  user: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export type IBlogModel = {
  queryExecutor: TQueryExecutor
} & Model<IBlog>
