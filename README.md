# AushadhSetu (औषधसेतु)

> **Bridge to Affordable Medicine** — Empowering patients across India to discover low-cost Jan Aushadhi generic alternatives, scan prescriptions, and locate government-approved PMBJP kendras nearby.

---

## 🌟 Key Features & Functionality

### 1. 📍 Nearby Jan Aushadhi Kendra Locator
* **Auto GPS Detection:** Detects current location using browser Geolocation API (`navigator.geolocation`) and ranks stores closest-first.
* **Haversine Distance Engine:** Calculates precise distances in kilometers (`0.5 km away`, `1.2 km away`) backed by MongoDB `2dsphere` spatial indexing.
* **City Selector:** Filter stores across major hubs (Mumbai, Thane, Delhi NCR, Ahmedabad, Surat, Bengaluru, Pune).
* **One-Click Turn-by-Turn Directions:** Direct Google Maps navigation link on every store card.
* **Demonstration Notice:** Explicit notice indicating simulated store data for demonstration purposes.

### 2. 📑 Prescription Scanner & Active Salt Parser
* **100% Free Local OCR:** Powered by `Tesseract.js` running 100% locally on Node.js without requiring external API keys or rate-limit quotas.
* **openFDA Integration:** Queries live `api.fda.gov` endpoints for every recognized drug name to extract official active chemical generic salts (`openfda.generic_name`).
* **Side-by-Side Financial Savings:** Displays Prescribed Branded Drug vs Generic Bio-Equivalent Alternative with MRP comparison, basket savings, and annual savings projection.
* **Sample Prescription Presets:** One-click presets for Daily Chronic Care (Diabetes + BP) and Acute Infection & Fever.

### 3. 🔍 OpenFDA Medicine Search Engine
* Search commercial brand names or active salts against live FDA drug labels.
* Automatic Jan Aushadhi MRP pricing calculation with generic savings badges.

---

## 🛠️ Technology Stack

* **Frontend:** React 18, React Router v6, Tailwind CSS, Axios, Lucide Icons.
* **Backend:** Node.js, Express.js, MongoDB (Mongoose), Tesseract.js, openFDA API.
* **Authentication:** JWT, Bcrypt.js, Resend Email API for password recovery.

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js:** `v18+`
* **MongoDB:** Local MongoDB daemon running at `mongodb://localhost:27017` or MongoDB Atlas URI.

### 1. Clone & Install Dependencies

```bash
# Clone repository
git clone https://github.com/DevSheta07/AushadhSetu.git
cd AushadhSetu

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Configuration

Create a `.env` file in `server/`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/medisearch
JWT_SECRET=your_jwt_secret_key
RESEND_API_KEY=your_resend_api_key_optional
```

### 3. Run Development Servers

```bash
# Start backend server (Port 5000)
cd server
npm run dev

# In a separate terminal, start frontend client (Port 3000)
cd client
npm start
```

---

## 📦 Production Deployment

```bash
# Build production bundle for client
cd client
npm run build

# Start production Node server
cd ../server
npm start
```

---

## 📄 License
Licensed under the MIT License.
