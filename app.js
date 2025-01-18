let gameSequence = [];
let userSequence = [];
let btns = ["red", "green", "purple", "yellow"];
let start = false;
let level = 0;
let h2 = document.querySelector("h2");

// Start the game on any keypress
document.addEventListener("keypress", function () {
    if (!start) {
        console.log("Game started");
        start = true;
        levelUp();
    }
});

function levelUp() {
    userSequence = [];
    gameSequence = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    // Generate a new random sequence for the level
    for (let i = 0; i < level; i++) {
        let random = Math.floor(Math.random() * 4);
        let randomColor = btns[random];
        gameSequence.push(randomColor);
    }

    // Flash the sequence with delays
    playSequence();
}

function playSequence() {
    let delay = 0;

    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            let btn = document.querySelector(`.${color}`);
            btnFlash(btn);
        }, delay);
        delay += 800; // Adjust delay between flashes
    });

    // Wait for the sequence to finish before allowing user input
    setTimeout(() => {
        console.log("Your turn!");
    }, delay);
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 500);
}

// Handle button clicks
function btnPressed() {
    let btn = this;
    let color = btn.getAttribute("id");
    console.log(`Button pressed: ${color}`);
    userSequence.push(color);
    btnFlash(btn);
    check();
}

// Attach click listeners to all buttons
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPressed);
}

function check() {
    let idx = userSequence.length - 1;

    if (userSequence[idx] === gameSequence[idx]) {
        console.log("Correct");
        if (userSequence.length === gameSequence.length) {
            h2.innerText = "Correct! Level up!";
            setTimeout(levelUp, 2000);
        }
    } else {
        h2.innerText = `Game Over! Your score was ${level}. Press any key to restart.`;
        console.log("Game Over");
        resetGame();
    }
}

function resetGame() {
    start = false;
    level = 0;
    gameSequence = [];
    userSequence = [];
}
