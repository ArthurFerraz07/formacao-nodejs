function* eternal_sequence(){
  var i = 0;
  while(true){
    yield i++;
  }
}

function* fib(){
  var n1 = 0;
  var n2 = 1;
  while(true){
    ({ n1, n2 } = { n1: n2, n2: n1 + n2 });
    yield n1;
  }
}
