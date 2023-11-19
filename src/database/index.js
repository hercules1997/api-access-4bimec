import Sequelize from "sequelize"
import mongoose from "mongoose"

import User from "../app/models/User"

import configDatabase from "../config/database"
import Visits from "../app/models/Visits"

const models = [User, Visits]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }

  mongo() {
    mongoose.set("strictQuery", false)
    this.mongoConnection = mongoose.connect("mongodb://localhost:27017/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
}

export default new Database()
