var has = require("has"),
    defineProperty = require("define_property"),
    isPrimitive = require("is_primitive");


var emptyObject = {};


module.exports = createStore;


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

function createStore() {
    var privateKey = {};

    function get(key) {
        if (isPrimitive(key)) {
            throw new TypeError("Invalid value used as key");
        }

        return key.valueOf(privateKey) || emptyObject;
    }

    function set(key) {
        var store;

        if (isPrimitive(key)) {
            throw new TypeError("Invalid value used as key");
        }

        store = key.valueOf(privateKey);

        if (!store || store.identity !== privateKey) {
            store = privateStore(key, privateKey);
        }

        return store;
    }

    return {
        get: function(key) {
            return get(key).value;
        },
        set: function(key, value) {
            set(key).value = value;
        },
        has: function(key) {
            return has(get(key), "value");
        },
        remove: function(key) {
            var store = get(key);
            return store === emptyObject ? false : delete store.value;
        },
        clear: function() {
            privateKey = {};
        }
    };
}
