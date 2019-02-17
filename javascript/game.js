var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var words = ['RECESS', 'ANIMANIACS', 'TRANSFORMERS', 'POKEMON', 'DOUG', 'DEXTERS LABORATORY', 'HEY ARNOLD', 'KIM POSSIBLE', 'POWERPUFF GIRLS', 'SAMURAI JACK', 'LOONEY TUNES', 'SCOOBY DOO', 'BATMAN', 'CATDOG', 'PEPPER ANN', 'SUPERMAN', 'CARE BEARS', 'MY LITTLE PONY', 'DUCKTALES', 'TALESPIN', 'ROCKOS MODERN LIFE', 'RUGRATS', 'THE ANGRY BEAVERS'];
var lives = 12;
var winCounter = 0;
var loseCounter = 0;
var messages = {
    win: 'Awesome!!! You won!',
    lose: 'You lose. Game over.',
    guessed: 'You guessed that letter already! Try again.',
    validLetter: 'Enter a letter from A - Z',
}
var isLetter = false;
var alreadyGuessed = false;
var lettersGuessed = [];
var guesses = 0;
var currentWord;
var hiddenWord = [];
var rightLetter = false;
var winnerWinner = true;
var wordInt;
//Music
var dir = 'music/';
var playlist = ['Recess', 'Animaniacs', 'Transformers', 'Pokemon', 'Doug', 'DexsLab', 'Hey-Arnold', 'KP', 'PPG', 'Samurai-Jack', 'LooneyTunes', 'ScoobyDoo', 'Batman', 'CatDog', 'PepperAnn', 'Superman', 'CareBears', 'MLP', 'DuckTales', 'Talespin', 'RockoModLife', 'Rugrats', 'AngryBeavers'];
var ext = '.mp3';
var audio = new Audio();

function newGame() {
    wordInt = Math.floor((Math.random() * words.length));
    currentWord = words[wordInt];
    console.log(currentWord);

    if (hiddenWord.length !== currentWord.length) {
        hiddenWord = [];
    }

    //replace characters with blanks
    for (var i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === " ") {
            hiddenWord[i] = "  ";
        } else {
            hiddenWord[i] = (" _ ");
        }
    }

    $('#hiddenWord').html(hiddenWord);
}

//Records keyboard input
document.onkeyup = function(event) {
    var userGuess = String.fromCharCode(event.keyCode).toUpperCase();
    var enter = (event.keyCode);

    audio.pause();
    //Press Enter to start Game
    if (enter == 13) {
        newGame();
    }

    //Check to see if letter, if not send message: validLetter
    for (var i = 0; i < alphabet.length; i++) {
        if (userGuess === alphabet.charAt(i)) {
            isLetter = true;
        }
    }

    if (isLetter == false && enter != 13) {
        $('#messages').html(messages.validLetter);
    }

    //If letter was guessed already send message: guessed
    for (var i = 0; i < lettersGuessed.length; i++) {
        if (userGuess === lettersGuessed[i]) {
            alreadyGuessed = true;
        }
    }

    //If already in the clue, then returns alert saying guessed already
    for (var i = 0; i < hiddenWord.length; i++) {
        if (userGuess == hiddenWord[i]) {
            alreadyGuessed = true;
        }
    }

    if (alreadyGuessed == true) {
        $('#messages').html(messages.guessed);
    }

    //Checks for letter match and inserts into hiddenWord array
    for (var i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === userGuess) {
            hiddenWord[i] = currentWord[i];
            rightLetter = true;
        }
    }

    //Pushes letters guess into an array and takes away a life for wrong letter. 
    if (isLetter == true && alreadyGuessed == false && rightLetter == false) {
        lettersGuessed.push(userGuess);
        lives--;
        $('#lives').html(lives);
    }

    $('#lettersGuessed').html(lettersGuessed);
    $('#hiddenWord').html(hiddenWord);

    //When out of lives - user loses and counter goes up
    if (lettersGuessed.length == 12) {
        $('#messages').html(messages.lose);
        lettersGuessed = [];
        $('#lettersGuessed').html(lettersGuessed);
        loseCounter++;
        $('#loseCounter').html(loseCounter);
        lives = 12;
        newGame();
    }

    //Resets booleans between keystrokes.
    rightLetter = false;
    isLetter = false;
    alreadyGuessed = false;

    //Asks if the user has won
    if (enter != 13) {
        win();
    }
}

function win() {

    for (var i = 0; i < currentWord.length; i++) {
        if (hiddenWord[i] == " _ ") {
            winnerWinner = false;
        }
    }

    if (winnerWinner == true) {
        $('#messages').html(messages.win);

        //plays music after you win to the corresponding word
        for (var i = 0; i < playlist.length; i++) {
            if (wordInt === i) {
                audio.src = dir + playlist[i] + ext;
                audio.play();
            }
        }

        winCounter++;
        $('#winCounter').html(winCounter);
        lettersGuessed = [];
        $('#lettersGuessed').html(lettersGuessed);
        lives = 12;
        $('#lives').html(lives);

        newGame();
    }

    winnerWinner = true;
}
