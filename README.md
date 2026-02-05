# Airbnb Clone Project

A full-stack web application inspired by Airbnb, built using Node.js, Express, and MongoDB. This platform allows users to view, create, and review property listings.

## Features

*   **Listings:** Create, read, update, and delete (CRUD) property listings.
*   **Reviews:** Users can add reviews and ratings to listings.
*   **Authentication:** User signup and login functionality.
*   **Database:** Data persistence using MongoDB and Mongoose.
*   **Templating:** Server-side rendering using EJS (Embedded JavaScript).

## Tech Stack

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB, Mongoose
*   **Frontend:** EJS, CSS, Bootstrap (if applicable)

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) installed.
*   [MongoDB](https://www.mongodb.com/) installed locally or a MongoDB Atlas connection string.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/harix10/airbnb-clone-fullstack.git
    cd AIRBNB
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory to store sensitive information (like database credentials or API keys).
    ```text
    DB_URL=mongodb://localhost:27017/your-db-name
    SECRET=your_secret_key
    ```

4.  **Run the application:**
    ```bash
    node app.js
    # or if you have nodemon installed:
    nodemon app.js
    ```

5.  **Usage:**
    Open your browser and navigate to `http://localhost:8080` (or port 3000, depending on your configuration).
