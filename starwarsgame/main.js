const player = document.getElementById("player");
const game = document.getElementById("game");
const alien = document.getElementById("alien");

// result section
var result = document.getElementById("result");
const score = document.getElementById("score");
var counter = 0;

// sounds
const shoot = document.getElementById("shoot");
const gameOverSound = document.getElementById('gameover');

// fighter jet movement
window.addEventListener("keydown", function (e) {
    if (e.keyCode == "39") {
        var playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        if (playerLeft < 260) {
            player.style.left = (playerLeft + 130) + "px"
        }
    }

    if (e.keyCode == "37") {
        var playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        if (playerLeft > 0) {
            player.style.left = (playerLeft - 130) + "px"
        }
    }

})

// fire bullet
window.addEventListener("keydown", function (e) {
    if (e.keyCode == "32") {
        var canon = document.createElement("div");
        var img = document.createElement("img");
        img.src = "fire.png";
        img.classList.add("bulletImg");
        canon.classList.add("bullet");
        canon.style.left = player.style.left;
        canon.appendChild(img);
        game.appendChild(canon);
        shoot.play();


        //When bullet hit alien
        setInterval(function collision() {
            var canonLeft = parseInt(window.getComputedStyle(canon).getPropertyValue("left"));
            var canonTop = parseInt(window.getComputedStyle(canon).getPropertyValue("top"));
            var alienLeft = parseInt(window.getComputedStyle(alien).getPropertyValue("left"));
            var alienTop = parseInt(window.getComputedStyle(alien).getPropertyValue("top"));
    
            if (((canonTop - alienTop) < 100) && (alienTop < canonTop)
                && (alienLeft === canonLeft)) {
                canon.style.display = 'none';
                alien.style.display = 'none';
                skor.innerHTML = `Skor : ${counter}`;
                counter++;
            }
        }, 10);
        
        setTimeout(function () { canon.remove() }, 1000)

    }

})

// Alien move
function alienMove() {
    alien.style.display = 'block';
    var random = ((Math.floor(Math.random() * 3)) * 130);
    alien.style.left = random + "px";
    alien.classList.add("alienMove");
    if (counter > 20) {
        alien.style.animationDuration = '0.8s';
    }else if (counter > 40) {
        alien.style.animationDuration = '0.6s';
    }else if (counter > 60) {
        alien.style.animationDuration = '0.4s';
    }else if (counter > 100) {
        alien.style.animationDuration = '0.3s';
    }else if (counter > 200) {
        alien.style.animationDuration = '0.2s';
    }
}

setInterval(alienMove, 1000);

// Game over
function gameOver() {
    var alienTop = parseInt(window.getComputedStyle(alien).getPropertyValue("top"));
    if (alienTop > 700) {
        result.style.display = 'block';
        game.style.display = 'none';
        score.innerHTML = `score: ${counter}`;
        skor.innerHTML = `Skor : ${counter}`;
        counter = 0;
        gameOverSound.play();
        gameOverSound.volume = 0.1;
    }
}

setInterval(gameOver, 10);