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
        // return false;   // 返回 false 意味着初始化失败
        // throw new Error();  // 或者抛错
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
// 如果初始化失败，它将抛错
mod.init();

// 如果启动失败，它将返回一个 rejected 状态的 Promise
mod.start();
    .then(function() {
        console.log('do something');
    })
    .then(function() {
        mod.exit();  // 这将会直接退出进程，无论在 stop 和 exit 阶段是否发生错误。
    })
    .catch(function(err) {
        console.error(err);
        mod.exit(1);
    });

// 它也支持 callback 的写法。但是你只能在 callback 和 promise 选择其一使用。
//
// mod.start(function(err) {
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
