function* aipt(n) {
    let x = 1n, y = 1n, a, b, c;
    while (n--) {
        [x, y] = [3n * x + 4n * y, 2n * x + 3n * y];
        [a, b, c] = [(x - 1n) / 2n, (x + 1n) / 2n, y];
        yield [a, b, c];
    }
}

const n = parseInt(prompt("This program prints the 1st n almost isosceles Pythagorean triples.\nEnter n:"));
let i = 0;
for (let x of aipt(n)) {
    console.log(`${i++}: (${x[0]}, ${x[1]}, ${x[2]})`);
}