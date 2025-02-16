# Quizo - Quiz Management System

## Project Setup

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### Backend Setup
1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm run dev
   ```

## Database Setup

### Using MySQL
1. Install MySQL and create a database:
   ```sql
   CREATE DATABASE test;
   ```
2. Create the necessary tables:
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
   );

   CREATE TABLE quizzes (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT NOT NULL,
       teacher_id INT
   );
   ```

## API Documentation

### Authentication
- **POST /users**
  - Request:
    ```json
    {
      "username": "teacher1",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "message": "Login successful",
      "user": { "id": 1, "username": "teacher1", "password": "password123"}
    }
    ```

### Quiz Management
- **POST /dashboard/add**
  - Request:
    ```json
    {
      "title": "Sample Quiz",
      "description": "A test quiz",
      "teacher_id": 1234
    }
    ```
  - Response:
    ```json
    {
      "id": 1,
      "title": "Sample Quiz",
      "description": "A test quiz",
      "teacher_id": 1234
    }
    ```

- **GET /dashboard**
  - Response:
    ```json
    [
      {
        "id": 1,
        "title": "Sample Quiz",
        "description": "A test quiz",
        "teacher_id": 1234
      }
    ]
    ```

- **GET /dashboard/{id}**
  - Response:
    ```json
    {
      "id": 1,
      "title": "Sample Quiz",
      "description": "A test quiz",
      "teacher_id": 1
    }
    ```

- **PUT /dashboard/update/{id}**
  - Request:
    ```json
    {
      "title": "Updated Quiz Title",
      "description": "Updated description",
      "teacher_id": 1235

    }
    ```
  - Response:
    ```json
    {
      "message": "Quiz updated successfully"
    }
    ```

- **DELETE /dashboard/delete/{id}**
  - Response:
    ```json
    {
      "message": "Quiz deleted successfully"
    }
    ```
