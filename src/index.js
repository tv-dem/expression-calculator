function eval() {
    // Do not use eval!!!
    return;
}

function check(str, bracketsConfig) {
  let arr1 = [];
  let arr2 = [];
  bracketsConfig.forEach(el => {
    arr1.push(el[0]);
    arr2.push(el[1]);
  });
  let stack = [];
  str = str.split("");
  for (let el of str) {
    if (arr1.indexOf(el) == arr2.indexOf(el) && el == stack[stack.length - 1]) stack.pop();
    else
      if (arr1.indexOf(el) != -1) stack.push(el);
      else {
        let r = stack.pop();
        if ((arr1.indexOf(r) != arr2.indexOf(el)) || arr1.indexOf(r) == -1)
          return false;
      }
  }
  return !stack.length;
}


function expressionCalculator(expr) {
  let prior = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  }
  if(!check(expr.replace(/[^()]/g, ''), [['(', ')']])) throw new TypeError('ExpressionError: Brackets must be paired')
  expr = expr.trim().split(/\s+/g)==expr ? expr.split('') : expr.trim().split(/\s+/g)
  let numbers = [];
  let p1 = 0, p2 = 0;
  let operators = [];
  for (let zn of expr) {
    if(zn == '('){
      operators.push(zn)
      continue;
    }
    if(zn == ')'){
      while(operators[operators.length-1] != '(') calc(numbers, operators)
      operators.pop()
      continue;
    }
    while(prior[zn] <= prior[operators[operators.length-1]]) calc(numbers, operators);

    if (isOperator(prior, zn))
    operators.push(zn)
    else numbers.push(Number(zn))
  }
  while(operators.length != 0){
    calc(numbers, operators)
  }
  return numbers[0];
}

function calc(numbers, operators) {

  let numNext = numbers.pop();
  let numPrev = numbers.pop();

  let operLast = operators.pop();
  if (operLast == '+') numbers.push(numPrev + numNext);
  if (operLast == '-') numbers.push(numPrev - numNext);
  if (operLast == '*') numbers.push(numPrev * numNext);
  if (operLast == '/'){
    if(numNext==0) throw 'TypeError: Division by zero.'
    numbers.push(numPrev / numNext);
  }
}

function isOperator(prior, str){
    for(let zn in prior)
      if(str == zn) return true
    return false
  }

module.exports = {
    expressionCalculator
}