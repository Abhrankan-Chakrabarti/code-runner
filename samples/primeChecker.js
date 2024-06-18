function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    const sqrtNum = Math.sqrt(num);
    for (let i = 5; i <= sqrtNum; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

const userInput = prompt('Enter a number to check if it is prime:');
const num = parseInt(userInput);

if (isNaN(num)) {
    console.log('Invalid input. Please enter a valid number.');
} else {
    console.log(`Is ${num} prime? ${isPrime(num)}`);
}