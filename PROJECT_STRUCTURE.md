# DS Properties Project Structure

ds-properties/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── layouts/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── DS_PROPERTIES_MVP.md
│   ├── DATABASE_DESIGN.md
│   ├── API_DESIGN.md
│   └── PROJECT_STRUCTURE.md
│
└── README.md

---

# Development Order

1. Create project folders
2. Setup backend
3. Setup PostgreSQL database
4. Create database tables
5. Create login API
6. Create customer APIs
7. Create transaction APIs
8. Create dashboard API
9. Create frontend
10. Connect frontend to backend
11. Test MVP
