

const data = Deno.readFileSync("./input.txt")
let strData = new TextDecoder().decode(data)
strData = strData.replaceAll("\r","");
const [rules, updates] = strData.split(/\n\W+/)


const rulesMap : Record<string, string[][]> = {}
for (const rulestr of rules.split("\n")) {
  const ruleVals = rulestr.split("|") as string[]


  if (!rulesMap[ruleVals[0]]) {
    rulesMap[ruleVals[0]] = [ruleVals]
  } else {
    rulesMap[ruleVals[0]].push(ruleVals)
  }

  if (!rulesMap[ruleVals[1]]) {
    rulesMap[ruleVals[1]] = [ruleVals]
  } else {
    rulesMap[ruleVals[1]].push(ruleVals)
  }
}

const updateArrays: string[][] = [];
for (const updateRow of updates.split("\n")) {
  updateArrays.push(updateRow.split(","))
}

function checkInOrder(update: string[], trySwap: boolean) {
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

              if (trySwap) {
                const newUpdate = update;
                const temp = newUpdate[occurence]
                newUpdate[occurence] = item
                newUpdate[i] = temp
                return checkInOrder(newUpdate, true)
              }
              break;
            }
          }
        }
      } else {
        const occurences = occurenceMap[before];
        if (occurences) {
          for (const occurence of occurences) {
            if (occurence > i) {

              passed = false;
              if (trySwap) {
                const newUpdate = update;
                const temp = newUpdate[occurence]
                newUpdate[occurence] = item
                newUpdate[i] = temp
                return checkInOrder(newUpdate, true)
              }
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
  const val = checkInOrder(update, false);
  if (!val) {
    const val2 = checkInOrder(update, true)
    total += val2 ? val2 : 0
  }
}

console.log(total)

