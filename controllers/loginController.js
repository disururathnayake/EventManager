const loginModel = require('../models/loginModel'); // Import the login model

//Register User
const registerUser = (req, res) => {
    let user = req.body;

    user.role = user.role || 'user';

    loginModel.createUser(user, (err, result) => {
        if (err) {
            res.status(500).json({message: 'Error registering user'});
        } else {
            res.status(201).json({message: 'User registered successfully'});
        }
    });
};


//Sign in User
const signInUser = (req, res) => {
    const { email, password } = req.body;

    loginModel.findUserByEmail(email, (err, user) => {
        if (err) {
            return res.status(500).json({message: 'Error finding user'});
        } 
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        } 
        // Simple password comparison
        if (user.password === password) {
            // Set userId and role in session
            req.session.userId = user.userId;
            req.session.role = user.role; 
            req.session.user = user;  

            console.log('Session userId set:', req.session.userId, req.session.role);
            
            
            return res.status(200).json({
                message: 'User authenticated successfully',
                role: user.role  // Send the role back to the frontend
            });
        } else {
            return res.status(401).json({message: 'Invalid credentials'});
        }
    });
};



// Logout User
const logoutUser = (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.clearCookie('connect.sid'); // Clears the session cookie
        res.status(200).json({ message: 'User logged out successfully' });
    });
};


module.exports = { registerUser, signInUser, logoutUser };
