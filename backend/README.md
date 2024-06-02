# API Documentation

## Overview

This API provides routes for handling various functionalities including authentication, user management, product management, and feedback management. It uses Express.js for routing, with controllers to manage the core logic of each functionality.

## Table of Contents

- [Status Routes](#status-routes)
- [Authentication Routes](#authentication-routes)
- [User Routes](#user-routes)
- [Product Routes](#product-routes)
- [Feedback Routes](#feedback-routes)
- [Middleware](#middleware)
- [Schemas](#schemas)
- [Utilities](#utilities)

## Status Routes

### Get Status

- **Endpoint**: `/status`
- **Method**: `GET`
- **Description**: Retrieves the current status of the application.
- **Response**: JSON object with status information.

### Get Statistics

- **Endpoint**: `/stats`
- **Method**: `GET`
- **Description**: Retrieves statistical data about the application.
- **Response**: JSON object with statistics.

## Authentication Routes

### Connect

- **Endpoint**: `/connect`
- **Method**: `GET`
- **Description**: Handles the authentication process for a user.
- **Response**: JSON object with user authentication details.

### Disconnect

- **Endpoint**: `/disconnect`
- **Method**: `GET`
- **Middleware**: `checkAuth`
- **Description**: Logs out the authenticated user.
- **Response**: JSON object confirming logout.

## User Routes

### Create New User

- **Endpoint**: `/users`
- **Method**: `POST`
- **Middleware**: `uploadHandler.single("profile_picture")`, `handleMulterErrors`
- **Description**: Creates a new user with the provided details and profile picture.
- **Request Body**: JSON object containing user details.
- **Response**: JSON object with created user details.

### Get All Users

- **Endpoint**: `/users`
- **Method**: `GET`
- **Description**: Retrieves a list of all users.
- **Response**: JSON array of user objects.

### Get Current User

- **Endpoint**: `/users/me`
- **Method**: `GET`
- **Middleware**: `checkAuth`
- **Description**: Retrieves details of the authenticated user.
- **Response**: JSON object with user details.

### Update Current User

- **Endpoint**: `/users/me`
- **Method**: `PUT`
- **Middleware**: `checkAuth`
- **Description**: Updates the authenticated user with the provided data.
- **Request Body**: JSON object containing updated user details.
- **Response**: JSON object confirming update.

### Delete Current User

- **Endpoint**: `/users/me`
- **Method**: `DELETE`
- **Middleware**: `checkAuth`
- **Description**: Deletes the authenticated user.
- **Response**: JSON object confirming deletion.

### Upload User Profile Picture

- **Endpoint**: `/user/:id/upload`
- **Method**: `POST`
- **Middleware**: `checkAuth`, `uploadHandler.single("profile_picture")`, `handleMulterErrors`
- **Description**: Updates the profile picture of a user.
- **Request Parameters**: `id` - User ID.
- **Response**: JSON object with updated user details.

## Product Routes

### Create New Product

- **Endpoint**: `/products`
- **Method**: `POST`
- **Middleware**: `checkAuth`, `uploadHandler.single("product_image")`, `handleMulterErrors`
- **Description**: Creates a new product with the provided details and product image.
- **Request Body**: JSON object containing product details.
- **Response**: JSON object with created product details.

### Get All Products

- **Endpoint**: `/products`
- **Method**: `GET`
- **Description**: Retrieves a list of all products.
- **Response**: JSON array of product objects.

### Get Product

- **Endpoint**: `/products/:id`
- **Method**: `GET`
- **Middleware**: `checkAuth`
- **Description**: Retrieves details of a specific product.
- **Request Parameters**: `id` - Product ID.
- **Response**: JSON object with product details.

### Update Product

- **Endpoint**: `/products/:id`
- **Method**: `PUT`
- **Middleware**: `checkAuth`
- **Description**: Updates the details of a specific product.
- **Request Parameters**: `id` - Product ID.
- **Request Body**: JSON object containing updated product details.
- **Response**: JSON object confirming update.

### Delete Product

- **Endpoint**: `/products/:id`
- **Method**: `DELETE`
- **Middleware**: `checkAuth`
- **Description**: Deletes a specific product.
- **Request Parameters**: `id` - Product ID.
- **Response**: JSON object confirming deletion.

### Upload Product Image

- **Endpoint**: `/product/:id/upload`
- **Method**: `POST`
- **Middleware**: `checkAuth`, `uploadHandler.single("product_image")`, `handleMulterErrors`
- **Description**: Updates the image of a specific product.
- **Request Parameters**: `id` - Product ID.
- **Response**: JSON object with updated product details.

## Feedback Routes

### Create New Feedback

- **Endpoint**: `/feedback`
- **Method**: `POST`
- **Description**: Creates a new feedback entry.
- **Request Body**: JSON object containing feedback details.
- **Response**: JSON object with created feedback details.

### Get Feedback by User

- **Endpoint**: `/feedback/user/:user_id`
- **Method**: `GET`
- **Description**: Retrieves feedbacks by user ID.
- **Request Parameters**: `user_id` - User ID.
- **Response**: JSON array of feedback objects.

### Get Feedback by Product

- **Endpoint**: `/feedback/product/:product_id`
- **Method**: `GET`
- **Description**: Retrieves feedbacks by product ID.
- **Request Parameters**: `product_id` - Product ID.
- **Response**: JSON array of feedback objects.

### Delete Feedback

- **Endpoint**: `/feedback/:id`
- **Method**: `DELETE`
- **Description**: Deletes a specific feedback entry.
- **Request Parameters**: `id` - Feedback ID.
- **Response**: JSON object confirming deletion.

## Middleware

### checkAuth

- **Description**: Middleware for checking user authentication.
- **Usage**: Applied to routes that require authentication.

### uploadHandler

- **Description**: Middleware for handling file uploads.
- **Usage**: Applied to routes that involve file uploads.

### handleMulterErrors

- **Description**: Middleware for handling errors during file upload.
- **Usage**: Applied to routes that involve file uploads.

## Schemas

### Feedback Schema

```json
{
  "bsonType": "object",
  "required": ["rating", "user_id", "product_id", "comment"],
  "properties": {
    "rating": { "bsonType": "int", "minimum": 1, "maximum": 5 },
    "user_id": { "bsonType": "objectId" },
    "product_id": { "bsonType": "objectId" },
    "comment": { "bsonType": "string" }
  }
}
```

### Product Schema

```json
{
  "bsonType": "object",
  "required": ["name", "description", "planting_period_start", "planting_period_end", "harvesting_period_start", "harvesting_period_end", "rate_of_production", "state", "address"],
  "properties": {
    "name": { "bsonType": "string" },
    "description": { "bsonType": "string" },
    "planting_period_start": { "bsonType": "date" },
    "planting_period_end": { "bsonType": "date" },
    "harvesting_period_start": { "bsonType": "date" },
    "harvesting_period_end": { "bsonType": "date" },
    "user_id": { "bsonType": "objectId" },
    "rate_of_production": { "bsonType": "double" },
    "status": { "bsonType": "string", "enum": ["Pending", "Approved", "Rejected"] },
    "state": { "bsonType": "string" },
    "address": { "bsonType": "string" },
    "latitude": { "bsonType": "double" },
    "longitude": { "bsonType": "double" },
    "image_path": { "bsonType": "string" }
  }
}
```

### User Schema

```json
{
  "bsonType": "object",
  "required": ["username", "email", "password", "role"],
  "properties": {
    "username": { "bsonType": "string" },
    "email": { "bsonType": "string" },
    "password": { "bsonType": "string" },
    "role": { "bsonType": "string", "enum": ["Super Admin", "Admin", "User"] },
    "profile_picture": { "bsonType": "string" }
  }
}
```

## Utilities

### authUser

- **Description**: Authenticates a user based on the provided token.
- **Parameters**: `req` - The request object.


- **Returns**: User object if authenticated.

### logoutUser

- **Description**: Logs out the authenticated user.
- **Parameters**: `req` - The request object.
- **Returns**: Confirmation of logout.

## Error Handling

All routes include basic error handling, and specific middleware like `handleMulterErrors` is used to manage file upload errors. The default error handler captures any unhandled errors and returns a standardized error response.

# API Query Guide

This guide provides examples of how to query the API endpoints using different HTTP methods. For simplicity, we'll use `curl` for command-line examples and provide a brief explanation of the required headers, parameters, and body content.

## Table of Contents

- [Status Queries](#status-queries)
- [Authentication Queries](#authentication-queries)
- [User Queries](#user-queries)
- [Product Queries](#product-queries)
- [Feedback Queries](#feedback-queries)

## Status Queries

### Get Status

**Endpoint**: `/status`
**Method**: `GET`

**Curl Example**:
```sh
curl -X GET http://localhost:3000/status
```

**Response**:
```json
{
    "cache": true,
    "db": true,
    "uptime": "0d 0h 0m 58s"
}
```

### Get Statistics

**Endpoint**: `/stats`
**Method**: `GET`

**Curl Example**:
```sh
curl -X GET http://localhost:3000/stats
```

**Response**:
```json
{
  "users": 150,
  "products": 50
}
```

## Authentication Queries

### Connect

**Endpoint**: `/connect`
**Method**: `GET`

**Curl Example**:
```sh
curl -X GET http://localhost:3000/connect
```

**Response**:
```json
{
  "message": "Connected successfully",
  "token": "your-auth-token"
}
```

### Disconnect

**Endpoint**: `/disconnect`
**Method**: `GET`
**Headers**: `Authorization: Bearer <token>`

**Curl Example**:
```sh
curl -X GET http://localhost:3000/disconnect -H "Authorization: Bearer your-auth-token"
```

**Response**:
```json
{
  "message": "Disconnected successfully"
}
```

## User Queries

### Create New User

**Endpoint**: `/users`
**Method**: `POST`
**Headers**: `Content-Type: application/json`
**Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "User"
}
```

**Curl Example**:
```sh
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "email": "john@example.com", "password": "password123", "role": "User"}'
```

**Response**:
```json
{
  "message": "User created successfully",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

### Get All Users

**Endpoint**: `/users`
**Method**: `GET`

**Curl Example**:
```sh
curl -X GET http://localhost:3000/users
```

**Response**:
```json
[
  {
    "id": "user_id_1",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "User"
  },
  {
    "id": "user_id_2",
    "username": "jane_doe",
    "email": "jane@example.com",
    "role": "Admin"
  }
]
```

### Get Current User

**Endpoint**: `/users/me`
**Method**: `GET`
**Headers**: `Authorization: Bearer <token>`

**Curl Example**:
```sh
curl -X GET http://localhost:3000/users/me -H "Authorization: Bearer your-auth-token"
```

**Response**:
```json
{
  "id": "user_id",
  "username": "john_doe",
  "email": "john@example.com",
  "role": "User"
}
```

### Update Current User

**Endpoint**: `/users/me`
**Method**: `PUT`
**Headers**: `Content-Type: application/json`, `Authorization: Bearer <token>`
**Body**:
```json
{
  "username": "john_doe_updated",
  "email": "john_updated@example.com"
}
```

**Curl Example**:
```sh
curl -X PUT http://localhost:3000/users/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-auth-token" \
  -d '{"username": "john_doe_updated", "email": "john_updated@example.com"}'
```

**Response**:
```json
{
  "message": "User updated successfully",
  "user": {
    "id": "user_id",
    "username": "john_doe_updated",
    "email": "john_updated@example.com",
    "role": "User"
  }
}
```

### Delete Current User

**Endpoint**: `/users/me`
**Method**: `DELETE`
**Headers**: `Authorization: Bearer <token>`

**Curl Example**:
```sh
curl -X DELETE http://localhost:3000/users/me -H "Authorization: Bearer your-auth-token"
```

**Response**:
```json
{
  "message": "User deleted successfully"
}
```

### Upload User Profile Picture

**Endpoint**: `/user/:id/upload`
**Method**: `POST`
**Headers**: `Authorization: Bearer <token>`
**Form Data**: `profile_picture=@/path/to/profile_picture.jpg`

**Curl Example**:
```sh
curl -X POST http://localhost:3000/user/user_id/upload \
  -H "Authorization: Bearer your-auth-token" \
  -F "profile_picture=@/path/to/profile_picture.jpg"
```

**Response**:
```json
{
  "message": "Profile picture uploaded successfully",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "User",
    "profile_picture": "path/to/profile_picture.jpg"
  }
}
```

## Product Queries

### Create New Product

**Endpoint**: `/products`
**Method**: `POST`
**Headers**: `Content-Type: application/json`, `Authorization: Bearer <token>`
**Body**:
```json
{
  "name": "Tomato",
  "description": "Fresh tomatoes",
  "planting_period_start": "2024-01-01",
  "planting_period_end": "2024-03-01",
  "harvesting_period_start": "2024-06-01",
  "harvesting_period_end": "2024-08-01",
  "rate_of_production": 1000,
  "state": "Lagos",
  "address": "123 Farm Lane",
  "latitude": 6.5244,
  "longitude": 3.3792
}
```

**Curl Example**:
```sh
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-auth-token" \
  -d '{"name": "Tomato", "description": "Fresh tomatoes", "planting_period_start": "2024-01-01", "planting_period_end": "2024-03-01", "harvesting_period_start": "2024-06-01", "harvesting_period_end": "2024-08-01", "rate_of_production": 1000, "state": "Lagos", "address": "123 Farm Lane", "latitude": 6.5244, "longitude": 3.3792"}'
```

**Response**:
```json
{
  "message": "Product created successfully",
  "product": {
    "id": "product_id",
    "name": "Tomato",
    "description": "Fresh tomatoes",
    "planting_period_start": "2024-01-01",
    "planting_period_end": "2024-03-01",
    "harvesting_period_start": "2024-06-01",
    "harvesting_period_end": "2024-08-01",
    "rate_of_production": 1000,
    "state": "Lagos",
    "address": "123 Farm Lane",
    "latitude": 6.5244,
    "longitude": 3.3792
  }
}
```

### Get All Products

**Endpoint**: `/products`
**Method**: `GET`

**Curl Example**:
```sh
curl -X GET http://localhost:3000/products
```

**Response**:
```json
[
  {
    "id": "product_id_1",
    "name": "Tomato",
    "description": "Fresh tomatoes",
    "planting_period_start": "2024-01-01",
    "planting_period_end": "2024-03-01",
    "harvesting_period_start": "2024-06-01",
    "harvesting_period_end": "2024-08-01",
    "rate_of_production": 1000,
    "state": "Lagos",
    "address": "123 Farm Lane",
    "latitude": 6.5244,
    "longitude": 3.3792
  },
  {
    "id": "product_id_2",
    "name": "Potato",
    "description": "Fresh potatoes",
    "planting_period_start": "2024-02-01",
    "planting_period_end": "2024-04

-01",
    "harvesting_period_start": "2024-07-01",
    "harvesting_period_end": "2024-09-01",
    "rate_of_production": 500,
    "state": "Oyo",
    "address": "456 Farm Road",
    "latitude": 7.3775,
    "longitude": 3.9470
  }
]
```

### Get Product by ID

**Endpoint**: `/products/:id`
**Method**: `GET`

**Curl Example**:
```sh
curl -X GET http://localhost:3000/products/product_id
```

**Response**:
```json
{
  "id": "product_id",
  "name": "Tomato",
  "description": "Fresh tomatoes",
  "planting_period_start": "2024-01-01",
  "planting_period_end": "2024-03-01",
  "harvesting_period_start": "2024-06-01",
  "harvesting_period_end": "2024-08-01",
  "rate_of_production": 1000,
  "state": "Lagos",
  "address": "123 Farm Lane",
  "latitude": 6.5244,
  "longitude": 3.3792
}
```

### Update Product

**Endpoint**: `/products/:id`
**Method**: `PUT`
**Headers**: `Content-Type: application/json`, `Authorization: Bearer <token>`
**Body**:
```json
{
  "name": "Updated Tomato",
  "description": "Updated fresh tomatoes"
}
```

**Curl Example**:
```sh
curl -X PUT http://localhost:3000/products/product_id \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-auth-token" \
  -d '{"name": "Updated Tomato", "description": "Updated fresh tomatoes"}'
```

**Response**:
```json
{
  "message": "Product updated successfully",
  "product": {
    "id": "product_id",
    "name": "Updated Tomato",
    "description": "Updated fresh tomatoes",
    "planting_period_start": "2024-01-01",
    "planting_period_end": "2024-03-01",
    "harvesting_period_start": "2024-06-01",
    "harvesting_period_end": "2024-08-01",
    "rate_of_production": 1000,
    "state": "Lagos",
    "address": "123 Farm Lane",
    "latitude": 6.5244,
    "longitude": 3.3792
  }
}
```

### Delete Product

**Endpoint**: `/products/:id`
**Method**: `DELETE`
**Headers**: `Authorization: Bearer <token>`

**Curl Example**:
```sh
curl -X DELETE http://localhost:3000/products/product_id -H "Authorization: Bearer your-auth-token"
```

**Response**:
```json
{
  "message": "Product deleted successfully"
}
```

## Feedback Queries

### Create Feedback

**Endpoint**: `/feedbacks`
**Method**: `POST`
**Headers**: `Content-Type: application/json`
**Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "message": "Great service!"
}
```

**Curl Example**:
```sh
curl -X POST http://localhost:3000/feedbacks \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "email": "john@example.com", "message": "Great service!"}'
```

**Response**:
```json
{
  "message": "Feedback submitted successfully",
  "feedback": {
    "id": "feedback_id",
    "username": "john_doe",
    "email": "john@example.com",
    "message": "Great service!"
  }
}
```

### Get All Feedback

**Endpoint**: `/feedbacks`
**Method**: `GET`

**Curl Example**:
```sh
curl -X GET http://localhost:3000/feedbacks
```

**Response**:
```json
[
  {
    "id": "feedback_id_1",
    "username": "john_doe",
    "email": "john@example.com",
    "message": "Great service!"
  },
  {
    "id": "feedback_id_2",
    "username": "jane_doe",
    "email": "jane@example.com",
    "message": "Needs improvement."
  }
]
```

### Delete Feedback

**Endpoint**: `/feedbacks/:id`
**Method**: `DELETE`

**Curl Example**:
```sh
curl -X DELETE http://localhost:3000/feedbacks/feedback_id
```

**Response**:
```json
{
  "message": "Feedback deleted successfully"
}
```

## Conclusion

This API documentation provides a comprehensive overview of the routes, middleware, schemas, and utilities used in the application. Each endpoint includes necessary details such as method, endpoint, description, request parameters, and response structure to facilitate easy integration and usage. This guide also provides a comprehensive set of examples for querying the API endpoints. Each example includes the necessary headers, request body, and expected response, enabling easy integration and usage of the API.
