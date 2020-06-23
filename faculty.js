// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAbeCInZs84cvRQOeyZPuPuSLnUg01J52Q",
  authDomain: "signin-aa374.firebaseapp.com",
  databaseURL: "https://signin-aa374.firebaseio.com",
  projectId: "signin-aa374",
  storageBucket: "signin-aa374.appspot.com",
  messagingSenderId: "652515278981",
  appId: "1:652515278981:web:0b8e51232f6b1a16b129ec",
  measurementId: "G-KLJK0MBV37"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$("#btn-login").click(function () {

  var email = $("#InputEmail").val();
  var password = $("#InputPassword").val();
  var result = firebase.auth().signInWithEmailAndPassword(email, password);

  result.catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });

})

$("#btn-regist").click(() => {
  var reemail = $("#Email").val();
  var repass = $("#Password").val();
  var register = firebase.auth().createUserWithEmailAndPassword(reemail, repass);

  register.catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
})

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function () {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

$("#signout").click(() => {
  firebase.auth().signOut()
    .catch(function (err) {
      // Handle errors
    });
})

//modal

$("#goo").click(() => {

  var data = {};

  var subject = $("#tsub").val();
  console.log(subject);

  var questions = $("#tarea").val();
  console.log(questions);

  var database = firebase.database().ref("Assignment/" + subject);

  //listen to data updates from firebase


  //take the values from the form, and put them in an object
  var newActivity = {
    "Subject": subject,
    "questions": questions
  }

  database.set(newActivity)
  console.log(data);
  alert("SUCCESS")




  document.querySelector("form-group").reset
})

//show data

var subject;
var userDataRef = firebase.database().ref("Assignment");
userDataRef.once("value").then(function (subject) {
  subject.forEach(function (category) {
    $("#subject").append("<option id='"+category.key+"'+ value='" + category.key + "'>" + category.key + "</option>");
  _subject = $('#'+category.key).val();

  });
});

var userDataRef = firebase.database().ref("Assignment");
userDataRef.once("value").then(function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var id_val = childSnapshot.val()._subject.questions;
    $('#subject').on('change', function () {

      $("#showarea").append(id_val);

    });


  });


});


/*
var+ dbCategories = firebase.database().ref("Assignment/hellooo");

dbCategories.on("value", function(categories){

    if(categories.exists()){
        var categorieshtml = "";
        categories.forEach(function(category){

           categorieshtml = category.key

        });

        $("#showarea").html(categorieshtml);


    }

  });
*/
