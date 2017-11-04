// Create Train database in Firebase
// Create variable and initialize
var config = {
	apiKey: "AIzaSyBx-Y47au7OgYLEouUmjxvMKptVIdcpN4A",
	authDomain: "trainsch-c4bcc.firebaseapp.com",
	databaseURL: "https://trainsch-c4bcc.firebaseio.com",
	projectId: "trainsch-c4bcc",
	storageBucket: "",
	messagingSenderId: "72958559616"
};
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";

// Button for adding a new train
$('#addTrainBtn').on("click", function() {

	//Grabs user input
	trainName = $('#trainNameInput').val().trim();
	destination = $('#destInput').val().trim();
	firstTrain = $('#firstTrainInput').val().trim();
	frequency = $('#freqInput').val().trim();

	database.ref().push({

		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency,
	})
	console.log(trainName);
	console.log(destination);
	console.log(firstTrain);
	console.log(frequency);

	// Clears all of the text-boxes
	// $('#trainNameInput').val(""); $('#destInput').val(""); $('#firstTrainInput').val(""); $('#freqInput').val("");


});

database.ref().on("child_added", function(childSnapshot) {
	console.log(childSnapshot.val());

	// Store everything into a variable
	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var frequency = childSnapshot.val().frequency;

	// Train info
	console.log(trainName);
	console.log(destination);
	console.log(firstTrain);
	console.log(frequency);

	var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
	console.log("FirstTime: " + firstTimeConverted);

	var currentTime = moment();
	console.log("Current Time: " + moment().format("HH:mm"))
// Difference between times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % frequency;
	console.log("Time Remainding: " + tRemainder);

	// Mins until train
	var tMinutesTillTrain = frequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});