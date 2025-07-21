🚀 HackHunt – Hackathon Builder & Organizer
HackHunt is a full-stack platform built to create, manage, and discover hackathons effortlessly. Developed with the MERN stack and CI/CD best practices, it offers a seamless experience for both users and organizers.


🛠️ Tech Stack
Frontend: React (Next.js) + TypeScript
Backend: Node.js (Express / Next.js API routes)
Database: MongoDB Atlas
CI/CD & Hosting: GitHub Actions + Docker + Render
Monitoring: Prometheus, Sentry
Testing: Jest (with coverage)

🌟 Features
🔐 User Authentication – Secure login/signup system.

🛠️ Admin Panel – Create and manage hackathons, prizes, schedules, and speakers. See notifications from applying candidates.

🧠 Dynamic Forms – Interactive forms with validation for team and solo participants.

📅 Event Countdown & Schedule – Real-time timers and timelines.

📊 Prometheus Monitoring – Backend metrics exposed via /api/metrics.

☁️ Dockerized Deployment – Build once, run anywhere.

📸 Screenshots
Home, Login, Admin Dashboard, Discover, Hackathon Detail, Application Form

CI/CD Pipeline (GitHub Actions)

Docker and Render deployments

Prometheus metrics

🚧 System Architecture
CI/CD Pipeline
Trigger: GitHub push/PR

Steps:

Lint & test using Jest

Build Docker image

Deploy to Render

Monitor via Prometheus

API Overview
Method	Endpoint	Description
POST	/api/hackathons	Create a hackathon
GET	/api/hackathons	Fetch all hackathons
GET	/api/hackathons/:id	Fetch a single hackathon
POST	/api/reminders	Set a reminder
GET	/api/metrics	Prometheus metrics endpoint

🧪 Running Locally
Prerequisites
Node.js v18+
MongoDB Atlas cluster
Docker (optional, for containerized builds)

Clone & Setup
git clone https://github.com/yourusername/hackhunt.git
cd hackhunt
npm install
cd src/app/api && npm install
Env Config

Create a .env.local with:
env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/hackhunt
JWT_SECRET=your_jwt_secret
Start Dev Server
npm run dev

🧪 Testing
npm test
Code coverage enabled via --coverage
Tests include both unit and integration (Jest)

🐳 Docker
docker build -t hackhunt .
docker run -p 3000:3000 hackhunt
Multi-stage builds ensure lightweight containers for production.

🚀 Deployment
Auto-deployment is handled via GitHub Actions to Render:

Push to main triggers:
Tests
Build
Docker deployment

📊 Monitoring
Prometheus is integrated with:
GET /api/metrics
Monitors request count, latency, and system health.

🔒 Security
All secrets stored in .env.local
Admin-only routes are JWT protected
MongoDB access is IP-restricted
HTTPS via Render SSL

👥 Team
Name	Role	Email
Joann M. Joseph	Backend & DevOps Lead	joannjoseph23@gmail.com
Nikhil S. Kallarakkal	Frontend Lead	nikhilseb23@gmail.com

📌 License
This project is licensed under the MIT License.

🔗 References
Next.js Docs
MongoDB Atlas
GitHub Actions
Render Deployment
Prometheus
Jest
React
TailwindCSS

