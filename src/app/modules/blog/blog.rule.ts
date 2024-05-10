import { AuthRules } from 'mongoose-query-maker'
import { TRole } from '../../../global/types'
import { IBlog } from './blog.interface'

const authRules: AuthRules<IBlog, TRole> = {
  authentication: 'OPEN',
  query: [],
  select: [],
  populate: []
}

export const BlogRule = {
  authRules
}
