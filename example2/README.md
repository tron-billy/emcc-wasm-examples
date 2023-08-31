# 如何调用 C 函数

默认情况下，Emscripten 生成的代码只会调用 `main()` 函数，其他的函数将被视为无用代码。在一个函数名之前添加 `EMSCRIPTEN_KEEPALIVE` 能够防止这样的事情发生。需要导入 `emscripten.h` 库来使用 `EMSCRIPTEN_KEEPALIVE`。

## 编译

在编译时需要添加一个新的参数，`"EXPORTED_RUNTIME_METHODS=['ccall']"` 告诉编译器我们需要使用 `ccall` （用于调用导出的函数）这个方法，编译后将在胶水代码中实现 `ccall` 方法，同时也引入了 C 代码中的 `myFunction`。

完整的命令
`emcc myFunction.c -s WASM=1 -s "EXPORTED_RUNTIME_METHODS=['ccall']" -o index.html`

## 结果
- **index.html**
加载，编译，实例化 wasm 代码并且将它输出在浏览器显示上的 HTML 文件

- **index.js**
用来在原生 C 函数和 JavaScript/wasm 之间转换的胶水代码的 

- **index.wasm**
二进制的 wasm 模块代码

## 验证
我们可以在 html 中增加一个按钮，点击调用 myFunction 观察页面输出信息，验证 C 代码函数已成功编译导出。

```javascript
document.querySelector("button").addEventListener("click", () => {
  Module.ccall("myFunction");
});
```

注意，这里是 ***异步调用***，考虑到 JavaScript 和 WASM 的交互时，存在 WASM 未完全加载的情况，同步调用会导致报错，无法找到相关的函数方法。