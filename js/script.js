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

var memoryContainer = "#memoryContainer";

var ImgSource = [
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


var appendImagesToBoxes = $(memorySquare).append("<img>").attr("src","barnOwl.jpg");

return appendImagesToBoxes;


});