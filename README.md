# Wodule
![Node Version][Node Version Image]
[![Npm Package Version][Npm Package Version Image]][Npm Package Version LINK]
[![License][License Image]][License LINK]
![NodeJS Package Dependencies][NodeJS Package Dependencies Link]
[![Build Status][Build Status Image]][Build Status Link]
[![Code Climate][Code Climate Image]][Code Climate Link]
[![Test Coverage][Test Coverage Image]][Test Coverage Link]

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
        // return false;   // Returning false means initialize failed.
        // throw new Error();  // or throw an error
    },
    start: function(callback) {  // callback is optional
        console.log('Module started');
        callback();
        // callback(new Error());  // or callback an error
        // return Promise.resolve();  // or return a fulfilled promise
        // return Promise.reject();  // or return a rejected promise
        // throw new Error();  // or throw an error
    },
    stop: function(callback) {  // callback is optional
        console.log('Module stopped');
        callback();
        // callback(new Error());  // or callback an error
        // return Promise.resolve();  // or return a fulfilled promise
        // return Promise.reject();  // or return a rejected promise
        // throw new Error();  // or throw an error
    },
    exit: function(err) {
        if (err) {
            console.error(err.stack);  // the error is thrown by `stop` function
        }
        console.log('Module exited');
    },
});

// Just an example
// If failed to init, it would throw an error.
mod.init();

// If failed to start, it would return a promise which is rejected with an error.
mod.start();
    .then(function() {
        console.log('do something');
    })
    .then(function() {
        mod.exit();  // Will exit process regardless of whether an error occurred during stop and exit.
    })
    .catch(function(err) {
        console.error(err);
        mod.exit(1);
    });

// It also support callback. But you can only use either callback or promise.
//
// mod.start(function(err) {
//     if (err) console.error(err)
// });
```

## API

see http://adoyle.me/wodule/

## Versioning

The versioning follows the rules of SemVer 2.0.0.

**BUT**, anything may have **BREAKING CHANGES** at **ANY TIME** when major version is zero (0.y.z), which is for initial development and the public API should not be considered stable.

For more information on SemVer, please visit http://semver.org/.

## Copyright and License

Copyright 2015-2016 ADoyle

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

See the NOTICE file distributed with this work for additional information regarding copyright ownership.


<!-- links -->

[Node Version Image]: https://img.shields.io/node/v/wodule.svg
[Npm Package Version Image]: https://img.shields.io/npm/v/wodule.svg
[Npm Package Version LINK]: https://www.npmjs.com/package/wodule
[License Image]: https://img.shields.io/npm/l/wodule.svg
[License LINK]: https://github.com/adoyle-h/wodule/blob/master/LICENSE
[NodeJS Package Dependencies Link]: https://david-dm.org/adoyle-h/wodule.svg
[Build Status Image]: https://travis-ci.org/adoyle-h/wodule.svg?branch=master
[Build Status Link]: https://travis-ci.org/adoyle-h/wodule
[Code Climate Image]: https://codeclimate.com/github/adoyle-h/wodule/badges/gpa.svg
[Code Climate Link]: https://codeclimate.com/github/adoyle-h/wodule
[Test Coverage Image]: https://codeclimate.com/github/adoyle-h/wodule/badges/coverage.svg
[Test Coverage Link]: https://codeclimate.com/github/adoyle-h/wodule/coverage
