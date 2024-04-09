import { JwtPayload } from 'jsonwebtoken'

export type TRole = 'admin' | 'subscriber'

export type TJwtUser = JwtPayload & {
  _id: string
  email: string
  role: TRole
}

export type TCreate<T> = (data: T) => Promise<{
  data: Partial<T> | null
}>

export type TQuery<T> = () => Promise<{
  data: Partial<T>[] | null
  meta: { page: number; limit: number; count: number }
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
