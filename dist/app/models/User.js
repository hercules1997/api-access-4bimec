"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        usuario: _sequelize2.default.STRING,
        password: _sequelize2.default.VIRTUAL,
        password_hash: _sequelize2.default.STRING,
        admin: _sequelize2.default.BOOLEAN,
      },
      {
        sequelize,
      }
    )

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await _bcrypt2.default.hash(user.password, 5)
      }
    })

    return this
  }
  checkPassword(password) {
    return _bcrypt2.default.compare(password, this.password_hash)
  }
}

exports. default = User
