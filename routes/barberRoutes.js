const express = require("express");
const Barber = require("../models/Barber");
const auth = require("../middleware/auth");
const router = express.Router();

// Criar barbeiro
router.post("/", auth, async (req, res) => {
  try {
    const { name, specialties, availableDays, startHour, endHour } = req.body;
    const barber = new Barber({
      name,
      specialties,
      availableDays,
      startHour,
      endHour,
    });
    await barber.save();
    res
      .status(201)
      .json({ message: "Barbeiro cadastrado com sucesso!", barber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar barbeiros
router.get("/", async (req, res) => {
  const barbers = await Barber.find();
  res.json(barbers);
});

// Buscar barbeiro por ID
router.get("/:id", async (req, res) => {
  try {
    const barber = await Barber.findById(req.params.id);
    if (!barber)
      return res.status(404).json({ message: "Barbeiro não encontrado" });
    res.json(barber);
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
});

// Atualizar barbeiro
router.put("/:id", auth, async (req, res) => {
  try {
    const barber = await Barber.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!barber)
      return res.status(404).json({ message: "Barbeiro não encontrado" });
    res.json(barber);
  } catch (err) {
    res.status(400).json({ error: "Erro ao atualizar" });
  }
});

// Deletar barbeiro
router.delete("/:id", auth, async (req, res) => {
  try {
    await Barber.findByIdAndDelete(req.params.id);
    res.json({ message: "Barbeiro removido" });
  } catch (err) {
    res.status(400).json({ error: "Erro ao excluir" });
  }
});

module.exports = router;
