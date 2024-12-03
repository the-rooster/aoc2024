
const mulRegex = /mul\((\d+),(\d+)\)/g

const data = Deno.readFileSync("./input.txt")
const strData = new TextDecoder().decode(data)
const matches = strData.matchAll(mulRegex)

if (!matches) {
  console.log(0);
  Deno.exit();
}

let total = 0;
for (const match of matches) {
  console.log(match[0]);
  total += Number(match[1]) * Number(match[2])
}

console.log(total)
