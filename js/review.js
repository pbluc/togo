var closeBtn = document.getElementById("closeBtn");
var submitReviewBtn = document.getElementById("submitReviewBtn")

closeBtn.onclick = function() {
    location.href = "home.html";
};

submitReviewBtn.onclick = function() {
    alert('Review was successfully submitted!');
    location.href = "home.html";
};