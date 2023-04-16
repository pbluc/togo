var logoutBtn = document.getElementById("logoutBtn");
var writeReviewBtn = document.getElementById("writeReviewBtn");
var listOfReviews = document.getElementById("listOfReviews");

var apigClient = apigClientFactory.newClient();

logoutBtn.onclick = function() {logout()};
writeReviewBtn.onclick = function() {
    location.href = "review.html";
};

function logout() {
    console.log('Logged out')
    location.href = "index.html";
}

function getReviews() {
    params = {
        "useremail": "patricia.b.luc@gmail.com",
        "businessemail": ""
    };

    apigClient.reviewsGet(params, {}, {})
    .then((response) => {
        console.log(response);

        reviews = response['data']['reviews'];
        console.log(reviews);

        reviews.forEach(review => {
            let business = review['business-email'];
            let rating = review['rating'];
            let description = review['review'];
            let reply = review['reply'];
            if (reply == null) {
                reply = "";
            }

            var templateReviewCard = '<div class="card"><div class="container"><h4><b>' + business + '</b></h4><p>' + rating + '</p><p>' + description + '</p><p>' + reply + '</p></div></div>';

            listOfReviews.insertAdjacentHTML('beforeend', templateReviewCard);
        });
    }).catch((error) => {
        console.log('an error occurred', error);
    });
}