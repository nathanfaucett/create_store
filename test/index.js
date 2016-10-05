var tape = require("tape"),
    createStore = require("..");


tape("createStore() should create waekmap like store", function(assert) {
    var store = createStore(),
        object = {};

    store.set(object, "{}");
    assert.equals(store.has(object), true);
    assert.equals(store.get(object), "{}");
    assert.equals(store.size(), 1);

    store.remove(object);
    assert.equals(store.has(object), false);
    assert.equals(store.get(object), undefined);
    assert.equals(store.size(), 0);

    store.set(object, "{}");
    store.clear();
    assert.equals(store.get(object), undefined);
    assert.equals(store.size(), 0);

    assert.end();
});
