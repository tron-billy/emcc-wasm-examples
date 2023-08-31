# 加载调用 WASM

通常情况下，我们并不需要生成 html，通过 Emscripten 我们可以导出指定 C 函数，并在浏览器中加载 WASM 文件从而生成 WASM 实例进行使用。

## 编译
通过 EXPORTED_FUNCTIONS 从 C 代码中导出到 JavaScript 的函数列表。函数名前的下划线为 Emscripten 名称修饰规范。
`emcc math.c -s EXPORTED_FUNCTIONS="['_factorial']" -o math.js`


## 结果
**- math.js**
用来在原生 C 函数和 JavaScript/wasm 之间转换的胶水代码的 
**- math.wasm**
二进制的 wasm 模块代码

## 加载 WASM
利用 `fetch` 请求获取 WASM 资源文件，使用 [WebAssembly.instantiateStreaming](https://developer.mozilla.org/zh-CN/docs/WebAssembly/JavaScript_interface/instantiateStreaming) 从流式底层源编译和实例化 WebAssembly 模块，这是加载 wasm 代码一种非常有效的优化方式。

WebAssembly.instantiateStreaming 将会返回一个 Promise 实例，包含两个对象属性
- **module**
[WebAssembly.Module](https://developer.mozilla.org/zh-CN/docs/WebAssembly/JavaScript_interface/Module) 对象表示编译完成的 WebAssembly 模块。这个Module能够再次被实例化 或 通过 [postMessage()](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/postMessage) 共享。
  
- **instance**
[WebAssembly.Instance](https://developer.mozilla.org/zh-CN/docs/WebAssembly/JavaScript_interface/Instance) 对象包含 WebAssembly 所有公开方法 [Exported WebAssembly functions](https://developer.mozilla.org/zh-CN/docs/WebAssembly/Exported_functions).

```js
WebAssembly.instantiateStreaming(fetch("xxx.wasm")).then(
  (obj) => obj.instance.exports.factorial(5),
);
```




## 验证
在 html 中输入数字，点击按钮观察输出信息进行验证。