const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')
const User = require('../models/user')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth-config')

// Admin Index Route
router.get('/', ensureAuthenticated, async (req, res) => {
    res.render('admin/index')
})

// All User Route
router.get('/users', ensureAuthenticated, async (req, res) => {
    try {
        const users = await User.find({})
        res.render('admin/all_users', {users: users})
    } catch {
        res.redirect('/')
    }
})

// Delete User Route
router.delete('/:id', async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)
        await user.remove()
        res.redirect('/admin/users')
    } catch {
        if (user == null) {
            res.redirect('/admin/')
        } else {
            res.redirect(`/admin/`)
        }
    }
})

// All Quote Route
router.get('/quotes', ensureAuthenticated, async (req, res) => {
    try {
        const quotes = await Quote.find({})
        res.render('admin/all_quotes', {
            quotes: quotes
        })
    } catch {
        res.redirect('/admin/')
    }
})

// Delete Quote Page
router.delete('/:id', async (req, res) => {
    let quote
    try {
      quote = await Quote.findById(req.params.id)
      await quote.remove()
      res.redirect('/admin/quotes')
    } catch {
      if (quote != null) {
        res.render('/admin/', {
          quote: quote,
          errorMessage: 'Could not delete quote'
        })
      } else {
        res.redirect('/admin/quotess')
      }
    }
  })

module.exports = router