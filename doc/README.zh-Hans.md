# Wodule
![Node Version][Node Version Image]
[![Npm Package Version][Npm Package Version Image]][Npm Package Version LINK]
[![License][License Image]][License LINK]
![NodeJS Package Dependencies][NodeJS Package Dependencies Link]
[![Build Status][Build Status Image]][Build Status Link]
[![Code Climate][Code Climate Image]][Code Climate Link]
[![Test Coverage][Test Coverage Image]][Test Coverage Link]

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
    start: function(callback) {
        console.log('Module started');
        callback();
        // callback(new Error());  // 或者 callback 一个错误
        // return Promise.resolve();  // 或者返回一个 Promise (成功)对象
        // return Promise.reject();  // 或者返回一个 Promise (拒绝)对象
        // throw new Error();  // 或者抛出一个错误
    },
    stop: function(callback) {
        console.log('Module stopped');
        callback();
        // callback(new Error());  // 或者 callback 一个错误
        // return Promise.resolve();  // 或者返回一个 Promise (成功)对象
        // return Promise.reject();  // 或者返回一个 Promise (拒绝)对象
        // throw new Error();  // 或者抛出一个错误
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

请看 http://adoyle.me/wodule/

## 版本（Versioning）

版本迭代遵循 SemVer 2.0.0 的规则。

*但是*，当主版本号是零（0.y.z），一切*随时*都可能有*不兼容的修改*。这处于开发初始阶段，其公共 API 是不稳定的。

关于 SemVer 的更多信息，请访问 http://semver.org/。

## 版权声明（Copyright and License）

Copyright (c) 2015-2016 ADoyle. The project is licensed under the **Apache License Version 2.0**.

See the [LICENSE][] file for the specific language governing permissions and limitations under the License.

See the [NOTICE][] file distributed with this work for additional information regarding copyright ownership.


<!-- Links -->

[LICENSE]: ./LICENSE
[NOTICE]: ./NOTICE


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
