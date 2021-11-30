/*
    Middleware acts as a bridge between the database and the application, especially on a network.
    We want to ensure that when a request is sent to the server, some code (middleware) is run
    before the request hits the server and returns a response. We want to check if a user who is 
    trying to access a specific resource is authorized to access it.
*/
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
    // Obtain the token
    const token = req.header('Authorization').replace('Bearer ', '');
    // Check if the token received is valid or was created using our JWT_KEY
    // The verify method returns the payload that was used to create the token
    const data = jwt.verify(token, process.env.JWT_KEY);
    // Since we have the payload from the token, we can now find a user with that id
    // and also if the token is in the user's tokens array
    try {
        console.log(data)
        const user = await User.findOne({_id: data._id, 'tokens.token': token});
        console.log(user);
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(401).send({error: 'Not authorized to access this resource'});
    }
}

module.exports = auth;