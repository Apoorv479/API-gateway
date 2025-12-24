const checkAuth = (req, res, next) => {
    const token = req.headers['x-auth-token'];

    if (token === 'admin123') {
        console.log(` Auth Success for ${req.url}`);
        next();
    } else {
        console.log(` Auth Failed for ${req.url}`);
        res.status(403).json({ 
            message: "Access Denied: get the right token!",
            error: "Unauthorized" 
        });
    }
};

exports.checkAuth = checkAuth;