# 🚀 **HackHunt – Hackathon Builder & Organizer**

**HackHunt** is a full-stack platform built to **create**, **manage**, and **discover hackathons** effortlessly. Developed using the **MERN stack** and modern **CI/CD practices**, it delivers a seamless experience for users and organizers alike.

---

## 🛠️ **Tech Stack**

- **Frontend:** React (Next.js) + TypeScript  
- **Backend:** Node.js (Express / Next.js API Routes)  
- **Database:** MongoDB Atlas  
- **CI/CD & Hosting:** GitHub Actions + Docker + Render  
- **Monitoring:** Prometheus, Sentry  
- **Testing:** Jest (with coverage)

---

## 🌟 **Features**

- 🔐 **User Authentication** – Secure login/signup system  
- 🛠️ **Admin Panel** – Create/manage hackathons, prizes, schedules, and speakers. View notifications from applicants.  
- 🧠 **Dynamic Forms** – Interactive forms for both team and solo registrations  
- 📅 **Event Countdown & Schedule** – Real-time countdowns and full event timeline  
- 📊 **Prometheus Monitoring** – Backend metrics exposed via `/api/metrics`  
- ☁️ **Dockerized Deployment** – Build once, run anywhere  

---

## 📸 **Screenshots**

- Home, Login, Admin Dashboard  
- Discover, Hackathon Detail, Application Form  
- CI/CD Pipeline (GitHub Actions)  
- Docker and Render deployments  
- Prometheus metrics

---

## 🚧 **System Architecture**

### CI/CD Pipeline

- **Trigger:** GitHub Push / PR  
- **Steps:**  
  - ✅ Lint & test using Jest  
  - 🐳 Build Docker image  
  - 🚀 Deploy to Render  
  - 📈 Monitor via Prometheus  

### API Overview

| Method | Endpoint             | Description                     |
|--------|----------------------|---------------------------------|
| POST   | `/api/hackathons`    | Create a hackathon              |
| GET    | `/api/hackathons`    | Fetch all hackathons            |
| GET    | `/api/hackathons/:id`| Fetch a single hackathon        |
| POST   | `/api/reminders`     | Set a reminder                  |
| GET    | `/api/metrics`       | Prometheus metrics endpoint     |

---

## 🧪 **Running Locally**

### 🔧 Prerequisites

- Node.js v18+  
- MongoDB Atlas Cluster  
- Docker (optional)

### 📥 Clone & Setup

```bash
git clone https://github.com/yourusername/hackhunt.git
cd hackhunt
npm install
cd src/app/api && npm install
```

### ⚙️ Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/hackhunt
JWT_SECRET=your_jwt_secret
```

### ▶️ Start Development Server

```bash
npm run dev
```

---

## 🧪 **Testing**

```bash
npm test
```

- ✅ Code coverage enabled via `--coverage`  
- 🧪 Includes unit and integration tests using Jest

---

## 🐳 **Docker**

```bash
docker build -t hackhunt .
docker run -p 3000:3000 hackhunt
```

> Uses **multi-stage builds** for efficient production images.

---

## 🚀 **Deployment**

Auto-deployment is handled by **GitHub Actions** and **Render**:

- Push to `main` triggers:  
  - ✅ Tests  
  - 🛠️ Build  
  - 🚀 Docker deployment  

---

## 📊 **Monitoring**

Prometheus integration exposes backend metrics:

```bash
GET /api/metrics
```

Tracks request count, latency, memory usage, and more.

---

## 🔒 **Security**

- 🔐 Secrets stored in `.env.local`  
- 🔑 JWT-protected admin routes  
- 🔐 IP-restricted MongoDB access  
- 🔒 HTTPS via Render SSL  

---

## 👥 **Team**

| Name                 | Role                  | Email                        |
|----------------------|-----------------------|------------------------------|
| **Joann M. Joseph**  | Backend & DevOps Lead | joannjoseph23@gmail.com     |
| **Nikhil S. Kallarakkal** | Frontend Lead          | nikhilseb23@gmail.com       |

---

## 📌 **License**

Licensed under the **MIT License**.

---

## 🔗 **References**

- [Next.js Docs](https://nextjs.org/docs)  
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)  
- [GitHub Actions](https://docs.github.com/en/actions)  
- [Render Deployment](https://docs.render.com/)  
- [Prometheus](https://prometheus.io/docs/)  
- [Jest](https://jestjs.io/docs/getting-started)  
- [React](https://react.dev/)  
- [TailwindCSS](https://tailwindcss.com/docs)
