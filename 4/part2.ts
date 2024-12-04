function checkMAS(xi: number, xj: number, data: string[][], direction: number[]) : [boolean,number[]] {
  // starting at X, check direction
  let i = xi;
  let j = xj;
  const str = "MAS"
  let ind = 0;
  while(
    i >= 0 && i < data.length &&
    j >= 0 && j < data[0].length
  ) {
    if (data[i][j] !== str[ind]) {
      break;
    }
    ind++;

    if (ind >= str.length) {
      return [true, [i - direction[0], j - direction[1]]]
    }

    i += direction[0];
    j += direction[1];
  }
  return [false, [-1, -1]]
}

const directions = [
  [1,1],
  [1,-1],
  [-1,1],
  [-1,-1]
]

const data = Deno.readFileSync("./input.txt")
const strData = new TextDecoder().decode(data)

const rows = strData.split("\n").map(x => x.split(""))

const As : number[][] = [];

let total = 0;
for (let xi = 0; xi < rows.length; xi++) {
  for (let xj = 0; xj < rows[0].length; xj++) {
    if (rows[xi][xj] == "M") {
      for (const direction of directions) {
        const [found, Acoord] = checkMAS(xi,xj,rows,direction);
        if (found) {
          let count = 0;
          for (const a of As) {
            if (a[0] == Acoord[0] && a[1] == Acoord[1]) {
              count += 1;
            }
          }
          total += count;
          As.push(Acoord);
        }
      }
    }
  }
}

console.log(total);
