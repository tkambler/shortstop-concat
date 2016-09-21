'use strict';

const path = require('path');
const Promise = require('bluebird');
const caller = require('caller');
const shush = require('shush');
const shortstop = require('shortstop');
let glob = require('glob');

glob = Promise.promisify(glob, {
    'context': glob
});

function concat(configDir, handlers) {

    configDir = configDir || path.dirname(caller());
    handlers = handlers || {};
    let resolver = shortstop.create();
    let resolve = Promise.promisify(resolver.resolve, {
        'context': resolver
    });
    for (let k in handlers) {
        resolver.use(k, handlers[k]);
    }

    return function concatHandler(value, cb) {

        let res = [];

        return glob(value, {
            'cwd': configDir
        })
            .each((file) => {
                file = path.resolve(configDir, file);
                res = res.concat(path.extname(file) === '.json' ? shush(file) : require(file));
            })
            .then(() => {
                return Promise.resolve(res)
                    .map((row) => {
                        return resolve(row);
                    });
            })
            .then((res) => {
                return cb(null, res);
            })
            .catch(cb);

    };

}

module.exports = concat;