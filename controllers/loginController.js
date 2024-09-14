const loginModel = require('../models/loginModel'); // Import the login model

//Register User
const registerUser = (req, res) => {
    let user = req.body;
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
            res.status(500).json({message: 'Error finding user'});
        } else if (!user) {
            res.status(404).json({message: 'User not found'});
        } else {
            // Simple password comparison
            if (user.password === password) {
                res.status(200).json({message: 'User authenticated successfully'});
            } else {
                res.status(401).json({message: 'Invalid credentials'});
            }
        }
    });
};

module.exports = { registerUser, signInUser };
