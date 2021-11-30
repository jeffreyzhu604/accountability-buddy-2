const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body);
        console.log("creating user")
        await user.save();
        console.log("user created");
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});

router.post("/login", async (req, res) => {
    // Login a registered user
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({error: "Login failed! Check authentication credentials."});
        }
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/users/me", auth, async (req, res) => {
    // View logged in user profile
    console.log(req.user)
    res.send(req.user);
});

router.get("/users/me/logout", auth, async (req, res) => {
    // Log out of the application
    try {
        /*
            Filter the user's tokens array and return true if any of the tokens is not equal
            to the token that was used by the user to login. The array filter method
            creates a new array with all elements that pass the test implemented.
        */
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token != req.token;
        });
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get("/users/me/logoutall", auth, async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        console.log(req.user.tokens)
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get("/users/all", async (req, res) => {
    // Retrieve all users
    try {
        const users = await User.find({});
        if (!users) {
            return res.status(401).send({error: "Unable to fetch users"});
        }
        // Remove password and other sensitive information
        res.status(200).json(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put("/add-friend", async (req, res) => {
    try {
        const activeUserID = req.body.activeUser._id;
        const activeUserFriends = req.body.activeUser.friends;
        const friendID = req.body._id;
        console.log(activeUserID, activeUserFriends, friendID);
        if (!activeUserFriends.includes(friendID)) {
            await User.updateOne({_id: activeUserID}, {$push: {friends: friendID}});
            await User.updateOne({_id: friendID}, {$push: {friends: activeUserID}});            
        }
        const updates = await User.find({});
        res.status(200).send(updates);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put("/remove-friend", async (req, res) => {
    try {
        const activeUserID = req.body.activeUser._id;
        const activeUserFriends = req.body.activeUser.friends;
        const friendID = req.body._id;
        if (activeUserFriends.includes(friendID)) {
            await User.updateOne({_id: activeUserID}, {$pull: {friends: friendID}});
            await User.updateOne({_id: friendID}, {$pull: {friends: activeUserID}});            
        }
        const updates = await User.find({});
        res.status(200).send(updates);
    } catch (error) {
        res.status(400).send(error);
    }
});

// TO DO: 
router.post("/add-agreement", async (req, res) => {
    try {
        // const activeUserID = req.body.activeUser._id;
        // const activeUserFriends = req.body.activeUser.friends;
        // const friendID = req.body._id;
        // console.log(activeUserID, activeUserFriends, friendID);
        // if (!activeUserFriends.includes(friendID)) {
        //     await User.updateOne({_id: activeUserID}, {$push: {friends: friendID}});
        //     await User.updateOne({_id: friendID}, {$push: {friends: activeUserID}});            
        // }
        // const updates = await User.find({});
        // res.status(200).send(updates);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put("/remove-agreements", async (req, res) => {
    try {
        // const activeUserID = req.body.activeUser._id;
        // const activeUserFriends = req.body.activeUser.friends;
        // const friendID = req.body._id;
        // if (activeUserFriends.includes(friendID)) {
        //     await User.updateOne({_id: activeUserID}, {$pull: {friends: friendID}});
        //     await User.updateOne({_id: friendID}, {$pull: {friends: activeUserID}});            
        // }
        // const updates = await User.find({});
        // res.status(200).send(updates);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;