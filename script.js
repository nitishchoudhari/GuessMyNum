'use strict';

// let secretNum = Math.floor(Math.random() * 20) + 1;


let score,  guessCount, isPlaying, secretNum;
let highScore = 0;

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
}

const reset = function(){ 
    document.querySelector('.guess').disabled = false;
    secretNum = Math.floor(Math.random() * 20) + 1;
    guessCount = 1;
    isPlaying = true;
    displayMessage('Start guessing...');
    score = 20;
    document.querySelector('.score').textContent = score;
    document.body.style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.number').textContent = '?'
    document.querySelector('.guesses').textContent = 'Previous Guess:';
}

reset();


let check = document.querySelector('.check');
check.addEventListener('click', checkGuess);

function checkGuess() {
    if(isPlaying){
    console.log(isPlaying);    
    let guessValue = Number(document.querySelector('.guess').value);
    if (!guessValue) {
        displayMessage('⛔ Not a Number');
    }
    else if (guessValue !== secretNum) {
        if (score > 1) {
            if (guessCount === 1) {
                document.querySelector('.guesses').textContent = 'Previous Guess: '
            }
            document.querySelector('.guesses').textContent += guessValue + ' ';
            displayMessage((guessValue > secretNum) ? '📈 Too High' : '📉 Too Low');
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage('💥You Lost the Game');
            document.querySelector('.score').textContent = 0;
            document.body.style.backgroundColor = 'red';
        }
    } else if (guessValue === secretNum) {
        displayMessage('🎉 Congratulations You Win');
        document.body.style.backgroundColor = 'green';
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('.number').textContent = secretNum;
        document.querySelector('.guess').disabled = true; 
        isPlaying = false;
        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
    }
    guessCount++;
    document.querySelector('.guess').value = '';
    document.querySelector('.guess').focus();
    }
}

document.querySelector('.again').addEventListener('click', reset);

