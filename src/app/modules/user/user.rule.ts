import { AuthRules } from 'mongoose-query-maker'
import { TRole } from '../../../global/types'
import { IUser } from './user.interface'

const authRules: AuthRules<IUser, TRole> = {
  authentication: 'OPEN',
  query: [],
  select: ['password'],
  populate: []
}

export const UserRule = {
  authRules
}
