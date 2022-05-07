const User = require('../models/user')
const Quote = require('../models/quote')
const assert = require('assert')

const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
chai.use(chaiHttp)

const server = require("../server")
const res = require('express/lib/response')

describe('Create records', () => {
    it('Create a user in DB', () => {
        const test_user = new User({ username: "test_user", password: "testuser"})
        test_user
            .save()
            .then(() => {
                assert(!test_user.isNew)
            })
            .catch(() => {
                console.log("error")
            })
    })
})


// let token, status
// describe('Register and Login Test', () => {
//     before(done => {
//         chai.request(server)
//             .post('/users/new')
//             .send({ username: 'test_user', password: 'test_user' })
//             .end((error, res) => {
//                 res.should.have.status(200)
//                 console.log('redirect to login page')
//                 done()
//             })
//     })

//     it('GET: Login Page', done => {
//         chai.require(server)
//             .get('/')
//             .end((error, res) => done())
//     })

//     it('POST Login', done => {
//         chai.request(server)
//             .post('/users/login')
//             .send({ username: 'test_user', password: 'test_user' })
//             end((error, res) => {
//                 res.header.should.be.a("object")
//                 res.header.should.be.property("set-cookie")
//                 res.should.have.status(200)
//                 if (!error){
//                     token = res.header['set-cookie'][0]
//                     status = res.status
//                     console.log(`Token : ${token}\nStatus : ${status}`)
//                 }
//                 else {
//                     console.log("something went wrong")
//                 }
//                 done()
//             })
//     })
// })
