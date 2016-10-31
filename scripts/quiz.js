function quiz(){
    this.currentState = "choosingTest";
    this.startable = false;
    this.enteredNum = "";
    this.quizNum = 3;
    this.questions = [];
    this.currentQuestion = 0;
    this.passed = false;
    this.correct = 0;
    this.timer = 75;
    this.arithmetic = "addition";

    this.CONSTANTS = {
        SUBTRACTION: "subtraction",
        ADDITION: "addition"
    }
}

quiz.prototype.buttonhandlers = {
    
    tstart: function(bnum){
        elem("n" + bnum).style.backgroundColor = "lightgrey"
    },
    tend: function(bnum){
        elem("n" + bnum).style.backgroundColor = "#595959"
        if (String(Q.enteredNum).length < 2) {
            Q.enteredNum = Number(String(Q.enteredNum) + String(bnum))
            if (Q.currentState == "choosingTest") {
                Q.updateSelf()
            }
            Q.updateImg()
        }
    },
    bstart: function(){
        elem("nb").style.backgroundColor = "pink"
    },
    bend: function(){
        elem("nb").style.backgroundColor = "red"
        Q.enteredNum = String(Q.enteredNum).slice(0, -1)
        if (Q.currentState == "choosingTest") {
            Q.updateSelf()
        }
        Q.updateImg()
    },
    gstart: function(){
        elem("ng").style.backgroundColor = "lightgreen"
    },
    gend: function(){
        elem("ng").style.backgroundColor = "green"
        if (Q.currentState == "inTest") {
            Q.submitAnswer()
        }
    },
    sstart: function(){
        if (Q.startable) {
            elem("gostop").style.backgroundColor = "cyan"
        }
        else if (Q.currentState === "inTest") {
            elem("gostop").style.backgroundColor = "darkred"
        }
    },
    send: function(){
        if (Q.startable) {
            elem("gostop").style.backgroundColor = "darkblue"
            if (Q.currentState == "choosingTest") {
                Q.quizNum = Q.enteredNum
            }
            Q.startQuiz()
        }
        else if (Q.currentState === "inTest") {
            elem("gostop").style.backgroundColor = "darkblue"
            Q.endTest()
            Q.updateImg()
        }
    },
    ststart: function(){
        if (Q.currentState == "finishedTest" || Q.currentState == "choosingTest") {
            elem("selecttest").style.backgroundColor = "orange"
        }
    },
    stend: function(){
        if (Q.currentState == "finishedTest" || Q.currentState == "choosingTest") {
            elem("overlay").style.visibility = "visible"
            elem("selecttest").style.backgroundColor = "darkorange"
            Q.currentState = "choosingTest"
            Q.enteredNum = ""
            Q.startable = "false"
            Q.currentQuestion = this.quizNum = ""
            Q.updateSelf()
            Q.updateImg()
        }
    }
    
}

quiz.prototype.updateSelf = function(){
    if (this.arithmetic == "addition") {
        if (this.enteredNum < 3 || this.enteredNum > 20) {
            this.startable = false
        }
        else {
            this.startable = true
        }
    }
    else {
        if (this.enteredNum < 5 || this.enteredNum > 18) {
            this.startable = false
        }
        else {
            this.startable = true
        }
    }
}

quiz.prototype.updateImg = function(){
    var resultstext = elem("resultstext");
    var timer = elem("timer");
    var toptext = elem("toptext");
    var gostop = elem("gostop");
    var selecttest = elem("selecttest");
    
    if (this.currentState == "choosingTest") {
        resultstext.style.borderColor = "black"
        timer.style.backgroundColor = "lightgrey"
        if (this.arithmetic == "addition") {
            toptext.style.fontSize = "8vh"
            toptext.innerHTML = "Sums of " + this.enteredNum
        }
        else {
            toptext.style.fontSize = "6vh"
            toptext.innerHTML = "Minuends of " + this.enteredNum
        }
        resultstext.style.backgroundColor = "white"
        elem("gostop").innerHTML = "Start"
        elem("selecttest").style.backgroundColor = "darkorange"
        resultstext.innerHTML = "Enter a test number"
        
        if (!this.startable) {
            elem("gostop").style.backgroundColor = "grey"
        }
        else {
            elem("gostop").style.backgroundColor = "darkblue"
        }
    }
    if (this.currentState == "inTest") {
        resultstext.style.borderColor = "black"
        toptext.style.fontSize = "8vh"
        if (this.timer < 4) {
            timer.style.backgroundColor = "red"
        }
        else if (this.timer < 10) {
            timer.style.backgroundColor = "yellow"
        }
        else {
            timer.style.backgroundColor = "lightgrey"
        }
        timer.innerHTML = this.timer
        resultstext.style.backgroundColor = "white"
        elem("gostop").style.backgroundColor = "red"
        elem("gostop").innerHTML = "Stop"
        elem("selecttest").style.backgroundColor = "grey"
        resultstext.innerHTML = "Question " + (this.currentQuestion + 1) + "/30"
        
        if (this.arithmetic=="addition") {
            toptext.innerHTML = this.questions[this.currentQuestion][0] + "+" + this.questions[this.currentQuestion][1] + "=" + this.enteredNum
        }
        else {
            toptext.innerHTML = this.questions[this.currentQuestion][0] + "-" + this.questions[this.currentQuestion][1] + "=" + this.enteredNum
        }
    }
    if (this.currentState == "finishedTest") {
        toptext.style.fontSize = "8vh"
        elem("timer").style.backgroundColor = "lightgrey"
        elem("gostop").style.backgroundColor = "darkblue"
        elem("gostop").innerHTML = "Retry"
        elem("selecttest").style.backgroundColor = "darkorange"
        
        if (this.arithmetic === "addition") {
            if (this.passed == true) {
                resultstext.innerHTML = this.correct + "/30 (Sums of " + this.quizNum + ")"
                resultstext.style.backgroundColor = "lightgreen"
                resultstext.style.borderColor = "green"
                toptext.innerHTML = "Good Job!"
            }
            else {
                resultstext.innerHTML = this.correct + "/30 (Sums of " + this.quizNum + ")"
                resultstext.style.backgroundColor = "pink"
                resultstext.style.borderColor = "red"
                toptext.innerHTML = "So Close!"
            }
        }
        else {
            if (this.passed == true) {
                resultstext.innerHTML = this.correct + "/30 (Minuends of " + this.quizNum + ")"
                resultstext.style.backgroundColor = "lightgreen"
                resultstext.style.borderColor = "green"
                toptext.innerHTML = "Good Job!"
            }
            else {
                resultstext.innerHTML = this.correct + "/30 (Minuends of " + this.quizNum + ")"
                resultstext.style.backgroundColor = "pink"
                resultstext.style.borderColor = "red"
                toptext.innerHTML = "So Close!"
            }
        }
    }
}

quiz.prototype.startQuiz = function(){
    this.questions = []
    this.startable = false
    this.currentQuestion = 0
    this.enteredNum = ""
    this.currentState = "inTest"
    this.createQuestions()
    this.startTimer()
    this.updateImg()
}

var interval
quiz.prototype.startTimer = function(){
    interval = setInterval(function(){tick()},1100)
    function tick() {
        Q.timer--
        Q.updateImg()
        if (Q.timer === 0) {
            Q.endTest()
        }
    }
}

quiz.prototype.submitAnswer = function(){
    this.questions[this.currentQuestion][2] = this.enteredNum
    this.currentQuestion++
    
    if (this.currentQuestion < 30) {
        this.enteredNum = ""
        this.updateImg()
    }
    else {
        this.endTest()
    }
}


quiz.prototype.createQuestions = function(){
    if (this.arithmetic == "addition") {
        for(i=0; i<=Math.ceil(this.quizNum/2); i++){
            if (randomNum(1,2) === 2){
                this.questions.push([this.quizNum - i, i, undefined])
            }
            else {
                this.questions.push([i, this.quizNum - i, undefined])
            }
            this.questions.push([this.quizNum - i, i, undefined])
        }
        for(i=0; i<12-Math.ceil(this.quizNum/2); i++){
            var random = randomNum(1,this.quizNum)
            this.questions.push([this.quizNum - random, random, undefined])
        }
        for(i=0; i<17; i++){
            if (this.quizNum<5) {
                var randomQuiz = randomNum(1,this.quizNum)
            }
            else {
                var randomQuiz = randomNum(this.quizNum - 4,this.quizNum-1)
            }
            var random = randomNum(0,randomQuiz-1)
            this.questions.push([randomQuiz - random, random, undefined])
        }
    }
    else {
        var possibleQuestions = []
        var otherQuestions = []
        
        //create possible questions
        for(i=0; i<this.quizNum; i++){
            if (this.quizNum - i < 10 && i < 10) {
                possibleQuestions.push([this.quizNum, i, undefined])
            }
            else if (i==0 || i==1 || (this.quizNum == 20 && i == 10)) {
                possibleQuestions.push([this.quizNum, i, undefined])
            }
        }
        //create other questions
        for (i=0; i<this.quizNum; i++){
            if (i>10 && i < this.quizNum) {
                for (x=0;x<this.quizNum;x++) {
                    if (this.quizNum - x < 10 && x < 10){
                        otherQuestions.push([i,x,undefined])
                    }    
                }
            }
        }
        
        //create questions
        for (i=0; i<possibleQuestions.length; i++) {
            this.questions.push(possibleQuestions[i])
        }
        for (i=0; i<30-possibleQuestions.length; i++) {
            if (randomNum(0,1) === 1 || otherQuestions.length === 0) {
                var nextQ = possibleQuestions[randomNum(0,possibleQuestions.length-1)];
                this.questions.push(nextQ);
            }
            else {
                this.questions.push(otherQuestions[randomNum(0,otherQuestions.length-1)]) 
            }
        }
    }
    shuffle(this.questions)
}

quiz.prototype.endTest = function(){
    this.startable = true
    this.currentState = "finishedTest"
    clearInterval(interval)
    this.timer = 75
    var correctAnswers = 0
    for(i=0;i<30;i++){
        if (this.arithmetic == "addition") {
            if (Number(this.questions[i][0]) + Number(this.questions[i][1]) == Number(this.questions[i][2])) {
                correctAnswers++
            }
        }
        else {
            if (Number(this.questions[i][0]) - Number(this.questions[i][1]) == Number(this.questions[i][2])) {
                correctAnswers++
            }
        }
    }
    
    if (correctAnswers > 24) {
        this.passed = true
    }
    else {
        this.passed = false
    }
    this.correct = correctAnswers
    this.updateImg()
}