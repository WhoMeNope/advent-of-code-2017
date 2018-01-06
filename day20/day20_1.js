const fs = require('fs');

function Particle(id, x,y,z, vx,vy,vz, ax,ay,az) {
  this.id = id;

  this.x = parseInt(x);
  this.y = parseInt(y);
  this.z = parseInt(z);

  this.vx = parseInt(vx);
  this.vy = parseInt(vy);
  this.vz = parseInt(vz);

  this.ax = parseInt(ax);
  this.ay = parseInt(ay);
  this.az = parseInt(az);
}
Particle.prototype.update = function() {
  this.vx += this.ax;
  this.vy += this.ay;
  this.vz += this.az; 
  this.x += this.vx;
  this.y += this.vy;
  this.z += this.vz;
}
Particle.prototype.distance = function() {
  return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
}

function makeParticle(id, line) {
  let parts = line.slice(0, -1).split('>, ');

  let ps = parts[0].slice(3, parts[0].length).split(',');
  let vs = parts[1].slice(3, parts[1].length).split(',');
  let as = parts[2].slice(3, parts[2].length).split(',');

  return new Particle(id, ...ps, ...vs, ...as);
}

fs.readFile('./day20/input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  let i = 0;
  let particles = data.split('\n').map((line) =>  makeParticle(i++, line));

  while(particles.length > 1) {
    for(let i = 0; i < particles.length; i++) {
      particles[i].update();
    }

    for(let i = 0; i < particles.length; ) {
      if(particles[i].distance() > 10e6) {
        particles.splice(i, 1);
      }
      else
        i++;
    }
  }

  console.log(particles[0].id);
});
