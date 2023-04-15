var logoutBtn = document.getElementById("logoutBtn");

logoutBtn.onclick = function() {logout()};

function logout() {
    console.log('Logged out')
    location.href = "index.html";
}