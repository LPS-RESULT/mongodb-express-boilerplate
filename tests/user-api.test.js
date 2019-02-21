
const chai = require('chai');
const expect = chai.expect;
const request = require('request-promise');
const tools = require('./test-tools');

let basePath = 'http://localhost:80';

describe('/user API',() => {
    before((callback) => {
        let options = {
            method: 'DELETE',
            url: basePath + '/user/',
            headers: {
                'content-type': 'application/json'
            },
            json: true
        };

        request(options).then((res) => {
            callback();
        }).catch((error)=>{
            callback(error);
        });
    });

    const user1 = {
        username: 'jason.wong',
        email: 'jason.wong@lps.co.nz',
        password: 'LPSismylife'
    };
    let createdUser1 = {};

    describe('POST /user - Creating user1 where ' + tools.parameterize(user1), () => {

        before((callback) => {
            let options = {
                method: 'POST',
                url: basePath + '/user/',
                headers: {
                    'content-type': 'application/json'
                },
                body: user1,
                json: true
            };

            request(options).then((res) => {
                Object.assign(createdUser1, res);
                callback();
            }).catch((error)=>{
                callback(error);
            });
        });

        it('_id should exist', () => {
            expect(createdUser1._id).to.be.a('string');
        });
        it('Username should be ' + user1.username, () => {
            expect(createdUser1.username).to.equal(user1.username);
        });
        it('Email should be ' + user1.email, () => {
            expect(createdUser1.email).to.equal(user1.email);
        });
        it('createdAt should exist', () => {
            expect(createdUser1).to.have.property('createdAt');
        });
        it('updatedAt should exist', () => {
            expect(createdUser1).to.have.property('updatedAt');
        });
        it('_self should exist', () => {
            expect(createdUser1).to.have.property('_self');
        });
    });

    const user2 = {
        username: 'jiminy.cricket',
        email: 'jiminy.cricket@lps.co.nz',
        password: 'LPSismylife'
    };
    let createdUser2 = {};

    describe('POST /user - Creating user2 where ' + tools.parameterize(user2), () => {

        before((callback) => {
            let options = {
                method: 'POST',
                url: basePath + '/user/',
                headers: {
                    'content-type': 'application/json'
                },
                body: user2,
                json: true
            };

            request(options).then((res) => {
                Object.assign(createdUser2, res);
                callback();
            }).catch((error)=>{
                callback(error);
            });
        });

        it('_id should exist', () => {
            expect(createdUser2._id).to.be.a('string');
        });
        it('Username should be ' + user2.username, () => {
            expect(createdUser2.username).to.equal(user2.username);
        });
        it('Email should be ' + user2.email, () => {
            expect(createdUser2.email).to.equal(user2.email);
        });
        it('createdAt should exist', () => {
            expect(createdUser2).to.have.property('createdAt');
        });
        it('updatedAt should exist', () => {
            expect(createdUser2).to.have.property('updatedAt');
        });
        it('_self should exist', () => {
            expect(createdUser2).to.have.property('_self');
        });
    });

    const user3 = {
        username: 'beauty.beast',
        email: 'beauty.beast@lps.co.nz',
        password: 'LPSismylife'
    };
    let createdUser3 = {};

    describe('POST /user - Creating user3 where ' + tools.parameterize(user3), () => {

        before((callback) => {
            let options = {
                method: 'POST',
                url: basePath + '/user/',
                headers: {
                    'content-type': 'application/json'
                },
                body: user3,
                json: true
            };

            request(options).then((res) => {
                Object.assign(createdUser3, res);
                callback();
            }).catch((error)=>{
                callback(error);
            });
        });

        it('_id should exist', () => {
            expect(createdUser3._id).to.be.a('string');
        });
        it('Username should be ' + user3.username, () => {
            expect(createdUser3.username).to.equal(user3.username);
        });
        it('Email should be ' + user3.email, () => {
            expect(createdUser3.email).to.equal(user3.email);
        });
        it('createdAt should exist', () => {
            expect(createdUser3).to.have.property('createdAt');
        });
        it('updatedAt should exist', () => {
            expect(createdUser3).to.have.property('updatedAt');
        });
        it('_self should exist', () => {
            expect(createdUser3).to.have.property('_self');
        });
    });

    const user4 = {
        username: 'jason.bourne',
        email: 'jason.bourne@lps.co.nz',
        password: 'LPSismylife'
    };
    let createdUser4 = {};

    describe('POST /user - Creating user4 where ' + tools.parameterize(user4), () => {

        before((callback) => {
            let options = {
                method: 'POST',
                url: basePath + '/user/',
                headers: {
                    'content-type': 'application/json'
                },
                body: user4,
                json: true
            };

            request(options).then((res) => {
                Object.assign(createdUser4, res);
                callback();
            }).catch((error)=>{
                callback(error);
            });
        });

        it('_id should exist', () => {
            expect(createdUser4._id).to.be.a('string');
        });
        it('Username should be ' + user4.username, () => {
            expect(createdUser4.username).to.equal(user4.username);
        });
        it('Email should be ' + user4.email, () => {
            expect(createdUser4.email).to.equal(user4.email);
        });
        it('createdAt should exist', () => {
            expect(createdUser4).to.have.property('createdAt');
        });
        it('updatedAt should exist', () => {
            expect(createdUser4).to.have.property('updatedAt');
        });
        it('_self should exist', () => {
            expect(createdUser4).to.have.property('_self');
        });
    });

    describe('GET /user - Searching users with no search params', () => {
        let searchResult = {};
        before((callback) => {
            let options = {
                method: 'GET',
                url: basePath + '/user/',
                headers: {
                    'content-type': 'application/json'
                },
                json: true
            };

            request(options).then((res) => {
                Object.assign(searchResult, res);
                callback();
            }).catch((error)=>{
                callback(error);
            });
        });

        it('Search result should include a meta property', () => {
            expect(searchResult).to.have.property('meta');
        });
        it('Meta property limit should default to 20', () => {
            expect(searchResult.meta).to.have.property('limit');
            expect(searchResult.meta.limit).to.equal(20);
        });
        it('Meta property offset should default to 0', () => {
            expect(searchResult.meta).to.have.property('offset');
            expect(searchResult.meta.offset).to.equal(0);
        });
        it('Meta property query should default to ""', () => {
            expect(searchResult.meta).to.have.property('query');
            expect(searchResult.meta.query).to.equal("");
        });
        it('Meta property sort should default to ""', () => {
            expect(searchResult.meta).to.have.property('sort');
            expect(searchResult.meta.sort).to.equal("");
        });
        it('Meta property total should be 4', () => {
            expect(searchResult.meta).to.have.property('total');
            expect(searchResult.meta.total).to.equal(4);
        });

        it('Search result should include a _self property', () => {
            expect(searchResult).to.have.property('_self');
        });
        it('Search result should include a _first property', () => {
            expect(searchResult).to.have.property('_first');
        });
        it('Search result should include a _last property', () => {
            expect(searchResult).to.have.property('_last');
        });
        it('Search result should include a _next property', () => {
            expect(searchResult).to.have.property('_next');
        });
        it('Search result should include a _prev property', () => {
            expect(searchResult).to.have.property('_prev');
        });
        it('Search result should include an objects array with length of 4', () => {
            expect(searchResult).to.have.property('objects');
            expect(searchResult.objects).to.have.lengthOf(4);
        });
    });


    let searchParams = {
        query: 'jason',
        limit: 5,
        offset: 1,
        sort: 'username'
    };
    describe('GET /user - Searching users where ' + tools.parameterize(searchParams), () => {
        let searchResult = {};
        before((callback) => {
            let options = {
                method: 'GET',
                uri: basePath + '/user/',
                headers: {
                    'content-type': 'application/json'
                },
                qs: searchParams,
                json: true
            };

            request(options).then((res) => {
                Object.assign(searchResult, res);
                callback();
            }).catch((error)=>{
                callback(error);
            });
        });

        it('Search result should include a meta property', () => {
            expect(searchResult).to.have.property('meta');
        });
        it('Meta property limit should be 5', () => {
            expect(searchResult.meta).to.have.property('limit');
            expect(searchResult.meta.limit).to.equal(5);
        });
        it('Meta property offset should be 1', () => {
            expect(searchResult.meta).to.have.property('offset');
            expect(searchResult.meta.offset).to.equal(1);
        });
        it('Meta property query should be jason', () => {
            expect(searchResult.meta).to.have.property('query');
            expect(searchResult.meta.query).to.equal("jason");
        });
        it('Meta property sort should be "username"', () => {
            expect(searchResult.meta).to.have.property('sort');
            expect(searchResult.meta.sort).to.equal("username");
        });
        it('Meta property total should be 2', () => {
            expect(searchResult.meta).to.have.property('total');
            expect(searchResult.meta.total).to.equal(2);
        });

        it('Search result should include an objects array with length of 1', () => {
            expect(searchResult).to.have.property('objects');
            expect(searchResult.objects).to.have.lengthOf(1);
        });
    });

    describe('GET /user/'+createdUser1._id+' - Getting user1 where id = ' + createdUser1._id, () => {
        let fetchedUser = {};
        before((callback) => {
            let options = {
                method: 'GET',
                url: basePath + '/user/'+createdUser1._id,
                headers: {
                    'content-type': 'application/json'
                },
                json: true
            };

            request(options).then((res) => {
                Object.assign(fetchedUser, res);
                callback();
            }).catch((error)=>{
                callback(error);
            });
        });

        it('_id should match', () => {
            expect(fetchedUser._id).to.equal(createdUser1._id);
        });
        it('username should match', () => {
            expect(fetchedUser.username).to.equal(createdUser1.username);
        });
        it('email should match', () => {
            expect(fetchedUser.email).to.equal(createdUser1.email);
        });
    });

    let updateOnUser = {
        username: 'george',
        email: 'george@lps.co.nz'
    };
    describe('PUT /user/'+createdUser1._id+' - Updating user1 where id = ' + createdUser1._id
        + ' setting '+tools.parameterize(updateOnUser), () => {
        let updatedUser = {};
        before((callback) => {
            let options = {
                method: 'PUT',
                url: basePath + '/user/'+createdUser1._id,
                headers: {
                    'content-type': 'application/json'
                },
                body: updateOnUser,
                json: true
            };

            request(options).then((res) => {
                Object.assign(updatedUser, res);
                callback();
            }).catch((error)=>{
                callback(error);
            });
        });

        it('_id should be same', () => {
            expect(updatedUser._id).to.equal(createdUser1._id);
        });
        it('username should be updated', () => {
            expect(updatedUser.username).to.equal(updateOnUser.username);
        });
        it('email should be updated', () => {
            expect(updatedUser.email).to.equal(updateOnUser.email);
        });
    });


    describe('GET /user - Searching users where query = jason', () => {
        let searchResult = {};
        before((callback) => {
            let options = {
                method: 'GET',
                uri: basePath + '/user/',
                headers: {
                    'content-type': 'application/json'
                },
                qs: {
                    query: 'jason'
                },
                json: true
            };

            request(options).then((res) => {
                Object.assign(searchResult, res);
                callback();
            }).catch((error)=>{
                callback(error);
            });
        });

        it('Search result should include a meta property', () => {
            expect(searchResult).to.have.property('meta');
        });

        it('Meta property query should be jason', () => {
            expect(searchResult.meta).to.have.property('query');
            expect(searchResult.meta.query).to.equal("jason");
        });

        it('Meta property total should be 1', () => {
            expect(searchResult.meta).to.have.property('total');
            expect(searchResult.meta.total).to.equal(1);
        });

        it('Search result should include an objects array with length of 1', () => {
            expect(searchResult).to.have.property('objects');
            expect(searchResult.objects).to.have.lengthOf(1);
        });
    });

    describe('DELETE /user/'+createdUser4._id+' - Deleting user4 where id = ' + createdUser4._id, () => {
        let deletedUser = {};
        before((callback) => {
            let options = {
                method: 'DELETE',
                url: basePath + '/user/'+createdUser4._id,
                headers: {
                    'content-type': 'application/json'
                },
                json: true
            };

            request(options).then((res) => {
                Object.assign(deletedUser, res);
                callback();
            }).catch((error)=>{
                callback(error);
            });
        });

        it('_id should be same as user4', () => {
            expect(deletedUser._id).to.equal(createdUser4._id);
        });
        it('username should be same as user4', () => {
            expect(deletedUser.username).to.equal(createdUser4.username);
        });
        it('email should be same as user4', () => {
            expect(deletedUser.email).to.equal(createdUser4.email);
        });
    });

    describe('GET /user - Searching users where query = jason', () => {
        let searchResult = {};
        before((callback) => {
            let options = {
                method: 'GET',
                uri: basePath + '/user/',
                headers: {
                    'content-type': 'application/json'
                },
                qs: {
                    query: 'jason'
                },
                json: true
            };

            request(options).then((res) => {
                Object.assign(searchResult, res);
                callback();
            }).catch((error)=>{
                callback(error);
            });
        });

        it('Search result should include a meta property', () => {
            expect(searchResult).to.have.property('meta');
        });

        it('Meta property query should be jason', () => {
            expect(searchResult.meta).to.have.property('query');
            expect(searchResult.meta.query).to.equal("jason");
        });

        it('Meta property total should be 0', () => {
            expect(searchResult.meta).to.have.property('total');
            expect(searchResult.meta.total).to.equal(0);
        });

        it('Search result should include an objects array with length of 0', () => {
            expect(searchResult).to.have.property('objects');
            expect(searchResult.objects).to.have.lengthOf(0);
        });
    });
});