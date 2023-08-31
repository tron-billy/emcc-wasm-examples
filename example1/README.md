# 使用 Emscripten 编译生成 HTML 和 JavaScript

## 编译
`emcc hello.c -s WASM=1 -o hello.html`

- `emcc`, 编译工具
- `hello.c` 输入文件
- `-s` 编译项参数
- `WASM` 编译目标，`1` 代表 WASM，`0` 代表 [asm.js](http://asmjs.org/)
- `-o` 输出文件

## 结果
**- hello.html**
加载，编译，实例化 wasm 代码并且将它输出在浏览器显示上的 HTML 文件
**- hello.js**
用来在原生 C 函数和 JavaScript/wasm 之间转换的胶水代码的 
**- hello.wasm**
二进制的 wasm 模块代码

## 验证
在支持 WASM 的浏览器中打开 html 文件，验证输出信息。