let num = 5; 
function factorialCalculator(n) {
 
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}


let factorial = factorialCalculator(num);


let resultMsg = `Factorial of ${num} is ${factorial}`;


console.log(resultMsg);