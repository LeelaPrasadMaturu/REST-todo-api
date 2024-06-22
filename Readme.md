


# <img src="todo-icon.png" alt="Todo API" width="40" height="40"> Todo API

A <span style="color:green"><strong>simple and efficient Todo API</strong></span> built with <span style="color:green"><strong>Node.js, Express, MongoDB</strong></span>, and <span style="color:purple"><strong>JWT authentication</strong></span>.This API follows RESTful principles, ensuring stateless communication, use of standard HTTP methods, and clear resource-based URL structures.


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
- [⚠️ Error Codes](#️-error-codes)
- [🚦 Rate Limiting](#️-rate-limiting)
- [🔐 Authentication](#️-authentication)
- [📚 Glossary](#️-glossary)
- [✉️ Feedback](#️-feedback)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [📬 Contact](#-contact)

## 📜 Introduction
Welcome to the <span style="color:blue"><strong>Todo API</strong></span>! This API allows you to manage your todos with features such as creating, reading, updating, and deleting todos. It also includes user authentication using JSON Web Tokens (JWT).The API is designed following RESTful principles to ensure stateless, scalable, and efficient interaction with clients.


![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

# 📜 Why This API is RESTful
 This API adheres to RESTful principles in the following ways:
- <strong>Resource-Based URLs </strong>: Each resource (todos and authentication) is accessed using standard HTTP methods (GET, POST, PATCH, DELETE) with clear and meaningful URLs (`/api/todos`, `/api/auth/signup`, etc.).
- <strong> HTTP Methods </strong>: Different HTTP methods are used to perform different actions on resources. For example:
   - GET `/api/todos`: Retrieves all todos.
   - POST `/api/todos`: Creates a new todo.
   - PATCH `/api/todos/:id`: Updates a specific todo.
   - DELETE `/api/todos/:id`: Deletes a specific todo
- <strong> Statelessness </strong>: The API is stateless, meaning each request from a client to the server must contain all the information necessary to understand and fulfill the request. This simplifies server implementation and improves scalability.
- <strong>Use of HTTP Status Codes</strong>: The API uses appropriate HTTP status codes to indicate the success or failure of an API request (e.g., 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found).
-<strong> JSON Format</strong>: Data is exchanged in JSON format, which is lightweight and easy to parse by client applications.
- <strong>Authentication</strong>: Authentication is handled using JWT (JSON Web Tokens), providing a secure way to authenticate API requests without needing to maintain session state on the server.

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

## Alternatively, you can directly use the hosted API at this link without cloning the entire project:
https://todo-api-yry4.onrender.com

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
- Example: https://todo-api-yry4.onrender.com/api/auth/signup (if you are using the hosted link)
<br>
 or <br>
https://localhost:3000/api/auth/signup (if you have cloned the project)

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


### 📜 Cache-based API
This API employs caching to improve performance and reduce response times for frequently requested data. When a GET request is made for todos, the API caches the response for a certain duration, typically 60 seconds. Subsequent requests for the same resource within this period retrieve data from the cache, significantly reducing response times and server load.

For Eg : Send a Get Request to  `api/todos` , Frist time , it takes around 190ms , send a one more get request to same Route within 60 sec( we designed cache-storage for 60 sec) Now observe the time taken it 10 times lesser than frist request , it probably around 15 ms
<hr>

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

## ⚠️ Error Codes
Below are some common error codes you might encounter
- <strong>400 Bad Request </strong>: The request could not be understood or was missing required parameters.
- <strong>401 Unauthorized </strong>: Authentication failed or user does not have permissions for the desired action.
- <strong>404 Not Found </strong>: The requested resource could not be found.
- <strong>500 Internal Server Error </strong>: An error occurred on the server.

## 🚦 Rate Limiting
You can make up to 100 requests per hour. Exceeding this limit will result in a 429 Too Many Requests response.

## 🔐 Authentication
All endpoints require a valid API key. Include the API key in the Authorization header of your requests:
``` bash
Authorization: Bearer {api_key}
```
To obtain an API key, register on our website and navigate to the API keys section of your account settings.

## 📚 Glossary
- <strong>API Key </strong>:  A unique key used to authenticate requests.
- <strong>Endpoint </strong>: A specific URL where API requests are sent.
- <strong>Rate Limiting </strong>: Restricting the number of API requests within a time period.
- <strong>Versioning </strong>: Managing changes to the API by releasing different versions.
- <strong>HTTP Method </strong>: The action to be performed on the resource (GET, POST, PATCH, DELETE).

## ✉️ Feedback
We value your feedback! Please <strong>[Email us](mailto:leelaprasad.m22@iiits.in)</strong> with any questions or suggestions.


## 🤝 Contributing
<strong>Contributions are welcome!</stromg> Please fork the repository and create a pull request with your changes. Feel free to open issues for any bugs or feature requests.

## 📜 License
This project is licensed under the MIT License.

## 📬 Contact
If you have any questions or need help, feel free to reach out:
- **Email:** leelaprasad.m22@iiits.in
- **GitHub:** [lokeshleela04](https://github.com/lokeshleela04)

Feel free to use this <strong><span style="color:orange">API</span></strong> in your projects and let us know if you encounter any issues. Happy coding!
