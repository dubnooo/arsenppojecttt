document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "де тут AKR ?",
            answers: [
                "https://cs-love.net/uploads/posts/csgo_ak47.jpg", 
                "https://cs-love.net/uploads/as_csgo_1.jpg", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_A-xyTPmCLWOIUBdj4j3NNZrJOPB3qx_HDA&s", 
                "https://pixel-system.kh.ua/wp-content/uploads/2025/08/systemni-vymohy-cs-2_-minimalni-ta-rekomendovani-parametry.jpg",
            ],
            correct: 0,
            isImageQuiz: true
        },
        {
            question: "де тут ABM ?",
            answers: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc4PjhGqyGXzCStt7YscHb0yAIFSLou9o5PQ&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSftNRsUkUI7qrp6KuBpubAqzpgETdpL1hWGQ&s",
                "https://images.steamusercontent.com/ugc/2155594875909500683/907F87987F6FC7708542A9DD8D6A3E40D9D68D21/", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCgoRSa1pvOrFbFpoJEYrahg-76QVFvfTLNw&s"  
            ],
            correct: 2,
            isImageQuiz: true
        },
        {
            question: "де тут M4 ?",
            answers: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIiHHfki3yiiGwru0pSKlDG6SUJs02v2hQAg&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQexcfUl7DQ7b1he2c71dFzdKVnsl3meZk_Q&s", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVkelost4kNwgrgEYiBcyF4mb4EkIMORIy0w&s", 
                "https://imag.malavida.com/mvimgbig/download-fs/counter-strike-2-38011-10.jpg"  
            ],
            correct: 0,
            isImageQuiz: true
        },
        {
            question: "де тут M60?",
            answers: [
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUX-nJ-KXIik0ONRiRRrJnaXamtX5WwhTQTg&s", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8iNL7xv9YXS0BGwfo8BOIGvj4m2SyB8vegw&s", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvuXvVWJyMSNiHEJsdkm2xobB3MDl5VBNQcw&s", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSftNRsUkUI7qrp6KuBpubAqzpgETdpL1hWGQ&s"  
            ],
            correct: 1,
            isImageQuiz: true
        },
        {
            question: "ЯКЕ ?",
            answers: [
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQckWFV8Tru33PYQCq1bsucZWr_1XEkiUy9pQ&s", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQckWFV8Tru33PYQCq1bsucZWr_1XEkiUy9pQ&s", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQckWFV8Tru33PYQCq1bsucZWr_1XEkiUy9pQ&s", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQckWFV8Tru33PYQCq1bsucZWr_1XEkiUy9pQ&s" 
            ],
            correct: 0,
            isImageQuiz: true
        }
    ];

    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const timerDisplay = document.querySelector('#timer');
    const scoreL = document.querySelector('#score-display');
    const finalScoreDisplay = document.querySelector('#final-score');

    let questionIndex = 0;
    let score = 0;
    let timer = 15;
    let interval;

    function showQuestion(question) {
        clearInterval(interval);
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;

        question.answers.forEach((answer, i) => {
            const button = document.createElement('button');
            button.classList.add('answer-btn');

            if (question.isImageQuiz) {
                const img = document.createElement('img');
                img.src = answer;
                button.appendChild(img);
                button.classList.add('image-option');
            } else {
                button.innerText = answer;
            }

            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);
        });
    }

    function checkAnswer(button, i) {
        clearInterval(interval);
        const correct = questions[questionIndex].correct;
        
        if (i === correct) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }

        document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
        setTimeout(nextQuestion, 1000);
    }

    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    function showResult() {
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${accuracy}%`;
        finalScoreDisplay.innerText = score;
    }

    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `Час: ${timer}`;
        scoreL.innerText = `Бали: ${score}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        showQuestion(questions[questionIndex]);
    }

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
});

function createDollar() {
    const container = document.getElementById('money-container');
    const dollar = document.createElement('div');
    
    dollar.innerText = '💵'; // Можна замінити на '💰' або '💸'
    dollar.classList.add('dollar');
    
    // Випадкова позиція від 0 до 100% ширини екрана
    dollar.style.left = Math.random() * 100 + 'vw';
    
    // Випадкова тривалість падіння від 3 до 7 секунд
    const duration = Math.random() * 4 + 3;
    dollar.style.animationDuration = duration + 's';
    
    // Випадковий розмір (щоб була перспектива)
    dollar.style.fontSize = Math.random() * 20 + 20 + 'px';

    container.appendChild(dollar);

    // Видаляємо елемент після завершення анімації, щоб не перевантажувати пам'ять
    setTimeout(() => {
        dollar.remove();
    }, duration * 1000);
}


function createDollar() {
    const container = document.getElementById('money-container');
    const dollar = document.createElement('div');
    
    dollar.innerText = '🎮'; // Можна замінити на '💰' або '💸'
    dollar.classList.add('dollar');
    
    // Випадкова позиція від 0 до 100% ширини екрана
    dollar.style.left = Math.random() * 100 + 'vw';
    
    // Випадкова тривалість падіння від 3 до 7 секунд
    const duration = Math.random() * 4 + 3;
    dollar.style.animationDuration = duration + 's';
    
    // Випадковий розмір (щоб була перспектива)
    dollar.style.fontSize = Math.random() * 20 + 20 + 'px';

    container.appendChild(dollar);

    // Видаляємо елемент після завершення анімації, щоб не перевантажувати пам'ять
    setTimeout(() => {
        dollar.remove();
    }, duration * 1000);
}

// Запускаємо створення доларів кожні 300 мс
setInterval(createDollar, 300);






