const beginButton = document.getElementById('begin-btn')
const nextButton = document.getElementById('next-btn')
const exitButton = document.getElementById('exit-btn')
const qCElement = document.getElementById('question-container')
const qElement = document.getElementsByClassName('question')
const displayImage = document.getElementById('mb1')
const answerElement = document.getElementsByClassName('group-btns')
const countdownDisplay = document.getElementById('time-container')
const countdownEl = document.getElementById('countdown')
const timeUpDisplay = document.getElementById('timesUpMessage')

let shuffleQ, currentIndex
let score = 0;

beginButton.addEventListener('click', beginQuiz)
nextButton.addEventListener('click', () => {
    currentIndex++
    nextQ();
})

const startingMinutes = 1;
let time = startingMinutes * 60;
let timeInterval

function beginQuiz(){
    exitButton.classList.add('hide')
    timeUpDisplay.classList.add('hide')
    countdownEl.classList.remove('hide')
    timeInterval = setInterval(updateCountdown, 500);
    beginButton.classList.add('hide')
    qCElement.classList.remove('hide')
    shuffleQ = questions.sort(() => Math.random() - .5)
    currentIndex = 0
    score = 0

    time = startingMinutes * 60;
    clearInterval(timeInterval);
    timeInterval = setInterval(updateCountdown, 500);
    nextQ();
}

function updateCountdown(){
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = minutes + ":" + seconds;
    time--;

    if(minutes == 0 && seconds == 0)
    {
        clearInterval(timeInterval)
        timeUpDisplay.classList.remove('hide')
        showScore();
        qCElement.classList.add('hide')
        exitButton.classList.remove('hide')
    }
}

function nextQ(){
    revealQ(shuffleQ[currentIndex])
}

function revealQ(question){
    qElement[0].innerText = 'Question ' + (currentIndex + 1) + ': ' + question.question;

    if (question.question === ' Who is this NBA Player?') {
        displayImage.classList.remove('hide');
    } else {
        displayImage.classList.add('hide');
    }

    reset();
    
    const shuffleA = [...question.answers].sort(() => Math.random() - 0.5);

    shuffleA.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('group-btns');

        switch (index) {
            case 0:
                button.classList.add('orangeBtn');
                break;
            case 1:
                button.classList.add('cyanBtn');
                break;
            case 2:
                button.classList.add('purpleBtn');
                break;
            case 3:
                button.classList.add('pinkBtn');
                break;
        }

        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerElement[0].appendChild(button)
    });
}

function reset(){
    nextButton.classList.add('hide')
    while(answerElement[0].firstChild){
        answerElement[0].removeChild(answerElement[0].firstChild)
    }
}

function selectAnswer(e){
    const selectButton = e.target
    const correct = selectButton.dataset.correct
    setStatusClass(document.body, correct)

    Array.from(answerElement[0].children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })

    if (correct) {
        score = Math.min(score + 20, 100);
        selectButton.classList.add("right")
    }
    else{
        selectButton.classList.add("wrong")
    }

    if(shuffleQ.length > currentIndex + 1){
        nextButton.classList.remove('hide')
    }
    else{
        clearInterval(timeInterval)
        showScore();
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }
    else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function showScore(){
    reset();
    qElement[0].innerHTML = 'You scored ' + score + ' out of ' + 100 + '!';
    beginButton.innerHTML = "Play Again?";
    beginButton.classList.remove('hide');
    exitButton.classList.remove('hide');
    exitButton.addEventListener("click", function() {
        window.location.href = "chooseQuiz.html";
    });
}

const questions = [
    {
        question: ' Which NBA Player is the all time leading scorer in the NBA?',
        answers: [
            {text: 'LeBron James', correct: true},
            {text: 'Kareem Abdul-Jabbar', correct: false},
            {text: 'Michael Jordan', correct: false},
            {text: 'Kobe Bryant', correct: false}
        ]
    },
    {
        question: ' How many NBA Championships does Michael Jordan have?',
        answers: [
            {text: '6', correct: true},
            {text: '5', correct: false},
            {text: '7', correct: false},
            {text: '8', correct: false}
        ]
    },
    {
        question: ' Who is this NBA Player?',
        answers: [
            {text: 'Muggsy Bogues', correct: true},
            {text: 'Isaiah Thomas', correct: false},
            {text: 'Earl Boykins', correct: false},
            {text: 'Spud Webb', correct: false}
        ]
    },
    {
        question: ' How many NBA teams did Shaq played on in his NBA career?',
        answers: [
            {text: '6', correct: true},
            {text: '5', correct: false},
            {text: '7', correct: false},
            {text: '8', correct: false}
        ]
    },
    {
        question: ' Which NBA player is the most recent in achieving MVP in back-to-back seasons?',
        answers: [
            {text: 'Nikola Jokić', correct: true},
            {text: 'LeBron James', correct: false},
            {text: 'Giannis Antetokounmpo', correct: false},
            {text: 'Stephen Curry', correct: false}
        ]
    }
]