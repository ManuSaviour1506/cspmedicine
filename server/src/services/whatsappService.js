// server/src/services/whatsappService.js
const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendWhatsAppReminder = async (to, body) => {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${to}`,
      body,
    });
    console.log('WhatsApp reminder sent successfully! SID:', message.sid);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};