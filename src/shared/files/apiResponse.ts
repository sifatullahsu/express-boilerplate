import { Response } from 'express'

type TApiReponse<T> = {
  success: boolean
  status: number
  message: string
  meta?: {
    page?: number
    limit?: number
    count?: number
  }
  data: Partial<T> | Partial<T>[] | null
}

export const apiResponse = <T>(res: Response, data: TApiReponse<T>): void => {
  const result: TApiReponse<T> = {
    success: data.success,
    status: data.status,
    message: data.message,
    meta: data?.meta && {
      page: data?.meta?.page,
      limit: data?.meta?.limit,
      count: data?.meta?.count
    },
    data: data.data
  }

  res.status(data.status).json(result)
}
