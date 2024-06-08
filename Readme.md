


# <img src="todo-icon.png" alt="Todo API" width="40" height="40"> Todo API

A <span style="color:green"><strong>simple and efficient Todo API</strong></span> built with <span style="color:green"><strong>Node.js, Express, MongoDB</strong></span>, and <span style="color:purple"><strong>JWT authentication</strong></span>.


## Table of Contents
- [📜 Introduction](#-introduction)
- [🔧 Prerequisites](#-prerequisites)
- [⚙️ Installation](#️-installation)
- [🚀 Usage](#-usage)
  - [📝 Sign Up](#-sign-up)
  - [🔐 Log In](#-log-in)
  - [➕ Create Todo](#-create-todo)
  - [📋 Get Todos](#-get-todos)
  - [🔄 Update Todo](#-update-todo)
  - [❌ Delete Todo](#-delete-todo)
- [🛠️ API Routes](#️-api-routes)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [📬 Contact](#-contact)

## 📜 Introduction
Welcome to the <span style="color:blue"><strong>Todo API</strong></span>! This API allows you to manage your todos with features such as creating, reading, updating, and deleting todos. It also includes user authentication using JSON Web Tokens (JWT).

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## 🔧 Prerequisites
Before you begin, ensure you have met the following requirements:
- You have <span style="color:green"><strong>Node.js and npm installed</strong></span>.
- You have <span style="color:purple"><strong>MongoDB installed or access to MongoDB Atlas</strong></span>.
- You have a code editor like <span style="color:orange"><strong>Visual Studio Code</strong></span>.

## ⚙️ Installation
1. <span style="color:green"><strong>Clone the repository</strong></span>:
   ```bash
   git clone https://github.com/lokeshleela04/todo-api.git
   cd todo-api
   ```

2. <span style="color:green"><strong>Install dependencies</strong></span>:
   ```bash
   npm install
   ```

3. <span style="color:green"><strong>Create a .env file</strong></span> and add your <span style="color:purple"><strong>MongoDB URI</strong></span> and <span style="color:purple"><strong>JWT secret</strong></span>:
   ```plaintext
   PORT=3000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. <span style="color:green"><strong>Start the server</strong></span>
   ```bash
   npm start
   ```

## 🚀 Usage
You can use <span style="color:orange"><strong>Thunder Client (VS Code extension)</strong></span> or <span style="color:orange"><strong>Postman</strong></span> to interact with the API. Here are the available routes and how to use them

### 📝 Sign Up
- **URL:** `/api/auth/signup`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```

### 🔐 Log In
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your_jwt_token_here"
  }
  ```

### ➕ Create Todo
- **URL:** `/api/todos`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer your_jwt_token_here`
- **Body:**
  ```json
  {
    "title": "New Todo"
  }
  ```

### 📋 Get Todos
- **URL:** `/api/todos`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer your_jwt_token_here`
- **Response:**
```bash
[
  {
    "_id": "60c72b2f9b1d4c001e9c5e6b",
    "title": "New Todo",
    "completed": false,
    "createdAt": "2023-06-01T10:00:00.000Z",
    "user": "60c72b2f9b1d4c001e9c5e6a"
  }
]

```
The `_id` field in each todo object is the unique ID for that todo task.
Get `_id` from here to do further tasks

### 🔄 Update Todo
- **URL:** `/api/todos/:id`
- **Method:** `PATCH` 
- **Headers:**
  - `Authorization: Bearer your_jwt_token_here`
- **Body:**
  ```json
  {
    "completed": true
  }
  ```
  or ( if you wish to update the title)
   ```json
   {
  "title": "Updated title",
  "completed": true
   }
  ``` 
  

### ❌ Delete Todo
- **URL:** `/api/todos/:id`
- **Method:** `DELETE`
- **Headers:**
  - `Authorization: Bearer your_jwt_token_here`

## 🛠️ API Routes
- `POST /api/auth/signup` - Sign up a new user
- `POST /api/auth/login` - Log in and get a token
- `POST /api/todos` - Create a new todo
- `GET /api/todos` - Get all todos for the logged-in user
- `PATCH /api/todos/:id` - Update a todo (partial update)
- `DELETE /api/todos/:id` - Delete a todo

## 🤝 Contributing
<strong>Contributions are welcome!</stromg> Please fork the repository and create a pull request with your changes. Feel free to open issues for any bugs or feature requests.

## 📜 License
This project is licensed under the MIT License.

## 📬 Contact
If you have any questions or need help, feel free to reach out:
- **Email:** leelaprasad.m22@iiits.in
- **GitHub:** [lokeshleela04](https://github.com/lokeshleela04)

Feel free to use this <strong><span style="color:orange">API</span></strong> in your projects and let us know if you encounter any issues. Happy coding!
