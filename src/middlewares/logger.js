const morgan = require('morgan');

const setupLogging = (app) => {
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
};

exports.setupLogging = setupLogging;