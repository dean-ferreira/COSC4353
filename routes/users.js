const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Quote = require('../models/quote')
<<<<<<< HEAD
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
=======

const passport = require('passport')
const initializePassport = require('../passport-config')
initializePassport(
  passport,
  username => User.find(user => user.username === username),
  id => User.find(user => user.id === id)
)

// All User Route
router.get('/', async (req, res) => {
    try {
        const users = await User.find({})
        res.render('users/index', {users: users})
    } catch {
        res.redirect('/')
    }
})
>>>>>>> 5d573747b35512a272ccedc9598e2078f4750dd0

// New User Route
router.get('/new', (req, res) => {
    res.render('users/new', { user: new User()})
})

// Create User Route
<<<<<<< HEAD
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
=======
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10)
    })
    try {
        const newUser = await user.save()
        res.redirect('/users/login')
        // res.redirect(`users/${newUser.id}`)
    } catch {
        res.render('users/new', {
            user: user,
            errorMessage: 'Error creating User'
        })
    }
})

// Login User Route
router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}))

// Show User Route
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const quotes = await Quote.find({ user: user.id }).limit(6).exec()
>>>>>>> 5d573747b35512a272ccedc9598e2078f4750dd0
        res.render('users/show', {
            user: user,
            quotesByUser: quotes
        })
    } catch {
        res.redirect('/')
    }
})

// Edit User Route
<<<<<<< HEAD
router.get('/:id/edit', ensureAuthenticated, async (req, res) => {
=======
router.get('/:id/edit', async (req, res) => {
>>>>>>> 5d573747b35512a272ccedc9598e2078f4750dd0
    try {
        const user = await User.findById(req.params.id)
        res.render('users/edit', { user: user })
    } catch {
<<<<<<< HEAD
        res.redirect('/dashboard')
=======
        res.redirect('/users')
>>>>>>> 5d573747b35512a272ccedc9598e2078f4750dd0
    }
})

// Update User Route
<<<<<<< HEAD
router.put('/:id', ensureAuthenticated, async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)
        // user.username = req.body.username
        // user.password = await bcrypt.hash(req.body.password, 10)
=======
router.put('/:id', async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)
        user.username = req.body.username
        user.password = req.body.password
>>>>>>> 5d573747b35512a272ccedc9598e2078f4750dd0
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

<<<<<<< HEAD
=======
// Delete User Route
router.delete('/:id', async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)
        await user.remove()
        res.redirect('/users/')
    } catch {
        if (user == null) {
            res.redirect('/')
        } else {
            res.redirect(`/users/${user.id}`)
        }
    }
})

>>>>>>> 5d573747b35512a272ccedc9598e2078f4750dd0
module.exports = router