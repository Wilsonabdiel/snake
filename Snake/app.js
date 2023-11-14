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
