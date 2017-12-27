'use strict'

var cards = [
    'fa-wechat', 'fa-wechat',
    'fa-youtube-play', 'fa-youtube-play',
    'fa-steam-square', 'fa-steam-square',
    'fa-windows', 'fa-windows',
    'fa-instagram', 'fa-instagram',
    'fa-github', 'fa-github',
    'fa-linkedin', 'fa-linkedin',
    'fa-tumblr', 'fa-tumblr'
];
var steps = 0;
var opencards = [];
var samegroupnumbers = 0;
var twostars = 60;
var onestar = 30;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
shuffle(cards);

function afterClick(domDiv) {
    var i = domDiv.getAttribute('data-index');
    domDiv.classList.add(cards[i - 1]);
    console.log(i);
    steps++;
    document.getElementById('steps').innerHTML = steps;
    startTime();
    cardCheck(i - 1);
}

document.getElementById('game-interface').addEventListener('click', function(event) {
    afterClick(event.target);
},false);

//计时器
var time = 90;
var j = true;
function showTime() {  
    time -= 1;  

    document.getElementById('show-time').innerHTML = `Time: ${time} s`;  

    removestars();

    if (time === 0) {  
        alert('Times up');
        window.location.reload();
    }    

    var t = setTimeout('showTime()',1000);  

    if (samegroupnumbers === 8) {
        stopTime(t);
        document.getElementById('win-dialog').showModal();
        playOfTheGame();
    }
}  

var removestarnode = document.getElementsByClassName('fa fa-star');
function removestars() {
    if (time === twostars || time === onestar) {
        removestarnode[0].classList.remove('fa-star');
    }
}

function startTime() {
    if (j) {
        j = false;
        showTime();
    }
}

function stopTime(t) {
    clearTimeout(t);
}

//卡片匹配
function cardCheck(index) {
    opencards.push(index);
    
    if (opencards.length === 2 ) {
        if (opencards[0] === opencards[1]) {
            opencards.pop();
        } else {
            var opencardscopy = opencards.slice(0);
            isSameCard(index, opencardscopy);
            opencards.splice(0, 2);
        }
    }
}

function isSameCard(index, array) {
    var samecard1 = cards[array[0]];
    var samecard2 = cards[array[1]];
    
    if (samecard1 === samecard2) {
        document.getElementById('game-interface').getElementsByTagName('div')[array[0]].addEventListener('click',function(event) {
            event.stopPropagation();
        },false);
        document.getElementById('game-interface').getElementsByTagName('div')[array[1]].addEventListener('click',function(event) {
            event.stopPropagation();
        },false);
        samegroupnumbers++;
    } else {
        setTimeout(function() {
            document.getElementById('game-interface').getElementsByTagName('div')[array[0]].classList.remove(samecard1);
            document.getElementById('game-interface').getElementsByTagName('div')[array[1]].classList.remove(samecard2);
        }, 500);
    }
}

//胜利
function playOfTheGame() {
    var stars = removestarnode.length;
    var starstext = null;

    if (stars === 1) {
        starstext = `You won 1 star with ${steps} steps and left ${time} s.`;
    } else {
        starstext = `You won ${stars} stars with ${steps} steps and left ${time} s.`;
    }
    
    document.getElementById('dialog-content').innerHTML = starstext;

    document.getElementById('dialog-button').addEventListener('click', function() {
        window.location.reload();
    },false);
}

//restart
document.getElementById('restart').addEventListener('click', function() {
    window.location.reload();
},false);