const gameBoardSize = 40;
let gamePoints = 0;
let gameSpeed = 100;

$(document).ready(function () {
    console.log("Ready Player One!");
    createBoard();
    $(".btn").click(function () {
        startGame();
    });
});

const Snake = {
    position: [[20, 20], [20, 19], [20, 18]],
    size: 3,
    direction: "r",
    alive: true
};

const Food = {
    position: [],
    present: false
};

function createBoard() {
    $("#gameBoard").empty();
    for (let i = 0; i < gameBoardSize; i++) {
        $("#gameBoard").append('<div class="row"></div>');
        for (let j = 0; j < gameBoardSize; j++) {
            $(".row:last-child").append('<div class="pixel"></div>');
        }
    }
}
function getPixel(row, col) {
    return $(".row:nth-child(" + row + ") > .pixel:nth-child(" + col + ")");
}

function drawSnake() {
    Snake.position.forEach(pos => {
        getPixel(pos[0], pos[1]).addClass("snakePixel");
    });
}
function moveSnake() {
    const head = Snake.position[0].slice();
        switch (Snake.direction) {
            case 'r':
            head[1] += 1;
            break;
            case 'l':
            head[1] -= 1;
            break;
            case 'u':
            head[0] -= 1;
            break;
            case 'd':
            head[0] += 1;
            break;
        }
    if (alive(head)) {
        drawSnake();
        // ... (food logic)
        if (head.every(function(e,i) {
            return e === Food.position[i];
          })) {
            Snake.size++;
            Food.present = false;
            gamePoints += 5;
            $(".row:nth-child(" + Food.position[0] + ") > .pixel:nth-child(" + Food.position[1] + ")").removeClass("foodPixel");
            $("#score").html("Score: "+gamePoints)
              if (gamePoints % 16 == 0 && gameSpeed > 10) { gameSpeed -= 5; };
          } else {
            $(".row:nth-child(" + Snake.position[Snake.size-1][0] + ") > .pixel:nth-child(" + Snake.position[Snake.size-1][1] + ")").removeClass("snakePixel");
            Snake.position.pop();
          }
        Snake.position.unshift(head);
    } else {
        gameOver();
    }
}

function generateFood() {
    if (!Food.present) {
        Food.position = [Math.floor((Math.random() * gameBoardSize) + 1), Math.floor((Math.random() * gameBoardSize) + 1)];
        Food.present = true;
        console.log("Food at: " + Food.position);
        drawFood();
    }
}

function keyPress() {
    $(document).one("keydown", function (key) {
        // ... (key handling logic)
        switch(key.which) {
            case 37: // left arrow
                if (Snake.direction != "r") {Snake.direction = "l";}
                break;
            case 38: // up arrow
                if (Snake.direction != "d") {Snake.direction = "u";}
                break;
            case 39: // right arrow
                if (Snake.direction != "l") {Snake.direction = "r";}
                break;
            case 40: // down arrow
                if (Snake.direction != "u") {Snake.direction = "d";}
                break;
        }
    });
}

function gameLoop() {
    setTimeout(function () {
        keyPress();
        generateFood();
        moveSnake();
        if (Snake.alive) { gameLoop(); }
    }, gameSpeed);
}
function alive(head) {
    // ... (collision detection logic)
    // head check
  if (head[0] < 1 || head[0] > 40 || head[1] < 1 || head[1] > 40) {
    return false;
  }
  // wall collision
  if (Snake.position[0][0] < 1 || Snake.position[0][0] > 40 || Snake.position[0][1] < 1 || Snake.position[0][1] > 40) {
    return false;
  }
  // self collision
  for (var i = 1; i < Snake.size; i++) {
    if ((Snake.position[0]).every(function(element,index) {
      return element === Snake.position[i][index];
    })) {
      return false;
    }
  }
  return true;
}

function gameOver() {
    Snake.alive = false;
    console.log("Game Over!");
    $(".overlay").show();
    $("#gameOver").show();
    // ... (blinking animation)
    var blink = function() {
        $(".row:nth-child(" + Snake.position[0][0] + ") > .pixel:nth-child(" + Snake.position[0][1] + ")").toggleClass("snakePixel");
    }
    
    var i = 0;
    function blinkLoop() {
        blink();
        setTimeout(function() {
            i++;
            if (i < 10) { blinkLoop();}
        }, 400);
    }
    blinkLoop();
}

function startGame() {
    Snake.size = 3;
    Snake.position = [[20, 20], [20, 19], [20, 18]];
    Snake.direction = "r";
    Snake.alive = true;
    gameSpeed = 100;
    gamePoints = 0;
    Food.present = false;

    createBoard();
    $(".overlay").hide();
    gameLoop();
}
