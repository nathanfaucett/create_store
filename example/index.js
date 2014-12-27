global.createStore = require("../src/index");


global.store = createStore();


var object = {},
    array = [];

store.set(object, "{}");
store.set(array, "[]");

store.remove(array);

console.log(
    store.get(object),
    store.get(array)
);
