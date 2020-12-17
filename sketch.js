let title = 'Widex Nordic Jule Banko!';

let w = window.innerWidth;
let h = window.innerHeight;

let random_seed;
let number_of_boards = 1;
let board;

let Circles = [];
let fallingSnow = [];
let NotFallingSnow = [];
let resetButton;
let newboardButton;

let LightText;
let DarkText;
let LightBackground;
let DarkBackground;

function setup() {
  DarkText = color(190, 110, 0)
  DarkText = color(255, 160 + 20, 50 + 20)
  //LightText = color(115+10, 37+10, 33+10);

  LightText = color(255 - 5, 160 - 5, 50 - 5);

  DarkBackground = color(115, 37, 33);
  // LightBackground = color(30, 36, 52)
  let a = 5;
  LightBackground = color(41 - a, 88 - a, 73 - a)



  createCanvas(w, h);


  random_seed = int(random(1000000000));


  board = new newBoard(random_seed);
  resetButten = new clearBoardButton();
  newboardButton = new newBoardButton();

  for (i = 0; i < 100; i++) {
    fallingSnow.push(new flake(true));
  }
}



function draw() {
  // Print title
  background(LightBackground);

  // display and update falling snow
  for (var i = fallingSnow.length - 1; i >= 0; i--) {
    fallingSnow[i].update();
    fallingSnow[i].display();
    // pop the sucker if its not falling
    if (!fallingSnow[i].moving) {
      NotFallingSnow.push(fallingSnow[i]);
      fallingSnow.splice(i, 1);
      fallingSnow.push(new flake())
    }
  }

  // Display and update not falling snow
  for (var j = 0; j < NotFallingSnow.length; j++) {

    NotFallingSnow[j].display();
    NotFallingSnow[j].update();

    // pop the sucker if not showing
    if (NotFallingSnow[j].opacity < 0) {
      NotFallingSnow.splice(j, 1);
    }
  }



  printTitle(random_seed)
  board.display()
  resetButten.display();
  newboardButton.display();
}


function mousePressed() {
  board.clicked(mouseX, mouseY);
  newboardButton.clicked(mouseX, mouseY, board)
  resetButten.clicked(mouseX, mouseY, board);

}


function windowResized() {
  // Set global height and width
  h = windowHeight;
  w = windowWidth;

  resizeCanvas(windowWidth, windowHeight);
  board.resize();
  resetButten.resize();
  newboardButton.resize();

  NotFallingSnow = []

}

