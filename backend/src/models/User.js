const mongoose = require("mongoose");
const validator = require("validator"); // To validate email
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Creating a mongoose schema with object as input
// mongoose will convert our user schema into a document in the db
// and the properties will be converted into fields in our document
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid email address'});
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    profileMessage: {
        type: String,
        trim: true
    },
    // Every time a user registers or logs in, we shall create a token and append it to the existing
    // list of tokens. Allows users to be logged in on different devices if they are logged out of one.
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    friends: [],
    agreements: []
});

/*
    Enables us to do something before we save the created object.
*/
userSchema.pre("save", async function(next) {
    // Hash the password before saving the user model
    const user = this;
    console.log(user, typeof user);
    if (!user.isModified("password")) return next();
    user.password = await bcrypt.hash(user.password, 8);
});

/*
    Mongoose enables us to define both instance and model methods. Model methods are methods
    defined on the model and can be created by using the schema statics whereas instance 
    methods are defined on the document/instance.
*/

/*
    Instance method:

    Uses the JWT sign method to create a token. The sign method expects the data that will be used
    to sign the token and a JWT key. The sign method expects the data that will be used to sign
    the token and a JWT key which can be a random string. Once the token is created, we add it to 
    user's list of tokens, save, and return the token.
*/
userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password
    const user = await User.findOne({email});
    if (!user) {
        throw new Error({error: "Invalid login credentials"});
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({error: "Invalid login credentials"});
    }
    return user;
}

const User = mongoose.model("User", userSchema);

module.exports = User;