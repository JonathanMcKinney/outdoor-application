
//create on click function 
//take values from location,activity, and distance
//plug in the values to the api by concatination
//api takes the data and spits data back out according to what we put in.
//api puts results onto new page where we want it


var submitClick = function () {
    var location = $("#location-input").val().trim();
    console.log(location);
    var activity = $("#activity").val();
    console.log("this is activity chosen: " + activity);
    var radius = $("#distance").val();
    console.log("this is distance chosen: " + radius);

    var googleQueryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + location + "&inputtype=textquery&fields=name,geometry&key=AIzaSyAZnGA441xuP_Jad74MgbZzz_Yvc6czHCg";
    console.log("this is the goog: " + googleQueryURL);


    $.ajax({
        url: googleQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.candidates;
        var lat = results[0].geometry.location.lat;
        console.log("this is the lat: " + lat);
        var lng = results[0].geometry.location.lng;
        console.log("this is the lng: " + lng);

    });
}



//     if (activity === "walking") {
//         var hikingAPI = "https://www.hikingproject.com/data/get-trails?" + //latlong + "&maxDistance=" + radius + "&key=200406991-51cef123aaf15cad4674f56c0e8aa4f0"
//         $.ajax({
//             url: ,
//             method: "GET"
//         });

//     };

//     else if (activity === "biking") {
//         var bikingAPI = 
//         $.ajax({
//             url: ,
//             method: "GET"
//         });

//     };

// }

$("#submitButton").on("click", submitClick);