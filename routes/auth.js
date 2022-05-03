const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')

const User = require('../models/User');

// @route   GET auth
// @des     Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'server error' })
    }
});


// @route   POST auth
// @desc    Authenticate user & get user
// @access  Public
router.post('/', async (req, res) => {

    const { email, password } = req.body;

    try {
        // if user not exists
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        } else {
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            } else {
                // return jsonwebtoken
                // res.send('User registered')
                const payload = {
                    user: {
                        id: user.id
                    }
                }

                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    { expiresIn: 360000 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token })
                    }
                );
            }

        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router