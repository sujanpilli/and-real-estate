# AND Real Estate - Premium Property Catalog & Lead Generator

AND Real Estate is a premium, full-stack real estate listing and discovery portal designed for property cataloging and automated lead generation. The application is built with a fast **FastAPI (Python)** backend and a responsive, dynamic **React + Vite** frontend styled using modern glassmorphic aesthetics.

---

## ✨ Features

- 🌓 **Premium Theming & Dark Mode**: Modern light and dark mode toggling, persisted automatically via `localStorage` with smooth transition animations.
- 🏢 **Property Subtypes**: Supports categorized listings for **Plots**, **Houses**, and **Warehouses** (suitable for commercial lease and residential sales).
- 📊 **Market Insights Dashboard**: A collapsible header dashboard rendering database catalog summary statistics: total active listings, average plot prices, average house prices, and maximum land/carpet areas in square feet.
- 🔍 **Advanced Filtering & Sorting**: Robust search parameters allowing client searches by location substring, BHK size, property type classification, price ranges, and multi-criteria sorting (Recently added, price low-to-high, price high-to-low, area largest).
- 💾 **Local Shortlisting (Favorites)**: Add listings to a personal shortlist with a single click (persisted via `localStorage`), complete with dynamic heart-icon changes, toast alerts, and a global shortlist view.
- 💬 **Lead Inquiry & Simulated Agent Chat**: Submit contact info directly through property details pages to store inquiries in the database and trigger a floating chatbot simulating real-time messages and walkthrough slot bookings with consultant Rajesh Kumar.
- 🔐 **Full CRUD Admin Dashboard**: Safe administration panel (`/admin/login`) to manage listings (create, edit, delete, upload images) with secure JWT token authentication.
- 🖼️ **Flexible Image Hosting**: Connects to **Cloudinary** for image hosting, with a graceful automated Base64 fallback if credentials are not configured in local development.

---

## 🛠️ Tech Stack

### Backend API
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (Production) or local SQLite fallbacks (`database.sqlite` via `aiosqlite`)
- **ORM / Migrations**: SQLAlchemy (async) and Alembic
- **Auth**: JWT tokens (Jose) and password hashing (Bcrypt)

### Frontend Client
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Framer Motion (micro-animations)
- **State & Routing**: React Query (Tanstack), React Router, React Hook Form + Zod validation
- **Notifications**: Lucide Icons and React Hot Toast

---

## 📂 Project Structure

```text
├── alembic/                # DB schema migrations
├── backend/
│   ├── app/
│   │   ├── api/            # API Route handlers (auth, properties, inquiries)
│   │   ├── core/           # Security, config schemas, password hash helpers
│   │   ├── database/       # SQLAlchemy engine and session providers
│   │   ├── models/         # SQLAlchemy DB models (Admin, Property, Inquiry, Image)
│   │   ├── schemas/        # Pydantic schemas for request validation
│   │   └── services/       # Business logic (properties search, cloudinary integration)
│   ├── main.py             # Uvicorn API server entry point
│   └── seed.py             # Database creation, admin setup and listings seeder
├── frontend/
│   ├── src/
│   │   ├── components/     # UI Components (Navbar, Insights, Filter, AgentChat, Card)
│   │   ├── hooks/          # React Query API wrappers
│   │   ├── pages/          # Layout views (Home, Catalog, Details, Admin pages)
│   │   ├── router/         # React Router page route registers
│   │   ├── services/       # Axios API client bindings
│   │   ├── App.jsx         # App mounting, dark theme loaders, query client providers
│   │   └── index.css       # Tailwind v4 directives
│   ├── vite.config.js      # Vite compilation configurations
│   └── package.json        # Frontend Node dependencies
├── docker-compose.yml      # Orchestration definition for multi-container stack
├── pyproject.toml          # Python backend project description & dependencies
└── README.md               # Documentation guide
```

---

## 🚀 Local Development (Getting Started)

You can run the entire stack locally without setting up PostgreSQL or Cloudinary. The application automatically falls back to a local SQLite database (`database.sqlite`) and base64 encoding fallback for image uploads.

### Prerequisites
- [uv](https://github.com/astral-sh/uv) (fast Python package installer and runner)
- Node.js (v18+) and npm

### 1. Backend Setup

```bash
# Clone the repository and run database initialization & seed
uv run python backend/seed.py

# Start the FastAPI developer server (runs on http://localhost:8000)
uv run uvicorn backend.main:app --reload
```

*Note: The seeder script runs alembic migrations automatically, creates the default Admin account (`admin` / `password123`), and seeds sample plots, houses, and warehouses.*

### 2. Frontend Setup

In a new terminal window:

```bash
# Navigate to frontend folder
cd frontend

# Install Node dependencies
npm install

# Start the Vite React client dev server
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** (or the Vite console URL) in your web browser.

---

## 🔌 API Endpoints

### Properties Endpoints
- `GET /api/v1/properties/` - Retrieve matching listings (supports query params: `property_type`, `location`, `min_price`, `max_price`, `bedrooms`, `sortBy`)
- `GET /api/v1/properties/:id` - Retrieve specific property details (includes multi-image list)
- `POST /api/v1/properties/` - Create a new property listing (Requires Admin token)
- `PUT /api/v1/properties/:id` - Update listing details (Requires Admin token)
- `DELETE /api/v1/properties/:id` - Delete a listing (Requires Admin token)
- `POST /api/v1/properties/:id/images` - Upload listing image (Requires Admin token, supports multipart form upload)

### Inquiries & Authentication Endpoints
- `POST /api/v1/inquiries/` - Submit a new customer lead inquiry (stored in DB)
- `POST /api/v1/auth/login` - Authenticate admin credentials and retrieve JWT bearer token
- `GET /api/v1/auth/me` - Get information of currently logged in Administrator

---

## 🌐 Production Deployment (Neon, Render, Cloudflare Pages, Cloudinary)

You can easily deploy this application to production using **Neon** (serverless PostgreSQL database), **Render** (FastAPI backend), and **Cloudflare Pages** (Vite frontend client static hosting) with **Cloudinary** for image uploads.

### 1. Database Setup on Neon
1. Create a free account at **[Neon.tech](https://neon.tech)** and create a new project.
2. Choose **PostgreSQL** as the database engine.
3. Copy the **Connection String** from the Neon Console (starts with `postgres://` or `postgresql://`).

### 2. Image Hosting on Cloudinary
1. Create a free account at **[Cloudinary](https://cloudinary.com)**.
2. Copy your **Cloud Name**, **API Key**, and **API Secret** from the dashboard.

### 3. Deploy Backend to Render
This repository includes a `render.yaml` Blueprint definition file. You can deploy it automatically by creating a new **Blueprint** workspace inside **Render**:

1. Go to your **[Render Dashboard](https://dashboard.render.com)**.
2. Click **New +** and select **Blueprint**.
3. Connect your GitHub repository.
4. Render will read the `render.yaml` file and configure **`and-real-estate-backend`** (FastAPI Python Web Service).
5. In the **Blueprint parameters** setup screen, fill in:
   - `DATABASE_URL`: Paste your Neon connection string.
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name.
   - `CLOUDINARY_API_KEY`: Your Cloudinary API Key.
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API Secret.
6. Click **Approve** and let Render deploy the service.

### 4. Deploy Frontend to Cloudflare Pages
1. Go to your **[Cloudflare Dashboard](https://dash.cloudflare.com/)** and navigate to **Workers & Pages**.
2. Click **Create** and select **Pages** -> **Connect to Git**.
3. Connect your GitHub repository.
4. Configure the Build settings:
   - **Framework Preset**: `Vite` (or select `React`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `frontend`
5. In the build environment variables section, add:
   - `VITE_API_URL`: Set this to your deployed Render backend API URL (e.g., `https://and-real-estate-backend.onrender.com/api/v1`).
6. Click **Save and Deploy**. Cloudflare Pages will host the React frontend statically for free!

### 5. Database Migrations & Seeding in Production
Once the backend service is deployed, you need to run migrations to set up the PostgreSQL tables.

Open the **Render Console** for your backend service (`and-real-estate-backend`) and run:
```bash
# Run database migrations to create PostgreSQL tables
alembic upgrade head
```

If you wish to seed initial data into the production database:
```bash
# Run seed script
PYTHONPATH=. python backend/seed.py
```

