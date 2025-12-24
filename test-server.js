const express = require('express');


// Service 1: Free Service ( 'Products' service)
// Port: 3001

const app1 = express();

// Middleware: request hit on service1 
app1.use((req, res, next) => {
    console.log(`[Service 1] Request hit: ${req.method} ${req.url}`);
    next();
});

// Route: http://localhost:3001/
app1.get('/', (req, res) => {
    res.json({ 
        service: "Product Service (Free)", 
        message: "Hello from Port 3001!",
        timestamp: new Date() 
    });
});

// Route: http://localhost:3001/info
app1.get('/info', (req, res) => {
    res.json({ 
        item: "MacBook Pro", 
        price: "200000" 
    });
});

app1.listen(3001, () => {
    console.log(' Service 1 (Products) is running on PORT 3001');
});



// Service 2: Premium Service (order service)
// Port: 3002

const app2 = express();

// Middleware: request hit on service 2 
app2.use((req, res, next) => {
    console.log(`[Service 2] Request hit: ${req.method} ${req.url}`);
    next();
});

// Route: http://localhost:3002/
app2.get('/', (req, res) => {
    res.json({ 
        service: "Order Service (Premium)", 
        message: "Hello from Port 3002! You are authorized.",
        secretData: "XYZ-999" 
    });
});

app2.listen(3002, () => {
    console.log(' Service 2 (Orders) is running on PORT 3002');
});