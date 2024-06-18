function fact(n) {
    if (n <= 1n) {
        return 1n;
    }
    return n * fact(n - 1n);
}

const n = BigInt(prompt("This program prints the factorial of a number.\nPlease enter a number:"));
console.log(`${n}! = ${fact(n)}`);