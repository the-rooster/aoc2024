

const data = Deno.readFileSync("./input.txt")
let strData = new TextDecoder().decode(data)
strData = strData.replaceAll("\r","");
let strs = strData.split("\n")
// construct map
let map : string[][] = []
for (const str of strs) {
  const row = str.split("")
  map.push(row);
}

const directions = [
  [-1,0],[0,1],[1,0],[0,-1]
]

let [guardX, guardY, direction] = [0,0,0]
const BLOCKER="#"
const GUARD = "^"

// find guard position
for (let x = 0; x < map[0].length; x++) {
  for (let y = 0; y < map.length; y++) {
    if (map[x][y] === GUARD) {
      guardX = x;
      guardY = y;
    }
  }
}

console.log(guardX, guardY)

// set of (x,y,direction)
const ExploredMapDirs : [number,number,number][] = [];
let count = 0;
while (true) {

  // if the position is unique, add 1 to total
  if (!ExploredMapDirs.find((([x,y,d]) => {return x == guardX && y == guardY}))) {
    count++
  }

  ExploredMapDirs.push([guardX, guardY, direction])

  const [newX, newY] = [guardX + directions[direction][0], guardY + directions[direction][1]]

  // console.log(newX, newY, map)

  if (newX >= map[0].length || newX < 0 || newY >= map.length || newY < 0) {
    break;
  }

  if (map[newX][newY] === BLOCKER) {
    // console.log("CHANGING DIRECTION")
    direction++;
    direction = direction % 4;
    continue;
  }
  guardX = newX;
  guardY = newY;

}

let count2 = 0
for (const explored of ExploredMapDirs) {
  if (map[explored[0]][explored[1]] !== "X") {
    count2++
  }
  map[explored[0]][explored[1]] = "X"
}

// for (const row of map) {
//   console.log(row.join(""))
// }

// console.log(map)
console.log(count);
