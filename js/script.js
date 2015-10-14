/*things left to do
BIG BUG: REMOVE ABILITY TO CLICK ON AN ALREADY SHOWN IMG

-add man from anotherplace walking across black lodge
*/

var remainingMatches = 6; 
var item1 = null;
var item2 = null;
$(document).ready(function(){
	console.log("jquery loaded");
	
	/*Bonus: when a match is made, show info about that owl */

var player1Score = 0; //add 1 for each match
var player2Score = 0; //add 1 for each match	
var memorySquare = $(".memorySquare"); //squares to append images to
var playerTurn = 0; //controls turns 
var player1 = "player1";
var player2 = "player2";
var player = player1;
var memoryContainer = "#memoryContainer";
var i = 0;

var imageSource = [
	"img/barnOwl.jpg",
	"img/eagleOwl.jpg",
	"img/elfOwl.jpg",
	"img/greatHornedOwl.jpg",
	"img/longEaredOwl.jpg",
	"img/sawWhetOwl.jpg",
	"img/barnOwl.jpg",
	"img/eagleOwl.jpg",
	"img/elfOwl.jpg",
	"img/greatHornedOwl.jpg",
	"img/longEaredOwl.jpg",
	"img/sawWhetOwl.jpg"
	
	]
	var totalImages = [];
	var randomImages = [];
// $(".memorySquare img").hide();
// $(".owlImage").hide();
function randomize(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}


//Display Game Board - intro 

$(".enter").click(function(){
	clearPlayers();
	$(".introduction").hide();
	$(".container").show();
	$("header").show();
		generateImages();
	})

//Generate Imgs in Divs
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
		// console.log(totalImages);
		}
	$(".owlImage").hide();
	};

var findPair = function(){
	//if all images are hidden, allow to show two - base on clicks
	clicks = 0;
	var click1 = null;
	var click2 = null;
	//add if click1 and click2 are both visible, do nothing
		$("#memoryContainer").on("click", ".cover", (function(){

			// while (player === player1){
				if(clicks == 0){
					item1 = $(this)[0];
					click1 = $(this).children().fadeIn( "slow", function() {
					    // Animation complete
					  });

					clicks ++;
				}
				else if(clicks == 1){
					item2 = $(this)[0];
					click2 = $(this).children().fadeIn( "slow", function() {
					    // Animation complete
					  });
					// $(this).off('click');
					clicks ++;
					$(makeMatch(click1, click2));
				}	
					
		})
)
	}

var switchPlayer = function(){
		if (playerTurn%2 === 0){
			player = player1;
			//opacity 
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


var makeMatch = function(x,y){
	var xImageUrl = x.attr("src");
	var yImageUrl = y.attr("src");
		if (xImageUrl === yImageUrl){
			clicks = 0;
			// $('div', this).removeClass("cover");
			// $(item1).attr("disabled", "disabled");
			// $(item2).attr("disabled", "disabled");
			$(item1).removeClass("cover");
			console.log(item1);
			$(item2).removeClass("cover");
			console.log(item2);
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
			//parent of xImageUrl and yImageUrl bind()
			// $(".cover").bind("click", function(){

			// });	
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
			clearPlayers();
			$(".boardResetContainer").hide();
			$("#memoryContainer, .memorySquare, .memorySquare img, .cover, .owlImage").fadeIn( "slow", function() {
					    // Animation complete
					  });
			generateImages();
			})

		}
	 }));

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




