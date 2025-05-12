
let email = "freecodecamp@example.com";


function maskEmail(email) {
  
  let [username, domain] = email.split("@");

 
  if (username.length <= 2) {
    return email;
  }


  let maskedUsername = username[0] + "*".repeat(username.length - 2) + username[username.length - 1];

  return maskedUsername + "@" + domain;
}


console.log(maskEmail(email));