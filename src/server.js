const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const helmet = require('helmet'); // Security
const cors = require('cors');     // Security
const apicache = require('apicache'); // Caching

const { ROUTES } = require('./config');
const { setupLogging } = require('./middlewares/logger');
const { checkAuth } = require('./middlewares/auth');
const { setupRateLimit } = require('./middlewares/ratelimit');

const app = express();
const port = 8000;
const cache = apicache.middleware; // Cache instance


// 1. GLOBAL SECURITY LAYER

app.use(helmet()); // Secure HTTP headers set
app.use(cors());   // allow request from different domains 
setupLogging(app); // Logs


// 2. ROUTING & LOGIC

ROUTES.forEach(route => {
    const middlewareStack = [];

    // A. Rate Limiting
    if (route.rateLimit) {
        middlewareStack.push(setupRateLimit(
            route.rateLimit.windowMs, 
            route.rateLimit.max, 
            route.rateLimit.message
        ));
    }

    // B. Caching Layer (best practice for GET requests )
    if (route.cache) {
        // apicache catches response and save it to the memory 
        middlewareStack.push(cache(route.cache));
    }

    // C. Authentication
    if (route.auth) {
        middlewareStack.push(checkAuth);
    }

    // D. Proxy (Forward to Backend)
    middlewareStack.push(createProxyMiddleware(route.proxy));

    // Route Apply
    app.use(route.url, ...middlewareStack);
});

app.listen(port, () => {
    console.log(` Ultimate Gateway running at http://localhost:${port}`);
});