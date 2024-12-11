

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
function checkIfInfiniteLoop(map: string[][], guardX: number, guardY: number, direction: number) {
  const ExploredMapDirs: [number,number,number][] = []
  while (true) {
    const [newX, newY] = [guardX + directions[direction][0], guardY + directions[direction][1]]

    if (ExploredMapDirs.find((([x,y,d]) => {return x == guardX && y == guardY && d == direction}))) {
      // we are in an infinite loop
      // console.log('here?', ExploredMapDirs, guardX, guardY, direction)
      console.log('here?')
      return true;
    }

    ExploredMapDirs.push([guardX, guardY, direction])

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
}

let count = 0;
// loop over every possible alteration of the map i guess?
// this takes like 5 mins to run
for (let x = 0; x < map.length; x++) {
  for (let y = 0; y < map[0].length; y++) {
    if (map[x][y] !== "." || (guardX == x && guardY == y)) continue;
    const newMap = structuredClone(map);
    newMap[x][y] = BLOCKER;
    if (checkIfInfiniteLoop(newMap,guardX,guardY,direction)) {
      console.log("count", count + 1)
      count++;
    }
  }
}


console.log(count)
