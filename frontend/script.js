document.getElementById('year').textContent = new Date().getFullYear();

const API_BASE = 'http://localhost:3000'; // change this to your deployed backend URL

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };

  status.textContent = 'Sending...';

  try {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      status.textContent = "Thanks — I'll get back to you soon.";
      form.reset();
    } else {
      status.textContent = result.error || 'Something went wrong. Please try again.';
    }
  } catch (err) {
    status.textContent = 'Could not reach the server. Please try again later.';
  }
});
