"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _uuid = require('uuid');
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

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

    const userExist = await _User2.default.findOne({
      where: {
        usuario,
      },
    })

    if (userExist) {
      return response.status(409).json({
        error: "Esse usuário já existe",
      })
    }

    const user = await _User2.default.create({
      id: _uuid.v4.call(void 0, ),
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
      const users = await _User2.default.findAll()

      return response.json(users)
    } catch (error) {
      console.log(err)
    }
  }

  async update(req, res) {
    try {
      const { name, s2, usuario, admin, password } = req.body

      const user = await _User2.default.findByPk(req.params.id)

      if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado." })
      }

      // Atualiza os campos não relacionados à senha
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
      const { id } = req.params
      const idUser = await _User2.default.findByPk(id)

      idUser.destroy({ id })
      return resp.status(200).json({ message: "Pessoa deletada com sucesso!" })
    } catch (error) {
      console.log({ message: "Pessoa deletada com sucesso!" }, error)
    }
  }
}

exports. default = new UserController()
