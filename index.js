const ROW = 40;
const COLUMN = 40;
const COLOR = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

function createStructure( x, y ){
  const structure = [];

  for( let i = 0; i < (x * y); i++ )
    structure.push(0);


  return structure;
}

function renderFire( structure ){
  let html = ``;

  for(let r = 0; r < ROW; r++) {
    html += '<tr>';
    for (let c = 0; c < COLUMN; c++ ) {
      const index = c + (COLUMN * r);
      const value = structure[index];
      html += `
        <td style='background-color: rgb(${COLOR[value].r}, ${COLOR[value].g}, ${COLOR[value].b})'> 
        </td>
      `;
    }
    html += '</tr>';
  }
  
  document.querySelector('table').innerHTML = html;
}

function setFireBase( structure ) {
  const lastColumn = (COLUMN * ROW) - COLUMN;

  for(let c = 0; c < COLUMN; c++) 
    structure[lastColumn + c] = 36;

  return structure;
}

function firePropagation( structure ) {
  for(let c = 0; c < COLUMN; c++) {
    for(let r = 0; r < ROW; r++) {
      const index = (r * COLUMN) + c;
      updatePixel(index, structure);
    }
  }

  renderFire( structure );
}

function updatePixel( currentIndex, structure ){
  const belowIndex = currentIndex + COLUMN;

  if (belowIndex >= structure.length) 
    return 

  const drop = Math.floor(Math.random() * 3);
  const belowIntensity = structure[belowIndex];
  const intensity = belowIntensity - drop <= 0 ? 0 : belowIntensity - drop;

  structure[currentIndex - drop] = intensity;
}

function start() {
  const structure = createStructure( ROW, COLUMN );
  
  setFireBase( structure );
  renderFire( structure );
  
  setInterval( () => {
    firePropagation( structure );
  }, 50 );
}

start();