import * as Yup from "yup"
import User from "../models/User"
import RegisterVisitsSchema from "../schemas/RegisterVisitsSchema"
import VisitsStatusSchema from "../schemas/VisitsStatusSchema"
import Visits from "../models/Visits"
// * CONTOLLER PARA AS REQUISIÇÕES, INFORMAÇÕES DAS ROTAS DE REGISTRO DE VISITAS */

class RegisterVisitsController {
  async store(request, response) {
    try {
      try {
        const schema = Yup.object().shape({
          visitLocal: Yup.string().required(),
          reason: Yup.string().required(),
          vehicle: Yup.bool(),
          plate: Yup.string(),
          brand: Yup.string(),
          model: Yup.string(),
          color: Yup.string(),
          badge: Yup.string().required(),
          dateEntry: Yup.string().required(),
          timeEntry: Yup.string().required(),
          departureDate: Yup.string(),
          departureTime: Yup.string(),
          dayOfTheWeek: Yup.string().required(),
        })

        await schema.validateSync(request.body, {
          abortEarly: false,
        })
      } catch (err) {
        return response.status(400).json({
          error: err.errors,
        })
      }
      // Busca da pessoa resgistrada pelo id
      const { id: visitId } = request.params
      const visit = await Visits.findByPk(visitId)
      // const { visitPeople: { id } } = await VisitsStatusSchema.findOne()

      // if (visit.dataValues.id === id  ) {
      //   return response
      //     .status(400)
      //     .json({
      //       message:
      //         "Não é possivel registrar essa visita, pois existe uma já em andamento",
      //     })
      // }

      const visitsCreate = {
        visitPeople: {
          id: visit.dataValues.id,
          name: visit.dataValues.name,
          email: visit.dataValues.email,
          rg: visit.dataValues.rg,
          path: `http://localhost:3008/visits-file/${visit.dataValues.path}`,
        },
        visitLocal: request.body.visitLocal,
        reason: request.body.reason,
        vehicle: request.body.vehicle,
        plate: request.body.plate,
        brand: request.body.brand,
        model: request.body.model,
        color: request.body.color,
        badge: request.body.badge,
        status: "Visita em andamento",
        dateEntry: request.body.dateEntry,
        departureDate: request.body.departureDate,
        timeEntry: request.body.timeEntry,
        departureTime: request.body.departureTime,
        dayOfTheWeek: request.body.dayOfTheWeek,
      }

      const visitResponse = await RegisterVisitsSchema.create(visitsCreate)
      const visitResponseStatus = await VisitsStatusSchema.create(visitsCreate)
      return response.status(201).json(visitResponse && visitResponseStatus)
    } catch (error) {
      console.log("Erro ao registrar visita", error)
    }
  }

  async index(request, response) {
    try {
      const visits = await RegisterVisitsSchema.find()
      return response.status(200).json(visits)
    } catch (error) {
      console.log("Erro ao buscar visita", error)
    }
  }

  async update(request, response) {
    try {
      const schema = Yup.object().shape({
        status: Yup.string(),
        departureDate: Yup.string(),
        departureTime: Yup.string(),
      })

      await schema.validateSync(request.body, {
        abortEarly: false,
      })
    } catch (err) {
      return response.status(400).json({
        error: err.errors,
      })
    }
    // const { admin: isAdmin } = await User.findByPk(request.userId)

    // if (!isAdmin) {
    //   return response.status(401).json({ message: "Não autorizado" })
    // }
    const { id } = request.params

    const verifyId = RegisterVisitsSchema.findById(id)

    if (!verifyId) {
      console.log("Id não existe")
    }
    const { departureDate, departureTime, status } = request.body
    try {
      await RegisterVisitsSchema.update(
        {
          _id: id,
        },
        {
          departureDate,

          departureTime,
          status,
        }
      )
    } catch (error) {
      return response.status(400).json({
        error: error.message,
      })
    }
    return response.json({
      message: "Atualizado com sucesso!",

      departureDate,
      departureTime,
      status,
    })
  }

  // Rota para deletar
  async delete(request, response) {
    try {
      // Recebe o id como parmetro da requisição
      const { admin: isAdmin } = await User.findByPk(request.userId)

      if (!isAdmin) {
        return response.status(401).json({ message: "Não autorizado" })
      }
      const { id } = request.params
      // Encontra o id e deleta
      await RegisterVisitsSchema.findOneAndDelete({ _id: id })
      // Retorna com sucesso e uma mensagem no formato JSON
      return response.json({ message: "Deletado com sucesso!" })
    } catch (error) {
      console.log("Não foi possível encontrar id", error)
    }
  }
}

export default new RegisterVisitsController()
