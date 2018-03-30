/*
 * Create a list that holds all of your cards
 */
let cardsArray = [ 
					"fa-diamond",
					"fa-paper-plane-o",
					"fa-anchor",
					"fa-bolt",
					"fa-cube",
					"fa-leaf",
					"fa-bicycle",
					"fa-bomb",
					"fa-diamond",
					"fa-paper-plane-o",
					"fa-anchor",
					"fa-bolt",
					"fa-cube",
					"fa-leaf",
					"fa-bicycle",
					"fa-bomb"
				];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const container = document.querySelector('.container');

const deck = document.querySelector('ul.deck');

const restart = document.querySelector('.restart');

let displayCards = function display(array) {

	let shuffledArray = shuffleCards (array);
	clearDeck();
	const fragment = document.createDocumentFragment();

	let i = 1;
	shuffledArray.forEach(function (cardSymbol) {
		const newListItem = document.createElement('li');
		newListItem.classList.add('card');
		newListItem.setAttribute('id', 'card' + i);
		const newSpanItem = document.createElement('span');
		newSpanItem.classList.add('fa');
		newSpanItem.classList.add(cardSymbol);
		newListItem.appendChild(newSpanItem);
		fragment.appendChild(newListItem);

		i++;
	});

	deck.appendChild(fragment);
}

let clearDeck = function clearDeckLi() {
	const listCards = document.querySelectorAll('li.card'); 
	for(let i = 0; i < listCards.length ; i++) {
		listCards[i].remove();
	}
}	

// Shuffle function from http://stackoverflow.com/a/2450976
let shuffleCards = function shuffle(array) {
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
	displayCards(cardsArray);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Add Event Listener for card Click on its parent ul class="deck"





let listOfOpenedCards = []; 

let addCardToOpenedList = function (card) {

	// clear Array items if items will be more than 2 
	const arrlength = listOfOpenedCards.length;
	if( arrlength > 2) {
		listOfOpenedCards.splice(0, arrlength);
	}
	
	if(card.classList.contains('open')) {
		if(listOfOpenedCards.length === 0) {
			listOfOpenedCards.push(card);
		}	
		else if(listOfOpenedCards.length === 1) {
			// if already added do not add it
			if(listOfOpenedCards[0] !=null && (listOfOpenedCards[0].id != card.id)) {
				listOfOpenedCards.push(card);
					checkMatch() 
			}
		}
	}
}

let checkMatch = function () {
	if(listOfOpenedCards != null&& listOfOpenedCards.length === 2) {
		const elem1 = listOfOpenedCards[0].firstElementChild;
		const elem2 = listOfOpenedCards[1].firstElementChild;

			if(elem1.className === elem2.className ) {
					cardsMatched(listOfOpenedCards[0], listOfOpenedCards[1]);
					return true; 
			} else {
					cardsUnMatched(listOfOpenedCards[0], listOfOpenedCards[1]);
					return false;
			}
	}
}
let matchedCount = 0;
let won = false;
let cardsMatched = function (element1, element2) {

	element1.classList.add('vibrate-match');
	element2.classList.add('vibrate-match');
	setTimeout(function(){
		element1.classList.remove('show', 'open');
		element2.classList.remove('show', 'open');
		element1.classList.add('match');
		element2.classList.add('match');
		element1.classList.remove('vibrate-match');
		element2.classList.remove('vibrate-match');
	}, 1000);
	
	listOfOpenedCards.splice(0,2);
	matchedCount ++;
	if (matchedCount == 8) { won = true; clearInterval(x); openModal();}
}

let cardsUnMatched = function (element1, element2) {

		element1.classList.add('vibrate');
		element2.classList.add('vibrate');

	setTimeout(function(){
		element1.classList.remove('open', 'show');
		element2.classList.remove('open', 'show');
		element1.classList.remove('vibrate');
		element2.classList.remove('vibrate');

	}, 1000);

	listOfOpenedCards.splice(0,2);
}

let moveCounter = 0;
let moves = document.querySelector('.moves');

let cardClicked = function (event) {

	console.log(event.target.tagName);
	if(event.target.tagName === 'LI' ) {
		// if hidden show it 
		const currentCard = event.target;
		// Prevent moves counter increment if the card is opened and matched
		if (currentCard.classList.contains('match')) return ;
		// Prevent moves counter increment if card is opened and user clicks on the same card again
		if (currentCard.classList.contains('open')) return;

		moves.textContent = moveCounter ++;
		updateRatingStars();
		let visibleCls =['open', 'show'];
		currentCard.classList.add(...visibleCls);
		addCardToOpenedList(currentCard);
	}
}
let goldStarsNumber = 3;
//  update rating stars
let updateRatingStars = function() {

	if(moveCounter === 40) {
		// Remove 1 gold star
		starsElements[2].classList.remove('fa-gold');
		goldStarsNumber--;
	} else if (moveCounter === 60) {
		//Remove 2nd gold star
		starsElements[1].classList.remove('fa-gold');
		goldStarsNumber--;
	}
}
// Timer count up
const timer = document.querySelector('#timer');
let x ;
let startTimer = function (resolution) {

   startDate = new Date();
   x =  setInterval(function () {
		const convertToDays = 1000 * 60 * 60 * 24 ;
		const convertToHours = 1000 * 60 * 60;
		const convertToMinutes = 1000 * 60 ;

		let timeNow = new Date().getTime();
		const timeElapsed = timeNow - startDate.getTime();	
		const days = Math.floor(timeElapsed / convertToDays);		
		const hours = Math.floor((timeElapsed % (convertToDays)) / (convertToHours));		
		const minutes = Math.floor((timeElapsed % convertToHours) / convertToMinutes );
		const seconds = Math.floor((timeElapsed % convertToMinutes) /1000);

	 timer.textContent = ` ${minutes} : ${seconds}` ;
	}, resolution);
}	


let timerStarted = false;

deck.addEventListener('click', function (event) {
	if(!won) {
		if(!timerStarted)
		{
			startTimer(1000);
			timerStarted = true;
		}
		cardClicked(event);
	}
});

// Shuffle Cards
restart.addEventListener('click', function (event) {
	reShuffle();
});

let resetPublicVars = function() {
	moveCounter = 0;
	moves.textContent = 0 ;	
	timerStarted = false;
	matchedCount = 0;
	won = false;
	goldStarsNumber = 3;
}
let reShuffle = function() {
	resetPublicVars();
	resetStarsRating();
	// Stop Timer
	clearInterval(x);
	timer.textContent = '0:0' ;
	displayCards(cardsArray);
}

const starsElements = document.querySelectorAll('.fa-star');

let resetStarsRating = function() {	
	starsElements.forEach(function(star) {
		star.classList.add('fa-gold');
	});
}

// Get the modal
const modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

let openModal = function() {

	setTimeout(function() {
		modal.style.display = "block";
     	score.textContent = `With ${moveCounter} Moves, ${goldStarsNumber} Stars and
     						 Time Taken(${timer.textContent.trim()})  Woooow! `;
			}, 1000);	 
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const score = document.querySelector('.score');
const playAgain = document.querySelector('.playAgain');

playAgain.addEventListener('click', function () {
	modal.style.display = "none";
	reShuffle();
});