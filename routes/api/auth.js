const {check, validationResult} = require('express-validator/check')
const auth = require('../../middleware/auth')
const User = require('../../models/Users')
const jwt = require('jsonwebtoken')
const express = require('express');
const bcrypt = require('bcryptjs')
const config = require('config')
const router = express.Router();


// @route   GET api/auth
// @desc    Test route
// @access  private
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password'); //finds user id from req.user ... look at middleware/auth.js for how that worked
        res.json(user);
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


// @route   Post api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required/').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body // pulls these the values of name email and password

    //check if user exsists
    try{
    let user = await User.findOne({email}); //instead of putting email:email we can just write email because they have the same name

    if(!user){
        return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]}) //we coudn't find  a user with that email
    }

    // verify that the password matches user
    const isMatch = await bcrypt.compare(password, user.password) //compares the password that the user entered, to the password stored in the found user

    if(!isMatch)
        return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]})

    //return json webtoken
    const payload = {
        user:{
            id: user.id
        }
    };

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 360000},
        (err, token)=>{
            if(err) throw err
            res.json({token});
        }
    )


    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }

})

module.exports = router