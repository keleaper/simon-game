
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = []; // An array because it is always adding new patterns after the person gives their user clicked pattern
var userClickedPattern = []; // The pattern the user clicks after the game pattern

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function () {
    if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

    //Inside the handler, create a new variable called userChosencolor to store the id of the button that got clicked.
    // Can use this because it is in the function that is using clicked. stores this button that got clicked
    // grabs this (button clicked) attributes id / Grabs the attribute("id") of the button that was clicked
    var userChosenColor = $(this).attr("id");

    //Add the contents of the variable userChosencolor created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColor);

    //In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    playSound(userChosenColor);
    animatePress(userChosenColor);

    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the LAST (aka. -1) answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //Write an if statement inside checkAnswer() to check if the MOST RECENT USER ANSWER (aka. current level) is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
        //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    
    } else {
      //In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");

      //In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      
      //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);


      //Call startOver() if the user gets the sequence wrong. (When you call something it is always a function we created)
      startOver();
    }
}
  

function nextSequence() { // This is always the next button. The one after ...
    userClickedPattern = [];
    //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    //Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
    var randomNumber = Math.floor(Math.random() * 4);

    //Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
    var randomChosenColor = buttonColors[randomNumber];

    //Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
    gamePattern.push(randomChosenColor);

    // Use jQuery to select the button with the same id as the ranodomChosencolor
    // Animate a flash to the button 
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    //Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
    playSound(randomChosenColor);
}

function animatePress(currentColor) {

    // Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    // because the id represent the color and to get the idea of the current color you need the "#" added
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {

    // Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button color selected in step 1.
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Create a new function called startOver().
function startOver() {

    //Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}


