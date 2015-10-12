$(document).ready(function(){
	console.log("jquery loaded");
	/*Board is random set of 15 pairs, 30 boxes
	Player 1 turn lasts until the 2 clicks do not match
	after player 1 doesn't get a match, player 2 goes
	continue process until board = 0
	each match gives the player +1 
	each match subtracts 1 from board total (board total starts at 6)
	once all matchs are made, announce winner
	winner is determined by whichever player has more points
	show winning image on center of screen with reset button to reset JUST board */

	/*Bonus: when a match is made, show info about that owl */


	//Generate Imgs in Divs
	//Hide Imgs behind div, to be revealed on click
	//if two imgs match
		//-1 to board
		//++ to player
	//if player doesn't match imgs, cover the imgs back up,
	//switch player
	//continue until board = 0
var player1Score = 0; //add 1 for each match
var player2Score = 0; //add 1 for each match	
var remainingMatches = 15; 
var memorySquare = $(".memorySquare"); //squares to append images to
var playerTurn = 0; //controls turns 
var player1 = "player1";
var player2 = "player2";
var player = player1;
var memoryContainer = "#memoryContainer";
var i = 0;
var imageSource = [
	"img/barnOwl.jpg",
	"img/barredOwl.jpg",
	"img/burrowingOwl.jpg",
	"img/eagleOwl.jpg",
	"img/elfOwl.jpg",
	"img/greatGrayOwl.jpg",
	"img/greatHornedOwl.jpg",
	"img/longEaredOwl.jpg",
	"img/northernHawkOwl.jpg",
	"img/sawWhetOwl.jpg",
	"img/shortEaredOwl.jpg",
	"img/snowyOwl.jpg",
	"img/spectacledOwl.jpg",
	"img/spottedOwl.jpg",
	"img/westernScreechOwl.jpg",
	"img/barnOwl.jpg",
	"img/barredOwl.jpg",
	"img/burrowingOwl.jpg",
	"img/eagleOwl.jpg",
	"img/elfOwl.jpg",
	"img/greatGrayOwl.jpg",
	"img/greatHornedOwl.jpg",
	"img/longEaredOwl.jpg",
	"img/northernHawkOwl.jpg",
	"img/sawWhetOwl.jpg",
	"img/shortEaredOwl.jpg",
	"img/snowyOwl.jpg",
	"img/spectacledOwl.jpg",
	"img/spottedOwl.jpg",
	"img/westernScreechOwl.jpg"		
	]
	var totalImages = [];

// function randomizeFormula(MaxValue, MinValue) {
// 		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
// 	}

function randomize(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

var randomImages = randomize(imageSource);

//randomize images

//Generate Imgs in Divs

var generateImages = function() {
	i = 0;
	totalImages = []; //new array from randomImages
	for (i=0; i < randomImages.length; i ++){
		totalImages.push(randomImages[i]);
		var squ = $(memorySquare[i]).find("img");
		var attr = squ.attr("src");
		if (squ.attr("src") === "#"){
			squ.attr("src", randomImages[i]);
			console.log("inside img loop");
		}

		console.log(totalImages);
		}
	};
//CLICK TIME 
//if two imgs match
		//-1 to board
		//++ to player

var findPair = function(){
	//if all images are hidden, allow to show two - base on clicks
	clicks = 0;
	var click1 = null;
	var click2 = null;
	endGame();
	//if two images match then pair + point
	//if no match, flip again
	//THIS NEEDS TO BE REVERSED POST TESTING
		$(".owlImage").click(function(){
			// while (player === player1){
				if(clicks == 0){
					click1 = $(this).hide();
					clicks ++;
				}
				else if(clicks == 1){
					click2 = $(this).hide();
					clicks ++;
					$(makeMatch(click1, click2));
				}				
		})
};

var switchPlayer = function(){
		if (playerTurn%2 === 0){
			player = player1;
			console.log("player 1 turn")
		}else {
			player = player2;
			console.log("player 2 turn")
		}
	}


var makeMatch = function(x,y){
	var xImageUrl = x.attr("src");
	var yImageUrl = y.attr("src");
		if (xImageUrl === yImageUrl){
			clicks = 0;
			x = null;
			y = null;
			if(player === player1){
				player1Score ++;
				$(".player1Stats p").text(player1Score);
			}
			if(player === player2){
				player2Score ++;
				$(".player2Stats p").text(player2Score);
			}
			console.log('match');
			}
		else if (xImageUrl != yImageUrl){
			console.log("no match");
			x.show(); //CHANGE THIS TO HIDE
			y.show(); //CHANGE THIS TO HIDE
			yImageUrl = null;
			xImageUrl = null;
			x = null;
			y = null;
			clicks = 0;
			playerTurn ++; //controls board switch
			console.log('no match');
			switchPlayer();
			return;
			}
	}
var endGame = function(){
	// if (remainingMatches === 0){
	// 	$(".boardResetContainer").show();
		$(".reset").click(function(){
			totalImages = [];
			randomImages = [];
			randomImages = randomize(imageSource);
			generateImages();
			remainingMatches = 15;
			player = player1;
			player1Score = 0;
			player2Score = 0;
			i = 0;
			clicks = 0;
		})

	//}
}
generateImages();
findPair();	
endGame();

});









	//Hide Imgs behind div, to be revealed on click

	//if player doesn't match imgs, cover the imgs back up,
	//switch player
	//continue until board = 0


//reveal on click

//count

