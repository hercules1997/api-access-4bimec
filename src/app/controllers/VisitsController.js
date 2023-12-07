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
        name: Yup.string(),
        rg: Yup.string(),
        cpf: Yup.string(),
        phone: Yup.string(),
        email: Yup.string().email(),
        birth: Yup.string(),
        gener: Yup.string(),
        address: Yup.string(),
        numberhouse: Yup.string(),
        zipcode: Yup.string(),
        namemother: Yup.string(),
        namefather: Yup.string(),
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



      const { filename: path } = request.file
    
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

  // const { admin: isAdmin } = await User.findByPk(request.userId)

 //  if (!isAdmin) {
 //    return response.status(401).json({
//       message: "Não autorizado",
  //   })
 //  }

      const { id } = req.params
      const peopleId = await Visits.findByPk(id)
console.log(id)
      peopleId.destroy({ id })
      return resp.status(200).json({ message: "Pessoa deletada com sucesso!" })
    } catch (error) {
      console.log({ message: "Pessoa deletada com sucesso!" }, error)
    }
  }

  async update(req, resp) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        rg: Yup.string(),
        cpf: Yup.string(),
        phone: Yup.string(),
        email: Yup.string().email(),
        birth: Yup.string(),
        gener: Yup.string(),
        address: Yup.string(),
        numberhouse: Yup.string(),
        zipcode: Yup.string(),
        namemother: Yup.string(),
        namefather: Yup.string(),
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

      await Visits.update(
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
        message: "Pessoa editada com sucesso!",
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export default new VisitsController()
