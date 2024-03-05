import { AuthRules } from 'mongoose-query-maker'
import { IRole } from '../../../interface/main'
import { IUser } from './user.interface'

export const userAuthRules: AuthRules<IUser, IRole> = {
  authentication: [[['admin'], 'OPEN']],
  query: [
    ['name', ['$regex']],
    ['email', ['$eq', '$ne']],
    ['role', ['$eq', '$ne']]
  ],
  select: ['password'],
  populate: []
}
