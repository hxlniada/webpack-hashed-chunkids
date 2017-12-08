/**
 * @file webpack-hash-chunkid
 * @author huangxueliang
 */
const createHash = require('crypto').createHash;

class HashedChunkIdsPlugin {
    constructor(options) {
        this.options = Object.assign({
            hashFunction: 'md5',
            hashDigest: 'base64',
            hashDigestLength: 4
        }, options);
    }

    apply(compiler) {
        const options = this.options;
        compiler.plugin('compilation', compilation => {
            const usedIds = new Set();
            compilation.plugin('before-chunk-ids', chunks => {
                chunks.forEach(chunk => {
                    if (chunk.id === null) {
                        const modules = chunk.getModules();
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
