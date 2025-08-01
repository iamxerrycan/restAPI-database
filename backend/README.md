# 🛡️ Auth, Weather & Contact API (Node.js + Express + MongoDB + JWT)

This API allows users to:

- 🔐 Register & login with JWT auth and Appointments
- 🌤️ Fetch current weather by city
- 💬 Send contact messages (portfolio form)

---

## 🚀 Base URLs

- Auth: `http://localhost:5000/api/appointments/auth`
- Weather: `http://localhost:5000/weather`
- Contact: `http://localhost:5000/api/portfolio/contact`
- Appointments: `http://localhost:5000/api/appointments`

---

## 📌 Endpoints

### ✅ Register User

- **Method:** `POST`
- **URL:** `/register`
- **Request Body raw (JSON):**

```json
  {
    "name": "TestUser1",
    "email": "testuser1@example.com",
    "password": "test12345"
  }
Success Response:
{
  "_id": "688c6b46c153536c5fbbe047",
  "name": "TestUser1",
  "email": "testuser1@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}


```

### 🔐 Login User

Method: POST

URL: /login

Request Body raw (JSON):

```json
{
  "email": "testuser1@example.com",
  "password": "test12345"
}
Success Response:

{
  "_id": "688c6b46c153536c5fbbe047",
  "name": "TestUser1",
  "email": "testuser1@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

```

### 🔐 Using the Token for Protected Routes

For all authenticated requests, include the token in the request headers:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

---

### 🌤️ Weather API - Get Current Weather by City

This endpoint fetches current weather data for any city using the OpenWeatherMap API.

## 📍 Base URL

http://localhost:5000
🔸 Endpoint: /weather
Method: GET

Query Parameter: q — the name of the city

## ✅ Example Request

GET /weather?q=delhi
Full URL:

```bash
http://localhost:5000/weather?q=delhi

```

```json
{
  "coord": { "lon": 77.2167, "lat": 28.6667 },
  "weather": [{ "main": "Clouds", "description": "scattered clouds" }],
  "main": {
    "temp": 31.23,
    "feels_like": 36.12,
    "humidity": 58
  },
  "name": "Delhi"
}
```

---

## 💬 Message/Contact API (Portfolio Contact Form)

This API allows users to send contact messages (e.g., from a portfolio or contact form). Messages are stored securely in MongoDB.

### 🌐 Base URL

```
http://localhost:5000

```

### 🧾 Request Body (JSON)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I am interested in working with you."
}
```

All fields are required.

✅ Success Response

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

❌ Error Response

```json
{
  "success": false,
  "message": "Failed to send message"
}
```

## 🧪 Test Using Postman

Set URL to: POST method

```bash
http://localhost:5000/api/portfolio/contact

```

Set body to raw > JSON:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Love your portfolio!"
}
```

Send. You should receive a success message if everything is set up correctly.

---

## 📸 Appointment CRUD after Register and Login!

## ✅ 1. Add Appointment (POST)

Method: POST

URL:

```bash
http://localhost:5000/api/appointments/add
```

🔐 Authorization:
Go to Headers tab →
Add key: Authorization
Value: Bearer <your_token>

📦 Body (form-data):
Key Type Value
name text e.g. "John Doe"
email text e.g. "john@example.com"
date text e.g. "2025-08-10"
file file Upload a file from your system

## ✅ 2. Get Appointments (GET)

Method: GET

URL:

```bash
http://localhost:5000/api/appointments
```

🔐 Authorization:
Go to Headers tab →
Add key: Authorization
Value: Bearer <your_token>

📤 Response:

```json
{
  "success": true,
  "data": [
    {
      "_id": "688c935a215b5cac4bcf4b06",
      "name": "John Doe",
      "email": "john@example.com",
      "date": "2025-08-10T00:00:00.000Z",
      "fileUrls": ["/uploads/filename.png"],
      "user": "688c762f5c7ac44f5651b884",
      "createdAt": "2025-08-01T14:00:00.000Z",
      "updatedAt": "2025-08-01T14:00:00.000Z",
      "__v": 0
    }
  ]
}
```

## ✅ 3. Update Appointment (PUT)

Method: PUT

URL:

```bash
http://localhost:5000/api/appointments/:id
```

🔁 Replace :id with the actual appointment ID.

🔐 Authorization:
Go to Headers tab →
Add key: Authorization
Value: Bearer <your_token>

📦 Body (form-data):
Key Type Description
name text Updated name (optional)
email text Updated email (optional)
date text Updated date (optional)
file file Updated file (optional)

⚠️ If you upload a file, it will replace the previous one.

📤 Response (on success):

```json
{
  "success": true,
  "data": {
    "_id": "688c935a215b5cac4bcf4b06",
    "name": "Updated Name",
    "email": "updated@example.com",
    "date": "2025-08-11T00:00:00.000Z",
    "fileUrls": ["/uploads/updated-file.pdf"],
    "user": "688c762f5c7ac44f5651b884",
    "createdAt": "2025-08-01T14:00:00.000Z",
    "updatedAt": "2025-08-01T15:00:00.000Z",
    "__v": 0
  }
}
```

## ❌ 4. Delete Appointment (DELETE)

Method: DELETE

URL:

```bash
http://localhost:5000/api/appointments/:id
```

🔁 Replace :id with the actual appointment ID.

🔐 Authorization:
Go to Headers tab →
Add key: Authorization
Value: Bearer <your_token>

📤 Response (on success):

```json
{
  "success": true,
  "message": "Appointment deleted successfully."
}
```

---

---

## 🛠️ Tech Stack

Node.js

Express.js

MongoDB

JWT (Authentication)

bcrypt.js (Password Hashing)

Axios (for Weather API)

dotenv (Environment config)

---

## 🧪 Postman Collection

🔗 [Postman Collection Link](https://www.postman.com/telecoms-explorer-67431952/workspace/my-workspace/collection/28893292-24e711e4-6a55-4e91-9c04-69d9ad57ff05?action=share&source=copy-link&creator=28893292)

---

