import VisitsStatusSchema from "../schemas/VisitsStatusSchema"
// * CONTOLLER PARA AS REQUISIÇÕES, INFORMAÇÕES DAS ROTAS DE REGISTRO DE VISITAS */

class StatusController {
  // Rota para buscar todos os status
  async index(request, response) {
    try {
      // Encontra as visitas no status
      const visits = await VisitsStatusSchema.find()
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
    const verifyId = VisitsStatusSchema.findById(id)

    if(!verifyId) {
      console.log("Id não existe")
    }
    const { departureDate, departureTime, status } = request.body
    try {
      await VisitsStatusSchema.update(
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
      await VisitsStatusSchema.findOneAndDelete({ _id: id })
      // Retorna com sucesso e uma mensagem no formato JSON
      return response.json({ message: "Deletado com sucesso!" })
    } catch (error) {
      console.log("Não foi possível encontrar id", error)
    }
  }
}
export default new StatusController()
