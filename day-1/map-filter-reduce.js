//map method
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);
//Filter method
const filter_numbers = [1, 2, 3, 4, 5];
const evenNumbers = filter_numbers.filter(n => n % 2 === 0);
console.log(evenNumbers);

//Reduce method
const reduce_numbers = [1, 2, 3, 4, 5];
const sum = reduce_numbers.reduce((accumulator, currentValue) => accumulator + currentValue,0);
console.log(sum);
