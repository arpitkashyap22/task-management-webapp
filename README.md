# Task Management Application

A simple task management web application that allows users to create, read, update, and delete tasks. This application provides user authentication and a responsive interface built with React and Node.js.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
- [API Endpoints](#api-endpoints)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication (Login and Sign Up)
- Create, read, update, and delete tasks
- Toggle task completion status
- Responsive design with Tailwind CSS

## Tech Stack
- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** postgressSQL (or MySQL if preferred) , Prisma as ORM
- **Authentication:** JWT (JSON Web Tokens)

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- postgressSQL (or MySQL)
- A code editor (e.g., Visual Studio Code)

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd task-manager-frontend
   ```
2. Install dependencies
   ```bash
   npm i
   ```
3. create .env file and set your db url:
   ```arduino
      VITE_API_URL=http://localhost:5000
   ```
4. Start the application
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
      cd backend
   ```
2. Install dependencies:
   ```bash
      npm install
   ```
3. Create a .env file in the backend directory and set your environment variables:
   ```makefile
   DATABASE_URL="postgresql://*******:*********@ep-snowy-mouse-a54blf5l-pooler.us-east-2.aws.neon.tech/tasks?sslmode=require"
   JWT_SECRET="jwtsecret"
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

## API Endpoints


### Authentication Endpoints

#### User Login
- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "your_password"
    }
    ```
- **Response:**
    - **200 OK**
        ```json
        {
            "token": "your_jwt_token",
            "message": "Login successful."
        }
        ```
    - **401 Unauthorized**
        ```json
        {
            "message": "Invalid email or password."
        }
        ```

#### User Signup
- **Method:** `POST`
- **Endpoint:** `/auth/signup`
- **Request Body:**
    ```json
    {
        "name": "John Doe",
        "email": "user@example.com",
        "password": "your_password"
    }
    ```
- **Response:**
    - **201 Created**
        ```json
        {
            "message": "User registered successfully."
        }
        ```
    - **400 Bad Request**
        ```json
        {
            "message": "Email already exists."
        }
        ```

### Task Endpoints

#### Fetch All Tasks
- **Method:** `GET`
- **Endpoint:** `/tasks`
- **Headers:**
    - `Authorization: Bearer your_jwt_token`
- **Response:**
    - **200 OK**
        ```json
        [
            {
                "id": "task_id",
                "title": "Task Title",
                "description": "Task description",
                "completed": false
            },
            ...
        ]
        ```

#### Fetch Task by ID
- **Method:** `GET`
- **Endpoint:** `/tasks/:id`
- **Headers:**
    - `Authorization: Bearer your_jwt_token`
- **Response:**
    - **200 OK**
        ```json
        {
            "id": "task_id",
            "title": "Task Title",
            "description": "Task description",
            "completed": false
        }
        ```
    - **404 Not Found**
        ```json
        {
            "message": "Task not found."
        }
        ```

#### Create a New Task
- **Method:** `POST`
- **Endpoint:** `/tasks`
- **Headers:**
    - `Authorization: Bearer your_jwt_token`
- **Request Body:**
    ```json
    {
        "title": "New Task",
        "description": "Description of the new task."
    }
    ```
- **Response:**
    - **201 Created**
        ```json
        {
            "id": "new_task_id",
            "title": "New Task",
            "description": "Description of the new task.",
            "completed": false
        }
        ```

#### Update a Task
- **Method:** `PUT`
- **Endpoint:** `/tasks/:id`
- **Headers:**
    - `Authorization: Bearer your_jwt_token`
- **Request Body:**
    ```json
    {
        "title": "Updated Task Title",
        "description": "Updated description",
        "completed": true
    }
    ```
- **Response:**
    - **200 OK**
        ```json
        {
            "id": "task_id",
            "title": "Updated Task Title",
            "description": "Updated description",
            "completed": true
        }
        ```
    - **404 Not Found**
        ```json
        {
            "message": "Task not found."
        }
        ```

#### Delete a Task
- **Method:** `DELETE`
- **Endpoint:** `/tasks/:id`
- **Headers:**
    - `Authorization: Bearer your_jwt_token`
- **Response:**
    - **204 No Content**
    - **404 Not Found**
        ```json
        {
            "message": "Task not found."
        }
        ```

### Notes
- Ensure to include the JWT token in the `Authorization` header for all requests to task-related endpoints.
- Adjust the base URL according to your deployment settings.

For more details on using these endpoints, refer to the [Postman documentation](https://documenter.getpostman.com/view/31841361/2sAXxWZpLV).


## API Documentation
   You can view the API documentation using Postman at the following link: https://documenter.getpostman.com/view/31841361/2sAXxWZpLV

### Using Postman
   - Import the Postman collection from the link provided to test the various API endpoints.
   - Set the environment variable for the base URL to match your local setup.
   - Use the collection to test the various API endpoints.