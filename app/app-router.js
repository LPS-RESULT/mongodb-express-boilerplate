/**
 * This is the main route, we handle server status here.
 * We also connect the rest of the routes here.
 */

const express = require('express');
const router = express.Router();
const userRouter = require("./routes/user-router");

/**
 * GET / - Heartbeat endpoint
 *
 * This is essentially retrieving surface information about the running
 * server.
 */
router.get('/', function(req,res){
    res.json({status: "Server is running."});
});

router.use('/user', userRouter); //Route to /api

module.exports = router;
