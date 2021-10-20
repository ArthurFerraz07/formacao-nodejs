function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendMailMessage(email, message, callback) {
  console.log('Sending mail');
  setTimeout(() => {
    // Mailer machine
    const success = [true, false][random(0, 1)];

    callback({ success, email });
  }, 1000);
}

var email = 'email@example.com'
var message = `Hi ${email.split('@')[0]}! Welcome to callbacks.`
sendMailMessage(email, message, (params = {}) => {
  if(params?.success) {
    console.log(`Mail sended to ${params?.email || 'email'}`);
  }else{
    console.log(params?.error || "Error! Couldn't send mail" );
  }
});

console.log('Paralel with mail sending');
