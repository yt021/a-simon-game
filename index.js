// var isTouchDevice =
//   "ontouchstart" in window ||
//   navigator.MaxTouchPoints > 0 ||
//   navigator.msMaxTouchPoints > 0;
var buttomColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttomColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).toggleClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).toggleClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// if (!isTouchDevice) {
$("#blocker").click(function () {
  $("#blocker").toggleClass("disabled");
  if (!started) {
    setTimeout(function () {
      $("#title").text("level " + level);
      nextSequence();
    }, 400);
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").toggleClass("game-over");
    setTimeout(function () {
      $("body").toggleClass("game-over");
    }, 200);
    $("#title").text("Game Over, Click On The Screen to Restart");
    $("#blocker").toggleClass("disabled");
    startOver();
  }
}
// } else {
//   $("#title").text("Touch The Screen to Start");

//   $("#blocker").on("touchstart", function () {
//     $("#blocker").toggleClass("disabled");
//     if (!started) {
//       setTimeout(function () {
//         $("#title").text("level " + level);
//         nextSequence();
//       }, 400);
//       started = true;
//     }
//   });

//   function checkAnswer(currentLevel) {
//     if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
//       if (userClickedPattern.length === gamePattern.length) {
//         setTimeout(function () {
//           nextSequence();
//         }, 1000);
//       }
//     } else {
//       playSound("wrong");
//       $("body").toggleClass("game-over");
//       setTimeout(function () {
//         $("body").toggleClass("game-over");
//       }, 200);
//       $("#title").text("Game Over, Touch The Screen to Restart");
//       $("#blocker").toggleClass("disabled");
//       startOver();
//     }
//   }
// }
