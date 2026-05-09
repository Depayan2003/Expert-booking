# 🚀 Real-Time Expert Booking System

A full-stack real-time booking platform where users can browse experts, filter by category, and book available time slots with instant updates using WebSockets.

---

## 📌 Features

### 🔍 Frontend (Web + Mobile)

* Search experts by name
* Filter by category (scrollable UI)
* Pagination support
* View expert details
* Book available slots
* View personal bookings
* Clean UI with responsive design

### ⚡ Real-Time Features

* Slot booking updates instantly across users
* WebSocket integration using Socket.IO

### 🛠 Backend

* REST API with Express.js
* MongoDB database with Mongoose
* Pagination, filtering, and search support
* Booking system with slot locking
* Real-time communication via Socket.IO

---

## 🏗 Project Structure

```
Real time booking/
│
├── backend/      # Node.js + Express API
├── frontend/     # React.js Web App
├── mobile/       # React Native (Expo) App
└── README.md
```

---

## ⚙️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS (no Tailwind)

### Mobile

* React Native (Expo)
* Expo Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd Real\ time\ booking
```

---

## 🖥 Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Run backend

```bash
npm start
```

---

## 🌐 Frontend Setup (Web)

```bash
cd frontend
npm install
npm start
```

Runs on:

```
http://localhost:3000
```

---

## 📱 Mobile App Setup

```bash
cd mobile
npm install
npx expo start
```

* Press `w` → open web
* Scan QR → run on phone

---

## 🔌 API Endpoints

### Experts

* `GET /experts` → list experts (search, filter, pagination)
* `GET /experts/:id` → single expert

### Bookings

* `POST /bookings` → create booking
* `GET /bookings?email=` → get user bookings

---

## ⚡ Real-Time (Socket.IO)

* Join expert room:

```
join_expert(expertId)
```

* Listen for booking updates:

```
slotBooked
```

---

## 🌍 Deployment

### Frontend (Vercel)

* Deploy React app
* Set API URL in environment variables

### Backend (Render / Railway)

* Deploy Node.js server
* Add environment variables:

  * `MONGO_URI`
  * `FRONTEND_URL`

---

## 📸 Screenshots

(Add screenshots here for better presentation)

---

## 👨‍💻 Author

**Depayan Debnath**

* GitHub: https://github.com/Depayan2003
* LinkedIn: https://linkedin.com/in/depayan-debnath

---

## 🎯 Future Improvements

* Authentication (JWT)
* Payment integration
* Admin dashboard
* Calendar view for slots
* Email notifications

---

## ⭐ Conclusion

This project demonstrates:

* Full-stack development
* Real-time systems using WebSockets
* Clean UI/UX implementation
* Scalable architecture
