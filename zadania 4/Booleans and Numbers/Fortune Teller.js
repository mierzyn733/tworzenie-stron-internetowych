let fortune1="for1";
let fortune2="for2";
let fortune3="for3";
let fortune4="for4";
let fortune5="for5";
let random=Math.random();
let randomNumber=Math.floor(Math.random()*(5-1));
console.log(randomNumber);
let selectedFortune=randomNumber;
if(randomNumber==1)
{
  console.log(fortune1);
  selectedFortune=fortune1;
}
else if(randomNumber==2)
{
  console.log(fortune2);
  selectedFortune=fortune2;
}
else if(randomNumber==3)
{
  console.log(fortune3);
  selectedFortune=fortune3;
}
else if(randomNumber==4)
{
  console.log(fortune4);
  selectedFortune=fortune4;
}
else if(randomNumber==5)
{
  console.log(fortune5);
  selectedFortune=fortune;
}
console.log(selectedFortune);