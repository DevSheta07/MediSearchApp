# MediSearch - Frontend (React)

## Tech Stack
- React 18
- React Router v6
- Tailwind CSS
- Axios

## Folder Structure
```
client/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   ├── axios.js          # Axios instance with JWT interceptor
│   │   ├── auth.js           # Login / Register API calls
│   │   └── medicine.js       # Medicine search API calls
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky top nav with auth state
│   │   ├── Footer.jsx        # Footer with generic medicine info
│   │   ├── SearchBar.jsx     # Animated search input
│   │   └── MedicineCard.jsx  # Card with brand/generic/pricing info
│   ├── context/
│   │   └── AuthContext.jsx   # Global auth state (JWT)
│   ├── hooks/
│   │   └── useMedicineSearch.js  # Search logic hook
│   ├── pages/
│   │   ├── Home.jsx          # Hero + search + results grid
│   │   ├── Login.jsx         # Split-screen login
│   │   ├── Register.jsx      # Split-screen register
│   │   └── MedicineDetail.jsx # Tabbed detail (Overview + Alternatives)
│   ├── utils/
│   │   └── helpers.js        # Image picker utility
│   ├── App.jsx               # Router + private routes
│   ├── index.js              # Entry point
│   └── index.css             # Tailwind + Google Fonts
├── tailwind.config.js
├── postcss.config.js
├── .env
└── package.json
```

## Setup & Run

```bash
npm install
npm start
```

Make sure the backend is running on http://localhost:5000 first.
