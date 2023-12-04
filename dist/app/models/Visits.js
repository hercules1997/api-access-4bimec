"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Visits extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        rg: _sequelize2.default.STRING,
        cpf: _sequelize2.default.STRING,
        phone: _sequelize2.default.STRING,
        email: _sequelize2.default.STRING,
        gener: _sequelize2.default.STRING,
        birth: _sequelize2.default.STRING,
        address: _sequelize2.default.STRING,
        numberhouse: _sequelize2.default.STRING,
        zipcode: _sequelize2.default.STRING,
        namemother: _sequelize2.default.STRING,
        namefather: _sequelize2.default.STRING,
        path: _sequelize2.default.STRING,
        url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return `https://10.12.112.24:3008/visits-file/${this.path}` 
          },
        },
      },
      {
        sequelize,
      }
    )
    return this
  }
}

exports. default = Visits
