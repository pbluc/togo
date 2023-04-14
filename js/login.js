var loginAsUserBtn = document.getElementById("loginAsUserBtn");
var loginAsBusinessBtn = document.getElementById("loginAsBusinessBtn");

loginAsUserBtn.onclick = function() {userLogin()};
loginAsBusinessBtn.onclick = function() {businessLogin()};

function userLogin() {
    console.log('Open Amazon Cognito as user')
}

function businessLogin() {
    console.log('Open Amazon Cognito as business')
}