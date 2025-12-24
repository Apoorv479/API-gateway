const rateLimit = require('express-rate-limit');

const setupRateLimit = (windowMs, max, message) => {
    return rateLimit({
        windowMs: windowMs, // time till record is hold (ms me)
        max: max, // max  requests allowed 
        message: {
            status: 429,
            error: "Too Many Requests",
            message: message || "Bas bhai, thoda saans lele! (Rate limit exceeded)"
        },
        store: new rateLimit.MemoryStore(), // RAM  storing
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
};

exports.setupRateLimit = setupRateLimit;