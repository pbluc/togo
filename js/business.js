var logoutBtn = document.getElementById("logoutBtn");
var listOfReviews = document.getElementById("listOfReviews");

var apigClient = apigClientFactory.newClient();

logoutBtn.onclick = function() {logout()};

function logout() {
    console.log('Logged out')
    location.href = "index.html";
}

function getReviews() {
    params = {
        "useremail": "",
        "businessemail": "fishandchips@yahoo.com"
    };

    apigClient.reviewsGet(params, {}, {})
    .then((response) => {
        console.log(response);

        reviews = response['data']['reviews'];
        console.log(reviews);

        var reviewNum = 1;
        reviews.forEach(review => {
            let user = review['user-email'];
            let rating = review['rating'];
            let description = review['review'];
            let reply = review['business-reply'];
            
            var templateReviewCard = '';
            if (reply == null || reply == "") {
                templateReviewCard = '<div class="card"><div class="container"><h4 id="paragraphUserEmail' + reviewNum + '"><b>' + user + '</b></h4><p id="paragraphRating' + reviewNum + '">' + rating + '</p><p id="paragraphReviewDescription' + reviewNum + '">' + description + '</p><form><input type="text" id="businessReplyInput' + reviewNum + '" placeholder="Reply Here"><button type="button" id="replyBtn' + reviewNum + '" onclick="reviewBusinessReply(this.id)">Reply</button></form></div></div>';
                reviewNum += 1;
            } else {
                templateReviewCard = '<div class="card"><div class="container"><h4><b>' + user + '</b></h4><p>' + rating + '</p><p>' + description + '</p><p>' + reply + '</p></div></div>';
            }

            listOfReviews.insertAdjacentHTML('beforeend', templateReviewCard);
        });
    }).catch((error) => {
        console.log('an error occurred', error);
    });
}

function reviewBusinessReply(buttonId) {
    console.log(buttonId);
    var reviewNum = buttonId.slice(-1);

    var paragraphUserEmail = document.getElementById("paragraphUserEmail" + reviewNum);
    var paragraphRating = document.getElementById("paragraphRating" + reviewNum);
    var paragraphReviewDescription = document.getElementById("paragraphReviewDescription" + reviewNum);
    var businessReplyInput = document.getElementById("businessReplyInput" + reviewNum);

    body = {
        "user-email": paragraphUserEmail.innerText,
        "business-email": "fishandchips@yahoo.com",
        "rating": paragraphRating.innerHTML,
        "review": paragraphReviewDescription.innerHTML,
        "business-reply": businessReplyInput.value
    };

    apigClient.reviewPut({}, body, {})
    .then((response) => {
        // Reload page to show reply
        location.reload();
    }).catch((error) => {
        console.log('an error occurred', error);
    });
}