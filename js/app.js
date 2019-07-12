// 1: Création des cartes
// 2: Génération des nombres aléatoires
// 3: Unicité des nombres
// 4: Création des doublons (pairs de carte)
// 5: Mélange des cartes
// 6: Affichage des cartes

const NB_CARDS = 10;

const cards = [];
const tabRandomNB = [];

let pairFlipped = null;

function init() {
    soundEnd();

    for (let i = 0; i < NB_CARDS; i++) {
    createCard();
    }
}

function soundEnd(){
    const bgSound = document.createElement('audio');
    const youWonSound = document.createElement('audio');

    bgSound.src = 'audio/jungle.mp3';
    youWonSound.src = 'audio/youWon.mp3';

    bgSound.autoplay = true;
    bgSound.volume = 0.5;

    document.body.appendChild(bgSound);
    document.body.appendChild(youWonSound);
}

function createCard() {
  const card = document.createElement('div');
  const backCard = document.createElement('div');
  const frontCard = document.createElement('div');
  
  card.appendChild(backCard);
  card.appendChild(frontCard);
  
  card.classList.add('card');
  backCard.classList.add('back');
  frontCard.classList.add('front');

  cards.push(card);
  handleCard(cards.length - 1);
}

function handleCard(index) {
  const card = cards[index];

  addClickListener(card);
  generateRandomNB(card, index);
  shuffleCards();
  displayCards();
}

function addClickListener(card) {
  card.addEventListener('click', function () {
    card.classList.add('flipped');
    if (pairFlipped == null){
        pairFlipped = this;
    }else{
        if (this.textContent != pairFlipped.textContent){
            let x = pairFlipped;
            setTimeout(function(){
                card.classList.remove('flipped');
                x.classList.remove('flipped');
            },500);
        }
        let fin = endGame();
        pairFlipped = null;
    }
  });
}


function generateRandomNB(card, index) {
  let randomNB = tabRandomNB[tabRandomNB.length - 1];

  if (index % 2 === 0) {
    do {
      randomNB = Math.ceil(Math.random() * 20);
    }
    while (tabRandomNB.includes(randomNB));

    tabRandomNB.push(randomNB);
  }

  card.querySelector('.front').textContent = randomNB;
}

function shuffleCards() {
  cards.sort(function () {
    return (-1)**Math.ceil(Math.random()*10);
  });
}

function displayCards() {
  cards.forEach(function (card) {
    document.querySelector('.wrapper').appendChild(card);
  });
}

//Fonction qui retourne 1 ou -1 en fcontion du nombre de carte flipped
function endGame(){
    cards.forEach(function (card){
        if (!card.classList.contains('flipped'))
            console.log("mada madadane");
            return -1;
    })
    console.log("game over");
    return 1;
}

init();
