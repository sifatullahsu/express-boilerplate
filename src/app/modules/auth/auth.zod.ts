import { z } from 'zod'
import { xPassword, xRole } from '../../../global/constant'

const registration = z.object({
  body: z
    .object({
      name: z.string(),
      email: z.string().email(),
      role: z.enum(xRole as [string]),
      password: z.string().regex(xPassword),
      confirm_password: z.string().regex(xPassword)
    })
    .refine(data => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ['confirm_password']
    })
})

const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().regex(xPassword)
  })
})

export const AuthZod = {
  registration,
  login
}
