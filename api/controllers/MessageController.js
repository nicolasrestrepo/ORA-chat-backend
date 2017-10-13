/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    list: function(req, res) {
        if (!req.isSocket)
            return res.badRequest('Care verga, haga las peticiones bien');

        Message.find().sort('createdAt ASC').populate('user').then(function(messages) {
            return res.ok(messages);
        }).catch(function(err) {
            return res.negotiate(err);
        });
    }
};