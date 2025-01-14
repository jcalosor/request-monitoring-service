# Request Monitor Service Backend

## Introduction
Request Monitor Backend is a robust backend solution designed to handle and monitor incoming API requests effectively. Built with Node.js and TypeScript.
## Requirements
To set up and run this application locally, ensure you have the following installed on your system:
- Node.js (v16 or later)
- npm (v7 or later)
- Docker (for containerization, if required)

## Scope
This application provides the following capabilities:
- API request monitoring and handling.
- Unit tests for all critical modules (connections, controllers, models, repositories, and services).
- A scalable and maintainable architecture for backend development.

## Technologies Used
- **Node.js**: Runtime for building server-side applications.
- **Fastify**: High performance small footprint framework handling HTTP request/response.
- **TypeScript**: Enhances JavaScript with static typing.
- **Mocha**: Test framework for running unit tests.
- **Chai**: Assertion library for testing.
- **Sinon**: Mocking and stubbing for testing dependencies.
- **Docker**: Containerization for deployment and testing.

## Setup Guide
Follow these steps to set up and run the application locally:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd request-monitor-backend
```

### 2. Setup env 
Copy the .env.txt to .env, fill up the pusher creds
```bash
PUSH_CHANNEL=""
PUSH_EVENT=""
PUSH_APP_ID=
PUSH_APP_KEY=
PUSH_APP_SECRET=
PUSH_APP_CLUSTER=
PUSH_APP_TLS=
```
follow the steps in [pusher.com](pusher.com) to retrieve these values.

### 3. Install Dependencies
Ensure all required packages are installed:
```bash
npm install
```

### 4. Build the Application
Compile the TypeScript code to JavaScript:
```bash
npm run build
```

### 5. Run the Application
Start the application:
```bash
npm start
```

### 6. Run Unit Tests
Execute the unit tests using Mocha:
```bash
npm test
```

## Containerized Development
For docker setup, follow these steps:

### 1. Build the Docker Image
```bash
cd ~/{your-project-root}/

docker-compose build
```

### 2. Run the containers
```bash
docker-compose up
```

### 3. Access Containers
```bash
// Application layer
docker-compose exec -ti request-monitor-backend-app sh

// Database layer
docker-compose exec -ti request-monitor-mongo sh
```

## Endpoints
Once the app is running either via `npm start` locally or `via docker-compose` we can now test the available endpoints:

### 1. Get Response History
```bash
Method: GET
Endpoint: /api/history

curl --location 'http://127.0.0.1:4000/v1/api/history?page=1&limit=20' \
--header 'Content-Type: application/json'
```

