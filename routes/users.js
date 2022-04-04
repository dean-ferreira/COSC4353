const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Quote = require('../models/quote')

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

// New User Route
router.get('/new', (req, res) => {
    res.render('users/new', { user: new User()})
})

// Create User Route
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
        res.render('users/show', {
            user: user,
            quotesByUser: quotes
        })
    } catch {
        res.redirect('/')
    }
})

// Edit User Route
router.get('/:id/edit', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.render('users/edit', { user: user })
    } catch {
        res.redirect('/users')
    }
})

// Update User Route
router.put('/:id', async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)
        user.username = req.body.username
        user.password = req.body.password
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

module.exports = router