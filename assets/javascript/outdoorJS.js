//create on click function 
//take values from location,activity, and distance
//plug in the values to the api by concatination
//api takes the data and spits data back out according to what we put in.
//api puts results onto new page where we want it

var activity;

var submitClick = function () {
    var location = $("#location-input").val().trim();
    console.log(location);
    activity = $("#activity").val();
    console.log("this is activity chosen: " + activity);
    var radius = $("#distance").val();
    console.log("this is distance chosen: " + radius);
    var lat;
    var lng;

    var googleQueryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + location + "&inputtype=textquery&fields=name,geometry&key=AIzaSyAZnGA441xuP_Jad74MgbZzz_Yvc6czHCg";
    console.log("this is the goog: " + googleQueryURL);


    $.ajax({
        url: googleQueryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.candidates;
        lat = results[0].geometry.location.lat;
        console.log("this is the lat: " + lat);
        lng = results[0].geometry.location.lng;
        console.log("this is the lng: " + lng);

        if (activity === "walking") {
            var hikingAPI = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lng + "&maxDistance=" + radius + "&key=200406991-51cef123aaf15cad4674f56c0e8aa4f0"
            console.log("This is hiking: " + hikingAPI);
            $.ajax({
                url: hikingAPI,
                method: "GET"
            }).then(function (response) {
                console.log(response);
            });
        }

        else if (activity === "biking") {
            var bikingAPI = "https://www.mtbproject.com/data/get-trails?lat=" + lat + "&lon=" + lng + "&maxDistance=" + radius + "&key=200406991-51cef123aaf15cad4674f56c0e8aa4f0"
            console.log("this is the mountain biking: " + bikingAPI);
            $.ajax({
                url: bikingAPI ,
                method: "GET"
            }).then(function (response) {
                console.log(response);
            });
    
        };



    });





}

    



$("#submitButton").on("click", submitClick);