

const data = Deno.readFileSync("./input.txt")
let strData = new TextDecoder().decode(data)
strData = strData.replaceAll("\r","");
const [rules, updates] = strData.split(/\n\W+/)

// parse rules
const rulesMap : Record<string, string[][]> = {}
for (const rulestr of rules.split("\n")) {
  const ruleVals = rulestr.split("|") as string[]
  if (!rulesMap[ruleVals[0]]) {
    rulesMap[ruleVals[0]] = [ruleVals]
  } else {
    rulesMap[ruleVals[0]].push(ruleVals)
  }
}

// parse updates
const updateArrays: string[][] = [];
for (const updateRow of updates.split("\n")) {
  updateArrays.push(updateRow.split(","))
}

function checkInOrder(update: string[]) {
  const occurenceMap: Record<string, number[]> = {};
  let passed = true;
  for (let i = 0 ; i < update.length; i++){
    const item = update[i]

    // check the rulesMap. if any rule fails, invalid
    const rulesToCheck = rulesMap[item] || [];

    for (const rule of rulesToCheck) {
      const [before, after] = rule;
      if (item == before) {
        const occurences = occurenceMap[after];
        if (occurences) {
          for (const occurence of occurences) {
            if (occurence < i) {
              // rule broken
              passed = false;
              break;
            }
          }
        }
      }
      if (!passed) {
        break;
      }
    }

    if (!passed) {
      continue;
    }

    // if item does not have occurence yet, create array
    if (!occurenceMap[item]) {
      occurenceMap[item] = [i]
    } else {
      occurenceMap[item].push(i)
    }
  }

  if (passed) {
    const middle = update[Math.round((update.length - 1) / 2)];
    return Number(middle);
  }
}

let total = 0;
for (const update of updateArrays) {
  const val = checkInOrder(update);
  total += val ? val : 0
}

console.log(total)

