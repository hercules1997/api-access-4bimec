import express from "express"
import routes from "./routes"

import {
  resolve
} from "path"
import cors from 'cors'

import "./database"

class App {
  constructor() {
    this.app = express()
    this.app.use(cors({
      origin: 'https://10.12.112.24'
    }))
 

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(
      "/visits-file",
      express.static(resolve(__dirname, "..", "uploads"))
    )
  }

  routes() {
    this.app.use(routes)
  }
}

export default new App().app