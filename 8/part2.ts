

const data = Deno.readFileSync("./input.txt")
let strData = new TextDecoder().decode(data)
strData = strData.replaceAll("\r","");
let strs = strData.split("\n")

const nodes : string[][] = strs.map(x => x.split(""))

const nodeGroups : Record<string, number[][]> = {}
// group nodes of same value into a set with their coordinates
for (let x = 0; x < nodes.length; x++) {
  for (let y = 0; y < nodes[0].length; y++){
    const l = nodes[x][y];
    if (l == ".") {
      continue
    }
    if (nodeGroups[l]) {
      nodeGroups[l].push([x,y])
    } else {
      nodeGroups[l] = [[x,y]]
    }
  }
}

function hashCoord(a: number,b: number) {
  return (53 + a) * 53 + b
}

const antinodes = new Set();
// for each node group, find all antinodes in bounds (ignoring ones already in the list)
// hash coord with cantor pairing function (to be extra about it)
for (const group of Object.keys(nodeGroups)) {
  // compare all pairs
  const coords = nodeGroups[group];
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const coordI = coords[i];
      const coordJ = coords[j];

      const [diffX, diffY] = [coordJ[0] - coordI[0], coordJ[1] - coordI[1]]

      // keep adding diff to coordI until out of bounds
      let [coordX, coordY] = coordI
      while (
        coordX >= 0 && coordX < nodes.length &&
        coordY >= 0 && coordY < nodes[0].length
      ) {
        antinodes.add(hashCoord(coordX, coordY))
        nodes[coordX][coordY] = "#"
        coordX += diffX
        coordY += diffY
      }

      [coordX, coordY] = coordI
      // keep removing diff from coordI until out of bounds
      while (
        coordX >= 0 && coordX < nodes.length &&
        coordY >= 0 && coordY < nodes[0].length
      ) {
        antinodes.add(hashCoord(coordX, coordY))
        nodes[coordX][coordY] = "#"
        coordX -= diffX
        coordY -= diffY
      }
      
    }
  }
}

for (const row of nodes) {
  console.log(row.join(''))
}
console.log(antinodes.size)