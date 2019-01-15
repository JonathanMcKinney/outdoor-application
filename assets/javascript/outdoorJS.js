
function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if ( key < 48 || key > 57 ) {
        return false;
    } else {
        return true;
    }
};

$(document).ready(function(){
    $('[id^=distance]').keypress(validateNumber);
});

var activity;
 
var submitClick = function () {
   event.preventDefault();
   var location = $("#location-input").val().trim();
   console.log(location);
   activity = $("#activity").val();
   console.log("this is activity chosen: " + activity);
   var radius = $("#distance").val();
   console.log("this is distance chosen: " + radius);
   var absoluteRadius = Math.abs(radius);
   console.log("this is absolute radius: " + absoluteRadius);
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

       if (activity === "hiking") {
           var hikingAPI = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lng + "&maxDistance=" + absoluteRadius + "&maxResults=50&key=200406991-51cef123aaf15cad4674f56c0e8aa4f0"
           console.log("This is hiking: " + hikingAPI);
           $.ajax({
               url: hikingAPI,
               method: "GET"
           }).then(function (response) {
               console.log(response);
               var JSONresponse = JSON.stringify(response);
               localStorage.clear();
               localStorage.setItem("JSONresponse", JSONresponse);
               console.log(JSONresponse);
               // var results = response.trails;
               $("#anchorID")[0].click();
           });

       }

       else if (activity === "biking") {
           var bikingAPI = "https://www.mtbproject.com/data/get-trails?lat=" + lat + "&lon=" + lng + "&maxDistance=" + absoluteRadius + "&maxResults=50&key=200406991-51cef123aaf15cad4674f56c0e8aa4f0"
           console.log("this is the mountain biking: " + bikingAPI);
           $.ajax({
               url: bikingAPI ,
               method: "GET"
           }).then(function (response) {
               console.log(response);
               var JSONresponse = JSON.stringify(response);
               localStorage.clear();
               localStorage.setItem("JSONresponse", JSONresponse);
               console.log(JSONresponse);
               // var results = response.trails;
               $("#anchorID")[0].click();
           });
       };
   });
}

$("#submitButton").on("click", submitClick);


//Code start for results.html

var gotItem = localStorage.getItem("JSONresponse");
var nowParsed = JSON.parse(gotItem);
console.log(nowParsed);
var results = nowParsed.trails;

   for (var i = 0; i < results.length; i++) {
       var name = results[i].name;
       var length = results[i].length;
       var difficulty = results[i].difficulty;
       var cStatus = results[i].conditionStatus;
       var cDate = moment(results[i].conditionDate, "YYYY-MM-DD HH:mm:ss");
       var goodDate = cDate.format("MM-DD-YYYY");
       var image = results[i].imgSqSmall;

       console.log(cStatus)

       var tableRow = $("<tr>").append(
           $("<td class='anchor-name' data-label='Name'>").html("<strong><a href=" + results[i].url + ">" + name + "</a></strong>"),
           $("<td data-label='Length'>").text(length + " miles"),
            $("<td data-label='Location'>").text(difficulty),
           $("<td data-label='Status'>").text(cStatus),
           $("<td data-label='5 Star Rating'>").text(goodDate),
           $("<td data-label='Trail Image'>").html("<img class='trl-img' src=" + image + ">"),
       );
       $("tbody").append(tableRow);
   }
