

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

      // calculate coordinates of antinodes
      const antinode1 = [coordI[0] - diffX, coordI[1] - diffY]
      const antinode2 = [coordI[0] + 2*diffX, coordI[1] + 2*diffY]

      if (antinode1[0] >= 0 && antinode1[0] < nodes.length && antinode1[1] >= 0 && antinode1[1] < nodes[0].length ) {
        antinodes.add(hashCoord(antinode1[0],antinode1[1]))
        nodes[antinode1[0]][antinode1[1]] = "#"
      }

      if (antinode2[0] >= 0 && antinode2[0] < nodes.length && antinode2[1] >= 0 && antinode2[1] < nodes[0].length ) {
        antinodes.add(hashCoord(antinode2[0],antinode2[1]))
        nodes[antinode2[0]][antinode2[1]] = "#"
      }
    }
  }
}

for (const row of nodes) {
  console.log(row.join(''))
}
console.log(antinodes.size)