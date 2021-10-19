const Person = {
  first_name: 'John',
  last_name: 'Doe',
  address: {
    street: 'First St',
    number: 007,
  }
}

{
  let first_name = Person.first_name;
  let street = Person.address.street;
  let number = Person.address.number;
  
  console.log(first_name);
  console.log(street);
  console.log(number);
}

const { 
  first_name, 
  address: { street, number }
} = Person;

console.log(first_name);
console.log(street);
console.log(number);
