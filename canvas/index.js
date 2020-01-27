const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

const quantity = {
  x: 100,
  y: 190,
};

const dimensions = {
  width: canvas.width,
  height: canvas.height,
};

const pixel = {
  width: dimensions.width / quantity.y,
  height: dimensions.height / quantity.x,
};

const vento = true;

function start() {
  const structure = createFireStructure(quantity);

  initializeFireStructure(structure);

  setInterval(() => {
    firePropagation(structure);
  }, 50);
} 

function createFireStructure({ x, y } = {}) {
  if (!x || !y)
    return;

  const structure = [];

  for (let row = 0; row < x; row++) {
    const structureRow = [];
    for (let column = 0; column < y; column++) {
      structureRow.push(0);
    }
    structure.push(structureRow);
  }

  return structure;
}

function initializeFireStructure(structure) {
  if (!structure)
    return;

  const lastRow = structure[structure.length - 1];

  for (let c = 0; c < lastRow.length; c++) {
    lastRow[c] = 36;
  }
}

function firePropagation(structure) {
  // - 1 para nao iterar na ultima linha ou no caso ultimo item do array
  for (let r = 0; r < structure.length - 1; r++) {
    for (let c = 0; c < structure[r].length; c++) {
      const dropFire = Math.floor(Math.random() * 2.3);
      const intensityBelow = structure[r + 1][c];
      const intensity = intensityBelow - dropFire <= 0 ? 0 : intensityBelow - dropFire;
    
      let cIndex = c;

      if(vento){
        cIndex -= 1;
        if( cIndex < 0) 
          cIndex += quantity.y;
      } 

      structure[r][cIndex] = intensity;
    }
  }

  renderFire(structure);
}

function renderFire(structure) {
  context.clearRect(0, 0, dimensions.width, dimensions.height);
  // context.fillStyle = '#000';
  // context.fillRect(0, 0, dimensions.width, dimensions.height);

  for (let r = 0; r < structure.length; r++) {
    for (let c = 0; c < structure[r].length; c++) {
      const intensity = structure[r][c];
      const x = r * pixel.height;
      const y = c * pixel.width;

      const rgbColor = `rgb(${getColor(intensity)})`;

      context.fillStyle = rgbColor;
      context.fillRect(y, x, pixel.width, pixel.height);
    }
  }
}

function getColor(index) {
  const COLOR = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]
  const colorSelected = COLOR[index || 0];
  return `${colorSelected.r}, ${colorSelected.g}, ${colorSelected.b}`;
}

start();