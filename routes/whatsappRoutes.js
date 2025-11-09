import express from "express";
import axios from "axios";

const router = express.Router();

/**
 * ✅ VERIFICAÇÃO DO WEBHOOK (GET)
 * Essa rota é chamada automaticamente pelo Facebook
 * quando você clica em "Verificar e salvar" no painel da Meta.
 */
router.get("/webhook", (req, res) => {
  try {
    const verify_token = "barberconnect123"; // mesmo token que você colocou no painel Meta

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token) {
      if (mode === "subscribe" && token === verify_token) {
        console.log("✅ Webhook verificado com sucesso!");
        res.status(200).send(challenge);
      } else {
        console.error("❌ Token de verificação incorreto.");
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error("❌ Erro na verificação do webhook:", error.message);
    res.sendStatus(500);
  }
});

/**
 * 💬 RECEBIMENTO DE MENSAGENS (POST)
 * Essa rota é chamada automaticamente toda vez que o WhatsApp envia uma mensagem.
 */
router.post("/webhook", async (req, res) => {
  try {
    const body = req.body;

    if (body.object) {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const message = changes?.value?.messages?.[0];

      if (message) {
        const from = message.from; // número do cliente
        const msg_body = message.text?.body || "";

        console.log("📩 Mensagem recebida de:", from, "-", msg_body);

        // Envia uma resposta automática
        const response = await axios.post(
          `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
          {
            messaging_product: "whatsapp",
            to: from,
            text: {
              body: "Olá! 👋 Aqui é o *BarberConnect* ✂️\n\nQuer agendar um corte? Envie *Agendar*.",
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("✅ Mensagem enviada com sucesso!", response.data);
      }

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("❌ Erro ao processar mensagem:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Detalhes:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Mensagem:", error.message);
    }
    res.sendStatus(500);
  }
});

export default router;
