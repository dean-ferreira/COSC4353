const User = require('../models/user')
const assert = require('assert')

// All Read Tests

describe('Read Tests', () => {
    let read_user
    beforeEach(done => {
        read_user = User({ username: 'read_user', password: 'read_user'})
        read_user.save().then(() => {
            done()
        })
    })
    it('Read a user: read_user', done => {
        User.find({ username: 'read_user'}).then(returned_users => {
            assert(read_user._id.toString() === returned_users[0]._id.toString())
            done()
        })
    })
})