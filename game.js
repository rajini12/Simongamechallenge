var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
  });

//alert("HELL0");

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random()*4);
    console.log(randomNumber);
    
    //buttonColours=["red","blue","green","yellow"];
    randomChosenColor = buttonColours[randomNumber];

    console.log(randomChosenColor);

    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);



    playSound(randomChosenColor)
    
}
//nextSequence();

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
   

//$("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
  


