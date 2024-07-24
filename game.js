
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

/*A way to keep track of whether if the game has started or not, 
  so you need to only call nextSequence() on the first keypress.*/
var started = false;

/*A new variable called level and start at level 0.*/
var level = 0;

/*jQuery to detect when a keyboard key has been pressed, 
  when that happens for the first time, call nextSequence().
  A way to keep track of whether if the game has started
  or not, so you only call nextSequence() on the first keypress.*/
$(document).keypress(function() {
  if (!started) {
    /*The h1 title starts out saying "Press A Key to Start", 
    when the game has started, change this to say "Level 0".*/
    $("#level-title").text("Level " + level);
    startGame();
    started = true;
  }
});


//jQuery to detect when any of the buttons are clicked and trigger a handler function.
/*inside the handler, create a new variable called userChosenColour 
       to store the id of the button that got clicked.
      --> So if the Green button was clicked, userChosenColour will equal its id which is "green".*/ 
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  /*Add the contents of the variable userChosenColour created in 
  　step 2 to the end of this new userClickedPattern*/
  userClickedPattern.push(userChosenColour);

  /*In the same way the sound is played in nextSequence() , when a user clicks on a button, 
    the corresponding sound should be played. 
    e.g if the Green button is clicked, then green.mp3 should be played.*/
  playSound(userChosenColour);
  //Add an effect on the clicked button.
  animatePress(userChosenColour);

  /**Call checkAnswer() after a user has clicked and chosen their answer, 
  *  passing in the index of the last answer in the user's sequence. */
  checkAnswer(userClickedPattern.length-1);
});

//Inside game.js create a new function called nextSequence()
function startGame() {
  /**Once nextSequence() is triggered, reset the userClickedPattern 
   * to an empty array ready for the next level. */
  userClickedPattern = [];

  /*Inside nextSequence(), increase the level by 1 every time nextSequence() is called.*/
  level++;

  /*Inside nextSequence(), update the h1 with this change in the value of level.*/
  $("#level-title").text("Level " + level);

  /*Inside the new function generate a new random number between 0 and 3, 
    and store it in a variable called randomNumber*/
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//A new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {
  //jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");
  //Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/**A new function called checkAnswer(), it should take one input with the name currentLevel */
function checkAnswer(currentLevel) {
  /**An if statement inside checkAnswer() to check if the most recent user answer 
   * is the same as the game pattern. If so then log "success", otherwise log "wrong". */
  if(  gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("SUCCESS");
    /**If the user got the most recent answer right in step 3, 
     * then check that they have finished their sequence with another if statement. */
    if( userClickedPattern.length === gamePattern.length ){
      /**Call nextSequence() after a 1000 millisecond delay. */
      setTimeout(function () {
        startGame();
      }, 1000);
    }
  } else{
    console.log("WRONG");
    /**Play a sound if the user got one of the answers wrong. */
    playSound("wrong");

    /**Apply a class to the body of the website when 
     * the user gets one of the answers wrong and then remove it after 200 milliseconds. */
    $(".row").addClass("game-over");
   
    setTimeout(function() {
      $(".row").removeClass("game-over");
    }, 200);

    /*Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.*/
    $("#level-title").text("Game Over, Press Any Key to Restart");

    /**Call startOver() if the user gets the sequence wrong. */
    startOver();
  }
}

/**A new function called startOver(). */
/**Inside this function, reset the values of level, gamePattern and started variables. */
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}






