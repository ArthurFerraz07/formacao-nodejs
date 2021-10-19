function sum(x, y){
  console.log(x = y);
};

const sub = function(x, y){
  console.log(x - y);
};

const raw_fib = (n) => {
  if(n > 1){
    return fib(n - 1) + fib(n - 2)
  } else if(n == 1){
    return 1;
  } else if(n == 0){
    return 0;
  }
}

const fib = n => raw_fib(n);

console.log(fib(25));
