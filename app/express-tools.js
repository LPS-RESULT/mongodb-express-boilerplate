function getSelfPath(request) {
    let path = request.protocol + "://" + request.hostname + request.originalUrl;
    if(path.endsWith('/')) {
        return path.substring(0, path.length - 1);
    }
    return path;
}

function getDefaultScroll(request, meta) {
    let path = request.protocol + "://" + request.hostname + request.originalUrl;
    path = path.split('?').shift();
    return path + "?"
        + "query=" + meta.query
        + "&sort=" + meta.sort
        + "&limit=" + meta.limit;
}

function getNextScroll(request, meta) {
    if(meta.total > meta.offset + meta.limit) {
        return getDefaultScroll(request,meta)
            + "&offset="
            + (meta.offset + meta.limit);
    } else {
        return null;
    }
}

function getPrevScroll(request, meta) {
    if(meta.offset - meta.limit >= 0) {
        return getDefaultScroll(request,meta)
            + "&offset="
            + (meta.offset - meta.limit);
    } else {
        return null;
    }
}

function getFirstScroll(request, meta) {
    return getDefaultScroll(request,meta)
            + "&offset=0";
}

function getLastScroll(request, meta) {
    return getDefaultScroll(request,meta)
        + "&offset="
        + ((Math.ceil(meta.total / meta.limit) * meta.limit) - meta.limit);
}

module.exports = {
    getSelfPath: getSelfPath,
    getNextScroll: getNextScroll,
    getPrevScroll: getPrevScroll,
    getFirstScroll: getFirstScroll,
    getLastScroll: getLastScroll
};