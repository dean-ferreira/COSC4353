const mongoose = require('mongoose')
mongoose.Promise = global.Promise

before(done => {
    mongoose.connect('mongodb://localhost/fuelquote', { useNewUrlParser: true })
    mongoose.connection
        .once('open', () => {
            // console.log('Connected')
            done()
        })
        .on('error', error => {
            console.log('Your error', error)
        })
})

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done()
    })
})