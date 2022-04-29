const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Quote = require('../models/quote')
const passport = require('passport')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth-config')

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('users/login'))

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next)
  })
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    // req.flash('success_msg', 'You are logged out')
    res.redirect('/users/login')
  })

// New User Route
router.get('/new', (req, res) => {
    res.render('users/new', { user: new User()})
})

// Create User Route
router.post('/new', (req, res) => {

    // const user = new User({
    //     username: req.body.username,
    //     password: await bcrypt.hash(req.body.password, 10)
    // })

    let errors = []
    const { username, password } = req.body

    if (!username || !password) {
        errors.push({ msg: 'Please enter all fields' })
    }
    
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' })
    }

    if (errors.length > 0) {
        res.render('users/new', {
            errors,
            username
        })
    } else {
        User.findOne({ username: username }).then(user => {
            if (user) {
                errors.push({ msg: 'Username already exists' })
                res.render('users/new', {
                    errors,
                    username
                })
            } else {
                const newUser = new User({
                    username: username,
                    password: password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err

                        newUser.password = hash
                        newUser.save()
                        res.redirect('/users/login')
                    })
                })
                console.log(newUser.username, newUser.password)
            }
        })
    }

    
    // try {
    //     const newUser = await user.save()
    //     res.redirect('/users/login')
    //     // res.redirect(`users/${newUser.id}`)
    // } catch {
    //     res.render('users/new', {
    //         user: user,
    //         errorMessage: 'Error creating User'
    //     })
    // }
})

// Show User Route
router.get('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const quotes = await Quote.find({ user: user.id }).exec()
        res.render('users/show', {
            user: user,
            quotesByUser: quotes
        })
    } catch {
        res.redirect('/')
    }
})

// Edit User Route
router.get('/:id/edit', ensureAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.render('users/edit', { user: user })
    } catch {
        res.redirect('/dashboard')
    }
})

// Update User Route
router.put('/:id', ensureAuthenticated, async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)
        // user.username = req.body.username
        // user.password = await bcrypt.hash(req.body.password, 10)
        user.fullName = req.body.fullName
        user.primaryAddress = req.body.primaryAddress
        user.secondaryAddress = req.body.secondaryAddress
        user.city = req.body.city
        user.state = req.body.state
        user.zipcode = req.body.zipcode
        user.shippingAddress = `${req.body.primaryAddress} ${req.body.secondaryAddress} ${req.body.city} ${req.body.state} ${req.body.zipcode}`
        await user.save()
        res.redirect(`/users/${user.id}`)
    } catch {
        if (user == null) {
            res.redirect('/')
        } else {
            res.render('users/edit', {
                user: user,
                errorMessage: 'Error updating User'
            })
        }
    }
})

module.exports = router