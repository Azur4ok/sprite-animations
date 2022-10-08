const canvas = document.getElementById('canvas'),
  select = document.getElementById('select'),
  ctx = canvas.getContext('2d'),
  CANVAS_WIDTH = (canvas.width = 600),
  CANVAS_HEIGHT = (canvas.height = 600);

const image = new Image();
image.src = 'assets/images/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
const staggerFrames = 7;
let option = 'idle';
const spriteAnimations = [];
const animationStates = [
  { name: 'idle', frames: 7 },
  { name: 'jump', frames: 7 },
  { name: 'fall', frames: 7 },
  { name: 'run', frames: 9 },
  { name: 'dizzy', frames: 11 },
  { name: 'sit', frames: 5 },
  { name: 'roll', frames: 7 },
  { name: 'bite', frames: 7 },
  { name: 'ko', frames: 12 },
  { name: 'getHit', frames: 4 },
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };

  for (let i = 0; i < state.frames; i++) {
    let positionX = i * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }

  spriteAnimations[state.name] = frames;
});

function launchOptions() {
  animationStates.forEach((state) => {
    let option = document.createElement('option');
    option.textContent = state.name;
    select.append(option);
  });
}

function handleChangeOption(event) {
  option = event.target.selectedOptions[0].textContent;
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[option].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[option].loc[position].y;
  ctx.drawImage(image, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

  if (gameFrame % staggerFrames === 0) {
    if (frameX < 6) frameX++;
    else frameX = 0;
  }

  gameFrame++;

  requestAnimationFrame(animate);
}

animate();

document.addEventListener('load', launchOptions());
select.addEventListener('change', handleChangeOption);
