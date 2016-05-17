// script.js
// javascript file


// Pipe object 
function pipeObj (heightT, heightB) {
	this.left = 540;
	this.heightT = heightT;
	this.heightB = heightB;
	if (this.heightB > 240)   //  Half screen divide
	{
		this.topB = 360 - (heightB-240);
	}
	else
	{
		this.topB = 360 + (240-heightB);
	}	
}

// Array of Pipe objects
var pipesArr = [];

// Flappy Bird Object
var flappyBird = {
	top: 280,
	fallSpeed: 100
}

// Global variable for counting frames.
// Resets at 40
var framecounter = 0;
var framereset = 40;

// Global variable for score
var playerScore = 0;


// Future Initialize World
function initWorld() {

}


function makeNewPipe () {
	// Push a new Pipe Object

	var pipePosition = Math.floor((Math.random()) * 4);  // 0 - 1 middle 2 Bottom 3 Top

	if (pipePosition < 2)
	{
		var topHeight = 240 + Math.floor((Math.random()*10));
		var bottomHeight = 240 + Math.floor((Math.random()*10));
	}
	else if (pipePosition === 2)
	{
		var topHeight = 360 + Math.floor((Math.random()*10));
		var bottomHeight = 120 + Math.floor((Math.random()*10));
	}
	else if (pipePosition === 3)
	{
		var topHeight = 120 + Math.floor((Math.random()*20));
		var bottomHeight = 360 + Math.floor((Math.random()*20));
	}

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
				playerScore+=10;
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
		if (framecounter > framereset)
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
}

function collisionCheck ()
{
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
	setInterval(drawStuff, 50);   // Draw Pipes & Bird
	setInterval(birdFall, flappyBird.fallSpeed);		// Bird falling

	function drawStuff() {
		// console.log('draw pipe');
		drawPipes();
		drawScore();
		drawBird();
		collisionCheck();
	}
}

// Bird Falling down 
function birdFall () {
	flappyBird.top += 10;
	if (flappyBird.top > 580)
	{
		alert('Game Over!');
		location.reload();
	}
}



$(document).ready(function () {
	initWorld();
	setMotion();
	$(document).keypress(function (event) {
		// console.log(event);
		if (event.keyCode === 32)
		{
			flappyBird.top -= 35;
		}
	})
});