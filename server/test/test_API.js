const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHTTP);


module.exports = function (db) {
    //login
    let token;
    beforeEach(function (done) {
        let user = new users({
            email: "test@gmail.com",
            password: "1234",
        });
        user.save(function (err) {
            chai.request(server)
                .post('/api/users/login')
                .send({ 'email': 'test@gmail.com', 'password': '1234' })
                .end(function (err, res) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    token = res.body.token;
                });
            done();
        })
    });

    it('one user should log in with the POST method ', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({ 'email': 'test@gmail.com', 'password': '1234' })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.data.should.have.property('email');
                res.body.should.have.property('token');
                res.body.data.email.should.equal('test@gmail.com');
                done();
            });
    });
}