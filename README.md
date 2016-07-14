createStore
=======

create private stores


```javascript
var createStore = require("@nathanfaucett/create_store");


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
