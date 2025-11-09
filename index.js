import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import whatsappRoutes from "./routes/whatsappRoutes.js"; // ✅ nome correto

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.send("🚀 BarberConnect API rodando com sucesso!");
});

// Rotas do WhatsApp
app.use("/", whatsappRoutes);

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado ao MongoDB Atlas"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Inicia o servidor
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
