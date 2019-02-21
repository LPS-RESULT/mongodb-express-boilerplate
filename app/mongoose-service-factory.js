const _ = require('lodash');

/**
 * Builds a getSomething function that fetches a db document by _id.
 *
 *      let id = "HFUISKKeiie8299203jdi3";
 *      const connect = require('./connector');
 *      const model = require('./models/Something');
 *      let getSomething = buildGetService(connect, model);
 *      getSomething(id).then((fetchedSomething) => {
 *          // do something with fetchedSomething
 *      })
 *
 * @param connectDbPromise - connect promise that resolves to a mongo db connection
 * @param mongooseModel - Mongoose model to perform a get
 * @returns {function(*=): Promise<any>}
 */
function buildGetService(connectDbPromise, mongooseModel, options) {
    return function(id) {
        return new Promise((resolve, reject) => {
            connectDbPromise().then(() => {
                let args = [id];
                if(options && _.isString(options.select)) {
                    args.push(options.select)
                }
                args.push((err, object) => {
                    if (err) {
                        reject(err);
                    } else if(object === null) {
                        resolve(null);
                    } else {
                        resolve(object._doc);
                    }
                });
                mongooseModel.findById.apply(mongooseModel,args);
            });
        });
    }
}

/**
 * Builds a searchSomething function that queries for db documents.
 *
 *      let query = 'some';
 *      // let query = {somethingField1: 'matchValue'};
 *      let limit = 10;
 *      let offset = 0;
 *      let sort = '-somethingField2';
 *      const connect = require('./connector');
 *      const model = require('./models/Something');
 *      let searchSomething = buildSearchService(connect, model, ['somethingField1', 'somethingField2']);
 *      searchSomething(query, limit, offset, sort).then((deletedSomething) => {
 *          // do something with deletedSomething
 *      })
 *
 * @param connectDbPromise - connect promise that resolves to a mongo db connection
 * @param mongooseModel - Mongoose model to perform a delete
 * @param options - array of field names that are searchable
 * @returns {function(*=): Promise<any>}
 */
function buildSearchService(connectDbPromise, mongooseModel, options) {
    return function(query, limit, offset, sort) {
        query = query || "";
        limit = Number.parseInt(limit);
        offset = Number.parseInt(offset);
        sort = sort || "";
        return new Promise((resolve, reject) => {
            connectDbPromise().then(() => {
                let searchable = options.searchable;
                let select = options.select || '';
                let meta = { // the meta properties are added to the response
                    limit: limit,
                    offset: offset,
                    query: query,
                    sort: sort
                }; // create meta properties for this request
                let regex = new RegExp(query, 'ig');
                let q = null;
                if(_.isString(query)) {
                    if(_.isArray(searchable)) {
                        q =  query && query.trim().length ? // create a regex query to match the ff props
                            {$or: searchable.map((cur) => {
                                    return {[cur]: regex};
                                })}
                            : {};
                    } else {
                        q = {};
                    }
                }

                let promisedQuery = mongooseModel.find(q)
                    .select(select) // select fields
                    .limit(meta.limit)// set pagination limit
                    .skip(meta.offset); //set how many items to skip

                if (sort.length > 0) {
                    promisedQuery.sort(sort);
                }
                promisedQuery.exec();

                let promisedCount = mongooseModel.countDocuments(q).exec();

                Promise.all([promisedCount, promisedQuery])// execute both asynchronously
                    .then(([total, objects]) => { // when both responses are available
                        meta.total = total; // set the total count into meta
                        resolve({
                            meta: meta,
                            objects: objects.map((o) => o._doc)
                        });
                    }, (error) => {
                        reject(error);
                    });
            });
        });
    }
}

/**
 * Builds a createSomething function that creates a db document given the object value.
 *
 *      let object = { somethingAttribute1: "somethingValue1" };
 *      const connect = require('./connector');
 *      const model = require('./models/Something');
 *      let createSomething = buildCreateService(connect, model);
 *      createSomething(object).then((createdSomething) => {
 *          // do something with createdSomething
 *      })
 *
 * @param connectDbPromise - connect promise that resolves to a mongo db connection
 * @param mongooseModel - Mongoose model to perform a create
 * @returns {function(*=): Promise<any>}
 */
function buildCreateService(connectDbPromise, mongooseModel) {
    return function(object) {
        return new Promise((resolve, reject) => {
            connectDbPromise().then(() => {
                mongooseModel.create(object,
                    (err, object) => {
                        if (err) {
                            reject(err);
                        } else if(object === null) {
                            resolve(null);
                        } else {
                            resolve(object._doc);
                        }
                    }
                );
            });
        });
    }
}

/**
 * Builds a createManySomethings function that creates multiple db document given the object values as array.
 *
 *      let objects = [{ somethingAttribute1: "somethingValue1" }, { somethingAttribute1: "somethingValue2" }];
 *      const connect = require('./connector');
 *      const model = require('./models/Something');
 *      let createManySomethings = buildCreateManyService(connect, model);
 *      createManySomethings(object).then((createdSomethings) => {
 *          // do something with createdSomethings
 *      })
 *
 * @param connectDbPromise - connect promise that resolves to a mongo db connection
 * @param mongooseModel - Mongoose model to perform a create
 * @returns {function(*=): Promise<any>}
 */
function buildCreateManyService(connectDbPromise, mongooseModel) {
    return function(objects) {
        return new Promise((resolve, reject) => {
            connectDbPromise().then(() => {
                mongooseModel.insertMany(objects,
                    (err, objs) => {
                        if (err) {
                            reject(err);
                        } else if(objs === null) {
                            resolve(null);
                        } else {
                            resolve(objs.map((item) => {
                                return item._doc;
                            }));
                        }
                    }
                );
            });
        });
    }
}

/**
 * Builds a updateSomething function that updates a db document given the id and object's updated values.
 *
 *      let id = "HFUISKKeiie8299203jdi3";
 *      let object = { somethingAttribute1: "somethingUpdatedValue1" };
 *      const connect = require('./connector');
 *      const model = require('./models/Something');
 *      let updateSomething = buildUpdateService(connect, model);
 *      updateSomething(id,object).then((updatedSomething) => {
 *          // do something with updatedSomething
 *      })
 *
 * @param connectDbPromise - connect promise that resolves to a mongo db connection
 * @param mongooseModel - Mongoose model to perform an update
 * @returns {function(*=): Promise<any>}
 */
function buildUpdateService(connectDbPromise, mongooseModel, options) {
    return function(id,object) {
        return new Promise((resolve, reject) => {
            connectDbPromise().then(() => {
                let opts = {
                    new: true
                };
                if(options && _.isString(options.select)) {
                    opts.select = options.select;
                }
                mongooseModel.findByIdAndUpdate(id, object, opts,
                    (err, object) => {
                        if (err) {
                            reject(err);
                        } else if(object === null) {
                            resolve(null);
                        } else {
                            resolve(object._doc);
                        }
                    }
                );
            });
        });
    }
}

/**
 * Builds a deleteSomething function that deletes a db document by _id.
 *
 *      let id = "HFUISKKeiie8299203jdi3";
 *      const connect = require('./connector');
 *      const model = require('./models/Something');
 *      let deleteSomething = buildDeleteService(connect, model);
 *      deleteSomething(id).then((deletedSomething) => {
 *          // do something with deletedSomething
 *      })
 *
 * @param connectDbPromise - connect promise that resolves to a mongo db connection
 * @param mongooseModel - Mongoose model to perform a delete
 * @returns {function(*=): Promise<any>}
 */
function buildDeleteService(connectDbPromise, mongooseModel) {
    return function(id) {
        return new Promise((resolve, reject) => {
            connectDbPromise().then(() => {
                mongooseModel.findByIdAndRemove(id,
                    (err, object) => {
                        if (err) {
                            reject(err);
                        } else if(object === null) {
                            resolve(null);
                        } else {
                            resolve(object._doc);
                        }
                    }
                );
            });
        });
    }
}

/**
 * Builds a deleteManySomethings function that deletes multiple db documents in a collection.
 *
 *      let ids = ['111111111', '222222222'];
 *      const connect = require('./connector');
 *      const model = require('./models/Something');
 *      let deleteManySomethings = buildDeleteAllService(connect, model);
 *
 *      // DELETE ALL
 *      deleteManySomethings().then((deletedSomethings) => {
 *          // do something with deletedSomethings
 *      })
 *
 *      // DELETE MULTIPLE IDS
 *      deleteManySomethings(ids).then((deletedSomethings) => {
 *          // do something with deletedSomethings
 *      })
 *
 * @param connectDbPromise - connect promise that resolves to a mongo db connection
 * @param mongooseModel - Mongoose model to perform a delete
 * @returns {function(*=): Promise<any>}
 */
function buildDeleteManyService(connectDbPromise, mongooseModel) {
    return function(ids) {
        return new Promise((resolve, reject) => {
            connectDbPromise().then(() => {
                let q = {};
                if(_.isArray(ids)) {
                    q = {_id: { $in: ids.filter(_.isString) }};
                }
                mongooseModel.deleteMany(q,
                    (err, object) => {
                        if (err) {
                            reject(err);
                        } else if(object === null) {
                            resolve(null);
                        } else {
                            resolve(object);
                        }
                    }
                );
            });
        });
    }
}

module.exports = {
    buildGetService: buildGetService,
    buildSearchService: buildSearchService,
    buildCreateService: buildCreateService,
    buildCreateManyService: buildCreateManyService,
    buildUpdateService: buildUpdateService,
    buildDeleteService: buildDeleteService,
    buildDeleteManyService: buildDeleteManyService
};