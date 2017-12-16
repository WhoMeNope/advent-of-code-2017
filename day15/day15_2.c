#include "stdio.h"

typedef struct {
  unsigned long val;
  unsigned long factor;
  unsigned long condition;
} Generator;

void generateNext(Generator *gen) {
  const unsigned long divider = 2147483647;
  
  do {
    gen->val = (gen->val * gen->factor) % divider;
  } 
  while((gen->val % gen->condition) != 0);
}

int main() {
  Generator gens[2];
  
  gens[0].factor = 16807;
  gens[1].factor = 48271;
  
  gens[0].val = 634;
  gens[1].val = 301;

  gens[0].condition = 4;
  gens[1].condition = 8;
  
  int judge = 0;
  for (unsigned long i = 0; i < 5e6; i++) {
    //generate new values
    for (unsigned int j = 0; j < 2; j++) {
      generateNext(&gens[j]);
    }
    
    //judge 'em
    if((gens[0].val & 0xFFFF) == (gens[1].val & 0xFFFF)) {
      judge++;
    }
  }
  
  printf("%d\n\n", judge);
}
