var bignum = require('bignum');
var multiHashing = require('multi-hashing');
var ev = require('equihashverify');
var util = require('./util.js');

var diff1 = global.diff1 = 0x00000000ffff0000000000000000000000000000000000000000000000000000;
var evdiff1 = global.evdiff1 = 0x0007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

var algos = module.exports = global.algos = {
    sha256: {
        //Uncomment diff if you want to use hardcoded truncated diff
        //diff: '00000000ffff0000000000000000000000000000000000000000000000000000',
        hash: function(){
            return function(){
                return util.sha256d.apply(this, arguments);
            }
        }
    },
    'scrypt': {
        //Uncomment diff if you want to use hardcoded truncated diff
        //diff: '0000ffff00000000000000000000000000000000000000000000000000000000',
        multiplier: Math.pow(2, 16),
        hash: function(coinConfig){
            var nValue = coinConfig.nValue || 1024;
            var rValue = coinConfig.rValue || 1;
            return function(data){
                return multiHashing.scrypt(data,nValue,rValue);
            }
        }
    },
};


for (var algo in algos){
    if (!algos[algo].multiplier)
        algos[algo].multiplier = 1;
}
