#include "stdio.h"

int main() {
  struct {
    unsigned long val;
    unsigned long factor;
  } gens[2], *gen;

  gens[0].factor = 16807;
  gens[1].factor = 48271;

  gens[0].val = 634;
  gens[1].val = 301;

  const unsigned long divider = 2147483647;

  int judge = 0;
  for (unsigned long i = 0; i < 40e6; i++) {
    //generate new values
    for (unsigned int j = 0; j < 2; j++) {
      gen = &gens[j];
      gen->val = (gen->val * gen->factor) % divider;  
    }

    //judge 'em
    if((gens[0].val & 0xFFFF) == (gens[1].val & 0xFFFF))
      judge++;
  }

  printf("%d\n\n", judge);
}
