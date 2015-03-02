# GUNDB NOTES


## URLs

* http://gundb.io/

* https://github.com/amark/gun

* https://gitter.im/amark/gun

* https://github.com/amark/gun/wiki
* https://github.com/amark/gun/wiki/Setting-Data
* https://github.com/amark/gun/wiki/Getting-Data
* https://github.com/amark/gun/wiki/Internals

* https://raw.githubusercontent.com/amark/gun/master/gun.js
* https://rawgit.com/amark/gun/master/gun.js

* http://jsbin.com/vowuli/latest/edit



## API


```javascript
var gun = window.Gun('http://stage.sl.pt:1337/') - instance local and connected to given URL
var gun = window.Gun() - instance local only
var gun = Gun({file:'db.json'}) - to run from node, backed by JSON file storage

.set({Object}o [, fn({String}err])) - defines/updates node o in context and cache.
Ommitted fields are not zeroed out. To do so you must pass null value.

.get( fn({Object}o) ) - calls fn with node o as argument

.key({String}key) - assigns the given key to the node (a node can have many)

.load({String}key) - sets the context to the node by a key

.path({String}path) - one or more field names joined by .

.back - backtracks 1 step

.on( fn(o) ) - on is alike get, but gets called on node changes, not only once


.map wraps around parallel paths. ??

.blank(fn) is a conditional which executes if the node from load is empty.

.insert wraps around set, putting in objects without human friendly fields, may not stay in core???

circular references are supported, that is, nodes can point to one another via fields/paths


Peer, is a gun server that can be connected to.
Node,  a group of no, one, some, or all fields, as they change over time.
Key, is an index used to hopefully find a node in a mesh.
Field, is a symbol used to reference a value at any time.
Value, is a binary, number, text, or relation that exists as a singular whole.

Key, creates an index to remember a node by, typically for human use.
Load, open a key or bring a relation into cache, to start exploring a graph.
Path, navigate through a graph, **via fields**, by chaining relations together.
Get, gives you the node or value from the path, and as they are changed.
Set, to change the value on a field or merge a node or nodes.


var mark = gun.set({name: "Mark Nadal"});
var name = mark.path('name');
mark.get(function(user){
  console.log(user); // {name: "Mark Nadal"}
});
name.get(function(val){
  console.log(val); // "Mark Nadal"
});


mark.set({ spouse: {name: "Amber Nadal"}, cat: {name: "Hobbes"} })
  .path('spouse')
    .set({studies: "Psychology"})
    .back
  .path('cat.name')
    .get(function(name){
      console.log(name); // "Hobbes"
});
```