# React & Laravel Project

A full-stack web application using React for the frontend and Laravel for the backend.

## Features

- React frontend for a dynamic user interface.
- Laravel backend providing API endpoints.
- User authentication and CRUD operations.

## Installation

### Backend (Laravel)

1. Install dependencies:
    ```bash
    composer install
    ```

2. Set up your `.env` file and run migrations:
    ```bash
    php artisan key:generate
    php artisan migrate
    ```

3. Start the backend:
    ```bash
    php artisan serve
    ```

### Frontend (React)

1. Navigate to the frontend folder and install dependencies:
    ```bash
    cd frontend
    npm install
    ```

2. Start the React app:
    ```bash
    npm run dev
    ```