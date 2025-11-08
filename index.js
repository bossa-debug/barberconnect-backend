const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const whatsappRoutes = require("./routes/whatsappRoutes");
app.use("/webhook", whatsappRoutes);

// Rotas
const barberRoutes = require("./routes/barberRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Porta e banco
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// Conexão MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB Atlas"))
  .catch((err) =>
    console.error("❌ Erro ao conectar no MongoDB:", err.message)
  );

// Rota base
app.get("/", (req, res) => res.send("💈 API do BarberConnect rodando!"));

// Rotas principais
app.use("/api/barbers", barberRoutes);
app.use("/api/auth", authRoutes);

// Servidor
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
