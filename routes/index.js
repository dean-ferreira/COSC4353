const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')

router.get('/', async (req, res) => {
    let quotes
    try {
        quotes = await Quote.find().sort({ createAt: 'desc'}).limit(10).exec()
        res.render('index', {
            quotes: quotes
        })
    } catch {
        quotes =[]
    }
})

module.exports = router