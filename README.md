# Portfolio — Setup

## Backend

```
cd backend
npm install
npm start
```

Runs at http://localhost:3000. Messages submitted via the contact form
are saved to `backend/messages.json`.

## Frontend

Just open `frontend/index.html` in a browser, or serve it with any
static server (e.g. `npx serve frontend`).

The frontend calls the backend at `http://localhost:3000` by default —
update `API_BASE` in `frontend/script.js` if you deploy the backend
somewhere else.

## Notes

- No database required — messages are stored in a JSON file for simplicity.
- Swap `server.js`'s storage logic for a real database, or add an email
  step (e.g. Nodemailer) if you want emails instead of a stored log.
