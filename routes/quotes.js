const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')
const User = require('../models/user')
<<<<<<< HEAD
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth-config')

// All Quote Route
// router.get('/', async (req, res) => {
//     try {
//         const quotes = await Quote.find({})
//         res.render('quotes/index', {
//             quotes: quotes
//         })
//     } catch {
//         res.redirect('/')
//     }
// })

// New Quote Route
router.get('/new', ensureAuthenticated, async (req, res) => {
=======

// All Quote Route
router.get('/', async (req, res) => {
    try {
        const quotes = await Quote.find({})
        res.render('quotes/index', {
            quotes: quotes
        })
    } catch {
        res.redirect('/')
    }
})

// New Quote Route
router.get('/new', async (req, res) => {
>>>>>>> 5d573747b35512a272ccedc9598e2078f4750dd0
    renderNewPage(res, new Quote())
})

// Create Quote Route
router.post('/', async (req, res) => {
    const quote = new Quote({
<<<<<<< HEAD
        user: req.user.id,
=======
        user: req.body.user,
>>>>>>> 5d573747b35512a272ccedc9598e2078f4750dd0
        gallons: req.body.gallons,
        shippingAddress: req.body.shippingAddress,
        deliveryDate: new Date(req.body.deliveryDate),
        price: req.body.price,
        totalDue: req.body.totalDue
    })
    try {
        const newQuote = await quote.save()
        // res.redirect(`quotes/${newQuote.id}`)
<<<<<<< HEAD
        res.redirect('/dashboard')
=======
        res.redirect('quotes')
>>>>>>> 5d573747b35512a272ccedc9598e2078f4750dd0
    } catch {
        renderNewPage(res, quote, true)
    }
})

// Show Quote Route
<<<<<<< HEAD
router.get('/:id', ensureAuthenticated, async (req, res) => {
=======
router.get('/:id', async (req, res) => {
>>>>>>> 5d573747b35512a272ccedc9598e2078f4750dd0
    try {
        const quote = await Quote.findById(req.params.id).populate('user').exec()
        res.render('quotes/show', { quote: quote })
    } catch {
        res.redirect('/')
    }
})

// Delete Quote Page
router.delete('/:id', async (req, res) => {
    let quote
    try {
      quote = await Quote.findById(req.params.id)
      await quote.remove()
      res.redirect('/quotes')
    } catch {
      if (quote != null) {
        res.render('quotes/show', {
          quote: quote,
          errorMessage: 'Could not delete quote'
        })
      } else {
        res.redirect('/')
      }
    }
  })
  
async function renderFormPage(res, quote, form, hasError = false) {
    try {
      const users = await User.find({})
      const params = {
        users: users,
        quote: quote
      }
      if (hasError) {
        if (form === 'edit') {
          params.errorMessage = 'Error Updating Quote'
        } else {
          params.errorMessage = 'Error Creating Quote'
        }
      }
      res.render(`quotes/${form}`, params)
    } catch {
      res.redirect('/quotes')
    }
  }

async function renderNewPage(res, quote, hasError = false) {
    renderFormPage(res, quote, 'new', hasError)
  }
  
  async function renderEditPage(res, quote, hasError = false) {
    renderFormPage(res, quote, 'edit', hasError)
  }

module.exports = router