
var config = {
    apiKey: "AIzaSyCjhzlwU-VFj6K8QW1JahJ0l0DVrZbiryk",
    authDomain: "train-time-318fa.firebaseapp.com",
    databaseURL: "https://train-time-318fa.firebaseio.com",
    projectId: "train-time-318fa",
    storageBucket: "train-time-318fa.appspot.com",
    messagingSenderId: "1058895433958"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  console.log("click");
  event.preventDefault();

  var name = $("#name").val().trim();
  var destination = $("#dest").val().trim();
  var firstTime = $("#first-time").val().trim();

  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

  var expTime = moment($("#first-time").val().trim(), "HH:mm").format("X");

  console.log("moment()" , moment());
  console.log("firstTime: ", firstTime);
  console.log("moment(firstTime, 'HH:mm') : ", moment(firstTime, 'HH:mm'));
  console.log("firstTimeConverted: ", firstTimeConverted);
  console.log("expTime: ", expTime);

  var frequency = $("#frequency").val().trim();

  var newTrain = {
    name: name,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency
  };

  console.log("newTrain: ", newTrain);

  database.ref().push(newTrain);

  console.log("-name: ", newTrain.name);
  console.log("-destination: ", newTrain.destination);
  console.log("-firstTime: ", newTrain.firstTime);
  console.log("-frequency: ", newTrain.frequency);


  $("#name").val("");
  $("#dest").val("");
  $("#first-time").val("");
  $("#frequency").val("");

});  

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().firstTime;
  var frequency = childSnapshot.val().frequency;

  console.log("name: ", name);  
  console.log("destination: ", destination);
  console.log("firstTime: ", firstTime);
  console.log("frequency: ", frequency);

  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  console.log("firstTimeConverted", firstTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var remainder = diffTime % frequency;
  console.log("REMAINING TIME: ", remainder);

  var minutesTillTrain = frequency - remainder;
  console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

  var nextTrain = moment().add(minutesTillTrain, "minutes");
  var nextArrival = moment(nextTrain).format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  console.log("ARRIVAL TIME: " + nextArrival);
  $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minutesTillTrain + "</td></tr>");
});
