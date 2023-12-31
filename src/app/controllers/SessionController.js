import * as Yup from "yup"
import jwt from "jsonwebtoken"
import User from "../models/User"
import authConfig from "../../config/auth"

class SessionController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        usuario: Yup.string().required(),
        password: Yup.string().required(),
      })

      const useEmailOrPasswordIncorret = () => {
       alert("Usuario e senha não estão corretos")
        return response.status(401).json({
          error: "Usuario e senha não estão corretos",
        })
      }

      if (!(await schema.isValid(request.body))) useEmailOrPasswordIncorret()

      const { usuario, password } = request.body
      const user = await User.findOne({
        where: {
          usuario,
        },
      })


      if (!user) useEmailOrPasswordIncorret()
      if (!(await user.checkPassword(password))) useEmailOrPasswordIncorret()

      return response.status(200).json({
        id: user.id,
        usuario: user.usuario,
        admin: user.admin,
        s2: user.s2,
        token: jwt.sign(
          {
            id: user.id,
            usuario: user.usuario,
            s2: user.s2,
          },
          authConfig.secret,
          {
            expiresIn: authConfig.expiresIn,
          }
        ),
      })
    } catch (err) {
      return response.status(400).json({
        error: err.errors,
      })
    }
  }
}
export default new SessionController()
