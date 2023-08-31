const inputDom =document.querySelector("#input");
const buttonDom = document.querySelector("button");
const resultDom = document.querySelector("#result");

const WASM = {};
WebAssembly.instantiateStreaming(fetch("math.wasm")).then((obj) => {
    WASM.factorial = obj.instance.exports.factorial;
})

buttonDom.addEventListener("click", () => {
    const number = parseInt(inputDom.value);
    if (typeof number !== 'number') {
        alert("please input a number!");
    }

    const result = WASM.factorial(number);
    resultDom.textContent = result;
    inputDom.value = null;
})
