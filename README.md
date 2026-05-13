# Airbnb Clone Project

A full-stack web application inspired by Airbnb, built using Node.js, Express, and MongoDB. This platform allows users to view, create, and review property listings.

**🚀 Live Demo:** [View Deployed App on Render](https://airbnb-clone-mm1a.onrender.com) 

## Features

*   **Listings:** Create, read, update, and delete (CRUD) property listings.
*   **Reviews:** Users can add reviews and ratings to listings.
*   **Authentication:** User signup and login functionality.
*   **Database:** Data persistence using MongoDB and Mongoose.
*   **Templating:** Server-side rendering using EJS (Embedded JavaScript).
*   **Image Uploads:** Cloud integration using Cloudinary.
*   **Interactive Maps:** Geocoding and map rendering using OpenStreetMap and Leaflet.

## Tech Stack

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB Atlas, Mongoose
*   **Frontend:** EJS, CSS, Bootstrap
*   **Authentication:** Passport.js
*   **Storage & Maps:** Cloudinary, Leaflet, OpenStreetMap
*   **Hosting:** Render

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
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    ATLASDB_URL=your_mongodb_atlas_connection_string
    SECRET=your_session_secret
    ```

4.  **Run the application:**
    ```bash
    node app.js
    # or if you have nodemon installed:
    nodemon app.js
    ```

5.  **Usage:**
    Open your browser and navigate to `http://localhost:3030`.

    **Screenshots**
    <img width="1898" height="937" alt="Screenshot 2026-05-13 182922" src="https://github.com/user-attachments/assets/2759f044-cecc-401a-a537-b11bb7330669" />
    <img width="1899" height="942" alt="Screenshot 2026-05-13 182830" src="https://github.com/user-attachments/assets/75632ada-b4f0-4c12-8946-bd6d2e8e5be6" />
    <img width="1900" height="949" alt="Screenshot 2026-05-13 182734" src="https://github.com/user-attachments/assets/8be2bd5f-c613-47e8-91d2-e51eefb8a4ac" />
    <img width="1899" height="940" alt="Screenshot 2026-05-13 182757" src="https://github.com/user-attachments/assets/e0e37fa1-0d62-43fc-bac0-07915ad388b3" />
    <img width="1899" height="945" alt="Screenshot 2026-05-13 182807" src="https://github.com/user-attachments/assets/96b0d9f0-b80e-4466-bd81-9a912ebf5b02" />


    
