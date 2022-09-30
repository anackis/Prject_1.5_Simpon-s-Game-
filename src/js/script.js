var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

    // Detect keyboard press to start the game 
    $(document).keydown(function() {
        if (!started) {
            nextSequence();
            $("h1").text("Level " + level);
            started = true;
        }
    })

    // This is start of the game 
    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("h1").text("Level " + level);
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

        $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        

        var audio = new Audio("sounds/" + buttonColours[randomNumber] + ".mp3");
        audio.play();
    }

    // Detect player's color
    $(".btn").click(function(e) {
        userChosenColour = e.target.id ;
        userClickedPattern.push(userChosenColour);
        var audioforclick = new Audio("sounds/" + userChosenColour + ".mp3");
        audioforclick.play();

        var activeButton = $("." + userChosenColour);
        activeButton.addClass("pressed");
        setTimeout(function() {
            activeButton.removeClass("pressed");
        }, 100);

        // Important !
        checkAnswer(userClickedPattern.length-1);
    })

    // Check Players answer 
    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            console.log("success");
            if (userClickedPattern.length === gamePattern.length){

                setTimeout(function () {
                  nextSequence();
                }, 1000);
        
              }
        } else {
            $("h1").text("Game Over, Max LVL: " + level + ", Press Any Key to Restart :)");
            var gameover = new Audio("sounds/wrong.mp3");
            gameover.play();

            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 100);
            
            
            startOver();
            
        }
    }


    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
        userClickedPattern = [];
    }























