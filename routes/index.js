const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')
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
    }
})

module.exports = router