/**
 * @file webpack-hash-chunkid
 * @author huangxueliang
 */
const createHash = require('crypto').createHash;

class HashedChunkIdsPlugin {
    constructor(options) {
        this.options = Object.assign({
            hashFunction: 'md5',
            hashDigest: 'hex',
            hashDigestLength: 4
        }, options);
    }

    apply(compiler) {
        const options = this.options;
        compiler.hooks.compilation.tap('HashedChunkIdsPlugin', compilation => {
            const usedIds = new Set();
            compilation.hooks.beforeChunkIds.tap('HashedChunkIdsPlugin', chunks => {
                chunks.forEach(chunk => {
                    if (chunk.id === null) {
                        let modules = [];
                        if (chunk.getModules) {
                            modules = chunk.getModules();
                        }
                        else if (chunk.modules) {
                            modules = chunk.modules;
                        }

                        let moduleIds = '';

                        modules.sort().forEach(iModule => (moduleIds += iModule.id));

                        const hash = createHash(options.hashFunction);
                        hash.update(moduleIds);
                        const hashId = hash.digest(options.hashDigest);
                        let len = options.hashDigestLength;
                        while (usedIds.has(hashId.substr(0, len))) {
                            len++;
                        }
                        chunk.id = hashId.substr(0, len);
                        usedIds.add(chunk.id);
                    }
                });
            });
        });
    }
}

module.exports = HashedChunkIdsPlugin;
