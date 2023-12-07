"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _VisitsStatusSchema = require('../schemas/VisitsStatusSchema'); var _VisitsStatusSchema2 = _interopRequireDefault(_VisitsStatusSchema);
// * CONTOLLER PARA AS REQUISIÇÕES, INFORMAÇÕES DAS ROTAS DE REGISTRO DE VISITAS */

class StatusController {
  // Rota para buscar todos os status
  async index(request, response) {
    try {
      // Encontra as visitas no status
      const visits = await _VisitsStatusSchema2.default.find()
      return response.status(200).json(visits)
    } catch (error) {
      console.log("Erro ao buscar status", error)
    }
  }

  async update(request, response) {
    try {
      const schema = Yup.object().shape({
        status: Yup.string(),
        departureDate: Yup.string().required(),
        departureTime: Yup.string().required(),
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
    const verifyId = _VisitsStatusSchema2.default.findById(id)

    if(!verifyId) {
      console.log("Id não existe")
    }
    const { departureDate, departureTime, status } = request.body
    try {
      await _VisitsStatusSchema2.default.update(
        {
          _id: verifyId,
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
      const { id } = request.params
      // Encontra o id e deleta
      await _VisitsStatusSchema2.default.findOneAndDelete({ _id: id })
      // Retorna com sucesso e uma mensagem no formato JSON
      return response.json({ message: "Deletado com sucesso!" })
    } catch (error) {
      console.log("Não foi possível encontrar id", error)
    }
  }
}
exports. default = new StatusController()
