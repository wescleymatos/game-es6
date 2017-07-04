// Cria o canvas
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Imagem de fundo
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
