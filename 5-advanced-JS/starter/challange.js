const quizz = (function () {

    const Question = function (question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.printQ = function () {

        console.log(this.question);

        this.answers.forEach((el, index) => {
            console.log(`${index+1}: ${el}`)
        });

        return prompt(`Correct anwser is?`);
    }

    Question.prototype.checkAnswer = function (answer) {

        if (this.correct === parseInt(answer)) {
            console.log(`Correct!`);
            return true;
        } else {
            console.log(`Wrong answer!`);
            return false;
        }
    }

    // let score = 0;

    const questions = [
        new Question(`Am I great?`, [`Yes`, `No`, `Maybe`], 1),
        new Question(`Am I rich?`, [`Yes`, `No`, `Maybe`], 2),
        new Question(`Am I smart?`, [`Yes`, `No`, `Maybe`], 3),
        new Question(`Am I programmer?`, [`Yes`, `No`, `Maybe`], 1)
    ];

    function scoreFn() {
        let score = 0;
        return function (correct) {
            if (correct) {
                score++;
            }
            return score;
        }
    }

    const keepScore = scoreFn();

    function runQuiz() {

        let random = Math.floor(Math.random() * questions.length);

        let userAnswer = questions[random].printQ();

        if (userAnswer === `exit` || userAnswer === null) {
            return;
        }

        score = keepScore(questions[random].checkAnswer(userAnswer));


        console.log(`Your score is: ${score}`);

        console.log(`=================`);

        runQuiz();
    }

    runQuiz();

})();