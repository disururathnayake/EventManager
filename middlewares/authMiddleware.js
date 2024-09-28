// Middleware functions

// Check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.status(401).json({ message: 'Unauthorized: Please log in' });
    }
}

// Check if user is an admin
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next();  // Proceed if user is admin
    } else {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};


module.exports = {
    isAuthenticated,
    isAdmin
};
