function checkXmas(xi: number, xj: number, data: string[][], direction: number[]) {
  // starting at X, check direction
  let i = xi;
  let j = xj;
  const str = "XMAS"
  let ind = 0;
  while(
    i >= 0 && i < data.length &&
    j >= 0 && j < data[0].length
  ) {
    if (data[i][j] !== str[ind]) {
      break;
    }
    ind++;
    i += direction[0];
    j += direction[1];
    if (ind >= str.length) {
      return true
    }
  }
  return false;
}

const directions = [
  [0,1],
  [1,0],
  [0,-1],
  [-1,0],
  [1,1],
  [1,-1],
  [-1,1],
  [-1,-1]
]

const data = Deno.readFileSync("./input.txt")
const strData = new TextDecoder().decode(data)

const rows = strData.split("\n").map(x => x.split(""))
let total = 0;
for (let xi = 0; xi < rows.length; xi++) {
  for (let xj = 0; xj < rows[0].length; xj++) {
    if (rows[xi][xj] == "X") {
      for (const direction of directions) {
        if (checkXmas(xi,xj,rows,direction)) {
          total += 1
        }
      }
    }
  }
}

console.log(total);
