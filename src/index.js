var has = require("has"),
    defineProperty = require("define_property"),
    isPrimitive = require("is_primitive");


var emptyStore = {
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
                store = emptyStore;
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
            return store !== emptyStore ? has(store, "value") : false;
        },
        remove: function(key) {
            var store = get(key);
            return store !== emptyStore ? store.remove() : false;
        },
        clear: function() {
            privateKey = {};
        }
    };
}

function privateStore(key, privateKey) {
    var valueOf = key.valueOf || Object.prototype.valueOf,
        store = {
            identity: privateKey,
            remove: function() {
                key.valueOf = valueOf;
                return delete store.value;
            }
        };

    defineProperty(key, "valueOf", {
        value: function(value) {
            return value !== privateKey ? valueOf.apply(this, arguments) : store;
        },
        configurable: true,
        enumerable: false,
        writable: true
    });

    return store;
}
