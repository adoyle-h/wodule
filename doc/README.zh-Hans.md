# Wodule

一个用于统一操作的模块类。

## 安装（Installation）

`npm install --save wodule`

## 快速上手（Quick Start）

```js
var Wodule = require('wodule');

var mod = new Wodule({
    init: function() {
        console.log('Module initialized');
        return true;   // 别忘了返回一个 Boolean 变量，它用来指示是否成功初始化。
        // return Promise.resolve(true);  // 或者返回一个 Promise
        // throw new Error();  // 或者直接抛错
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
            console.error(err.stack);  // 这个错误从 `stop` 函数中抛出
        }
        console.log('Module exited');
    },
});

// 举个例子
// 每一个阶段，要么顺利运行，要么以 Promise 的形式抛错
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
        mod.exit();  // 这将会直接退出进程
    });

// 它也支持 callback 的写法
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
