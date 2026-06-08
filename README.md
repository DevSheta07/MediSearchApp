# AushadhSetu 🩺💊

**AushadhSetu** is a modern, high-legibility fullstack web application designed to bridge the gap between expensive branded prescriptions and affordable healthcare. Users can search for prescription or branded medicines and instantly discover their identical, FDA-approved bio-equivalent generic alternatives, unlocking up to 80% savings.

🔗 **Live Deployment Link**: [https://aushadhsetu.onrender.com](https://aushadhsetu.onrender.com)

---

## 🚀 Key Features

*   **Live openFDA Integration**: Connects dynamically with the official U.S. FDA Drug Labeling Database to retrieve verified ingredients, manufacturers, routes, and product warnings.
*   **Identical Generic Matching**: Compares active ingredient lists to suggest identical, cheaper bio-equivalent alternatives.
*   **Smart Price comparison**: Computes and compares simulated branded vs. generic retail pricing to highlight potential customer savings.
*   **Password Reset Flow (Resend API)**: Secure email-based password recovery flow powered by the HTTP-based Resend API (perfect for Render's free tier SMTP restrictions).
*   **Secure Authentication**: Protected endpoints with session authorization via JSON Web Tokens (JWT) and passwords securely hashed using `bcrypt` (10 rounds).
*   **Clinical/Hospital Light Design**: Sleek, distraction-free clinical user interface built with custom SVG iconography and high-legibility medical-grade typography (**Plus Jakarta Sans**).
*   **Single-service Deployment**: Configured to bundle the frontend statically and serve it directly from the Express backend in production mode.

---

## 🛠️ Technology Stack

*   **Frontend**: React (React Router v6, Axios API Client)
*   **Backend**: Node.js & Express.js
*   **Database**: MongoDB (Mongoose ODM)
*   **Email Gateway**: Resend (HTTP REST API)
*   **Styling**: Tailwind CSS & Vanilla CSS (Plus Jakarta Sans Google Font)

---

## 📂 Project Structure

```text
├── client/                 # React Frontend Application
│   ├── public/             # Static public assets (Favicon, Index.html, Images)
│   └── src/
│       ├── api/            # API call modules (Axios client, endpoints)
│       ├── components/     # Reusable layout and modal components
│       ├── context/        # React Auth Context (JWT session management)
│       ├── pages/          # Home, Landing, Login, Register, Recovery Pages
│       └── utils/          # Helpers (image fallback selectors, formats)
│
├── server/                 # Express Backend API
│   ├── middleware/         # Auth verification middleware
│   ├── models/             # Mongoose schemas (User Collection)
│   ├── routes/             # Authentication & Medicine API routes
│   └── server.js           # Server entry point & static build serving config
│
└── package.json            # Root configuration for easy script running
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `server/` directory and configure the following variables:

```ini
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/aushadhsetu?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_here

# Resend API configuration for password reset delivery
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM=onboarding@resend.dev
```

---

## 💻 Local Development Setup

To run both the server and frontend concurrently on your machine:

1. **Clone the repository:**
   ```bash
   git clone git@github.com:DevSheta07/AushadhSetu.git
   cd AushadhSetu
   ```

2. **Install all dependencies (Root, Client & Server):**
   ```bash
   npm run install-all
   ```

3. **Run the projects:**
   *   To run the backend server:
       ```bash
       npm run server
       ```
   *   To run the React frontend:
       ```bash
       npm run client
       ```

---

## 🚢 Production Deployment

The project is pre-configured for single-service deployments on platforms like **Render**, **Railway**, or **Heroku**:

*   **Build Command**: 
    ```bash
    npm run install-all && npm run build
    ```
*   **Start Command**: 
    ```bash
    npm start
    ```

*(When `NODE_ENV=production`, the Express server will automatically serve the static React client build from the `client/build` folder, requiring only one hosted container/service).*
