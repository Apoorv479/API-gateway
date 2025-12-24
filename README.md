Maine aapki file check ki. Usme **formatting ke kaafi issues hain**:

1. **Spacing:** Sections ek dusre me chipak gaye hain (e.g., `SetupClone`, `ConfigurationYou`).
2. **Code Blocks:** Code blocks (`````) sahi se band nahi hue hain ya missing hain.
3. **Lists:** Bullet points missing hain, jisse padhna mushkil ho raha hai.
4. **Headers:** "Features" aur "Tech Stack" jaise headers bold nahi hain ya Markdown syntax (`##`) miss kar rahe hain.

Niche **corrected aur formatted version** hai. Maine spacing thik kar di hai aur code blocks proper laga diye hain. Ise copy karke paste karein.

---

````markdown
# Node.js API Gateway

A custom-built API Gateway designed to manage traffic for microservices. It acts as a single entry point, handling security, rate limiting, caching, and routing before requests reach the backend services.

## Project Overview

This project implements a reverse proxy that decouples cross-cutting concerns from individual microservices.

**Request Flow:**

```text
[Client]
   │
   ▼
[API Gateway (Port 8000)]
   │
   ├── 1. Security Check (Helmet & CORS)
   ├── 2. Rate Limiting (DDoS Protection)
   ├── 3. Caching Layer (In-Memory Check)
   ├── 4. Authentication (Token Validation)
   │
   ▼
[Proxy Logic]
   │
   ├── Route: /free    ────▶ [Service 1 (Port 3001)]
   └── Route: /premium ────▶ [Service 2 (Port 3002)]
```
````

## Features

- **Dynamic Routing:** Routes are defined in a configuration file, making it easy to add new microservices.
- **Rate Limiting:** Restricts the number of requests per IP to prevent system abuse (e.g., 5 requests/min for free tier).
- **Caching:** Caches GET responses in memory to reduce load on backend servers and improve response time.
- **Authentication:** Centralized middleware to verify authorization tokens before forwarding requests.
- **Logging:** Detailed request logging using Morgan for monitoring and debugging.
- **Security:** Implements Helmet for secure HTTP headers.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Proxy:** http-proxy-middleware
- **Traffic Control:** express-rate-limit
- **Caching:** apicache

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Apoorv479/API-gateway.git
cd API-gateway

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Start the Mock Backend Services

(This runs two dummy servers on ports 3001 and 3002 to simulate a real microservices environment)

```bash
node test-servers.js

```

### 4. Start the Gateway

(Open a new terminal window)

```bash
node src/server.js

```

The Gateway will be running at: `http://localhost:8000`

## Configuration

You can modify `src/config.js` to change routing rules, rate limits, or caching duration.

**Example Configuration:**

```javascript
{
    url: '/free',
    auth: false,             // No token required
    cache: '2 minutes',      // Cache response for 2 mins
    rateLimit: {
        windowMs: 60000,     // 1 Minute
        max: 5               // Max 5 requests
    },
    proxy: {
        target: "http://localhost:3001",
        changeOrigin: true
    }
}

```

## API Endpoints for Testing

| Route      | Method | Description          | Auth Required | Rate Limit |
| ---------- | ------ | -------------------- | ------------- | ---------- |
| `/free`    | GET    | Proxies to Service 1 | No            | 5 req/min  |
| `/premium` | GET    | Proxies to Service 2 | Yes (Token)   | 50 req/min |

**To test the Premium route using CURL:**

```bash
curl -H "x-auth-token: admin123" http://localhost:8000/premium

```

```

```
