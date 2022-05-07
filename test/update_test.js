const User = require('../models/user')
const assert = require('assert')

describe('Update Tests', () => {
    let updater
    beforeEach(done => {
        updater = new User({ username: 'Updater', password: 'Updater'})
        updater.save().then(() => done())
    })

    it('Update user information and Submit Test', () => {
        updater.set('name', 'UpUpdater')
        updater
            .save()
            .then(() => User.find({}))
            .then(returned_users => {
                assert(students[0].name !== 'Updater')
            })
    })
})