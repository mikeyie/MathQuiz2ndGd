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
    this.createQuestions(true)
    this.startTimer()
    this.updateImg()
}

var interval
quiz.prototype.startTimer = function(){
    interval = setInterval(function(){tick()},1100)
    function tick() {
        Q.timer--;
        Q.updateImg();
        if (Q.timer === 0) {
            Q.endTest();
        }
    }
}

quiz.prototype.submitAnswer = function(){
    console.log("this.enteredNum = " + this.enteredNum);
    this.questions[this.currentQuestion][2] = this.enteredNum;
    this.currentQuestion++;
    
    var length = this.questions.length;
    var output = "";

    length = this.questions.length;
    console.log("Number of problems = " + length);
    for (var index = 0; index < length; index++) {
        output += this.questions[index] + " | ";
    }
    console.log("output = ", output);
    
    if (this.currentQuestion < 30) {
        this.enteredNum = "";
        this.updateImg();
    }
    else {
        this.endTest();
    }
}

quiz.prototype.createAdditionSets = function() {
    this.additionSets = [];

    // 1  (2)  - even: 1+0,  0+1
    // 2  (3)  - odd:  2+0,  0+2,  1+1
    // 3  (4)  - even: 3+0,  0+3,  2+1,  1+2
    // 4  (5)  - odd:  4+0,  0+4,  3+1,  1+3,  2+2
    // 5  (6)  - even: 5+0,  0+5,  4+1,  1+4,  3+2,  2+3
    // 6  (7)  - odd:  6+0,  0+6,  5+1,  1+5,  4+2,  2+4,  3+3
    // 7  (8)  - even: 7+0,  0+7,  6+1,  2+6,  5+2,  2+5,  4+3,  3+4
    // 8  (9)  - odd:  8+0,  0+8,  7+1,  1+7,  6+2,  2+6,  5+3,  3+5,  4+4
    // 9  (10) - even: 9+0,  0+9,  8+1,  1+8,  7+2,  2+7,  6+3,  3+6,  5+4,  4+5
    // 10 (11) - odd:  10+0, 0+10, 9+1,  1+9,  8+2,  2+8,  7+3,  3+7,  6+4,  4+6,  5+5
    // 11 (12) - even: 11+0, 0+11, 10+1, 1+10, 9+2,  2+9,  8+3,  3+8,  7+4,  4+7,  6+5,  5+6
    /////////////////////////////////////////////////////////////////////////////////////////////
    // 12 (13) - odd:  12+0, 0+12, 11+1, 1+11, 10+2, 2+10, 9+3,  3+9,  8+4,  4+8,  7+5,  5+7,  6+6
    // 13 (14) - even: 13+0, 0+13, 12+1, 1+12, 11+2, 2+11, 10+3, 3+10, 9+4,  4+9,  8+5,  5+8,  7+6,  6+7
    // 14 (15) - odd:  14+0, 0+14, 13+1, 1+13, 12+2, 2+12, 11+3, 3+11, 10+4, 4+10, 9+5,  5+9,  8+6,  6+8,  7+7
    // 15 (16) - even: 15+0, 0+15, 14+1, 1+14, 13+2, 2+13, 12+3, 3+12, 11+4, 4+11, 10+5, 5+10, 9+6,  6+9,  8+7,  7+8
    // 16 (17) - odd:  16+0, 0+16, 15+1, 1+15, 14+2, 2+14, 13+3, 3+13, 12+4, 4+12, 11+5, 5+11, 10+6, 6+10, 9+7,  7+9,  8+8
    // 17 (18) - even: 17+0, 0+17, 16+1, 1+16, 15+2, 2+15, 14+3, 3+14, 13+4, 4+13, 12+5, 5+12, 11+6, 6+11, 10+7, 7+10, 9+8,  8+9
    // 18 (19) - odd:  18+0, 0+18, 17+1, 1+17, 16+2, 2+16, 15+3, 3+15, 14+4, 4+14, 13+5, 5+13, 12+6, 6+12, 11+7, 7+11, 10+8, 8+10, 9+9
    
    // For Sums of n where n is equal to or greater than 10:
    // Both addends have to be single-digit numbers
    // i.e. can’t have 13+2 or 12+3 for sums of 15),
    // except for the following two special cases: 
    //      0 Rule - Need to include n + 0  (Ex: For sums of 15, include 15 + 0)
    //      1 Rule - Need to include (n-1) + 1 (Ex: For sums of 15, include 14 + 1)

    // 1  (2)  - even: 1+0,  0+1
    // 2  (3)  - odd:  2+0,  0+2,  1+1
    // 3  (4)  - even: 3+0,  0+3,  2+1,  1+2
    // 4  (5)  - odd:  4+0,  0+4,  3+1,  1+3,  2+2
    // 5  (6)  - even: 5+0,  0+5,  4+1,  1+4,  3+2,  2+3
    // 6  (7)  - odd:  6+0,  0+6,  5+1,  1+5,  4+2,  2+4,  3+3
    // 7  (8)  - even: 7+0,  0+7,  6+1,  2+6,  5+2,  2+5,  4+3,  3+4
    // 8  (9)  - odd:  8+0,  0+8,  7+1,  1+7,  6+2,  2+6,  5+3,  3+5,  4+4
    // 9  (10) - even: 9+0,  0+9,  8+1,  1+8,  7+2,  2+7,  6+3,  3+6,  5+4,  4+5
    // 10 (11) - odd:  10+0, 0+10, 9+1,  1+9,  8+2,  2+8,  7+3,  3+7,  6+4,  4+6,  5+5
    // 11 (12) - even: 11+0, 0+11, 10+1, 1+10, 9+2,  2+9,  8+3,  3+8,  7+4,  4+7,  6+5,  5+6
    /////////////////////////////////////////////////////////////////////////////////////////////
    // 12 (11) - odd:  12+0, 0+12, 11+1, 1+11, 10+2, 2+10, 9+3,  3+9,  8+4,  4+8,  7+5,  5+7,  6+6
    //                                           X    X 
    // 13 (10) - even: 13+0, 0+13, 12+1, 1+12, 11+2, 2+11, 10+3, 3+10, 9+4,  4+9,  8+5,  5+8,  7+6,  6+7
    //                                           X    X      X    X
    // 14 (9) - odd:  14+0, 0+14, 13+1, 1+13, 12+2, 2+12, 11+3, 3+11, 10+4, 4+10, 9+5,  5+9,  8+6,  6+8,  7+7
    //                                           X    X      X    X      X    X
    // 15 (8) - even: 15+0, 0+15, 14+1, 1+14, 13+2, 2+13, 12+3, 3+12, 11+4, 4+11, 10+5, 5+10, 9+6,  6+9,  8+7,  7+8
    //                                           X    X      X    X      X    X      X    X
    // 16 (7) - odd:  16+0, 0+16, 15+1, 1+15, 14+2, 2+14, 13+3, 3+13, 12+4, 4+12, 11+5, 5+11, 10+6, 6+10, 9+7,  7+9,  8+8
    //                                           X    X      X    X      X    X      X    X      X    X
    // 17 (6) - even: 17+0, 0+17, 16+1, 1+16, 15+2, 2+15, 14+3, 3+14, 13+4, 4+13, 12+5, 5+12, 11+6, 6+11, 10+7, 7+10, 9+8,  8+9
    //                                           X    X      X    X      X    X      X    X      X    X      X    X
    // 18 (5) - odd:  18+0, 0+18, 17+1, 1+17, 16+2, 2+16, 15+3, 3+15, 14+4, 4+14, 13+5, 5+13, 12+6, 6+12, 11+7, 7+11, 10+8, 8+10, 9+9
    //                                           X    X      X    X      X    X      X    X      X    X      X    X      X    X

    // Generate our the sets of problems for each sum (1 thru 18)
    var set;
    var setIndex;
    var indexA;
    var indexB;
    var len;
    
    for (setIndex = 1; setIndex <= 18; setIndex++) {
        set = [];
        len = Math.ceil(setIndex / 2);

        for (indexA = setIndex, indexB = 0; indexB < len; indexA--, indexB++) {
            // For Sums of n where n is equal to or greater than 10:
            // Both addends have to be single-digit numbers
            // i.e. can’t have 13+2 or 12+3 for sums of 15),
            // except for the following two special cases: 
            //      0 Rule - Need to include n + 0  (Ex: For sums of 15, include 15 + 0)
            //      1 Rule - Need to include (n-1) + 1 (Ex: For sums of 15, include 14 + 1)

            if (setIndex < 12 ||
                (indexA < 10 && indexB < 10) ||
                (indexA === 0 || indexA === 1) ||
                (indexB === 0 || indexB === 1)
            ) {
                set.push([(indexA).toString(), (indexB).toString(), undefined]);
                set.push([(indexB).toString(), (indexA).toString(), undefined]);
            }
        }

        if (setIndex % 2 === 0) {
            set.push([(len).toString(), (len).toString(), undefined]);
        }

        this.additionSets[setIndex] = set;
    }
}

quiz.prototype.createQuestions = function(isDebug){
    if (this.arithmetic == "addition") {
        var set;
        var indexA;
        var indexB;
        var setArray;

        this.createAdditionSets();

        //  There are 30 problems in each test.  Here is the breakdown of the types of problems (along with examples for sums of 10):
        //      > 13 of them are "new" 
        //          - at least one problem for each “new” tested sum (2+8, 3+7, 4+6, 5+5, 6+4, 7+3, 8+2)
        //          - The rest are randomly selected from the “new” problems ^ (6 remaining of the “new” would be randomly selected) 
        //      > 2 for the 0 Rule (10+0 and 0+10)
        //      > 2 for the 1 Rule (9+1 and 1+9)
        //      > The other 13 problems are “review” problems (sums of 9, 8, 7, 6, and 5.)

        // Choose the correct "set" of question for the quizNum
        set = this.additionSets[this.quizNum];
        this.questions = [];

    // *** START OF: Fill them out so that we satisfy that the rule of: 13 of them are "new" ***
        // For the resst of the quizes we "multiply" the questions, and then add/subtract randomly from the remaining question
        // 3  (4*3=12) - even: 3+0,  0+3,  2+1,  1+2
        //
        // 4  (5*2=10) - odd:  4+0,  0+4,  3+1,  1+3,  2+2
        // 18 (5*2=10) - odd:  18+0, 0+18, 17+1, 1+17, 16+2, 2+16, 15+3, 3+15, 14+4, 4+14, 13+5, 5+13, 12+6, 6+12, 11+7, 7+11, 10+8, 8+10, 9+9
        //                                               X    X      X    X      X    X      X    X      X    X      X    X      X    X
        // 5  (6*2=12)  - even: 5+0,  0+5,  4+1,  1+4,  3+2,  2+3
        // 17 (6*2=12)  - even: 17+0, 0+17, 16+1, 1+16, 15+2, 2+15, 14+3, 3+14, 13+4, 4+13, 12+5, 5+12, 11+6, 6+11, 10+7, 7+10, 9+8,  8+9
        //                                                X    X      X    X      X    X      X    X      X    X      X    X
        // 6  (7*2=14) - odd:  6+0,  0+6,  5+1,  1+5,  4+2,  2+4,  3+3
        // 16 (7*2=14) - odd:  16+0, 0+16, 15+1, 1+15, 14+2, 2+14, 13+3, 3+13, 12+4, 4+12, 11+5, 5+11, 10+6, 6+10, 9+7,  7+9,  8+8
        //                                               X    X      X    X      X    X      X    X      X    X
        // 7  (8*2=16) - even: 7+0,  0+7,  6+1,  2+6,  5+2,  2+5,  4+3,  3+4
        // 15 (8*2=16) - even: 15+0, 0+15, 14+1, 1+14, 13+2, 2+13, 12+3, 3+12, 11+4, 4+11, 10+5, 5+10, 9+6,  6+9,  8+7,  7+8
        //                                               X    X      X    X      X    X      X    X
        // 8  (9+4=13) - odd:  8+0,  0+8,  7+1,  1+7,  6+2,  2+6,  5+3,  3+5,  4+4
        // 14 (9+4=13) - odd:  14+0, 0+14, 13+1, 1+13, 12+2, 2+12, 11+3, 3+11, 10+4, 4+10, 9+5,  5+9,  8+6,  6+8,  7+7
        //                                               X    X      X    X      X    X
        // 9  (10+3=13) - even: 9+0,  0+9,  8+1,  1+8,  7+2,  2+7,  6+3,  3+6,  5+4,  4+5
        // 13 (10+3=13) - even: 13+0, 0+13, 12+1, 1+12, 11+2, 2+11, 10+3, 3+10, 9+4,  4+9,  8+5,  5+8,  7+6,  6+7
        //                                                X    X      X    X
        // 10 (11+2=13) - odd:  10+0, 0+10, 9+1,  1+9,  8+2,  2+8,  7+3,  3+7,  6+4,  4+6,  5+5
        // 12 (11+2=3)  - odd:  12+0, 0+12, 11+1, 1+11, 10+2, 2+10, 9+3,  3+9,  8+4,  4+8,  7+5,  5+7,  6+6
        //                                                X    X 
        // 11 (12+1=13) - even: 11+0, 0+11, 10+1, 1+10, 9+2,  2+9,  8+3,  3+8,  7+4,  4+7,  6+5,  5+6
        /////////////////////////////////////////////////////////////////////////////////////////////
        var selections = {
            3:  {multiplier: 3,  action: "+", number: 1},
            4:  {multiplier: 2,  action: "+", number: 3},
            18: {multiplier: 2,  action: "+", number: 3},
            5:  {multiplier: 2,  action: "+", number: 1},
            17: {multiplier: 2,  action: "+", number: 1},
            6:  {multiplier: 2,  action: "-", number: 1},
            16: {multiplier: 2,  action: "-", number: 1},
            7:  {multiplier: 2,  action: "-", number: 3},
            15: {multiplier: 2,  action: "-", number: 3},
            8:  {multiplier: 1, action: "+", number: 4},
            14: {multiplier: 1, action: "+", number: 4},
            9:  {multiplier: 1, action: "+", number: 3},
            13: {multiplier: 1, action: "+", number: 3},
            10: {multiplier: 1, action: "+", number: 2},
            12: {multiplier: 1, action: "+", number: 2},
            11: {multiplier: 1, action: "+", number: 1},
        };
        var selection = selections[this.quizNum];

        for (indexA = 0; indexA < selection.multiplier; indexA++) {
            for (indexB = 0; indexB < set.length; indexB++){
                setArray = set[indexB];
                this.questions.push([setArray[0], setArray[1], undefined]);
            }
        }

        if (selection.action === "+") {
            for (indexA = 0; indexA < selection.number; indexA++) {
                setArray = set[randomNum(0, set.length-1)];
                this.questions.push([setArray[0], setArray[1], undefined]);
            }
        }
        else {
            for (indexA = 0; indexA < selection.number; indexA++) {
                this.questions.splice(randomNum(0, this.questions.length-1), 1);
            }
        }
    // *** END OF: Fill them out so that we satisfy that the rule of: 13 of them are "new" ***
    
    // *** 2 for the 0 Rule (10+0 and 0+10)
    // *** 2 for the 1 Rule (9+1 and 1+9)
        // These requirments mean that we'll just pluck the first 4 problems out of the set
        // BUT these are ALREADY in the set from the above logic!!!
        // SHOULD CONFIRM THIS IS REALLY INTENDED?????
        for (indexA = 0; indexA < 4; indexA++) {
            setArray = set[indexA];
            this.questions.push([setArray[0], setArray[1], undefined]);
        }

    // *** The other 13 problems are “review” problems (sums of 9, 8, 7, 6, and 5.)
        // 3:  5  (from 1, 2)
        // 4:  9  (from 1, 2, 3)
        // 5:  14 (from 1, 2, 3, 4)
        // 6:  20 (from 1, 2, 3, 4, 5)
        // 7:  27 (from 1, 2, 3, 4, 5, 6)
        // 8:  35 (from 1, 2, 3, 4, 5, 6, 7)
        // 9:  44 (from 1, 2, 3, 4, 5, 6, 7, 8)
        // 10: 54 (from 1, 2, 3, 4, 5, 6, 7, 8, 9)
        // 11: 65 (from 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        // etc...
        //
        // At this point we have 13 questions + 4 from the 0 & 1 rules for a TOTAL of 17
        // Now we need to get the review problems from the sets below the quizNum
        // For the quizes of "3" & "4", there aren't enough to select from
        // - For "3", get all review questions from the sets of "1 & 2", which is 5, double it = 10, and then randomly add 3 more
        // - For "4", get all review questions from the sets of "1 & 2 & 3", which is 9 and then randomly add 4 more
        // - For the reset, get all review questions from the ALL of the sets, then randonly remove until there is ONLY 13 left
        var reviewSelections = {
            3:  {multiplier: 2, action: "+", number: 3},
            4:  {multiplier: 1, action: "+", number: 4},
            5:  {multiplier: 1, action: "-"},
            6:  {multiplier: 1, action: "-"},
            7:  {multiplier: 1, action: "-"},
            8:  {multiplier: 1, action: "-"},
            9:  {multiplier: 1, action: "-"},
            10: {multiplier: 1, action: "-"},
            11: {multiplier: 1, action: "-"},
            12: {multiplier: 1, action: "-"},
            13: {multiplier: 1, action: "-"},
            14: {multiplier: 1, action: "-"},
            15: {multiplier: 1, action: "-"},
            16: {multiplier: 1, action: "-"},
            17: {multiplier: 1, action: "-"},
            18: {multiplier: 1, action: "-"},

        };
        var reviewSelection = reviewSelections[this.quizNum];
        var maxSet = this.quizNum - 1;

        // Concatenate ALL of the sets up to the maxSet
        var allOfTheSets = [];
        for (indexA = 1; indexA <= maxSet; indexA++ ) {
            set = this.additionSets[indexA];
            for (indexB = 0; indexB < set.length; indexB++) {
                setArray = set[indexB];
                allOfTheSets.push([setArray[0], setArray[1], undefined]);
            }
        }

        /////////// HERE!!!
        if (reviewSelection.multiplier > 1) {
            for (indexA = 0; indexA < reviewSelection.multiplier - 1; indexA++) {
                //allOfTheSets = allOfTheSets.concat(allOfTheSets.slice());
                length = allOfTheSets.length;
                for (indexB = 0; indexB < length; indexB++) {
                    setArray = allOfTheSets[indexB];
                    allOfTheSets.push([setArray[0], setArray[1], undefined]);
                }
            }
        }

        if (reviewSelection.action === "+") {
            var additionalProblems = [];
            set = allOfTheSets.slice();
            for (indexA = 0; indexA < reviewSelection.number; indexA++) {
                var indexOfItem = randomNum(0, set.length-1);
                additionalProblems.push(set[indexOfItem].slice());
                // After we add it get rid of it so that it isn't used again
                set.splice(indexOfItem, 1);
            }

            allOfTheSets = allOfTheSets.concat(additionalProblems);
        }
        else {
            for (indexA = (allOfTheSets.length-1); indexA >= 13; indexA--) {
                allOfTheSets.splice(randomNum(0, allOfTheSets.length-1), 1);
            }
        }

        this.questions = this.questions.concat(allOfTheSets);
    }
    // Subtration Problem Generation
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
    shuffle(this.questions);
    shuffle(this.questions);
    shuffle(this.questions);
    shuffle(this.questions);

    //////////////////////////////////////////////////////////    
    var length = this.questions.length;
    var output = "";

    length = this.questions.length;
    console.log("Number of problems = " + length);
    for (var index = 0; index < length; index++) {
        output += this.questions[index] + " | ";
    }
    console.log("output = ", output);
}

quiz.prototype.endTest = function(){
    this.startable = true
    this.currentState = "finishedTest"
    clearInterval(interval)
    this.timer = 75
    var correctAnswers = 0
    for(i=0;i<30;i++){
        if (this.arithmetic == "addition") {
            console.log(Number(this.questions[i][0]) + " + " + Number(this.questions[i][1]) + " = " + Number(this.questions[i][2]));
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