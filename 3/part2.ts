
const mulRegex = /(mul\((\d+),(\d+)\))|(do\(\))|(don't\(\))/g

const data = Deno.readFileSync("./input.txt")
const strData = new TextDecoder().decode(data)
const matches = strData.matchAll(mulRegex)

if (!matches) {
  console.log(0);
  Deno.exit();
}

let total = 0;
let enabled = true;
for (const match of matches) {
  if (match[0] == "don't()") {
    enabled = false;
    continue;
  } else if (match[0] == "do()") {
    enabled = true;
    continue;
  }

  if (enabled) {
    total += Number(match[2]) * Number(match[3])
  }
}

console.log(total)
