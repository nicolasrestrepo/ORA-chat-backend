/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'users',

    attributes: {
        autoCreatedAt: true,
        name: {
            type: 'string',
            required: true
        },
        token: {
            type: 'string'
        },
        messages: {
            collection: 'Message',
            via: 'user'
        }
    }
};