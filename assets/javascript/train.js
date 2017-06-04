var config = {
    apiKey: "AIzaSyCXXczagOuaYnK_RW9yVYZN26xpueeA7cM",
    authDomain: "saturdaysclass-324b4.firebaseapp.com",
    databaseURL: "https://saturdaysclass-324b4.firebaseio.com",
    projectId: "saturdaysclass-324b4",
    storageBucket: "saturdaysclass-324b4.appspot.com",
    messagingSenderId: "421906615395"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes();
  console.log(time);
  $("#add-train").on("click", function() {
      // Don't refresh the page!
    event.preventDefault();
    var trainName = $("#name-input").val().trim();
    var trainDes = $("#des-input").val().trim();
    var firstTrainTime = $("#first-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();
    var firstTrainHours = firstTrainTime[0]+firstTrainTime[1];
    var firstTrainMinutes = firstTrainTime[3]+firstTrainTime[4];
    var minutesToNextTrain = (dt.gethours)()

    database.ref().push({
      name: trainName,
      trainDestination: trainDes,
      firstTrainTime: firstTrainTime,
      trainFrequency:trainFreq
    })

  });

  // display the train schedule from firebase
  database.ref().on("value", function(snapshot) {

    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    for( var key in sv ){
      var thisObject = sv[key];
      console.log(thisObject);
    }

    // Getting an array of each key In the snapshot object
    var svArr = Object.keys(sv);

    // Finding the last user's key
    var lastIndex = svArr.length - 1;

    var lastKey = svArr[lastIndex];

    // Using the last user's key to access the last added user object
    var lastObj = sv[lastKey];

    // Console.loging the last user's data
    console.log(lastObj.name);
    console.log(lastObj.trainDestination);
    console.log(lastObj.firstTrainTime);
    console.log(lastObj.trainFrequency);

    $(".table").append("<tr><td>" + lastObj.name + "</td><td>" + lastObj.trainDestination + 
      "</td><td>" + lastObj.trainFrequency + "</td><td>" + lastObj.firstTrainTime + "</td></tr>");

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });