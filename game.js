var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



$(document).keydown(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
       console.log("success");
       if(userClickedPattern.length === gamePattern.length){
           setTimeout(nextSequence(), 1000);
       }
       
    }
    else{
       console.log("wrong");
       playSound("wrong");

       $("body").addClass("game-over");

       setTimeout(function(){
           $("body").removeClass("game-over");
       }, 200);
       
       startOver();
       $("h1").text("Game Over, Press Any Key to Restart");
   
    }
   }

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);

    console.log(gamePattern);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}



function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


