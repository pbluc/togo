var logoutBtn = document.getElementById("logoutBtn");
var writeReviewBtn = document.getElementById("writeReviewBtn");

logoutBtn.onclick = function() {logout()};
writeReviewBtn.onclick = function() {
    location.href = "review.html";
};

function logout() {
    console.log('Logged out')
    location.href = "index.html";
}