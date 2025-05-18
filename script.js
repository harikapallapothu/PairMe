let counter = 0;
let pairs =0;
const flipCount = document.getElementById('counter');
let flippedCards = [];
let lockBoard = false;

function shuffleCards() {
    const containers = document.querySelectorAll('.cards');

    containers.forEach(container => {
        const cards = Array.from(container.children);
        const shuffled = cards.sort(() => Math.random() - 0.5);

        shuffled.forEach(card => {
            card.classList.remove('flipped');  // reset flip
            container.appendChild(card);        // shuffle cards in container
        });
    });

    // Reset game state variables
    counter = 0;
    flippedCards = [];
    lockBoard = false;
    flipCount.textContent = `Number of Flips: ${counter}`;
    pairs=0;
    document.getElementById('pairs').textContent = ``;
    const result = document.querySelector('.gameover');
                result.style.visibility = 'hidden';
}

function setupCardListeners() {
    const allCards = document.querySelectorAll('.card');

    allCards.forEach(card => {
        // Remove old event listener first (optional but good to avoid duplicates)
        card.onclick = null;

        card.addEventListener('click', () => {
            if (lockBoard) return;
            if (card.classList.contains('flipped')) return;

            card.classList.add('flipped');
            flippedCards.push(card);

            counter++;
            flipCount.textContent = `Flips: ${counter}`;

            if (flippedCards.length === 2) {
                lockBoard = true;

                const img1 = flippedCards[0].querySelector('img').src;
                const img2 = flippedCards[1].querySelector('img').src;

                if (img1 === img2) {
                    pairs++;
                    document.getElementById('pairs').textContent = `Number of pairs found: ${pairs}`;
                    // Matched cards: keep flipped, reset state
                    flippedCards = [];
                    lockBoard = false;
                } else {
                    // Not matched: flip back after delay
                    setTimeout(() => {
                        flippedCards.forEach(card => card.classList.remove('flipped'));
                        flippedCards = [];
                        lockBoard = false;
                    }, 1000);
                }
            }
            if(pairs ===4){
                const result = document.querySelector('.gameover');
                result.style.visibility = 'visible';
            }
        });
    });
}

// Initialize listeners on page load
setupCardListeners();
shuffleCards();
