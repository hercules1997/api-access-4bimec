import { v4 } from "uuid"
import * as Yup from "yup"

import User from "../models/User"

class UserController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        usuario: Yup.string(),
        password: Yup.string(),
        admin: Yup.boolean(),
      })

      if (!(await schema.isValid(request.body))) {
        return response.status(400).json({ error: "algo está errado" })
      }

      try {
        await schema.validateSync(request.body, {
          abortEarly: false,
        })
      } catch (err) {
        return response.status(408).json({
          error: err.errors,
        })
      }
    } catch (error) {
      return response.status(405).json({ message: "Usuário não existe",
        })
    }

    const { usuario, password, admin } = request.body

    const userExist = await User.findOne({
      where: {
        usuario,
      },
    })

    if (userExist) {
      return response.status(409).json({
        error: "Esse usuário já existe",
      })
    }

    const user = await User.create({
      id: v4(),
      usuario,
      password,
      admin,
    })

    return response.status(201).json({
      id: user.id,
      usuario,
      admin,
    })
  }

  async index(request, response) {
    try {
      const users = await User.findAll()

      return response.json(users)
    } catch (error) {
      console.log(err)
    }
  }
}

export default new UserController()
