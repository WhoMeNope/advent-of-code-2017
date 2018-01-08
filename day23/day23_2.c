#include "stdio.h"

int main () {
  int a = 1;

  int b = 79;
  int c = b;
  if(a != 0) {
    b *= 100;
    b += 100000;
    c = b + 17000;
  }

  int h = 0;

  int f,d,e,g;

  do{ 
    for(d = 2; d != b; d++) {
      if(b % d == 0) {
        h++;
        break;
      }
    }
      
    g = b - c;
    b += 17;
  } 
  while(g != 0);

  printf("%i\n", h);
}
