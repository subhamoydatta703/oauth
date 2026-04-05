# AuthSys OAuth 

A modern, high-performance authentication system using **Google OAuth 2.0**, **Express.js**, **Prisma**, and **Vite React**.

##  Features

- **Google OAuth 2.0**: Secure authentication flow with official Google APIs.
- **JWT Sessions**: Secure session management using JSON Web Tokens.
- **Prisma ORM**: Robust database interaction with PostgreSQL.
- **Professional UI**: Clean, slate-based modern design with **Lucide** icons.
- **Protected Routes**: Secure frontend dashboard and backend API endpoints.

---

## Project Structure

```bash
authsys_oauth/
├── backend/          # Node.js + Express + Prisma
│   ├── prisma/       # Database Schema & Migrations
│   ├── server.js     # Express App (OAuth Logic)
│   └── .env          # Server Configuration (ignored)
├── frontend/         # Vite + React (UI)
│   ├── src/          # Source Code (Components & Routing)
│   └── index.css     # Design System (Slate Theme)
└── README.md         # This file
```

---

##  Getting Started

### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure your environment variables in `.env`:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
    CLIENT_ID="your_google_client_id"
    CLIENT_SECRET="your_google_client_secret"
    ```
4.  Run database migrations:
    ```bash
    npx prisma migrate dev
    ```
5.  Start the server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

---

## 🛠️ Tech Stack

- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/)
- **Frontend**: [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [React Router](https://reactrouter.com/), [Axios](https://axios-http.com/)
- **Styling**: Vanilla CSS (Modern Design Tokens)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Auth**: [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2), [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)


