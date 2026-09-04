// Simple backend for a portfolio contact form.
// Receives contact form submissions, validates them, and stores them
// in a local JSON file (messages.json). Swap the storage logic for a
// real database or email service later if you need to.

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

app.use(cors());          // allow the frontend (different origin) to call this API
app.use(express.json());  // parse JSON request bodies

// Make sure the storage file exists
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, '[]');
}

// Health check — useful to confirm the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are all required.' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const entry = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  };

  try {
    const existing = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
    existing.push(entry);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error('Failed to save message:', err);
    return res.status(500).json({ error: 'Could not save your message. Please try again.' });
  }

  return res.status(200).json({ message: 'Message received.' });
});

// (Optional) view saved messages — remove or protect this in production
app.get('/api/messages', (req, res) => {
  const existing = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
  res.json(existing);
});

app.listen(PORT, () => {
  console.log(`Portfolio backend running at http://localhost:${PORT}`);
});
