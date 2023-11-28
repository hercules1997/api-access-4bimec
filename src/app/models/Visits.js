import Sequelize, { Model } from "sequelize"

class Visits extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        rg: Sequelize.STRING,
        cpf: Sequelize.STRING,
        phone: Sequelize.STRING,
        email: Sequelize.STRING,
        gener: Sequelize.STRING,
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
            return `http://localhost:3008/visits-file/${this.path}`
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

export default Visits
