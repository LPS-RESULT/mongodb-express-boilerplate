/**
 * MODEL DEFINITION
 * This is the declaration of the Model name and supposed schema in mongoose.
 *
 * @author ixi
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.Promise = global.Promise;

let schema = mongoose.Schema({
    username: {type: String, default: '', required: true, unique: true},
    email: {type: String, default: '', required: true, unique: true},
    password: {type: String, default: '', required: true}
}, {
    // SCHEMA OPTIONS
    minimize: false,// Do not minimize the collection (by removing empty objects)
    strict: true,// Undeclared properties of the schema will not be saved
    autoIndex: true,// Turn off index events (happens at startup) that may impact performance
    // collection: "CollectionName", // Name of the underlying collection
    // shardKey: { tag: 1, name: 1 } // Sharding options for this schema
    timestamps: true // Add timestamps (createdAt and updatedAt)
});

/**
 * This is invoked BEFORE saving the document
 */
schema.pre('save', function(next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

/**
 * This method compares the hashed password that is stored for the user
 * @param candidatePassword
 * @param cb
 */
schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

let model = mongoose.model("User", schema, 'users');

// Export the model
module.exports = model;