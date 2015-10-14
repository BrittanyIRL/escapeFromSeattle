/*things left to do
- play music??? 
-add man from anotherplace walking across black lodge
*/

$(document).ready(function(){
console.log("jquery loaded");

var remainingMatches = 6; 
//item1 and item2 block further clicking once pair is matched or img turned during turn
var item1 = null; 
var item2 = null;
var player1Score = 0; //add 1 for each match, reset on play again
var player2Score = 0; //add 1 for each match, reset on play again	
var memorySquare = $(".memorySquare"); //squares to append images to
var playerTurn = 0; //controls turns 
var player1 = "player1"; //tracks player1
var player2 = "player2"; //tracks player2
var player = player1; //tracks whose turn it is
var memoryContainer = "#memoryContainer"; //# containing board game
var i = 0; // i is used with several functions, all simultaneous. 

//image array
var imageSource = ["img/barnOwl.jpg", "img/eagleOwl.jpg", "img/elfOwl.jpg", "img/greatHornedOwl.jpg", "img/longEaredOwl.jpg", "img/sawWhetOwl.jpg", "img/barnOwl.jpg", "img/eagleOwl.jpg", "img/elfOwl.jpg", "img/greatHornedOwl.jpg", "img/longEaredOwl.jpg", "img/sawWhetOwl.jpg"] //images found on google img search
var totalImages = []; //randomized array of images used in game
var randomImages = []; //radomized array that is transfered to totalImages via for loop

function randomize(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
} //randomize() borrowed from stackoverflow.com with gratitude - http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript 

//Display Game Board - intro 
$(".enter").click(function(){
	clearPlayers(); //reset board
	$(".introduction").hide(); //hide splash page
	$(".container").show(); //show board
	$("header").show(); //show header
		generateImages(); //scramble board images and set
	})

//Generate board images 
var generateImages = function() {
	i = 0;
	totalImages = []; //new array from randomImages
	randomImages = randomize(imageSource);
	for (i=0; i < randomImages.length; i ++){
		totalImages.push(randomImages[i]);
		var squ = $(memorySquare[i]).find("img");
		var attr = squ.attr("src");
		if (squ.attr("src") === "#"){
			squ.attr("src", randomImages[i]);
			console.log("inside img loop");
			}
		}
	$(".owlImage").hide();
	};

//****** PLAY GAME ********
//find matches, if no match reset both images to hide and start next turn
var findPair = function(){
	clicks = 0;
	var click1 = null;
	var click2 = null;
	//add if click1 and click2 are both visible, do nothing
		$("#memoryContainer").on("click", ".cover", (function(){
				if(clicks == 0){
					item1 = $(this)[0];
					click1 = $(this).children().fadeIn( "slow", function() {
					    // Animation complete
					  });
					$(item1).removeClass("cover"); //prevents double click
					clicks ++;
				}
				else if(clicks == 1){
					item2 = $(this)[0];
					click2 = $(this).children().fadeIn( "slow", function() {
					    // Animation complete
					  });
					clicks ++;
					$(makeMatch(click1, click2));
				}		
		})// end function within click
		) //end click function
	}//end findPair 

//control fade of whose turn it is
var switchPlayer = function(){
		if (playerTurn%2 === 0){
			player = player1;
			$(".player1Stats").css( "opacity", 1.0 );
			$(".player2Stats").css( "opacity", 0.3 );
			console.log("player 1 turn")
		}else {
			player = player2;
			$(".player2Stats").css( "opacity", 1.0 );
			$(".player1Stats").css( "opacity", 0.3 );
			console.log("player 2 turn")
		}
	}

//match function - if both img src are the same, match is made and player who matched is tracked. Otherwise, no match and imgs turn back over
var makeMatch = function(x,y){
	var xImageUrl = x.attr("src");
	var yImageUrl = y.attr("src");
		if (xImageUrl === yImageUrl){
			clicks = 0;
			$(item1).removeClass("cover");
			$(item2).removeClass("cover");
			x = null;
			y = null;
			remainingMatches --;
			if(player === player1){
				//change img src to winner for both
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
			$(item1).addClass("cover");
			x.fadeOut( "slow", function() {
			    // Animation complete
			  });
			y.fadeOut( "slow", function() {
			    // Animation complete
			  });
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
//****** FIND WINNER ********
//find winner - triggers only when available matches is 0
var findWinner = function(){
	if (player1Score > player2Score){
		$(".winner").append("Player 1, you win this time.")
		console.log("player1 wins");
	}
	if (player1Score === player2Score){
		$(".winner").append("It's a tie.")
		console.log("tie");
	}
	if (player2Score > player1Score){
		$(".winner").append("Player 2, nice memory.")
		console.log("player2 wins");
	}
}
//****** RESET********
//clear board function to prep for play again, called within .container mousemove
var clearBoard = function(){
	i = 0;
	for (i=0; i < imageSource.length; i ++){
		var squ = $(memorySquare[i]).find("img");
		var attr = squ.attr("src");
		if (squ.attr("src") != "#"){
			squ.attr("src", "#");
			console.log("clearBoard");
		}
	}
}
var clearPlayers = function(){
	player1Score = 0;
	player2Score = 0;
	$(".player1Stats p").text(player1Score);
	$(".player2Stats p").text(player2Score);
}

$(".container").on("mousemove", (function(){
	if (remainingMatches === 0) {
		$(".boardResetContainer").show();
		console.log("remaining matches is: " + remainingMatches);
		clearBoard();
		findWinner();
		$("#memoryContainer").hide();
		remainingMatches = 6;
		player = player1;
		i = 0;
		clicks = 0;
		$(".reset").click(function(){
			$("#memoryContainer .memorySquare div").addClass("cover");
			// $(item2).addClass("cover");
			clearPlayers();
			$(".boardResetContainer").hide();
			$("#memoryContainer, .memorySquare, .memorySquare img, .cover, .owlImage").fadeIn( "slow", function() {
					    // Animation complete
					  });
			generateImages();
			})

		} //end if statement
	 })); // end mousemove

//****** FLAIR ********
//controls both enter and reset buttons, little animation
var buttonAnimateIn = function(){
	$("button").animate({ 
		backgroundColor: 'rgba(112,56,47,0.4)',
		letterSpacing: "1.3px"
	}, 1000, buttonAnimateOut);
};

var buttonAnimateOut = function(){
	$("button").animate({ 
		backgroundColor: 'rgba(112,56,47,1.0)',
		letterSpacing: "1.5px"
		}, 800, buttonAnimateIn);
	};
	buttonAnimateIn();

	$('button').click(function(){
		$('button').stop();
		})

buttonAnimateOut();
generateImages();
findPair();	

});




