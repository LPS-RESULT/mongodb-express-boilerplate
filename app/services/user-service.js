/**
 * USER SERVICE
 * This is the service for users
 *
 * @author ixi
 */
const model = require('../models/User');
const connect = require('../connector');
const factory = require('../mongoose-service-factory');
const _ = require('lodash');

module.exports = {
    /**
     * Given an _id, retrieves a USER object
     * @param id - the _id of the USER object
     * @returns {Promise<T>|Promise} - resolves with the created db document
     */
    getUser: factory.buildGetService(connect, model, {
        select: '-password' // remove password from selection
    }),
    /**
     * Queries users given a search query;
     * Returns a promise of the result set
     * @param searchQuery - query string used to find matches
     * @param limit - number of items per page
     * @param offset - number of items to skip
     * @returns {Promise<T>|Promise}
     */
    searchUsers:  factory.buildSearchService(connect, model, {
        searchable: ['username', 'email'],
        select: '-password' // remove password from selection
    }),
    verifyUser: (user) => {
        return new Promise((resolve, reject) => {
            let email = user.email;
            let password = user.password;
            if(_.isString(email) && _.isString(password)) {
                model.findOne({ email: email }, (err, user) => {
                    if (err) {
                        reject(err);
                    } else {
                        user.comparePassword(password, (err, isMatch) => {
                            if(err) {
                                reject(err);
                            } else {
                                resolve(isMatch);
                            }
                        });
                    }
                });
            } else {
                reject('User email and password required');
            }
        });
    },
    /**
     * Creates a USER, and returns a promise of
     * the created USER
     * @param user - partial (or full) USER object
     * @returns {Promise<T>|Promise}
     */
    createUser: factory.buildCreateService(connect, model),
    /**
     * Updates a user object with matching id;
     * Returns a promise of the update response
     * @param id - the _id of the user object
     * @param user - partial (or full) user object
     * @returns {Promise<T>|Promise}
     */
    updateUser: factory.buildUpdateService(connect, model, {
        select: '-password' // remove password from selection
    }),
    /**
     * Deletes a user given the id;
     * Returns a promise of the deleted object
     * @param id - the _id of the user object
     * @returns {Promise<T>|Promise}
     */
    deleteUser: factory.buildDeleteService(connect, model),
    /**
     * Deletes multiple users given the ids;
     * Returns a promise of the delete response
     * @param ids - the _id's of users to be deleted
     * @returns {Promise<T>|Promise}
     */
    deleteManyUsers: factory.buildDeleteManyService(connect, model)
};