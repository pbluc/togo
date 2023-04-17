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


const test_email = "viachu2@outlook.com" 
window.onload = function() {
    var params = {
        email: test_email
    };
    var body = {};
    var additionalParams = {};
    
    apigClient.businessGet(params, body, additionalParams)
        .then(function(result) {
            console.log(result.data[0])
            console.log(result.data[0].owner.M.firstname);
            console.log(result.data[0]["operational-hours"])
            const form = document.getElementById('business-profile');
            form.elements['name'].value = result.data[0].name.S;
            form.elements['owner_firstname'].value = result.data[0]["owner"]["M"]["firstname"]["S"];
            form.elements['owner_lastname'].value = result.data[0]["owner"]["M"]["lastname"]["S"];
            form.elements['cuisine'].value = result.data[0].cuisine["SS"][0];
            form.elements['loc-lon'].value = result.data[0]["location"]["M"]["longitude"]["S"];
            form.elements['loc-lat'].value = result.data[0]["location"]["M"]["latitude"]["S"];
            form.elements['food-title'].value = result.data[0]["menu"]["L"][0]["M"]["food-title"]["S"];
            form.elements['price'].value = result.data[0]["menu"]["L"][0]["M"]["price"]["N"];
            form.elements['description'].value = result.data[0]["menu"]["L"][0]["M"]["description"]["S"];
            form.elements['food-title1'].value = result.data[0]["menu"]["L"][1]["M"]["food-title"]["S"];
            form.elements['price1'].value = result.data[0]["menu"]["L"][1]["M"]["price"]["N"];
            form.elements['description1'].value = result.data[0]["menu"]["L"][1]["M"]["description"]["S"];
            form.elements['hrs_sun_is_open'].value = result.data[0]["operational-hours"]["M"]["sunday"]["M"]["is-open"]["BOOL"];
            form.elements['hrs_sun_open_time'].value = result.data[0]["operational-hours"]["M"]["sunday"]["M"]["open-time"]["S"];
            form.elements['hrs_sun_close_time'].value = result.data[0]["operational-hours"]["M"]["sunday"]["M"]["close-time"]["S"];
            form.elements['hrs_mon_is_open'].value = result.data[0]["operational-hours"]["M"]["monday"]["M"]["is-open"]["BOOL"];
            form.elements['hrs_mon_open_time'].value = result.data[0]["operational-hours"]["M"]["monday"]["M"]["open-time"]["S"];
            form.elements['hrs_mon_close_time'].value = result.data[0]["operational-hours"]["M"]["monday"]["M"]["close-time"]["S"];
            form.elements['hrs_tue_is_open'].value = result.data[0]["operational-hours"]["M"]["tuesday"]["M"]["is-open"]["BOOL"];
            form.elements['hrs_tue_open_time'].value = result.data[0]["operational-hours"]["M"]["tuesday"]["M"]["open-time"]["S"];
            form.elements['hrs_tue_close_time'].value = result.data[0]["operational-hours"]["M"]["tuesday"]["M"]["close-time"]["S"];
            form.elements['hrs_wed_is_open'].value = result.data[0]["operational-hours"]["M"]["wednesday"]["M"]["is-open"]["BOOL"];
            form.elements['hrs_wed_open_time'].value = result.data[0]["operational-hours"]["M"]["wednesday"]["M"]["open-time"]["S"];
            form.elements['hrs_wed_close_time'].value = result.data[0]["operational-hours"]["M"]["wednesday"]["M"]["close-time"]["S"];
            form.elements['hrs_thu_is_open'].value = result.data[0]["operational-hours"]["M"]["thursday"]["M"]["is-open"]["BOOL"];
            form.elements['hrs_thu_open_time'].value = result.data[0]["operational-hours"]["M"]["thursday"]["M"]["open-time"]["S"];
            form.elements['hrs_thu_close_time'].value = result.data[0]["operational-hours"]["M"]["thursday"]["M"]["close-time"]["S"];
            form.elements['hrs_fri_is_open'].value = result.data[0]["operational-hours"]["M"]["friday"]["M"]["is-open"]["BOOL"];
            form.elements['hrs_fri_open_time'].value = result.data[0]["operational-hours"]["M"]["friday"]["M"]["open-time"]["S"];
            form.elements['hrs_fri_close_time'].value = result.data[0]["operational-hours"]["M"]["friday"]["M"]["close-time"]["S"];
            form.elements['hrs_sat_is_open'].value = result.data[0]["operational-hours"]["M"]["saturday"]["M"]["is-open"]["BOOL"];
            form.elements['hrs_sat_open_time'].value = result.data[0]["operational-hours"]["M"]["saturday"]["M"]["open-time"]["S"];
            form.elements['hrs_sat_close_time'].value = result.data[0]["operational-hours"]["M"]["saturday"]["M"]["close-time"]["S"];
        })
        .catch( function(result){
            //This is where you would put an error callback
        });   
}



    
function update_business() {
    console.log("hi");
    const name = document.getElementById('name').value
    const owner_firstname = document.getElementById('owner_firstname').value ;
    const owner_lastname = document.getElementById('owner_lastname').value;
    const cuisine = document.getElementById('cuisine').value;
    const loc_lon = document.getElementById('loc-lon').value;
    const loc_lat = document.getElementById('loc-lat').value;
    const food_title = document.getElementById('food-title').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const food_title1 = document.getElementById('food-title1').value;
    const price1 = document.getElementById('price1').value;
    const description1 = document.getElementById('description1').value;
    const hrs_sun_is_open = document.getElementById('hrs_sun_is_open').value;
    const hrs_sun_open_time = document.getElementById('hrs_sun_open_time').value;
    const hrs_sun_close_time = document.getElementById('hrs_sun_close_time').value;
    const hrs_mon_is_open = document.getElementById('hrs_mon_is_open').value;
    const hrs_mon_open_time = document.getElementById('hrs_mon_open_time').value;
    const hrs_mon_close_time = document.getElementById('hrs_mon_close_time').value;
    const hrs_tue_is_open = document.getElementById('hrs_tue_is_open').value;
    const hrs_tue_open_time = document.getElementById('hrs_tue_open_time').value;
    const hrs_tue_close_time = document.getElementById('hrs_tue_close_time').value;
    const hrs_wed_is_open = document.getElementById('hrs_wed_is_open').value;
    const hrs_wed_open_time = document.getElementById('hrs_wed_open_time').value;
    const hrs_wed_close_time = document.getElementById('hrs_wed_close_time').value;
    const hrs_thu_is_open = document.getElementById('hrs_thu_is_open').value;
    const hrs_thu_open_time = document.getElementById('hrs_thu_open_time').value;
    const hrs_thu_close_time = document.getElementById('hrs_thu_close_time').value;
    const hrs_fri_is_open = document.getElementById('hrs_fri_is_open').value;
    const hrs_fri_open_time = document.getElementById('hrs_fri_open_time').value;
    const hrs_fri_close_time = document.getElementById('hrs_fri_close_time').value;
    const hrs_sat_is_open = document.getElementById('hrs_sat_is_open').value;
    const hrs_sat_open_time = document.getElementById('hrs_sat_open_time').value;
    const hrs_sat_close_time = document.getElementById('hrs_sat_close_time').value;


    var params = {};
    var body = {
        "name": {
          "S": name
        },
        "owner": {
          "M": {
            "firstname": {
              "S": owner_firstname
            },
            "lastname": {
              "S": owner_lastname
            }
          }
        },
        "cuisine": {
          "SS": cuisine
        },
        "email": {
          "S": test_email
        },
        "location": {
          "M":{
            "longitude": {
              "S": loc_lon
            },
            "latitude": {
              "S": loc_lat
            }
          }
        },
        "menu": {
          "L":[
                {
                  "M":{
                    "food-title": {
                      "S": food_title
                    },
                    "price": {
                      "N": price
                    },
                    "description": {
                      "S": description
                    }
                  }
                },
                {
                    "M":{
                      "food-title": {
                        "S": food_title1
                      },
                      "price": {
                        "N": price1
                      },
                      "description": {
                        "S": description1
                      }
                    }
                  }
          ]
        },
        "operational-hours": {
          "M":{    
            "sunday": {
              "M":{
                  "is-open": {
                      "BOOL": hrs_sun_is_open
                  },
                  "open-time": {
                      "S": hrs_sun_open_time
                  },
                  "close-time": {
                      "S": hrs_sun_close_time
                  }
              }
            },
            "monday": {
              "M":{
                  "is-open": {
                      "BOOL": hrs_mon_is_open
                  },
                  "open-time": {
                      "S": hrs_mon_open_time
                  },
                  "close-time": {
                      "S": hrs_sat_close_time
                  }
              }
            },
            "tuesday": {
              "M":{
                  "is-open": {
                      "BOOL": hrs_tue_is_open
                  },
                  "open-time": {
                      "S": hrs_tue_open_time
                  },
                  "close-time": {
                      "S": hrs_tue_close_time
                  }
              }
            },
            "wednesday": {
              "M":{
                  "is-open": {
                      "BOOL": hrs_wed_is_open
                  },
                  "open-time": {
                      "S": hrs_wed_open_time
                  },
                  "close-time": {
                      "S": hrs_wed_close_time
                  }
              }
            },
            "thursday": {
              "M":{
                  "is-open": {
                      "BOOL": hrs_thu_is_open
                  },
                  "open-time": {
                      "S": hrs_thu_open_time
                  },
                  "close-time": {
                      "S": hrs_thu_close_time
                  }
              }
            },
            "friday": {
              "M":{
                  "is-open": {
                      "BOOL": hrs_fri_is_open
                  },
                  "open-time": {
                      "S": hrs_fri_open_time
                  },
                  "close-time": {
                      "S": hrs_fri_close_time
                  }
              }
            },
            "saturday": {
              "M":{
                  "is-open": {
                      "BOOL": hrs_sat_is_open
                  },
                  "open-time": {
                      "S": hrs_sat_open_time
                  },
                  "close-time": {
                      "S": hrs_sat_close_time
                  }
              }
            }
          }
        }
      }
    var additionalParams = {headers: {'Content-Type':"application/json"}};
    
    apigClient.businessPut(params, body, additionalParams)
        .then(function(result) {
            console.log(result);
        })
        .catch( function(result){
            //This is where you would put an error callback
        });  

};
