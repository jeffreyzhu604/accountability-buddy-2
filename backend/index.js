// https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122

const cors = require("cors");
const express = require("express"); // Load Express
const userRouter = require("./src/router/user"); // Get the routes for user
const agreementRouter = require("./src/router/agreement");
const PORT = process.env.PORT || 4000; // Setting up ports
require("./src/db/db"); // Get the database connection

const app = express(); // Create an Express instance

app.use(cors());
app.use(express.json()); // Ensure the data that we send and receive from server is in JSON format
app.use(userRouter);
app.use(agreementRouter);

//Non api requests in production
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    // Add production middleware such as redirecting to https

    // Express will serve up production assets i.e. main.js
    app.use(express.static(__dirname + '/client/build'));
    // If Express doesn't recognize route serve index.html
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'client', 'build', 'index.html')
        );
    });
}

app.listen(PORT, (req, res) => {
    console.log(`Server started at PORT ${PORT}`);
});