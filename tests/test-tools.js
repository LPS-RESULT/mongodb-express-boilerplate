module.exports = {
    /**
     * Returns a readable "key = value" listing of a map
     *
     *      parameterize({ a: 'aaa', b: 111 })
     *      // a = aaa, b = 111
     *
     * @param object
     * @returns {string}
     */
    parameterize: (object) => {
        return [...Object.keys(object)].map((item) => {
            return item + ' = ' + object[item]
        }).join(', ')
    }
};