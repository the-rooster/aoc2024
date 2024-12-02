
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

let total = 0;

for (let i = 0; i < length; i++) {
    total += Math.abs(list1[i] - list2[i])
}


console.log(total)