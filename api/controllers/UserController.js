/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var jwt = require('jwt-simple');

var secret = 'eelfdtaumap690s'

module.exports = {
    send: function(req, res) {
        var receivedToken = req.get('Authorization').split(' ')[1];
        //var receivedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVXNlciAxIiwiY3JlYXRlZEF0IjoiMjAxNy0xMC0xM1QwMjoyMjozMC40NjhaIiwidXBkYXRlZEF0IjoiMjAxNy0xMC0xM1QwMjoyMjozMC40NjhaIiwiaWQiOiI1OWUwMjM2NjFhYTM4OTdjMWU1OTMyOWMifQ.toyulWGHtr9lw8bkIqKy2h2Yg2TvC3HhdEnAW7JFwvw';

        var decodedUser = jwt.decode(receivedToken, secret);
        Message.create({
            user: decodedUser.id,
            content: req.param('message')
        }).then(function(createdMessage) {
            //notify
            sails.sockets.broadcast("newMessage", createdMessage);
            return res.ok('ok');
        }).catch(function(err) {
            return res.negotiate(err);
        });
    },
    new: function(req, res) {
        User.find().then(function(allUsers) {
            var userName = "User " + (allUsers.length + 1);
            User.create({ name: userName }).then(function(userCreated) {
                User.update({
                    id: userCreated.id
                }, {
                    token: jwt.encode(userCreated, secret)
                }).then(function(userUpdatedWithToken) {
                    return res.ok(userUpdatedWithToken);
                })
            })
        }).catch(function(err) {
            res.negotiate(err);
        })
    }
};