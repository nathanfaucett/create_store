var tape = require("tape"),
    createStore = require("..");


tape("createStore() should create waekmap like store", function(assert) {
    var store = createStore(),
        object = {};

    store.set(object, "{}");
    assert.equals(store.has(object), true);
    assert.equals(store.get(object), "{}");

    store.remove(object);
    assert.equals(store.has(object), false);
    assert.equals(store.get(object), undefined);

    store.set(object, "{}");
    store.clear();
    assert.equals(store.get(object), undefined);

    assert.end();
});
