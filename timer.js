var timeBox, startButton, clock, resumeButton, resetButton, stopButton;
var interval, flashInterval;
var minStore=1, secStore=0;
var totalSec=60;
var flashOn = false;
//downloaded from soundBible... open domain
var alarmAudio = new Audio('Short8.mp3');

function stopFlash(){
	flashOn = false;
	clearInterval(flashInterval);
	document.title = "Timer";
	alarmAudio.pause();
	
	$("#clock").css("background-color","rgb(30,30,30)");
}
function flash(){
	if(flashOn){
		flashOn = false;
		$("#clock").css("background-color","rgb(30,30,30)");
	}
	else{
		flashOn = true;
		$("#clock").css("background-color","rgb(250,42,42)");
	}
}
function pad(num){
	num = Number(num);
	if( num < 10 && num!=0)
		return "0" + num;
	if(num==0)
		return "00";
	return num;
}
function updateTime(){
	// update model value
	var min,sec;
	totalSec--;
	sec = totalSec % 60;
	min = Math.floor(totalSec/60);
	
	if(sec<0 && min<0){
		clearInterval(interval);
		resumeButton.style.visibility = 'hidden';
		stopButton.style.visibility = 'hidden';
		resetButton.style.visibility = 'visible';
		flash();
		document.title = "Times up!!!";
		flashInterval = setInterval(flash,700);
		alarmAudio.play();
		return;
	}
	
	//update UI
	clock.innerHTML = pad(min) + ":" + pad(sec);
	
}

function prepareEventHandlers(){
	//load variables
	minBox = document.getElementById("minBox");
	secBox = document.getElementById("secBox");
	startButton = document.getElementById("startButton");
	clock = document.getElementById("clock");
	resumeButton = document.getElementById("resumeButton");
	resetButton = document.getElementById("resetButton");
	stopButton = document.getElementById("stopButton");
	console.log("loaded variables");
	
	//mask timeBox
	
	//declare event handlers
	startButton.onclick = function(){
		stopFlash();
		//get data and set clock
		
		//TODO: error checking here
		if( secBox.value === 0 || secBox.value.length < 1)
			secBox.value = Number(0);
		if( minBox.value.length < 1)
			minBox.value = Number(0);
		
		minStore = minBox.value;
		secStore = secBox.value;
		totalSec = (60*minStore) + parseInt(secStore);
		
		clock.innerHTML = pad(minStore) + ":" + pad(secStore);
		
		resumeButton.style.visibility = 'hidden';
		stopButton.style.visibility = 'visible';
		resetButton.style.visibility = 'hidden';
		
		//show animation for transition
		$(".setTimer").animate({opacity: 0.25,
			left: "-=50",
		height: "toggle"},500,function(){
			//animation complete
			$(".setTimer").css("display","none");
			$(".countDown").css("display","block");
		});
		$(".countDown").animate({opacity: 0.25,
			left: "+=50",
		height: "toggle"},500,function(){
			//animation complete
			$(".countDown").css("opacity","1");
			interval = setInterval(updateTime,1000);
		});
		
	};
	resumeButton.onclick = function(){
		interval = setInterval(updateTime,1000);
		resumeButton.style.visibility = 'hidden';
		resetButton.style.visibility = 'hidden';
		stopButton.style.visibility = 'visible';
	};
	resetButton.onclick = function(){
		stopFlash();
		minBox.value = minStore;
		secBox.value = secStore;
		//show animation for transition
		
		$(".countDown").animate({opacity: 0.25,
			left: "-=50",
		height: "toggle"},500,function(){
			//animation complete
			$(".countDown").css("display","none");
			$(".setTimer").css("display","block");
		});
		
		$(".setTimer").animate({opacity: 0.25,
			left: "+=50",
		height: "toggle"},500,function(){
			//animation complete
			$(".setTimer").css("opacity","1");
			$(".setTimer").css("display","block");
		});
		
		
		
		
	};
	stopButton.onclick = function(){
		clearInterval(interval);
		resumeButton.style.visibility = 'visible';
		stopButton.style.visibility = 'hidden';
		resetButton.style.visibility = 'visible';
	}
}

prepareEventHandlers();
