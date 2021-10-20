function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendMailMessage(email, message) {
  console.log('Sending mail');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mailer machine
      const success = [true, false][random(0, 1)];
  
      if(success) {
        resolve({ email });
      } else {
        reject('');
      }
    }, 1000);
  });
}

var email = 'email@example.com'
var message = `Hi ${email.split('@')[0]}! Welcome to promises.`
try{ 
  await sendMailMessage(email, message)
  console.log(`Mail sended to ${email || 'email'}`);
} catch(err){
  console.log(error || "Error! Couldn't send mail");
}
