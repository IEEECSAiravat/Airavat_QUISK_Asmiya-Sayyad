import express from 'express';
import { Router } from 'express';
import twilio from 'twilio';
 
const router = Router();
 
const accountSid = 'ACf3f250d3c36ad10413896b4f93ceb832';
const authToken = '09a2dc2875179ecf0d0a84fa83fc7875';
const client = twilio(accountSid, authToken);
 
const WHATSAPP_NUMBER = 'whatsapp:+918530837267'; 
 
const formatJobs = (jobs) => {
  return jobs.slice(0, 5).map((job, index) => (
    `🔹 *${index + 1}. ${job.job_position}*\n🏢 ${job.company_name}\n📍 ${job.job_location}\n🔗 ${job.job_link}\n`
  )).join('\n');
};
 
router.post('/', async (req, res) => {
  const { jobs } = req.body;
 
  if (!jobs || !Array.isArray(jobs)) {
    return res.status(400).json({ error: 'Invalid jobs data' });
  }
 
  const messageBody = `🚀 *Top Job Listings* (${jobs.length} total):\n\n${formatJobs(jobs)}`;
 
  try {
    await client.messages.create({
      from: 'whatsapp:+14155238886', 
      to: WHATSAPP_NUMBER,
      body: messageBody
    });
 
    res.status(200).json({ success: true, message: 'Message sent to WhatsApp' });
  } catch (error) {
    console.error('Twilio Error:', error.message);
    res.status(500).json({ error: 'Failed to send message via WhatsApp' });
  }
});
 
export default router;
 