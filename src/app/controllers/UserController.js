import { v4 } from "uuid"
import * as Yup from "yup"

import User from "../models/User"

class UserController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        usuario: Yup.string().required(),
        password: Yup.string().required(),
        admin: Yup.boolean().required(),
        s2: Yup.boolean(),
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
      return response.status(405).json({ message: "Usuário não existe" })
    }

    const { name, s2, usuario, password, admin } = request.body

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
      name,
      usuario,
      password,
      admin,
      s2
    })

    return response.status(201).json({
      id: user.id,
      name,
      usuario,
      password,
      admin,
      s2
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

  async update(req, res) {
    try {
      const { name, s2, usuario, admin, password } = req.body

      const user = await User.findByPk(req.params.id)

      if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado." })
      }

      // Atualiza os campos 
      user.name = name
  
      user.usuario = usuario

      user.admin = admin
      user.s2 = s2


      // Se a senha estiver presente na requisição, atualiza o hash da senha
      if (password) {
        user.password = password
      }

      await user.save()

      return res.json(user)
    } catch (err) {
      return res.status(400).json({ error: "Erro ao atualizar usuário." })
    }
  }

  async delete(req, resp) {
    try {
      const {id}  = req.params
      const idUser = await User.findByPk(id)

      idUser.destroy({ id })
      return resp.status(200).json({ message: "Pessoa deletada com sucesso!" })
    } catch (error) {
      console.log({ message: "Erro ao  deletar pessoa!" }, error)
    }
  }
}

export default new UserController()
