var user = {
  uid: 'niceUsername',
  password: 'nicePassword'
};

var user_preferences = { theme: 'pink' };

var user_with_preferences = { ...user, ...user_preferences };

console.log(user_with_preferences);
