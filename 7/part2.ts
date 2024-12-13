

const data = Deno.readFileSync("./input.txt")
let strData = new TextDecoder().decode(data)
strData = strData.replaceAll("\r","");
let strs = strData.split("\n")

const tests : Record<string, number[]> = {}

for (const str of strs) {
  const [testVal, nums] = str.split(":")
  const numsArray = nums.split(" ").map(x => Number(x)).filter(x => x)
  tests[testVal] = numsArray;
}

function checkIfTestValid(testVal: number, nums: number[], currentVal: number, currentIndex: number): boolean {
  // intuition: keep a state of the current value. multiply next number, if greater than testVal, add instead and continue. if both are too large, back track
  if (currentVal > testVal) {
    return false
  }
  if (currentIndex == nums.length - 1 && currentVal == testVal) {
    return true
  } else if (currentIndex == nums.length - 1) {
    return false
  }

  // try multiply and add
  return checkIfTestValid(testVal, nums, currentVal * nums[currentIndex + 1], currentIndex + 1) ||
          checkIfTestValid(testVal,nums, currentVal + nums[currentIndex + 1], currentIndex + 1) ||
          checkIfTestValid(testVal,nums, Number(currentVal.toString() + nums[currentIndex + 1].toString()), currentIndex + 1)
}

let sum = 0;
for (const test of Object.keys(tests)) {
  if (checkIfTestValid(Number(test), tests[test], tests[test][0], 0)) {
    sum += Number(test)
  }
}

console.log(sum);
