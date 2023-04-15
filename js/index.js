var loginAsUserBtn = document.getElementById("loginAsUserBtn");
var loginAsBusinessBtn = document.getElementById("loginAsBusinessBtn");

loginAsUserBtn.onclick = function() {userLogin()};
loginAsBusinessBtn.onclick = function() {businessLogin()};

function userLogin() {
    console.log('Open Amazon Cognito as user');
    location.href = "https://togoapp.auth.us-east-1.amazoncognito.com/login?client_id=3s5ild4hkht25elgk38ra3vv9q&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.togo-food-trucks.com.s3-website-us-east-1.amazonaws.com%2Fhome.html";
}

function businessLogin() {
    console.log('Open Amazon Cognito as business');
    location.href = "https://togoapp-businesses.auth.us-east-1.amazoncognito.com/login?client_id=5fu191vd265c8tme5vfh843dh1&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.togo-food-trucks.com.s3-website-us-east-1.amazonaws.com%2Fbusiness.html";
}