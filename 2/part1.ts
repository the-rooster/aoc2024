
const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n");

let totalSafe = 0
for (const line of lines) {
    const report = line.split(" ").map(x => Number(x))
    
    let safe = true;
    let lastNum = report[0];
    let increasing = 0 // if > 0, increasing, if < 0, decreasing
    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - lastNum;
        if (increasing == 0) {
            increasing = diff;
        }
        if ((diff < 0 && increasing > 0) || (diff > 0 && increasing < 0) || (diff == 0 || Math.abs(diff) > 3)) {
            safe = false;
            break;
        }
        lastNum = report[i];
    }

    if (safe) {
        totalSafe += 1
    }
}


console.log(totalSafe)