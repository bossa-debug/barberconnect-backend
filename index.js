const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const barberRoutes = require("./routes/barberRoutes");
const whatsappRoutes = require("./routes/whatsappRoutes"); // <-- aqui está certo

dotenv.config();

const app = express(); // <-- precisa vir antes de usar app.use()

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/barbers", barberRoutes);
app.use("/webhook", whatsappRoutes); // <-- agora está seguro

// Porta e conexão com o banco
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB Atlas"))
  .catch((err) =>
    console.error("❌ Erro ao conectar no MongoDB:", err.message)
  );

app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
