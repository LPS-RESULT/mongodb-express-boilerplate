/**
 * User Router
 * All subresources and methods using the /user path
 * are defined here.
 *
 * @author ixi
 */

const express = require('express');
const router = express.Router();
const service = require('../services/user-service');
const tools = require('../express-tools');
const _ = require('lodash');

/**
 * GET /user - Search Users
 * Searches for users that match a particular query:
 *
 *      query - string to search (e.g. "@email.com") | DEFAULT: ""
 *      limit - max number of items in a page result (e.g. 10) | DEFAULT: 20
 *      offset - number of items to skip in the search for pagination (e.g. 10) | DEFAULT: 0
 *      sort - sorting commands (ex. "username" - ascending, "-email username" - descending email, ascending username) | DEFAULT: ""
 *
 * The response is paginatable:
 *
 *      _first - first page of the search
 *      _last - last page of the search
 *      _next - next page of the search after the current
 *      _prev - previous page of the search before the current
 *      _self - current page of the search
 *      objects - array of results
 *      meta - { - will contain a copy of the request
 *          query - query parameter used
 *          limit - limit parameter used
 *          offset - offset parameter used
 *          sort - sort parameter used
 *          total - total number of items in the search request
 *      }
 */
router.get('/', (req, res) => {
    let query = req.query.query || "";
    let limit = req.query.limit || 20;
    let offset = req.query.offset || 0;
    let sort = req.query.sort || "";

    service.searchUsers(query, limit, offset, sort).then((result) => {
        if(result !== null){
            result._next = tools.getNextScroll(req, result.meta);
            result._prev = tools.getPrevScroll(req, result.meta);
            result._last = tools.getLastScroll(req, result.meta);
            result._first = tools.getFirstScroll(req, result.meta);
            result._self = tools.getSelfPath(req);
            if(_.isArray(result.objects)) {
                result.objects = result.objects.map((o) => {
                    o._self = tools.getSelfPath(req) + '/' + o._id;
                    return o;
                })
            }
        }
        res.json(result);
    }, (error) => {
        res.next(error);
    })
});

/**
 * GET /user/:id - Get one user
 * Retrieves a user given the id, and will include the following aside
 * from the actual document attributes
 *
 *      {
 *          _id: id of the user
 *          createdAt: Date created at
 *          updatedAt: Date last updated
 *          __v: revision number
 *          _self: url of the resource in the API
 *      }
 */
router.get('/:id', (req, res) => {
    let id = req.params.id;
    service.getUser(id).then((result) => {
        if(result !== null){
            result._self = tools.getSelfPath(req);
        }
        res.json(result);
    }, (error) => {
        res.json({error: error});
    })
});

/**
 * POST /user - Create one user
 * Creates a user. The body will be a JSON of the user object to be created
 *
 *      {
 *          "username": "username",
 *          "email": "name@email.com",
 *          "password": "password"
 *      }
 *
 * The result will be a copy of the new user created and will include the
 * following aside from details above:
 *
 *      {
 *          _id: id of the user
 *          createdAt: Date created at
 *          updatedAt: Date last updated
 *          __v: revision number
 *          _self: url of the resource in the API
 *      }
 */
router.post('/', (req, res) => {
    let object = req.body;
    service.createUser(object).then((result) => {
        if(result!==null) {
            result._self = tools.getSelfPath(req)+'/'+result._id;
        }
        res.json(result);
    }, (error) => {
        res.json({error: error});
    })
});

/**
 * POST /user/verify - Verifies a user given the password
 *
 *      {
 *          "email": "name@email.com",
 *          "password": "password"
 *      }
 *
 * The response will simply be a boolean value
 *
 *      true if verified correctly
 *      false if it fails
 */
router.post('/verify', (req, res) => {
    let object = req.body;
    service.verifyUser(object).then((result) => {
        res.json(result);
    }, (error) => {
        res.json({error: error});
    })
});

/**
 * PUT /user/:id - Update one user based on the id
 * Updates a user. The body will be a JSON of the user object to be partially/fully updated
 *
 *      {
 *          "username": "changed",
 *          "email": "changed@email.com",
 *      }
 *
 * The result will be a copy of the updated user created and will include the
 * following aside from details above:
 *
 *      {
 *          _id: id of the user
 *          createdAt: Date created at
 *          updatedAt: Date last updated
 *          __v: revision number
 *          _self: url of the resource in the API
 *      }
 */
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let object = req.body;
    service.updateUser(id, object).then((result) => {
        if(result !== null) {
            result._self = tools.getSelfPath(req);
        }
        res.json(result);
    }, (error) => {
        res.json({error: error});
    })
});

/**
 * DELETE /user/:id - Deletes one user based on the id
 * Deletes a user. The result will be a copy of the deleted user created and will include the
 * following aside from details above:
 *
 *      {
 *          _id: id of the user
 *          createdAt: Date created at
 *          updatedAt: Date last updated
 *          __v: revision number
 *          _self: url of the resource in the API
 *      }
 */
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    service.deleteUser(id).then((result) => {
        res.json(result);
    }, (error) => {
        res.json({error: error});
    })
});

/**
 * DELETE /user - Deletes multiple users based on the ids if specified
 * Deletes multiple users. The request body may either be blank or a JSON array of ids
 * of users to be deleted
 *
 *      ["id_1", "id_2"] //Array of ids
 *
 *      OR
 *
 *      "" //Empty
 *
 * The result will be a copy of the batch delete response
 *
 *      {
 *          n: 3 - number of affected items from batch operation
 *          ok: 1 - if operation is successful
 *          deletedCount: 3 - number of deleted items
 *      }
 */
router.delete('/', (req, res) => {
    service.deleteManyUsers(req.body || {}).then((result) => {
        res.json(result);
    }, (error) => {
        res.json({error: error});
    })
});

module.exports = router;
