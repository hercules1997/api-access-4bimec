import mongoose from "mongoose"
// * SECHEMA  PARA CRIAÇÃO DA TABELA DE VISITAS NO MONGODB */

const VisitsStatusSchema = new mongoose.Schema(
  {
    visitPeople: {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      rg: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
    visitLocal: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    vehicle: {
      type: Boolean,
      required: true,
    },
    plate: {
      type: String,
      required: false,
    },
    brand: {
      type: String,
      required: false,
    },
    model: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    badge: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    dateEntry: {
      type: String,
      required: true,
    },
    departureDate: {
      type: String,
      required: false,
    },
    timeEntry: {
      type: String,
      required: true,
    },
    departureTime: {
      type: String,
      required: false,
    },
    dayOfTheWeek: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("visitsStatus", VisitsStatusSchema)
