// server/src/jobs/reminderScheduler.js
const cron = require('node-cron');
const Medicine = require('../models/Medicine.js');
const User = require('../models/User.js');
const { sendEmailReminder } = require('../services/emailService.js');
const { sendWhatsAppReminder } = require('../services/whatsappService.js');

// Cron job to run every minute
cron.schedule('* * * * *', async () => {
  const now = new Date();
  // FIX: Use a safe, explicit HH:MM (24-hour) format independent of the server's locale.
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  try {
    const reminders = await Medicine.find({ time: currentTime }).populate('userId');

    reminders.forEach(async (rem) => {
      const user = rem.userId;
      if (user) {
        const message = `Hi ${user.name}, it's time to take your ${rem.name} dose.`;

        // Send email if user has an email
        if (user.email) {
          await sendEmailReminder(user.email, 'MedEase Reminder', message);
        }

        // Send WhatsApp message if user has a phone number
        if (user.phone) {
          await sendWhatsAppReminder(user.phone, message);
        }
      }
    });
  } catch (error) {
    console.error('Error in reminder scheduler:', error);
  }
});