const mongoose = require("mongoose");

const BarberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialties: {
    type: [String],
    required: true,
  },
  availableDays: {
    type: [String],
    required: true,
  },
  startHour: {
    type: String,
    required: true,
  },
  endHour: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Barber", BarberSchema);
