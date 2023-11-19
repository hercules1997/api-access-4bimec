import * as Yup from "yup"
// import Category from "../models/Category"
import User from "../models/User"
import database from "../../database"
import { Sequelize } from "sequelize"
import Visits from "../models/Visits"

const sequelize = database.connection
class VisitsController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        rg: Yup.string().required(),
        cpf: Yup.string().required(),
        phone: Yup.string().required(),
        email: Yup.string().email().required(),
        birth: Yup.string().required(),
        gener: Yup.string().required(),
        address: Yup.string().required(),
        numberhouse: Yup.string().required(),
        zipcode: Yup.string().required(),
        namemother: Yup.string().required(),
        namefather: Yup.string().required(),
      })

      try {
        await schema.validateSync(request.body, {
          abortEarly: false,
        })
      } catch (err) {
        return response.status(400).json({
          error: err.errors,
        })
      }

      const { admin: isAdmin } = await User.findByPk(request.userId)

      if (!isAdmin) {
        return response.status(401).json({
          message: "Não autorizado",
        })
      }

      const { filename: path } = request?.file
    
      const {
        name,
        rg,
        cpf,
        phone,
        email,
        gener,
        birth,
        address,
        numberhouse,
        zipcode,
        namemother,
        namefather,
      } = request.body

      const people = await Visits.create({
        name,
        rg,
        cpf,
        phone,
        email,
        gener,
        birth,
        address,
        numberhouse,
        zipcode,
        namemother,
        namefather,
        path,
      })

      return (
        
        response.status(201).json(
          people
        )
      )
    } catch (error) {
      console.log("Erro ao criar, verique e tente novamente!", error)
    }
  }

  async index(req, resp) {
    try {
      const allPeopleRegisters = await Visits.findAll()

      return resp.json(allPeopleRegisters)
    } catch (error) {
      console.log("Erro ao buscar todas as pessoas cadastradas", error)
    }
  }

  async delete(req, resp) {
    try {
const deletePpeople = sequelize.define("visits", {
  name: Sequelize.STRING,
  rg: Sequelize.STRING,
  cpf: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
  birth: Sequelize.STRING,
  address: Sequelize.STRING,
  numberhouse: Sequelize.STRING,
  zipcode: Sequelize.STRING,
  namemother: Sequelize.STRING,
  namefather: Sequelize.STRING,
  path: Sequelize.STRING,
  url: {
    type: Sequelize.VIRTUAL,
    get() {
      return `http://localhost:3007/visits-file/${this.path}`
    },
  },
})

      const { id } = req.params
      const peopleId = await Visits.findByPk(id)

      // deletePpeople.destroy({ where: { id: peopleId.dataValues.id } })
      peopleId.destroy({ id })
      return resp.status(200).json({ message: "Pessoa deletada com sucesso!" })
    } catch (error) {
      console.log({ message: "Pessoa deletada com sucesso!" }, error)
    }
  }

  async update(req, resp) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        rg: Yup.string().required(),
        cpf: Yup.string().required(),
        phone: Yup.string().required(),
        email: Yup.email().required(),
        birth: Yup.string().required(),
        gener: Yup.string().required(),
        address: Yup.string().required(),
        numberhouse: Yup.string().required(),
        zipcode: Yup.string().required(),
        namemother: Yup.string().required(),
        namefather: Yup.string().required(),
      })

      try {
        await schema.validateSync(req.body, {
          abortEarly: false,
        })
      } catch (err) {
        return resp.status(400).json({
          error: err.errors,
        })
      }
 const { admin: isAdmin } = await User.findByPk(req.userId)

 if (!isAdmin) {
   return resp.status(401).json({
     message: "Não autorizado",
   })
 }

      const { id } = req.params
      const visit = await Visits.findByPk(id)

      if (!visit) {
        return resp.status(401).json({
          message: "Pessoa não existe",
        })
      }

      let path
      if (req.file) {
        path = req.file.filename
      }

      const {
        name,
        rg,
        cpf,
        phone,
        email,
        gener,
        birth,
        address,
        numberhouse,
        zipcode,
        namemother,
        namefather,
      } = req.body

      await Visitor.update(
        {
          name,
          rg,
          cpf,
          phone,
          email,
          gener,
          birth,
          address,
          numberhouse,
          zipcode,
          namemother,
          namefather,
          path,
        },
        {
          where: {
            id,
          },
        }
      )

      return resp.status(200).json({
        message: "Alterado com sucesso!",
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export default new VisitsController()
