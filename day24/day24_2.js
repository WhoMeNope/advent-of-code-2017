const fs = require('fs');

const Component = function(a, b) {
  this.a = parseInt(a);
  this.b = parseInt(b);
}

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  let components = data.split('\n').map(
    (line) => {
      let t = line.split('/');
      return new Component(t[0], t[1]);
    }
  );

  console.log(buildBridge(components, [], 0));
});

function buildBridge(components, bridge, port) {
  // printBridge(bridge);
  let heaviest = weighBridge(bridge);

  for(let i = 0; i < components.length; i++) {
    const c = components[i];

    if(c.a == port || c.b == port) 
    {
      let cs = components.slice();
      let bc = bridge.slice();

      cs.splice(cs.indexOf(c), 1);
      bc.push(c);

      let w = buildBridge(cs, bc, c.a == port ? c.b : c.a);
      if(w > heaviest)
        heaviest = w;
    }
  }

  return heaviest;
}

function printBridge(bridge) {
  if(bridge.length == 0)
    return;

  let out = bridge[0].a + '/' + bridge[0].b;

  for (let i = 1; i < bridge.length; i++) {
    out += '--' + bridge[i].a + '/' + bridge[i].b;
  }

  console.log(out, weighBridge(bridge));
}

function weighBridge(bridge) {
  let w = bridge.length * 1000000;

  for (let i = 0; i < bridge.length; i++) {
    w += bridge[i].a + bridge[i].b;
  }

  return w;
}
