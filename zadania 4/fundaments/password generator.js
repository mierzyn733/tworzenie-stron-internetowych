let password = '';

const characters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','!','@','#','$','%','^','&','*','(',')'];
const arrayLength = characters.length - 1;
const generatePassword = passwordLength => {
  for (let i = 0; i < passwordLength; i++) {
    let math = Math.round(Math.random() * (arrayLength - 0) + 0);
    password += characters[math]; 
  }
  return password
}
generatePassword(7);
console.log(`Generated password: ${password}`);
console.log(password.length);