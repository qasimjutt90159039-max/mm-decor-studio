# MM Decor Studio Interior Designer & Event Planner Lahore

A bespoke, editorial full-stack website and administrative platform designed specifically for **MM Decor Studio Interior Designer & Event Planner Lahore**.

---

## 🏛️ Business Information

- **Business Name:** MM Decor Studio Interior Designer & Event Planner Lahore
- **Category:** Interior Designer
- **Direct Phone:** `+92 318 0130117` (`tel:+923180130117`)
- **Physical Address:** Ichra Bazar, Ichhra Lahore, 54000, Pakistan
- **Official Facebook:** [https://www.facebook.com/share/1CGzeig7td/](https://www.facebook.com/share/1CGzeig7td/)
- **Primary Color:** `#120309` (Deep Plum)

> [!IMPORTANT]
> **Strict No-Fake-Data Compliance**:
> In strict accordance with the business charter, this website contains zero fabricated awards, client reviews, fake testimonials, team profiles, fake statistics, or synthetic social links. All portfolio items, gallery visuals, and customer inquiries are powered dynamically by the studio database and protected administrative portal.

---

## 🎨 Visual Identity & Luxury Design Concept

- **Concept:** *"Luxury Moodboard + Event Storytelling Studio"*
- **Editorial Color Palette:**
  - **Dominant Base:** Deep Plum (`#120309`)
  - **Dark Secondary:** Dark Burgundy (`#241018`)
  - **Accents & Borders:** Warm Champagne (`#C9AB81`)
  - **Soft Editorial Text:** Soft Beige (`#E9DFD2`)
  - **Headings & Highlights:** Warm White (`#F7F3EE`)
  - **Muted Captions:** Muted Taupe (`#8C817A`)
  - **Card Surfaces:** Charcoal (`#211B1D`)
- **Key Features:**
  - Full-bleed moodboard compositions with floating concept pillars (`MATERIAL`, `LIGHT`, `FORM`, `ATMOSPHERE`).
  - Asymmetric split editorial sections with large vertical numerals (`01`, `02`).
  - **Interactive Moodboard Builder** on the Interior Design page allowing clients to test *Warm*, *Minimal*, *Contemporary*, and *Elegant* spatial atmospheres.
  - 5-step **Event Story Timeline** (*Concept*, *Mood*, *Decor*, *Atmosphere*, *Final Experience*).
  - Editorial masonry **Gallery** with a fully accessible **Lightbox modal** (Keyboard navigation `ArrowLeft`/`ArrowRight`/`Escape`, next/previous buttons, and counter).
  - Validated **Client Inquiry Registry** submitting directly to the MongoDB backend.
  - Protected **Admin Dashboard** (`/admin`) for publishing real portfolio projects, managing gallery imagery, updating services, and filtering inquiries.

---

## 💻 Tech Stack

### Frontend (`/frontend`)
- **React 18** + **Vite**
- **Tailwind CSS** with custom luxury plum/champagne theme
- **React Router DOM 6**
- **Lucide React** icons
- **Axios** with JWT request/response interceptors

### Backend (`/backend`)
- **Node.js** + **Express.js** (ES Modules)
- **MongoDB** + **Mongoose**
- **In-Memory Fallback Engine** (`mongodb-memory-server`) for zero-configuration local development
- **JWT** (`jsonwebtoken`) & **Bcrypt** (`bcryptjs`) authentication
- Centralized validation and error handling

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18+)
- npm (v9+)

### 2. Running Backend
```bash
cd backend
npm install
npm run dev
```
The API server will launch at `http://localhost:5000`.

### 3. Running Frontend
```bash
cd frontend
npm install
npm run dev
```
The client will launch at `http://localhost:5173`.

---

## 🔐 Administrative Access

- **Portal URL:** `http://localhost:5173/admin`
- **Default Username:** `admin`
- **Default Password:** `MMDecorStudio@2026!`

*(Credentials can be customized in `backend/.env` via `ADMIN_USERNAME` and `ADMIN_PASSWORD`)*

---

## 📡 REST API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | System status and studio details |
| `POST` | `/api/auth/login` | Public | Admin login (returns JWT) |
| `GET` | `/api/auth/me` | Protected | Verify active session |
| `GET` | `/api/portfolio` | Public | Get all portfolio projects |
| `GET` | `/api/portfolio/:id` | Public | Get project details |
| `POST` | `/api/portfolio` | Protected | Create new project |
| `PUT` | `/api/portfolio/:id` | Protected | Update project |
| `DELETE` | `/api/portfolio/:id` | Protected | Delete project |
| `GET` | `/api/gallery` | Public | Get all gallery photos |
| `POST` | `/api/gallery` | Protected | Add gallery photo |
| `PUT` | `/api/gallery/:id` | Protected | Update gallery photo |
| `DELETE` | `/api/gallery/:id` | Protected | Delete gallery photo |
| `GET` | `/api/services` | Public | Get studio disciplines |
| `POST` | `/api/services` | Protected | Add discipline |
| `PUT` | `/api/services/:id` | Protected | Update discipline |
| `DELETE` | `/api/services/:id` | Protected | Delete discipline |
| `POST` | `/api/inquiries` | Public | Submit client inquiry |
| `GET` | `/api/inquiries` | Protected | Query and filter inquiries |
| `PUT` | `/api/inquiries/:id` | Protected | Mark inquiry read/contacted |
| `DELETE` | `/api/inquiries/:id` | Protected | Remove inquiry record |
