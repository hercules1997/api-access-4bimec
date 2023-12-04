"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _RegisterVisitsSchema = require('../schemas/RegisterVisitsSchema'); var _RegisterVisitsSchema2 = _interopRequireDefault(_RegisterVisitsSchema);
var _VisitsStatusSchema = require('../schemas/VisitsStatusSchema'); var _VisitsStatusSchema2 = _interopRequireDefault(_VisitsStatusSchema);
var _Visits = require('../models/Visits'); var _Visits2 = _interopRequireDefault(_Visits);
// * CONTROLLER PARA AS REQUISIÇÕES, INFORMAÇÕES DAS ROTAS DE REGISTRO DE VISITAS */

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
      const visit = await _Visits2.default.findByPk(visitId)
 

      const visitsCreate = {
        visitPeople: {
          id: visit.dataValues.id,
          name: visit.dataValues.name,
          email: visit.dataValues.email,
          rg: visit.dataValues.rg,
          path: `https//10.12.112.24:3008/visits-file/${visit.dataValues.path}`,
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

      const visitResponse = await _RegisterVisitsSchema2.default.create(visitsCreate)
      const visitResponseStatus = await _VisitsStatusSchema2.default.create(visitsCreate)
      return response.status(201).json(visitResponse && visitResponseStatus)
    } catch (error) {
      console.log("Erro ao registrar visita", error)
    }
  }

  async index(request, response) {
    try {
      const visits = await _RegisterVisitsSchema2.default.find()
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

    const { id } = request.params

    const verifyId = _RegisterVisitsSchema2.default.findById(id)

    if (!verifyId) {
      console.log("Id não existe")
    }
    const { departureDate, departureTime, status } = request.body
    try {
      await _RegisterVisitsSchema2.default.update(
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
      const { admin: isAdmin } = await _User2.default.findByPk(request.userId)

      if (!isAdmin) {
        return response.status(401).json({ message: "Não autorizado" })
      }
      const { id } = request.params
      // Encontra o id e deleta
      await _RegisterVisitsSchema2.default.findOneAndDelete({ _id: id })
      // Retorna com sucesso e uma mensagem no formato JSON
      return response.json({ message: "Deletado com sucesso!" })
    } catch (error) {
      console.log("Não foi possível encontrar id", error)
    }
  }
}

exports. default = new RegisterVisitsController()
