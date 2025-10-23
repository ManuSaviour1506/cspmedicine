// server/src/jobs/reminderScheduler.js
const cron = require('node-cron');
const Medicine = require('../models/Medicine.js');
const User = require('../models/User.js');
const { sendEmailReminder } = require('../services/emailService.js');
const { sendWhatsAppReminder } = require('../services/whatsappService.js');

// Cron job to run every minute
cron.schedule('* * * * *', async () => {
  const now = new Date();
  // Format current time to match the 'time' field in your Medicine model
  const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

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