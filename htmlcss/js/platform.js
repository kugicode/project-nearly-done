const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

//Player object
const player = {
    x: 10,
    y: canvas.height - 40,
    width: 40,
    height: 40,
    velocityX: 0,
    velocityY: 0,
    jumpPower: -10,
    gravity: 0.5
}

const platforms = [
    { x: 200, y: 100, width: 150, height: 25 },
    { x: 50, y: 200, width: 150, height: 25 },
    { x: 300, y: 400, width: 150, height: 25 },
]

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight'){
        player.velocityX = 5;
    }
    else if (event.code === 'ArrowLeft'){
        player.velocityX = -5;
    }
});


document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowRight' || event.code === 'ArrowLeft'){
        player.velocityX = 0;
    }
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && player.y >= canvas.height - player.height){
        player.velocityY += player.jumpPower;
    }
});


function update(){
    //update the player movement
     ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.velocityY += player.gravity;
    player.y += player.velocityY;
    player.x += player.velocityX;
    
    if (player.y + player.height >= canvas.height){
        player.y = canvas.height - player.height;
           player.velocityY = 0;

    }
    
    //prevent player from going out of canvas.
    if (player.x + player.width >= canvas.width){
        player.x = canvas.width - player.width;
    }
    else if (player.x < 0){
        player.x = 0;
    }

    platforms.forEach(p => {
if (
  player.y + player.height >= p.y &&
  player.y + player.height <= p.y + p.height &&
  player.velocityY > 0 &&
  player.x + player.width > p.x &&
  player.x < p.x + p.width
) {
  player.y = p.y - player.height; //player y is the top part of the box and p.y is the top part of the platform.
  player.velocityY = 0; //no y movement so it's still.
}
    ctx.fillStyle = "green";
    ctx.fillRect(p.x, p.y, p.width, p.height);
});

    //draw the rec
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
}

update();