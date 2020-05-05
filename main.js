const gameWidth = 800;
const gameHeight = 800;
const sandHeight = 100;
const sandWidth = gameWidth;
let score = document.getElementById('score');
let highScores = [];
let canvas = document.getElementById('game');
let points = 0;
let count = 0;
let lvl = 1;
let frameIndex = 1;
let rocks = new Image();
rocks.src = "assets/fishTilesheet.png";
let coolFish = new Image();
coolFish.src = "assets/bluefish1.png";
let badFish = new Image();
badFish.src = "assets/redfish1.png";
let gameOverImg =new Image();
gameOverImg.src = "assets/gameover.png";
button = document.getElementById('restart');
let game = document.getElementById('game');

let ctx = game.getContext('2d');

game.height = gameHeight;
game.width = gameWidth;

function drawScore() {
    ctx.font = "16px Sans-serif";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+ points, 400, 20);
    document.getElementById('ocean').play();
}

function HandleCollision(hero, fish) {
    if (hero.alive) {
    if (hero.x < fish.x + (fish.width - 10)
        && hero.x + (hero.width -20) > fish.x
        && hero.y < fish.y + (fish.height + 15)
        && hero.y + (hero.height - 15) > fish.y
        && hero.area > fish.area) {
            fish.alive = false;
            hero.width += 5;
            hero.height += 5;
            points += 1;
            score.textContent = `Score: ${points}`;

    } else if (hero.x < fish.x + (fish.width - 10)
        && hero.x + (hero.width -20) > fish.x
        && hero.y < fish.y + (fish.height - 15)
        && hero.y + (hero.height - 15) > fish.y
        && hero.area < fish.area) {
            hero.alive = false;
            
            console.log('Game Over'); 
            console.log(hero.alive);
            
};
    }
}
// function drawScore() {
//     ctx.font = "16px Sans-serif";
//     ctx.fillStyle = "#0095DD";
//     ctx.fillText("Score: "+ points, 400, 20);
//     document.getElementById('ocean').play();
// }

function gameState() {
    this.hero = new Fish(100, 50, 'white', 70, 70, coolFish);
    this.fishes = [];
    this.sand = new Rocks(0, 140, 0, 700, 800, 100, rocks);
    this.fixedSand = new Rocks(0, 140, 0, 700, 800, 100, rocks);
    this.rock = new Rocks(700, 260, 70, 650, 80, 65, rocks);
    this.bones = new Rocks (0, 320, 450, 710, 60, 60, rocks);
    this.coral = new Rocks(700, 200, 600, 640, 70, 70, rocks);
     
    this.renderWorld = function() {
        if (this.hero.alive) {
            this.hero.render();
        } else if (this.hero.alive === false) {
            endGame();
        }
        drawScore();
        this.fixedSand.render();
        this.sand.render();
        this.rock.render();
        this.bones.render();
        this.coral.render();
        this.hero.area = this.hero.height * this.hero.width;
        for (let i = 0; i < this.fishes.length; i++) {
            HandleCollision(this.hero, this.fishes[i]);
            if (this.fishes[i].alive) {
                this.fishes[i].render();
            }
        }
        this.fishes = this.fishes.filter(function(fish) {return fish.alive});
  
        
    };
     
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;  
  }


function updateFishes(state) {
    for (let i = 0; i < state.fishes.length; i++) {
        if (state.fishes[i].area <= 8400) {
        state.fishes[i].x -= 6;
    } else {
        state.fishes[i].x -= 5;
    };
    if (count % 24 == 0) {
        frameIndex = 0;
    } else if (count % 24 == 6) {
        frameIndex = 1;
    } else if (count % 24 == 12) {
        frameIndex = 2;
    } else if (count % 24 == 18) {
        frameIndex = 3;
    }
    
    } 

    if (Date.now() % 29 === 0) {
        state.fishes.push(new Fish(
            gameWidth,
            getRandomIntInclusive(0, gameHeight - (sandHeight + 100)),
            'red', getRandomIntInclusive(50, 125), getRandomIntInclusive(50, 125), badFish)
        )

    }
}

function updateFishes2(state) {
    for (let i = 0; i < state.fishes.length; i++) {
        state.fishes[i].x -= 6;
        
        if (count % 24 == 0) {
            frameIndex = 0;
        } else if (count % 24 == 6) {
            frameIndex = 1;
        } else if (count % 24 == 12) {
            frameIndex = 2;
        } else if (count % 24 == 18) {
            frameIndex = 3;
        }
        
    } 

    if (Date.now() % 29 === 0) {
        state.fishes.push(new Fish(
            gameWidth,
            getRandomIntInclusive(0, gameHeight - (sandHeight + 70)),
            'red', getRandomIntInclusive(80, 200), getRandomIntInclusive(80, 200), badFish)
        )

}}


function Fish(x, y, color, width, height, image) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.image = image;
    this.alive = true;
    this.area = this.height * this.width   
    this.render = function() {
        //ctx.drawImage(this.image, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
        ctx.drawImage(this.image, frameIndex * this.image.width/4, 0, this.image.width/4, this.image.height/3, this.x, this.y + frameIndex, this.width, this.height);
    }  
}
function Rocks(sx, sy, x, y, width, height, image) {
    this.sx = sx;
    this.sy = sy;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;

    this.render = function() {
        //ontext.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        ctx.drawImage(this.image, this.sx, this.sy, this.image.width/18, this.image.height/7, this.x, this.y, this.width, this.height);  
    } 
    
}

function movementHandler(e) {
    let newPos;
    switch (e.keyCode) {
        // w
        case (87):
            state.hero.y = Math.max(0, state.hero.y - 5);
            break;
        // a
        case (65):
            state.hero.x = Math.max(0, state.hero.x - 6);
            break;
        // s
        case (83):
            newPos = state.hero.y + 5;
            if (newPos + state.hero.height > gameHeight - sandHeight) {
                newPos = gameHeight - sandHeight - state.hero.height;
            }
            state.hero.y = newPos;
            break;
        // d
        case (68):
            newPos = state.hero.x + 4;
            if (newPos + state.hero.width > gameWidth) {
                newPos = gameWidth - state.hero.width;
            }
            state.hero.x = newPos;
            break;
        case (71):
            state.hero.width -= 30;
            break;
        case (72):
            state.hero.width += 30;
    }
}
function resetGame(e) {
    document.location.reload();
}
button.addEventListener('click', resetGame);
document.addEventListener('keydown', movementHandler);

function gameLoop(state) {
    ctx.clearRect(0, 0, game.width, game.height);
    if (lvl == 1) {
        updateFishes(state);
    } else if (lvl == 2){
        updateFishes2(state);
    };
    state.renderWorld();
    count +=1;
    if (state.hero.x < -100) {
        state.hero.x = 800
        
        
    } else if (state.hero.y < 700 - state.hero.height) {
    state.hero.x -= 1;
    state.hero.y += 1;
    };
    switch (true) {
        case (state.coral.x == 800): 
            state.coral.x = -60;
            break;
        case (state.bones.x == 800):
            state.bones.x = -60;
            break;
        case (state.rock.x == 800):
            state.rock.x = -60;
            break;
        case (state.sand.x == 800):
            state.sand.x = -60;
            default:
            state.sand.x += 1;
            state.coral.x += 1;
            state.bones.x += 1;
            state.rock.x += 1;
};
if (points >= 11) {
    lvl = 2;
    console.log(lvl);
}
}

let state = new gameState(); 
setInterval(function () {
    gameLoop(state);
}, 60);


let interval = setInterval(function () {    
}, 1000);

function endGame(state) {
    
    ctx.drawImage(gameOverImg, 0, 0, 800, 800);
    highScores.push(points);
    badFish.src = "__cartoon_fish_06_black_swim.png";
    stop(setInterval);

    clearInterval(interval);
}