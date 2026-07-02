# 🎓 Student CRUD & Auth API Project

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JSON Web Tokens](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

A professional, full-stack (MERN) web application featuring a secure backend API and a dynamic, responsive frontend dashboard. The project allows administrators to register, authenticate securely, and perform comprehensive Create, Read, Update, and Delete (CRUD) operations on student records—complete with profile picture uploads, search queries, pagination, and defensive security measures like API rate limiting.

---

## 🚀 Key Features

### 🔒 Authentication & Security
* **Secure Registration & Login**: User registration and login utilizing `bcryptjs` for industry-standard password hashing.
* **JWT Authorization**: Secure state-free session management via JSON Web Tokens (JWT) with verification middleware protecting administrative routes.
* **Defensive Rate Limiting**: Safeguards the application from brute-force login attempts and DDoS attacks by limiting requests to **5 requests per minute per IP** (utilizing `express-rate-limit`).
* **CORS Protection**: Configured Cross-Origin Resource Sharing to allow seamless and safe API communication.

### 👨‍🎓 Student Management (CRUD)
* **Comprehensive CRUD**: Fully functional endpoints to add, view, update, and delete student records.
* **Multer File Upload**: Profile picture uploads validated for image-only MIME types with a **5MB file size limit**.
* **Automatic Storage Clean-up**: Automatically purges orphaned profile pictures from the server (`Backend/uploads/`) upon record deletion or when a student's picture is updated.
* **Advanced Fetching**: Server-side pagination and real-time case-insensitive search by student first or last name.

### 💻 Client-Side Dashboard
* **Dynamic Single-Page Feel**: Interactive UI utilizing JavaScript `Fetch API` for asynchronous, page-refresh-free actions.
* **Custom Vanilla CSS UI**: Styled completely using a custom CSS variable system, custom layouts, and custom responsive media queries (with Bootstrap JS utility used solely for programmatic modal control).
* **Authorization Guard**: Front-end router pattern that intercepts page access, checking for valid local storage tokens, and redirecting guest users to the login page.

---

## 🛠️ Tech Stack

* **Frontend**: HTML5, CSS3 (custom styled), JavaScript (ES6+), Bootstrap 5 JS (modal behavior control), LocalStorage Auth cache
* **Backend**: Node.js, Express.js (REST API design)
* **Database**: MongoDB database with Mongoose ODM modeling
* **Dependencies**:
  * `jsonwebtoken` for secure signing and parsing of bearer tokens
  * `bcryptjs` for cryptographically secure passwords
  * `multer` for multipart form data uploads
  * `express-rate-limit` for rate limiting API traffic
  * `cors` to enable cross-origin browser requests

---

## 📁 Directory Structure

```text
Student-CRUD-API-Project/
├── Backend/
│   ├── config/
│   │   └── database.js          # MongoDB database connection logic
│   ├── middleware/
│   │   └── auth.js              # JWT Validation middleware
│   ├── model/
│   │   ├── student.model.js     # Student schema definition
│   │   └── users.models.js      # User auth schema definition
│   ├── routes/
│   │   ├── students.routes.js   # Student CRUD operations and image upload handlers
│   │   └── users.routes.js      # Register, Login, and Logout handlers
│   ├── uploads/                 # Server storage directory for profile images
│   ├── .env                     # Environment configurations (Port, DB URI, JWT secret)
│   ├── .gitignore               # Backend git ignore rules (node_modules, .env, uploads)
│   ├── index.js                 # Express server configuration and main entry point
│   └── package.json             # Backend dependencies and scripts
├── Frontend/
│   └── public/
│       ├── js/
│       │   └── script.js        # AJAX Authentication scripts
│       ├── index.html           # Login page UI
│       ├── register.html        # Registration page UI
│       ├── student.html         # Administrative dashboard, tables, and CRUD Modals
│       └── style.css            # Custom UI stylesheet
└── .gitignore                   # Root git ignore rules (node_modules, Backend/.env, etc.)
```

---

## 🔌 API Documentation

All routes are hosted on the backend server and prefixed with `/api`.

### 🔑 Authentication Endpoints (`/api/users`)

| Method | Endpoint | Description | Request Body | Response Success |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/users/register` | Registers a new administrative user | `{ "username": "...", "email": "...", "password": "..." }` | Saves user and returns registration details |
| `POST` | `/api/users/login` | Authenticates user and issues access token | `{ "username": "...", "password": "..." }` | `{ "token": "JWT_TOKEN_STRING" }` |
| `POST` | `/api/users/logout` | Simple endpoint for administrative logout | None | `{ "message": "Logout successful" }` |

### 👨‍🎓 Student Management Endpoints (`/api/students`)

> [!IMPORTANT]
> All student endpoints require client authorization. You must include the JWT token in your request headers as:
> `Authorization: Bearer <your_jwt_token>`

| Method | Endpoint | Description | URL/Query Parameters | Request Body |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/students` | Get paginated and searchable list of students | `search` (name query), `page` (default 1), `limit` (default 3) | None |
| `GET` | `/api/students/:id` | Fetch details of a single student by MongoDB ID | `id` (path parameter) | None |
| `POST` | `/api/students` | Add a new student record to the database | None | `multipart/form-data` containing fields and file: `profile_pic` |
| `PUT` | `/api/students/:id` | Update fields/picture of a student | `id` (path parameter) | `multipart/form-data` with optional updated fields/files |
| `DELETE` | `/api/students/:id` | Remove student record and delete profile image | `id` (path parameter) | None |

---

## ⚙️ Installation and Setup

Follow these steps to run the application locally on your machine.

### Prerequisites
* **Node.js** (v16.x or higher recommended)
* **MongoDB** (local community server running or a MongoDB Atlas connection string)

### 1. Backend Configuration
1. Open your terminal and navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install all required dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `Backend/` directory:
   ```env
   PORT=your_port_number
   MONGO_URL=your_mongodb_connection_uri
   JWT_SECRET=your_secret_jwt_token
   ```

   > [!WARNING]
   > Never commit your `.env` file or share your actual credentials/database connection strings. Make sure `.env` is listed in your `.gitignore` file.
4. Start the development server (uses `nodemon` for auto-reloading):
   ```bash
   npm start
   ```
   *You should see verification logs: `Server running on port 3000` and `MongoDB connected`.*

### 2. Running the Frontend
The frontend files are served directly as static assets from the Express backend (`Backend/index.js` lines 29–34).
* Simply open your browser and navigate to: **`http://localhost:3000`**
* This will immediately load `index.html` (Login). 
* Use the **Register** link to create your administrator account, login with your credentials, and you will be routed to the Student Records dashboard.

---

## 🔄 Application Architecture Flow
1. **Verification**: When loading `student.html`, the client checks if a JWT exists in `localStorage`. If absent, it instantly redirects to `index.html`.
2. **Access Control**: Users submit credentials, the backend hashes the input and compares it with MongoDB records, and issues a JWT if valid.
3. **Operations**: CRUD requests are sent to the backend with the token prefixed in the `Authorization: Bearer <token>` header.
4. **Multer Processing**: When uploading files, Multer saves them in the `uploads` directory. On deletion/update, Node's `fs.unlink` is automatically fired to clean up disk storage.
5. **Rate Limiting**: If a client makes more than 5 requests in a minute, the backend blocks requests and returns status `429 Too Many Requests`.
