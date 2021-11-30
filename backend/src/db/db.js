const mongoose = require("mongoose"); // Importing mongoose library

/*
    connect method takes two parameters:
    - database URL
    - object of options
*/
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB.'))
.catch(err => console.log('Error connecting to MongoDB.: ', err));

