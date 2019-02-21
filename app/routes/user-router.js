/**
 * This is the main route, we handle server status here.
 * We also connect the rest of the routes here.
 */

const express = require('express');
const router = express.Router();
const service = require('../services/user-service');
const tools = require('../express-tools');
const _ = require('lodash');

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

router.post('/verify', (req, res) => {
    let object = req.body;
    service.verifyUser(object).then((result) => {
        res.json(result);
    }, (error) => {
        res.json({error: error});
    })
});

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

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    service.deleteUser(id).then((result) => {
        res.json(result);
    }, (error) => {
        res.json({error: error});
    })
});

router.delete('/', (req, res) => {
    service.deleteManyUsers(req.body || {}).then((result) => {
        res.json(result);
    }, (error) => {
        res.json({error: error});
    })
});

module.exports = router;
