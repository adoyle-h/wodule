# Wodule

A Module class for unified usage of modules.

## Document Translations

[简体中文](./doc/README.zh-Hans.md)

## Installation

`npm install --save wodule`

## Quick Start

```js
var Wodule = require('wodule');

var mod = new Wodule({
    init: function() {
        console.log('Module initialized');
        return true;   // Do not forget to return a boolean value, which indicating the success of initialize.
        // return Promise.resolve(true);  // or return a promise.
        // throw new Error();  // or throw an error
    },
    start: function() {
        console.log('Module started');
        return true;
    },
    stop: function() {
        console.log('Module stopped');
        return true;
    },
    exit: function(err) {
        if (err) {
            console.error(err.stack);  // the error is thrown by `stop` function
        }
        console.log('Module exited');
    },
});

// Just an example
// Each phase will either execute successful or throw (Promise.reject) an error
mod.init()
    .then(function() {
        console.log('do something');
    })
    .then(function() {
        return mod.start();
    })
    .then(function() {
        console.log('do something');
    })
    .then(function() {
        return mod.stop();
    })
    .then(function() {
        console.log('do something');
    })
    .catch(function(err) {
        console.error(err);
    })
    .then(function() {
        mod.exit();  // will exit process
    });

// It also support callback
//
// mod.init(function(err) {
//     if (err) console.error(err)
// });
```

## API

## Copyright and License

Copyright 2015 ADoyle

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

See the NOTICE file distributed with this work for additional information regarding copyright ownership.
