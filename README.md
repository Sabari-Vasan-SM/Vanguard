# Project M.A.M.S. - Military Asset Management System

The Military Asset Management System (M.A.M.S.) is a web application designed to provide a centralized platform for tracking and managing military assets. Key features include user authentication, asset tracking, transfer management, audit history, and reporting dashboards.

## Tech Stack

### Frontend (Client)
*   **Framework**: React with Vite
*   **Language**: TypeScript
*   **UI**: shadcn/ui & Tailwind CSS

### Backend (Server)
*   **Framework**: Node.js with Express.js
*   **Language**: JavaScript (ES6+)

### Database
*   **System**: MongoDB
*   **ORM**: Mongoose

## How to Run the Project

### Prerequisites
*   Node.js and npm
*   A running MongoDB instance

### Backend Setup
1.  Navigate to the `server` directory: `cd server`
2.  Install dependencies: `npm install`
3.  Create a `.env` file in the `server` root and add your `MONGO_URI` and `JWT_SECRET`.
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```
4.  Start the server: `npm start`

### Frontend Setup
1.  Navigate to the `client` directory: `cd client`
2.  Install dependencies: `npm install`
3.  Start the client: `npm run dev`
4.  Access the application in your browser, typically at `http://localhost:5173`.

