# Files Manager Project

This project is part of the back-end trimester curriculum, focusing on authentication, NodeJS, MongoDB, Redis, pagination, and background processing. The objective is to build a simple platform for uploading and viewing files.

## Project Overview

The project involves building a file management platform with the following features:

- User authentication via token
- Listing all files
- Uploading new files
- Changing file permissions
- Viewing files
- Generating thumbnails for images

The tasks are designed to guide you through implementing these features step by step, providing opportunities for customization and learning.

## Team Information

- Team Members: Khadijat Rasaq, Okeomasilachi Onyedibia
- Start Date: May 9, 2024 6:00 AM
- End Date: May 16, 2024 6:00 AM

## Learning Objectives

By completing this project, you are expected to:

- Create an API with Express
- Implement user authentication
- Utilize MongoDB and Redis for data storage
- Implement background processing using Redis and Bull

## Resources

- [Node.js Getting Started](https://nodejs.dev/learn)
- [Express Getting Started](https://expressjs.com/)
- [Mocha Documentation](https://mochajs.org/)
- [Nodemon Documentation](https://nodemon.io/)
- [MongoDB](https://docs.mongodb.com/)
- [Bull](https://optimalbits.github.io/bull/)
- [Image Thumbnail](https://www.npmjs.com/package/image-thumbnail)
- [Mime-Types](https://www.npmjs.com/package/mime-types)

## Requirements

- Allowed Editors: vi, vim, emacs, Visual Studio Code
- Ubuntu 18.04 LTS environment with Node.js (version 12.x.x)
- Code should use the `.js` extension
- ESLint will be used for code linting

## Installation and Setup

1. Clone this repository:

    ```bash
    git clone https://github.com/okeomasilachi/alx-files_manager.git
    ```

2. Navigate to the project directory:

    ```bash
    cd alx-files_manager
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run ESLint for linting:

    ```bash
    npx eslint .
    ```

Tasks Overview

The project is structured into several tasks:

- Redis Utils: Implement Redis client utilities.
- MongoDB Utils: Implement MongoDB client utilities.
- First API: Create an Express server with basic endpoints.
- Create a New User: Implement endpoint to create new users.
- Authenticate a User: Implement user authentication endpoints.
- First File: Implement file upload and storage.
- Get and List File: Implement file retrieval and listing.
- File Publish/Unpublish: Implement endpoints for file visibility control.
- File Data: Implement endpoint to retrieve file content.

Each task builds upon the previous one, progressing towards a fully functional file management system.

Usage

Start the Server:
```bash
    npm run start-server
```
