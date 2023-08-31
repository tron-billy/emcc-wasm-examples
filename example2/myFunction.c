#include <stdio.h>
#include <emscripten/emscripten.h>

int main(int argc, char ** argv) {
  printf("Hello World\n");
}

int EMSCRIPTEN_KEEPALIVE myFunction(int argc, char ** argv) {
  printf("函数已被调用\n");
}
