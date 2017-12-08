# webpack-hash-chunkid
[![npm package](https://img.shields.io/npm/v/webpack-hashed-chunkids.svg)](https://www.npmjs.org/package/webpack-hashed-chunkids)
[![npm downloads](http://img.shields.io/npm/dm/webpack-hashed-chunkids.svg)](https://www.npmjs.org/package/webpack-hashed-chunkids)
> a plugin to help webpack to generate unique chunkid depend on module id
### why
webpack has official plugins to generate a unique module id: [module-identifiers](https://webpack.js.org/guides/caching/#module-identifiers)
but what about chunk id? I can't find a solution.

what is chunk id? open a file, you can find something like this:

```
webpackJsonp([117],{...})
```

and the number 117 is chunk id

### dependencies

* [NamedModulesPlugin](https://webpack.js.org/plugins/named-modules-plugin/) or [HashedModuleIdsPlugin](https://webpack.js.org/plugins/hashed-module-ids-plugin/) or other plugins generate unique module id

### install
```
npm install webpack-hashed-chunkids --save-dev
```

### features
* generate unique chunk id

### usage
```
const HashedChunkidsPlugin = require('webpack-hashed-chunkids');

plugins: [
    new HashedChunkidsPlugin({
        hashFunction: // The hashing algorithm to use, defaults to 'md5'. All functions from Node.JS' [crypto.createHash](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options) are supported.
        hashDigest: // The encoding to use when generating the hash, defaults to 'base64'. All encodings from Node.JS' [hash.digest](https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding) are supported.
        hashDigestLength: // The prefix length of the hash digest to use, defaults to 4.
    })
]
```
