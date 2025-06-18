# 🧑‍🏫 Mentor-Mentee Session Scheduler

This is a backend system built with **NestJS** and **MongoDB** that allows **mentees to schedule sessions** with mentors and allows **mentors to retrieve their scheduled sessions**. The system ensures no time conflicts, enforces proper validation, and exposes a clean REST API with Swagger documentation.

## 📌 Features

- Book 1-on-1 mentorship sessions
- Prevent double-booking (time clash) for mentors
- Prevent booking sessions in the past
- Retrieve all sessions for a given mentor
- API documentation with Swagger UI
- MongoDB integration via Mongoose
- Seed script to populate initial session data

## 🗃 Data Model

```ts
// Session
{
  mentorId: ObjectId,
  menteeId: ObjectId,
  date: Date,
  status: 'pending' | 'confirmed' | 'canceled'
}
```

## 🚀 Getting Started

### 🧰 Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v16+)
- [Yarn](https://classic.yarnpkg.com/en/docs/install) or `npm`
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (or local MongoDB)
- Internet connection (for schema downloads)

## ⚙️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/mentor-scheduler.git
cd mentor-scheduler
```

2. **Install dependencies**
```bash
yarn install
# or
npm install
```

3. **Create `.env` file**
Create a `.env` file in the root directory:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

## ▶️ Running the Project

### 1. **Start in development mode**
```bash
yarn start:dev
# or
npm run start:dev
```

The server will run on `http://localhost:3000`

## 📓 API Documentation

Visit: `http://localhost:3000/api` to view the Swagger UI

## 📥 Seed the Database

### 1. **Run the seed script**
```bash
yarn seed
# or
npm run seed
```

## 🔍 API Endpoints

### POST `/sessions`
Book a new session between a mentee and a mentor.

```json
{
  "mentorId": "ObjectId",
  "menteeId": "ObjectId",
  "date": "2025-06-20T10:00:00Z"
}
```

> `status` is automatically set to `pending`

### GET `/mentors/:id/sessions`
Returns all sessions related to the specified mentor.

## 🛡 Validation & Constraints

- ✅ Only **future dates** can be booked
- ✅ Mentors **cannot have overlapping sessions**
- ✅ `status` is **not set by mentee** — defaults to `pending`
- ✅ Sessions are sorted by date in `GET` responses

## 🧪 Project Structure

```
src/
├── sessions/
│   ├── dto/
│   │   └── create-session.dto.ts
│   ├── schemas/
│   │   └── session.schema.ts
│   ├── sessions.controller.ts
│   ├── sessions.service.ts
│   └── sessions.module.ts
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── main.ts
```

## 📦 Scripts

```bash
npm run start:dev     # Start development server
npm run seed          # Seed the database
npm run build         # Build the project
npm run start:prod    # Start in production mode
```

## ✅ Commit Convention

Follows **Conventional Commits**. Examples:

```
chore(seed): update seed script with valid ObjectIds
feat(sessions): prevent booking past dates
fix(session): return empty array instead of null
```

## 👩🏽‍💻 Author

**Bertley Priscilla Goddivinefavour**

## 📄 License

MIT