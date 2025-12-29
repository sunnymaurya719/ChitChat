# 💬 ChitChat – Full Stack Real-Time Chat Application

ChitChat is a modern and scalable **full-stack real-time chat application** built using **React**, **Node.js**, **Express**, and **MongoDB**.  
It enables users to communicate instantly with secure authentication, real-time messaging using **Socket.IO**, and a clean, responsive UI.

---

## 🌐 Live Demo

- 🔗 **User Website**: https://chitchat-rho-lemon.vercel.app  

---

## ✨ Features

### 👤 User Features
- 🔐 User Authentication & Authorization (JWT)
- 💬 Real-time one-to-one chat
- 🟢 Online / Offline user status
- 📜 Chat history persistence
- ⚡ Instant message delivery
- 📱 Fully responsive UI (mobile & desktop)

### 🛠 System Features
- 🔄 Real-time communication using **Socket.IO**
- 🔐 Secure REST APIs
- 🧠 Persistent chat storage in MongoDB
- 🌐 WebSocket-based architecture
- 🧩 Scalable backend design

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Context API
- Vite

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Socket.IO

### Deployment
- Frontend: Vercel
- Backend: Vercel
- Database: MongoDB Atlas

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account

---

## 📥 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/sunnymaurya719/ChitChat.git
cd ChitChat
```

2️⃣ **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3️⃣ **Environment Variables:**

Create a .env file inside the server folder:
   ```bash
  PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

   ```

4️⃣ **Run the application:**
```bash
For server : 
   npm run server
and
For client :
   npm run client
   ```

## 🗂️ Project Structure

```bash
ChitChat/
│
├── client/                       # React frontend
│   ├── components/               # UI components
│   ├── pages/                    # Pages (Chat, Login, Users)
│   ├── context/                  # Context API (Global state)
│   └── main.jsx
│
├── server/                       # Node.js backend
│   ├── controllers/              # Chat & auth logic
│   ├── models/                   # MongoDB schemas
│   ├── routes/                   # API routes
│   ├── socket/                   # Socket.IO logic
│   ├── middleware/               # Auth & error handling
│   └── index.js
│
└── README.md


```
## 📦 Development Notes

⚡ Built with Vite for fast development

🔐 Secure authentication using JWT

🔄 Real-time messaging powered by Socket.IO

🧠 Chat history stored in MongoDB

🌐 Clean REST + WebSocket architecture

🧩 Scalable and maintainable folder structure
