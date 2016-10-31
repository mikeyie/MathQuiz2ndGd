window.onload = function(){
    setupPage();
    createQuiz();
    Q.updateSelf();
    Q.updateImg();
    attachEvents();
}

window.addEventListener('resize', function(event){
  setupPage()
});

function attachEvents() {
    var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
    var eventMap;
    
    if (supportsTouch) {
        eventMap = {
            start: "ontouchstart",
            end: "ontouchend"
        };
    }
    else {
        eventMap = {
            start: "onmousedown",
            end: "onmouseup"
        };        
    }
    
    var n0 = elem('n0');
    var n1 = elem('n1');
    var n2 = elem('n2');
    var n3 = elem('n3');
    var n4 = elem('n4');
    var n5 = elem('n5');
    var n6 = elem('n6');
    var n7 = elem('n7');
    var n8 = elem('n8');
    var n9 = elem('n9');
    var nb = elem('nb');
    var ng = elem('ng');
    
    n0[eventMap.start] = function(){Q.buttonhandlers.tstart(0);};
    n1[eventMap.start] = function(){Q.buttonhandlers.tstart(1);};
    n2[eventMap.start] = function(){Q.buttonhandlers.tstart(2);};
    n3[eventMap.start] = function(){Q.buttonhandlers.tstart(3);};
    n4[eventMap.start] = function(){Q.buttonhandlers.tstart(4);};
    n5[eventMap.start] = function(){Q.buttonhandlers.tstart(5);};
    n6[eventMap.start] = function(){Q.buttonhandlers.tstart(6);};
    n7[eventMap.start] = function(){Q.buttonhandlers.tstart(7);};
    n8[eventMap.start] = function(){Q.buttonhandlers.tstart(8);};
    n9[eventMap.start] = function(){Q.buttonhandlers.tstart(9);};
    nb[eventMap.start] = function(){Q.buttonhandlers.bstart();};
    ng[eventMap.start] = function(){Q.buttonhandlers.gstart();};

    n0[eventMap.end] = function(){Q.buttonhandlers.tend(0);};
    n1[eventMap.end] = function(){Q.buttonhandlers.tend(1);};
    n2[eventMap.end] = function(){Q.buttonhandlers.tend(2);};
    n3[eventMap.end] = function(){Q.buttonhandlers.tend(3);};
    n4[eventMap.end] = function(){Q.buttonhandlers.tend(4);};
    n5[eventMap.end] = function(){Q.buttonhandlers.tend(5);};
    n6[eventMap.end] = function(){Q.buttonhandlers.tend(6);};
    n7[eventMap.end] = function(){Q.buttonhandlers.tend(7);};
    n8[eventMap.end] = function(){Q.buttonhandlers.tend(8);};
    n9[eventMap.end] = function(){Q.buttonhandlers.tend(9);};
    nb[eventMap.end] = function(){Q.buttonhandlers.bend();};
    ng[eventMap.end] = function(){Q.buttonhandlers.gend();};

    var gostop = elem('gostop');
    gostop[eventMap.start] = Q.buttonhandlers.sstart;
    gostop[eventMap.end] = Q.buttonhandlers.send;
    
    var selecttest = elem('selecttest');
    selecttest[eventMap.start] = Q.buttonhandlers.ststart;
    selecttest[eventMap.end] = Q.buttonhandlers.stend;
}

function setupPage(){
    //remove margin
    document.body.style.margin = 0
    
    //resize page container
    var pageWidth = window.innerWidth
    var pageHeight = window.innerHeight
    
    var width
    var height
    if (pageWidth < pageHeight) {
        width = (window.innerHeight/4)*3
        height = window.innerHeight-10
    }
    else {
        width = (window.innerHeight/4)*3
        height = window.innerHeight-10
    }
    
    elem("pagecontainer").style.width = width + "px"
    elem("pagecontainer").style.height = height + "px"
}

var Q;
function createQuiz(){
    Q = new quiz();
}

function startQuiz(arithmetic, backgroundColor) {
    elem("overlay").style.visibility = "hidden";
    Q.arithmetic = arithmetic;
    elem("pagecontainer").style.background = backgroundColor;
    Q.updateImg();
}

function startAddition(){
    startQuiz(Q.CONSTANTS.ADDITION, "lightblue");
}

function startSubtraction(){
    startQuiz(Q.CONSTANTS.SUBTRACTION, "A4FCA0");
}