import asyncHandler from 'express-async-handler'
import { queryMaker, querySelector } from 'mongoose-query-maker'
import { userAuthRules } from './user.rule'
import { UserService as service } from './user.service'

const getAllData = asyncHandler(async (req, res) => {
  const queryResult = queryMaker(req.query, req.user, userAuthRules)
  const { meta, data } = await service.getAllData(queryResult)

  res.status(200).json({
    success: true,
    message: 'Users fetched successfull.',
    meta,
    data,
    queryResult
  })
})

const getData = asyncHandler(async (req, res) => {
  const queryResult = querySelector(req.query, userAuthRules)
  const { data } = await service.getData(req.params.id, queryResult)

  res.status(200).json({
    success: true,
    message: 'User fetched successfull.',
    data,
    queryResult
  })
})

const createData = asyncHandler(async (req, res) => {
  const result = await service.createData(req.body)

  res.status(200).json({
    success: true,
    message: 'User created successfull.',
    data: result
  })
})

const login = asyncHandler(async (req, res) => {
  const result = await service.login(req.body)

  res.status(200).json({
    success: true,
    message: 'User login successfull.',
    data: result
  })
})

export const UserController = {
  getAllData,
  getData,
  createData,
  login
}
