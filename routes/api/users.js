const express = require('express');
const router = express.Router();
//Express Validator
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('../../config/default.json');

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/', [
    check('name', 'Name is Required').not().notEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})
] , async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const { name, email, password} = req.body;
    
    try {
        let user = await User.findOne({ email });
        //check if user already exists
        if (user) {
        return res.status(400).json({errors: [ {msg: 'User already exists'} ]});
        }
        // get avatar from email using gravata lib
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        //create new user
        user = new User({
            name,
            email,
            avatar,
            password
        });
        //encrypt password using bcrypt lib
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, 
            config.get('jwtSecret'),
            {expiresIn: 36000}, 
            (err,token) => {
                if(err) throw err;
                res.json({token});
            }
            );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }   
});

module.exports = router;