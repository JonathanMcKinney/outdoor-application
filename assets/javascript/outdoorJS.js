var config = {
    apiKey: "AIzaSyDifrYi4RM3kSNwsoMgxxtqWToBvPIFQi0",
    authDomain: "outdoor-app-1f163.firebaseapp.com",
    databaseURL: "https://outdoor-app-1f163.firebaseio.com",
    projectId: "outdoor-app-1f163",
    storageBucket: "outdoor-app-1f163.appspot.com",
    messagingSenderId: "201185461812"
  };
 
  firebase.initializeApp(config);
 
  var database = firebase.database();
 
 ////////////////////////////////////////////////////////////////////////
 
 var activity;
 
 var submitClick = function () {
    event.preventDefault();
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
                // var results = response.trails;
                database.ref().push(response);
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
                // var results = response.trails;
                database.ref().push(response);
            });
        };
    });
 }
 
 $("#submitButton").on("click", submitClick);
 
 
 //Code start for results.html
 
 $(document).ready()
 
 database.ref().on("child_added", function(childSnap) {
    console.log(childSnap.val());
 
    for (var i = 0; i < results.length; i++) {
        var name = childSnap.val().results.name;
        var length = childSnap.val().results.length;
        var difficulty = childSnap.val().results.difficulty;
        var cStatus = childSnap.val().results.conditionStatus;
        var cDate = childSnap.val().results.conditionDate;
        var image = childSnap.val().results.imgSqSmall;
 
        var tableRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(length),
            $("<td>").text(difficulty),
            $("<td>").text(cStatus),
            $("<td>").text(cDate),
            $("<td>").text(image),
        );
 
        $("#results-table > tbody").append(tableRow);
    };
 });