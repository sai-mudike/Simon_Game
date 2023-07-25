let colors = ["red", "blue", "green", "orange"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let count = 0;
let score = 0;

$("#count").on("click", function () {
    if (!started) {
        $("#count").fadeIn(50).fadeOut(50).fadeIn(50);
        $(".score").text(`Score ${score}`);
        $("#count").text(`${count}`)
        setTimeout(() => nextSequence(), 190)
        started = true;
    }
})

$(".color-part").on("click", function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playAudio(userChosenColor);
    addShadow(userChosenColor);
    checkAnswer(userClickedPattern.length);
})
function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColorChosen = colors[randomNumber];
    playAudio(randomColorChosen);
    $("#" + randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);

    gamePattern.push(randomColorChosen);

    count++;
    $(".score").text(`Score ${score}`)
    $("#count").text(`${count}`)
    score += 2;

}

function playAudio(element) {
    let audio = new Audio(`./sounds/${element}.mp3`);
    audio.play();

}
function addShadow(element) {
    $("#" + element).addClass("pressed");
    setTimeout(() => $("#" + element).removeClass("pressed"), 150);

}
function startOver() {
    count = 0;
    score = 0;
    gamePattern = [];
    started = false;

}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => nextSequence(), 1000);
        }

    }
    else {

        playAudio("wrong");
        $(".score").html("Game Over, Press <strong>Restart</strong> to Restart")
        $("#count").html("<strong>Retry</strong>");

        $(".wrapper").addClass("wrong");
        setTimeout(() => $(".wrapper").removeClass("wrong"), 200);
        startOver();
        console.log("wrong");
    }

}

