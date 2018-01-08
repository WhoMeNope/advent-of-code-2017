/* ts-check */

// () -> Register
function Register() {
  this.registers = {};
}

// NameValue -> Value
Register.prototype.get = function(a) {
  if(isLetter(a)) {
    if(! (a in this.registers))
      this.registers[a] = 0;
    return this.registers[a];
  }
  else
    return parseInt(a);
}

// NameValue -> NameValue -> ()
Register.prototype.set = function(a, b) {
  if(! (a in this.registers))
    this.registers[a] = 0;

  this.registers[a] = this.get(b);
}

// NameValue -> NameValue -> ()
Register.prototype.add = function(a, b) {
  if(! (a in this.registers))
    this.registers[a] = 0;

  this.registers[a] += this.get(b);
}

// NameValue -> NameValue -> ()
Register.prototype.sub = function(a, b) {
  if(! (a in this.registers))
    this.registers[a] = 0;

  this.registers[a] -= this.get(b);
}

// NameValue -> NameValue -> ()
Register.prototype.mul = function(a, b) {
  if(! (a in this.registers))
    this.registers[a] = 0;

  this.registers[a] *= this.get(b);
}

// NameValue -> NameValue -> ()
Register.prototype.mod = function(a, b) {
  if(! (a in this.registers))
    this.registers[a] = 0;

  this.registers[a] = this.get(a) % this.get(b);
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

module.exports = Register;
