"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

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
      const user = await _User2.default.findOne({
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
        token: _jsonwebtoken2.default.sign(
          {
            id: user.id,
            usuario: user.usuario,
          },
          _auth2.default.secret,
          {
            expiresIn: _auth2.default.expiresIn,
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
exports. default = new SessionController()
