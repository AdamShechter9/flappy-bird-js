// script.js
// javascript file

function pipeObj (heightT, heightB) {
	this.left = 540;
	this.heightT = heightT;
	this.heightB = heightB;
	if (this.heightB > 240)
	{
		this.topB = 360 - (heightB-240);
	}
	else
	{
		this.topB = 360 + (240-heightB);
	}	
}

var pipesArr = [];


var flappyBird = {
	top: 280
}

// Global variable for counting frames
var framecounter = 0;

// Global variable for score
var playerScore = 0;

function initWorld() {
	// var html1 = '<div class="pipetop"></div><div class="pipebottom"></div>';
	var html1 = '';
	var html2 = '';
	$('.container').append(html1);
	$('.container').append(html2);
}

function makeNewPipe () {
	// Push a new Pipe Object
	var topHeight = Math.floor((Math.random()*80)+180);
	var bottomHeight = Math.floor((Math.random()*80)+180);
	var newPipe = new pipeObj(topHeight, bottomHeight);

	pipesArr.push(newPipe);
}


function drawPipes() {
	var html1 = '';
	if (pipesArr.length == 0)
	{
		makeNewPipe();
	}
	else 
	{
		// Create pipes CSS, move pipes, create new pipes based on new conditions.
		if (pipesArr[0].left <= -10)   // Remove pipe off screen.
			{
				pipesArr.shift();
			}
		for(var i=0;i<pipesArr.length;i++)
		{
			if (pipesArr[i].left > -10)
			{
				
				html1 += '<div class="pipetop" style="left:' + pipesArr[i].left + 'px; height: ' + pipesArr[i].heightT + 'px"></div>';
				html1 += '<div class="pipebottom" style="left:' + pipesArr[i].left + 'px; height: ' + pipesArr[i].heightB + 'px; top: ' + pipesArr[i].topB + 'px "></div>';
				$(".container").html(html1);
				pipesArr[i].left -= 5;
			}	
		}
		framecounter++;
		// console.log('counter ' + framecounter);
		if (framecounter > 40)
		{
			var tosscoin = Math.floor(Math.random()*2);
			// console.log('coin toss '+tosscoin);
			if (tosscoin === 1)
			{
				makeNewPipe();
				framecounter = 0;
			}
		}
	}
	
}

function drawBird () {
	var html2 = '';
	html2 += '<div class="flappybird" style="top:' + flappyBird.top + 'px"></div>';
	$(".container").append(html2);
	collisionCheck();
}

function collisionCheck ()
{
	console.log('pipesArr[0].left ' + pipesArr[0].left);
	console.log('flappyBird.top ' + flappyBird.top);
	console.log('pipesArr[0].topB ' + pipesArr[0].topB);
	console.log('pipesArr[0].heightT ' + pipesArr[0].heightT);
	if ((pipesArr[0].left > 0) && (pipesArr[0].left < 90))
	{
		if (((flappyBird.top + 30) > pipesArr[0].topB) || ((flappyBird.top) < pipesArr[0].heightT))
		{
			alert('Game Over!');
			location.reload();
		}

	}
}


function drawScore () {
	var html3 = '';
	html3 += '<div class="scoreBox"><h3>'+playerScore+'</h3></div>';
	$(".container").append(html3);
}




function setMotion() {
	setInterval(drawStuff, 100);   // Draw Pipes & Bird
	setInterval(birdFall, 70);		// Bird falling

	function drawStuff() {
		// console.log('draw pipe');
		drawPipes();
		drawBird();
		drawScore();
	}

	function birdFall () {
		flappyBird.top += 5;
		if ((flappyBird.top > 580) || (flappyBird.top < 0))
		{
			alert('Game Over!');
			location.reload();
		}
	}
}





$(document).ready(function () {
	initWorld();
	setMotion();
	$(document).keypress(function (event) {
		// console.log(event);
		if (event.keyCode === 32)
		{
			flappyBird.top -= 30;
		}
	})
});