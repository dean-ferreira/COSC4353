if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// App Requires
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// Login Requires
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
require('./config/passport-config')(passport)

// Routers
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const quoteRouter = require('./routes/quotes')
const adminRouter = require('./routes/admin')

// App Uses
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// Database Connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// Express Session
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Globals
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg')
	res.locals.error_msg = req.flash('error_msg')
	res.locals.error = req.flash('error')
	next()
})

// Router Handlers
app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/quotes', quoteRouter)
app.use('/admin', adminRouter)

app.listen(process.env.PORT || 3000)