// server/src/services/whatsappService.js
const twilio = require('twilio');

// Check if credentials exist before creating the client
const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;

let client;
if (TWILIO_SID && TWILIO_AUTH_TOKEN) {
  client = new twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
} else {
  console.warn('WARNING: TWILIO_SID or TWILIO_AUTH_TOKEN not set. WhatsApp reminders are disabled.');
}

exports.sendWhatsAppReminder = async (to, body) => {
  if (!client || !TWILIO_WHATSAPP_NUMBER) {
    console.error('WhatsApp reminder skipped: Client or WHATSAPP_NUMBER not initialized due to missing credentials.');
    return;
  }
  
  try {
    const message = await client.messages.create({
      from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
      body,
    });
    console.log('WhatsApp reminder sent successfully! SID:', message.sid);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};