const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  barberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Barber",
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
