import { JwtPayload } from 'jsonwebtoken'
import { Query, QueryPagination } from 'mongoose-query-maker'

export type TRole = 'admin' | 'subscriber'

export type TJwtUser =
  | (JwtPayload & {
      _id: string
      email: string
      role: TRole
    })
  | null

export type TCreate<T> = (data: T) => Promise<{
  data: Partial<T> | null
}>

export type TQuery<T> = (
  query: Query,
  user: TJwtUser
) => Promise<{
  data: Partial<T>[] | null
  pagination: QueryPagination
}>

export type TGet<T> = (id: string) => Promise<{
  data: Partial<T> | null
}>

export type TUpdate<T> = (
  id: string,
  data: Partial<T>
) => Promise<{
  data: Partial<T> | null
}>

export type TDelete<T> = (id: string) => Promise<{
  data: Partial<T> | null
}>
