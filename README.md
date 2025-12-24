# Scalable API Gateway

A lightweight, configuration-driven API Gateway built with Node.js. Designed to act as a unified entry point for microservices, handling cross-cutting concerns like traffic control, security, and caching before requests reach the downstream services.

![Node.js](https://img.shields.io/badge/Node.js-v18-green) ![Express](https://img.shields.io/badge/Express-4.x-blue) ![License](https://img.shields.io/badge/License-MIT-orange)

## Architecture & Request Flow

This gateway sits between the client and the backend microservices. It processes requests through a middleware pipeline:

```mermaid
Client Request
   │
   ▼
[Helmet & CORS]     ---> (Security Headers)
   │
   ▼
[Rate Limiter]      ---> (DDoS Protection / Throttling)
   │
   ▼
[Cache Layer]       ---> (In-Memory Caching - Short circuit if hit)
   │
   ▼
[Auth Guard]        ---> (Token Verification)
   │
   ▼
[Reverse Proxy]     ---> (Routes to Service A or Service B)

Key Features
Dynamic Routing: Configuration-based routing (config.js) allows adding new services without changing core logic.

Rate Limiting: IP-based traffic control using express-rate-limit to prevent abuse and DDoS attacks.

Caching Strategy: Implemented apicache to reduce load on backend services for frequent read operations.

Security First: Integrated helmet for header security and cors for cross-origin resource sharing.

Observability: Request logging via morgan for debugging and monitoring traffic patterns.

Authentication: Centralized middleware to validate x-auth-token headers.

Tech Stack
Runtime: Node.js

Framework: Express.js

Proxy Engine: http-proxy-middleware

Security: helmet, cors

Traffic Control: express-rate-limit

Project Structure
Bash

api-gateway/
├── src/
│   ├── config.js          # Central Configuration (Routes, Rules)
│   ├── server.js          # Entry point & Middleware assembly
│   └── middlewares/
│       ├── auth.js        # Auth logic
│       ├── logger.js      # Custom logging
│       └── ratelimit.js   # Rate limit generator
├── test-servers.js        # Mock microservices for testing
└── package.json



Getting Started
Prerequisites
Node.js (v14 or higher)


Clone the repository:

git clone [https://github.com/your-username/api-gateway.git](https://github.com/your-username/api-gateway.git)
cd api-gateway
Install dependencies:



npm install
Start the Mock Services (to simulate backend):

Bash

node test-servers.js
(Runs Service A on port 3001 and Service B on port 3002)

Start the Gateway (in a new terminal):

Bash

npm start
# or
node src/server.js
The Gateway will be live at http://localhost:8000.

Configuration
The entire behavior of the gateway is controlled via src/config.js. You can define routes, toggle authentication, set cache timers, and define rate limits per route.

JavaScript

// Example Configuration
{
    url: '/premium',
    auth: true,             // Requires x-auth-token
    cache: false,           // Real-time data (No cache)
    rateLimit: {
        windowMs: 60000,
        max: 50             // 50 req/min
    },
    proxy: {
        target: "http://localhost:3002",
        changeOrigin: true
    }
}
Design Decisions & Trade-offs
Why Rate Limiting in Memory? For this MVP, I used in-memory storage for simplicity. In a production or clustered environment, I would utilize a Redis Store to maintain state across multiple gateway instances.

Centralized Auth: Authentication is handled at the Gateway level to offload redundancy from microservices, adhering to the API Gateway Pattern.
```
