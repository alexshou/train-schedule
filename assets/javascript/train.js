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

  $("#add-train").on("click", function() {
      // Don't refresh the page!
    event.preventDefault();
    var trainName = $("#name-input").val().trim();
    var trainDes = $("#des-input").val().trim();
    var firstTrainTime = $("#first-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();
    
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
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes();
    console.log(time);
    $("#train-table").empty();
    for( var key in sv ){
      var thisObject = sv[key];
      var firstTrainHours = thisObject.firstTrainTime[0] + thisObject.firstTrainTime[1];
      var firstTrainMinutes = thisObject.firstTrainTime[3] + thisObject.firstTrainTime[4];
      var minutesToNextTrain = thisObject.trainFrequency - ((dt.getHours() - firstTrainHours)*60 + 
        (dt.getMinutes() - firstTrainMinutes)) % thisObject.trainFrequency; 
      var nextTrainArrival;
      var nextTrainHours;
      var nextTrainMinutes;
      if((minutesToNextTrain + dt.getMinutes()) >= 60){
        var totalMins = minutesToNextTrain + dt.getMinutes();
        nextTrainHours = (dt.getHours() + parseInt(totalMins/60)) % 24;
        nextTrainMinutes = totalMins % 60;
      }
      else
      {
        var totalMins = minutesToNextTrain + dt.getMinutes();
        nextTrainHours = dt.getHours() % 24;
        nextTrainMinutes = totalMins;
      }
      if(nextTrainHours === 0){
          nextTrainHours = "00";
      }
      if(nextTrainMinutes === 0){
        nextTrainMinutes = "00";
      }
      if(nextTrainHours)
      nextTrainArrival = nextTrainHours + ":" + nextTrainMinutes;

      console.log("next train:" + nextTrainArrival);
        $(".table").append("<tr><td>" + thisObject.name + "</td><td>" + thisObject.trainDestination + 
        "</td><td>" + thisObject.trainFrequency + "</td><td>" + nextTrainArrival + 
        "</td><td>" + minutesToNextTrain + "</td></tr>");
    }
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });