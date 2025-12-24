const ROUTES = [
    {
        url: '/free',
        auth: false,
        cache: '2 minutes', // 2 minutes caching 
        rateLimit: {
            windowMs: 60 * 1000,
            max: 5,
            message: "Free tier limit reached."
        },
        proxy: {
            target: "http://localhost:3001",
            changeOrigin: true,
            pathRewrite: { [`^/free`]: '' },
        }
    },
    {
        url: '/premium',
        auth: true,
        cache: false, // Premium data should real-time , no cache
        rateLimit: {
            windowMs: 60 * 1000,
            max: 50,
            message: "Premium limit reached."
        },
        proxy: {
            target: "http://localhost:3002",
            changeOrigin: true,
            pathRewrite: { [`^/premium`]: '' },
        }
    }
];

exports.ROUTES = ROUTES;