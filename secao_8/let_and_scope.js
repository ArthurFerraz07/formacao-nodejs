// Global vars
let let_ = 'global';
var var_ = 'global';

console.log({ let_ });
console.log({ var_ });

function function_(){
  // Local vars
  let let_ = 'local';
  var var_ = 'local';
  // let let_ = 'hmm';
  // var var_ = 'hmm';
  if(true){
    // Block{} vars    
    let let_ = 'block';
    console.log({ let_ });
  }
  console.log({ let_ });
  console.log({ var_ });
}

function_()

console.log({ let_ });
console.log({ var_ });

