const user1 = {
  username: 'user1',
  password: 'password1'
};

const user2 = {
  username: 'user2',
  password: 'password2'
};

const user3 = {
  username: 'user3',
  password: 'password3'
};

var users = [user1, user2, user3];

var { username, password } = user1;

username = 'user4';

if(users.find(user => user.username == username && user.password == password)){
  console.log('LOGGED IN!!!');
} else {
  console.log('Sai');
}
  
