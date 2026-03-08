const username = document.getElementById("username");
const password = document.getElementById("password");
//Login part
function login() {
  console.log("hey");
  const userNameValue = username.value;
  const passwordValue = password.value;
  console.log(userNameValue, passwordValue);
  if (userNameValue === "admin") {
    if (passwordValue === "admin123") {
      window.location.assign("home.html");
    } else {
      alert("Password Invalid");
    }
  } else {
    alert("UserName Invalid");
  }
}

//load all card
const loadAllIssue=()=>{
    
}
