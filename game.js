// Cria o canvas
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Imagens
let bgReady = false;
let heroReady = false;
let monsterReady = false;
const bgImage = new Image();
const heroImage = new Image();
const monsterImage = new Image();

bgImage.addEventListener('load', function () {
    bgReady = true;
});
bgImage.src = 'images/background.png';

heroImage.addEventListener('load', function () {
    heroReady = true;
});
heroImage.src = 'images/hero.png';

monsterImage.addEventListener('load', function () {
    monsterReady = true;
});
monsterImage.src = 'images/hero.png';


// Objetos do jogo
const hero = {
    speed: 250
};
const monster = {};
let monsterCount = 0;


// Controle do teclado
const keysDown = {};

window.addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode];
}, false);

// Reseta o jogo quando o hério pega o monstro
const reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // Posiciona randômicamente no mapa
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};


// Atualiza objetos do jogo
const update = function (modified) {
    if (38 in keysDown) { // Seta para cima
        hero.y -= hero.speed * modified;
    }

    if (40 in keysDown) { // Seta para baixo
        hero.y += hero.speed * modified;
    }

    if (37 in keysDown) { // Seta para esquerda
        hero.x -= hero.speed * modified;
    }

    if (39 in keysDown) { // Seta para direita
        hero.x += hero.speed * modified;
    }

    // Os personagens se encostaram
    if (hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32) && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)) {
        ++monsterCount;
        reset();
    }
};
