# Project M.A.M.S. - Military Asset Management System

## Project Documentation Summary

---

### 1. Project Overview

*   **Description**
    *   The Military Asset Management System (M.A.M.S.) is a web application designed to provide a centralized platform for tracking and managing military assets.
    *   Key features include user authentication, asset tracking, transfer management, audit history, and reporting dashboards.

*   **Assumptions**
    *   Users will have access to a modern web browser.
    *   A stable internet connection is available.
    *   The system requires a running MongoDB database instance.

*   **Limitations**
    *   The frontend currently uses mock data for several components; these need to be connected to live backend APIs.
    *   Role-Based Access Control (RBAC) is foundational and requires further implementation on the backend to enforce granular permissions.
    *   The user interface is primarily designed for desktop use and is not yet fully optimized for mobile devices.

---

### 2. Tech Stack & Architecture

*   **Frontend (Client)**
    *   **Framework**: React with Vite for a fast and modern development experience.
    *   **Language**: TypeScript for type safety and improved code quality.
    *   **UI Components**: `shadcn/ui` and `Tailwind CSS` for a utility-first approach to building a consistent and modern UI.
    *   **Reasoning**: This stack enables the rapid development of a performant, scalable, and maintainable user interface.

*   **Backend (Server)**
    *   **Framework**: Node.js with Express.js for building robust and efficient RESTful APIs.
    *   **Language**: JavaScript (ES6+).
    *   **Reasoning**: Using JavaScript on both the frontend and backend streamlines the development process. Express.js is lightweight, flexible, and has a vast ecosystem of middleware.

*   **Database**
    *   **System**: MongoDB (a NoSQL database).
    *   **ORM**: Mongoose for data modeling, schema validation, and business logic.
    *   **Reasoning**: MongoDB's flexible, document-based schema is well-suited for applications with evolving requirements.

---

### 3. Data Models / Schema

*   **Core Entity: `User`**
    *   The primary data model currently implemented is the `User`.
    *   **Schema Definition (`models/User.js`)**:
        *   `name`: (String, Required) - User's full name.
        *   `email`: (String, Required, Unique) - User's email for login.
        *   `password`: (String, Required) - Hashed and salted password.
        *   `date`: (Date) - Timestamp of user registration.

*   **Future Entities & Relationships**
    *   Future models will include `Asset`, `Transfer`, and `AuditLog`.
    *   These models will be linked to the `User` model (e.g., an asset will have a `createdBy` field referencing a `User`).

---

### 4. RBAC Explanation

*   **Conceptual Roles**
    *   The frontend UI suggests three user roles: `Admin`, `Logistics`, and `Commander`.

*   **Authentication Method**
    *   User authentication is handled using **JSON Web Tokens (JWT)**.
    *   Upon successful login, the server signs a JWT containing the user's ID and returns it to the client.
    *   This token is stored on the client and sent in the `x-auth-token` header for all subsequent authenticated API requests.

*   **Authorization & Enforcement**
    *   The backend uses an `auth` middleware to protect API routes.
    *   This middleware verifies the JWT to ensure the user is logged in before allowing access to protected resources.
    *   **Note**: The current backend implementation validates *if* a user is logged in but does not yet enforce different permissions based on user *role*. This would be the next logical step.

---

### 5. API Logging

*   **Current Implementation**
    *   The project does not yet have a formal transaction logging system.
    *   Logging is currently limited to `console.log` and `console.error` statements within the code for basic debugging and tracking server status (e.g., "Server started on port 5000", "MongoDB Connected...").

*   **Recommended Approach (Future)**
    *   Integrate a dedicated logging library like **`morgan`** for HTTP request logging and **`winston`** for creating detailed, leveled logs (e.g., info, error, warn) that can be written to files for auditing and production monitoring.

---

### 6. Setup Instructions

*   **Prerequisites**
    *   Node.js and npm (or a compatible package manager).
    *   A running MongoDB instance (local or cloud-based).

*   **Backend Setup**
    1.  Navigate to the `server` directory.
    2.  Install dependencies: `npm install`
    3.  Create a `.env` file in the `server` root.
    4.  Add your database connection string and a JWT secret to the `.env` file:
        ```
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_super_secret_key
        ```
    5.  Start the server: `npm start`

*   **Frontend Setup**
    1.  Navigate to the `client` directory.
    2.  Install dependencies: `npm install`
    3.  Start the client development server: `npm run dev`
    4.  Access the application in your browser, typically at `http://localhost:5173`.
