import { JwtPayload } from 'jsonwebtoken'

export type TRole = 'admin'

export type TJwtUser = JwtPayload & {
  _id: string
  email: string
  role: TRole
}
