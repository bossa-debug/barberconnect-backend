const express = require("express");
const axios = require("axios");
const router = express.Router();

// 🔹 Verificação do Webhook (necessário para a Meta)
router.get("/", (req, res) => {
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === verifyToken) {
    console.log("✅ Webhook verificado com sucesso!");
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
});

// 🔹 Receber mensagens e responder automaticamente
router.post("/", async (req, res) => {
  try {
    const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message) return res.sendStatus(200);

    const from = message.from; // número do cliente
    const text = message.text?.body || "";

    let reply =
      "Olá! 👋 Aqui é o BarberConnect ✂️\nQuer agendar um corte? Envie 'Agendar'.";

    if (text.toLowerCase().includes("agendar")) {
      reply = "Perfeito! Me diga o dia e horário que você gostaria 💈";
    }

    await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.FROM_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: from,
        text: { body: reply },
      },
      { headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` } }
    );

    console.log("💬 Mensagem recebida e respondida!");
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Erro ao processar mensagem:", err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
