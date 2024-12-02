
const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n");

function checkReportSafety(report: number[], dampener: boolean): boolean {
    let safe = true;
    let lastNum = report[0];
    let increasing = 0 // if > 0, increasing, if < 0, decreasing

    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - lastNum;
        if (increasing == 0) {
            increasing = diff;
        }
        if ((diff < 0 && increasing > 0) || (diff > 0 && increasing < 0) || (diff == 0 || Math.abs(diff) > 3)) {

            // check with lastNum removed
            if (dampener) {
                const lastNumRemoved : boolean = checkReportSafety(report.slice(0,i - 1).concat(report.slice(i,report.length)), false);
                const currentNumRemoved : boolean = checkReportSafety(report.slice(0,i).concat(report.slice(i+1,report.length)), false);

                safe = lastNumRemoved || currentNumRemoved;
            } else {
                safe = false;
            }
            break;
        }
        lastNum = report[i];
    }

    return safe
}

let totalSafe = 0
for (const line of lines) {
    const report = line.split(" ").map(x => Number(x))
    
    if (checkReportSafety(report, true)) {
        totalSafe += 1;
    }
}


console.log(totalSafe)