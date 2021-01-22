const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let movimento = document.getElementById('movimento');
document.getElementById('btnReset').disabled = true;
movimento.innerHTML = 'Movimentos: 20';
let movieGame = 20;
let totalScore = 0;

//função para virar carta
function decrementMovie() {
    movieGame --
    movimento.innerHTML = `Movimentos: ${movieGame}`
}

function flipcard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        totalScore ++
        if (totalScore == 6){

            document.getElementById('btnReset').disabled = false;
        }
        disablecards();
        return;
    }

    decrementMovie();
    unflipCards();
}

function disablecards() {
    firstCard.removeEventListenner('click', flipcard);
    secondCard.removeEventListenner('click', flipcard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetCards() {
    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.remove('flip');
        })

        resetBoard();
    }, 100);

    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() *12);
        card.style.order = ramdomPosition;
    })
    movieGame = 20
    movimento.innerHTML = `Movimentos: ${movieGame}`
    document.getElementById('btnReset').disabled = true;
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard,secondCard] = [null,null];
}

(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() *12);
        card.style.order = ramdomPosition;
    })
})(); //Immediately Invoked Function

cards.forEach((card) => {
    card.addEventListener('click', flipcard)
})