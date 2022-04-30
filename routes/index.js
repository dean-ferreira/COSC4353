const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')
<<<<<<< HEAD
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth-config')

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => {
    res.render('welcome')
})

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    let quotes
    try {
        const quotes = await Quote.find({ user: req.user.id }).limit(5).exec()
        res.render('dashboard', {
            user: req.user,
            quotes: quotes
        })
    } catch {
        quotes = []
=======

router.get('/', async (req, res) => {
    let quotes
    try {
        quotes = await Quote.find().sort({ createAt: 'desc'}).limit(10).exec()
        res.render('index', {
            quotes: quotes
        })
    } catch {
        quotes =[]
>>>>>>> 5d573747b35512a272ccedc9598e2078f4750dd0
    }
})

module.exports = router