createStore
=======

create store for the browser and node.js


```javascript
var createStore = require("create_store");


var store = createStore();


var object = {},
    array = [];

store.set(object, "{}");
store.set(array, "[]");

console.log(
    store.get(object),
    store.get(array)
);

```
