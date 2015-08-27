var has = require("has"),
    defineProperty = require("define_property"),
    isPrimitive = require("is_primitive");


var emptyObject = {
    value: undefined
};


module.exports = createStore;


function createStore() {
    var privateKey = {};

    function get(key) {
        var store;

        if (isPrimitive(key)) {
            throw new TypeError("Invalid value used as key");
        } else {
            store = key.valueOf(privateKey);

            if (!store || store.identity !== privateKey) {
                store = emptyObject;
            }

            return store;
        }
    }

    function set(key) {
        var store;

        if (isPrimitive(key)) {
            throw new TypeError("Invalid value used as key");
        } else {
            store = key.valueOf(privateKey);

            if (!store || store.identity !== privateKey) {
                store = privateStore(key, privateKey);
            }

            return store;
        }
    }

    return {
        get: function(key) {
            return get(key).value;
        },
        set: function(key, value) {
            set(key).value = value;
        },
        has: function(key) {
            var store = get(key);
            return store !== emptyObject ? has(store, "value") : false;
        },
        remove: function(key) {
            var store = get(key);
            return store !== emptyObject ? delete store.value : false;
        },
        clear: function() {
            privateKey = {};
        }
    };
}

function privateStore(key, privateKey) {
    var store = {
            identity: privateKey
        },
        valueOf = key.valueOf;

    defineProperty(key, "valueOf", {
        value: function(value) {
            return value !== privateKey ? valueOf.apply(this, arguments) : store;
        },
        writable: true
    });

    return store;
}
