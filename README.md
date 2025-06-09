# NYC Cab App Backend

This project provides a Node.js API (Express) with JWT-based authentication. The React front end in `UI/nyc-cab` communicates with these endpoints.

## Key Routes
- `POST /auth/send-otp` – send OTP to a mobile number
- `POST /auth/verify-otp` – verify OTP and receive a JWT
- `POST /profile/update` – update the user profile (requires `Authorization: Bearer <token>` header)
- `GET /profile/me` – fetch the logged-in user's profile (requires token)

## Running
Install dependencies and start the server:
```bash
npm install
node app.js
```
The React frontend lives in `UI/nyc-cab` and can be started separately using `npm install` and `npm start` within that directory.
