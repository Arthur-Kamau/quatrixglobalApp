var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
/* login request. */
router.post('/', async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log("hash "+hashedPassword);
        // users.push({
        //     id: Date.now().toString(),
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: hashedPassword
        // })
        // res.json({ phone: req.body.phone, password: req.body.password });
        res.json({ "reset_password": 0, "accessToken": "",  "expires_in": "24h"});
    } catch {
        res.json({ "error": { "password": "You have entered an incorrect password" } });
    }

});

module.exports = router;
