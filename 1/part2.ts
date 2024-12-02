
const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n");

const list1 : number[] = []
const list2 : number[] = []


for (const line of lines) {
    const [item1, item2] = line.split(/\W\W\W/)
    list1.push(Number(item1)); 
    list2.push(Number(item2));
}

list1.sort()
list2.sort()

const length = list1.length

const count: Record<number,number> = {}
// make count dict of second list
for(let i = 0; i < length; i++) {
    if (!count[list2[i]]) {
        count[list2[i]] = 1
    } else {
        count[list2[i]] = count[list2[i]] + 1
    }
}

let total = 0;

for (let i = 0; i < length; i++) {
    total += Math.abs(list1[i] * (count[list1[i]] ? count[list1[i]] : 0))
}


console.log(total)