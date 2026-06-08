# AushadhSetu 🩺

**AushadhSetu** is a modern, high-legibility fullstack web application designed to help users search for prescription and branded medicines and instantly discover their affordable, FDA-approved bio-equivalent generic alternatives, enabling up to 80% savings on healthcare costs.

The platform integrates directly with the live **openFDA API** to retrieve authentic, verified manufacturer data and drug information.

---

## 🚀 Key Features

*   **Live openFDA Integration**: Search any brand-name or generic drug to fetch official FDA labeling data.
*   **Bio-equivalent Matching**: Suggests identical generic alternatives containing the same active ingredients.
*   **Smart Price Comparison**: Compares simulated retail pricing to showcase potential generic savings.
*   **Secure Authentication**: Secure user registration and login with salt-hashed passwords (`bcrypt`) and session authorization (`JWT`).
*   **Hospital-grade Design**: Minimalist light theme utilizing clean, premium hospital-standard typography (**Plus Jakarta Sans**) and professional SVG iconography.
*   **One-click Deployments**: Configured to serve the production build statically directly via the Express server.

---

## 🛠️ Technology Stack

*   **Frontend**: ReactJs
*   **Backend**: Node.js & Express.js
*   **Database**: MongoDB (via Mongoose ODM)
*   **Styling**: Tailwind CSS & Vanilla CSS
*   **Data Source**: Official U.S. FDA Drug Labeling Database (openFDA API)

---

## ⚙️ Environment Variables

Create a `.env` file in your `server/` directory and configure the following variables:

```ini
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/aushadhsetu?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_here
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
