# REST API for Appointment Management



This is a simple REST API that allows users to manage appointments. It provides endpoints to create, read, update, and delete appointments, with optional file uploads.

## Features

- **Create Appointment**: Allows the creation of new appointments with data like name, email, date, and file uploads.
- **Get All Appointments**: Retrieves all appointments stored in the database.
- **Update Appointment**: Allows updates to existing appointments based on appointment ID.
- **Delete Appointment**: Allows deletion of appointments based on appointment ID.

## Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- Multer (for handling file uploads)
- Nodemon (for auto-restarting server during development)

## Installation

### Clone the repository

```bash
git clone https://github.com/iamxerrycan/restAPI-database.git

# Appointment Booking REST API

This is a Node.js-based REST API for managing appointments. It supports full CRUD operations, including file upload capability (like PDF, DOC, or image) via form-data.

---

## Base URL

```
https://rest-api-backend-lad4.onrender.com/api/appointments
```

---

## API Endpoints

### 1. **GET Method**

**Purpose**: Retrieve all appointments from the server.

**Postman Usage**:

```plaintext
Method: GET
URL: https://rest-api-backend-lad4.onrender.com/api/appointments
```

**Response Example**:

```json
{
  "success": true,
  "data": [
    {
      "_id": "123abc",
      "name": "John Doe",
      "email": "john@example.com",
      "date": "2025-04-15",
      "fileUrls": ["/uploads/resume.pdf"]
    }
  ]
}
```

---

### 2. **POST Method**

**Purpose**: Create a new appointment with optional file upload.

**Postman Usage**:

```plaintext
Method: POST
URL: https://rest-api-backend-lad4.onrender.com/api/appointments/add
Body Type: form-data
```

**Form-Data Keys**:
- `name`: (String) Name of the user
- `email`: (String) Email address
- `date`: (String) Appointment date
- `file`: (File) Upload file (PDF, DOC, Image)

**Response Example**:

```json
{
  "success": true,
  "data": {
    "_id": "123abc",
    "name": "John Doe",
    "email": "john@example.com",
    "date": "2025-04-15",
    "fileUrls": ["/uploads/resume.pdf"]
  }
}
```

---

### 3. **PUT Method**

**Purpose**: Update an existing appointment by ID.

**Postman Usage**:

```plaintext
Method: PUT
URL: https://rest-api-backend-lad4.onrender.com/api/appointments/:id
Body Type: form-data or JSON
```

**Replace `:id` with the actual appointment ID.**

**Example Keys**:
- `name`: New name (optional)
- `email`: New email (optional)
- `date`: New date (optional)
- `file`: New file to update (optional)

**Response Example**:

```json
{
  "success": true,
  "data": {
    "_id": "123abc",
    "name": "Updated Name",
    "email": "updated@example.com",
    "date": "2025-04-20",
    "fileUrls": ["/uploads/updated.pdf"]
  }
}
```

---

### 4. **DELETE Method**

**Purpose**: Delete an appointment by ID.

**Postman Usage**:

```plaintext
Method: DELETE
URL: https://rest-api-backend-lad4.onrender.com/api/appointments/:id
```

**Replace `:id` with the actual appointment ID.**

**Response Example**:

```json
{
  "success": true,
  "message": "Appointment deleted successfully"
}
```

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (with Mongoose)**
- **Multer (for file uploads)**

---

## Deployment

Deployed on [Render](https://render.com/)

**Backend Live URL**:
```
https://rest-api-backend-lad4.onrender.com
```

---

## License

This project is open source and available under the [MIT License](LICENSE).


