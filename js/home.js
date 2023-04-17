var logoutBtn = document.getElementById("logoutBtn");
var writeReviewBtn = document.getElementById("writeReviewBtn");
var listOfReviews = document.getElementById("listOfReviews");

var apigClient = apigClientFactory.newClient();

var userEmail = "";

var accessCode = window.location.search.substring(6);
console.log(accessCode);

fetch('https://togoapp.auth.us-east-1.amazoncognito.com/oauth2/token', {
    method: 'POST',
    headers: {
        'Authorization': 'Basic M3M1aWxkNGhraHQyNWVsZ2szOHJhM3Z2OXE6MXBndmdpaGIzZjFhamZzazdhNmJnbDA2YXFsMDEybzc5dHJtbG83bmo1cnY1aGEydDcyNg==',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=authorization_code&client_id=3s5ild4hkht25elgk38ra3vv9q&code=${accessCode}redirect_uri=https://d21eulsh8uxgb2.cloudfront.net/home.html&client_secret=1pgvgihb3f1ajfsk7a6bgl06aql012o79trmlo7nj5rv5ha2t726`
}).then(response => {
    response = response.json;
    var accessToken = response["access_token"];
    console.log(accessToken);

    fetch('https://cognito-idp-fips.us-east-1.amazonaws.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser'
        },
        body: `{"AccessToken":"${accessToken}"}`
    }).then(userProfile => {
        console.log(userProfile);
        userProfile["UserAttributes"].forEach(attr => {
            if ("Name" in attr && attr["Name"] == "email") {
                userEmail = attr["Value"];
                getReviews();
                console.log(userEmail);
                return;
            }
        });
    });
});

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
        "useremail": userEmail,
        "businessemail": ""
    };

    if (userEmail == "") {
        return;
    }

    apigClient.reviewsGet(params, {}, {})
    .then((response) => {
        console.log(response);

        reviews = response['data']['reviews'];
        console.log(reviews);

        reviews.forEach(review => {
            let business = review['business-email'];
            let rating = review['rating'];
            let description = review['review'];
            let reply = review['business-reply'];
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