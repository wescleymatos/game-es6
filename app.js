'use strict';

// Cria o canvas
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Imagens
var bgReady = false;
var heroReady = false;
var monsterReady = false;
var bgImage = new Image();
var heroImage = new Image();
var monsterImage = new Image();

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
monsterImage.src = 'images/monster.png';

// Objetos do jogo
var hero = {
    speed: 250
};
var monster = {};
var monsterCount = 0;

// Controle do teclado
var keysDown = {};

window.addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode];
}, false);

// Reseta o jogo quando o hério pega o monstro
var reset = function reset() {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // Posiciona randômicamente no mapa
    monster.x = 32 + Math.random() * (canvas.width - 64);
    monster.y = 32 + Math.random() * (canvas.height - 64);
};

// Atualiza objetos do jogo
var update = function update(modified) {
    if (38 in keysDown) {
        // Seta para cima
        hero.y -= hero.speed * modified;
    }

    if (40 in keysDown) {
        // Seta para baixo
        hero.y += hero.speed * modified;
    }

    if (37 in keysDown) {
        // Seta para esquerda
        hero.x -= hero.speed * modified;
    }

    if (39 in keysDown) {
        // Seta para direita
        hero.x += hero.speed * modified;
    }

    // Os personagens se encostaram
    if (hero.x <= monster.x + 32 && monster.x <= hero.x + 32 && hero.y <= monster.y + 32 && monster.y <= hero.y + 32) {
        ++monsterCount;
        reset();
    }
};

// Renderiza tudo
var render = function render() {
    if (bgReady) {
        context.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        context.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        context.drawImage(monsterImage, monster.x, monster.y);
    }

    // Pontuação
    context.fillStyle = 'rgb(250, 250, 250)';
    context.font = '24px Helvetica';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillText('Pessoas salvas: ' + monsterCount, 32, 32);
};

// Controla o loop do jogo
var main = function main() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    requestAnimationFrame(main);
};

var then = Date.now();
reset();
main();
