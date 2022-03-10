const mongoose = require('mongoose');
const axios = require('axios');
const NBABoxScore = require('../model/nbaBoxScore');
const { API_URL } = require('../constants')

const save = async (data) => {
  if (!data._id) {
    data._id = mongoose.Types.ObjectId()
  }
  let response = await NBABoxScore.findByIdAndUpdate(data._id, data, {new: true, upsert: true})
  return response && response._doc ? response._doc : null
}

const get = async (id) => {
  let response = id && id != 'latest' ? await findById(id) : await findLatest()
  return response && response._doc ? response._doc : null
}

const refresh = async (id) => {
  let response = await axios.get(API_URL.NBA)
  return response.data
    ? save({
      ...response.data,
      _id: id ? id : mongoose.Types.ObjectId(),
      updated: new Date()
    })
    : null
}

const findById = async (id) => {
  return await NBABoxScore.findById(id).exec()
}

const findLatest = async () => {
  return await NBABoxScore.findOne().sort({ updated: -1 }).exec()
}

module.exports = { save, get, refresh }