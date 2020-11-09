let title = 'DUs Jule Banko!';

let w = window.innerWidth;
let h = window.innerHeight;

let random_seed;
let all_numbers = [];
let number_of_boards = 1;
let board;

let Circles = [];
let fallingSnow = [];
let NotFallingSnow = [];

function setup() {
  createCanvas(w, h);
  for (i = 1; i < 91; i++) {
    append(all_numbers, i)
  }

  random_seed = int(random(1000000000));
  // set seed
  randomSeed(random_seed)

  numbers = findNumbers();
  board = placeNumbers(numbers);

  CreateCircles(board)
  // Create snowflakes
  for (i = 0; i < 100; i++) {
    fallingSnow.push(new flake(true));
  }
}



function draw() {
   // Print title
  background(0, 90, 90);
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
  for (circ = 0; circ < Circles.length; circ++) {
    Circles[circ].display()
  }
}

function findNumbers() {
  let numbers_picked = []
  let next_six = 0;


  // choose a number for each collumn
  let fnum;
  let idx1;
  let start;
  let stop;
  for (let i = 0; i < 90; i += 10) {

    if (i < 10) {
      start = 1;
      stop = 10;
    } else if (i > 80) {
      start = i;
      stop = i + 11;
    } else {
      start = i;
      stop = i + 10;
    }
    fnum = int(random(start, stop));
    numbers_picked.push([fnum]);
    idx1 = all_numbers.indexOf(fnum);
    all_numbers.splice(idx1, 1);
  }


  let nnum;
  let idx2;
  let arr_idx;

  // Chose the last six numbers
  while (next_six < 6) {
    nnum = random(all_numbers);
    idx2 = all_numbers.indexOf(nnum);
    // Remove value from list
    all_numbers.splice(idx2, 1);

    arr_idx = floor(nnum / 10);

    if (arr_idx == 9) {
      arr_idx--
    }

    if (numbers_picked[arr_idx].length < 3) {
      numbers_picked[arr_idx].push(nnum)
      next_six++
    }
  }
  return numbers_picked
}

function placeNumbers(numbers) {
  let board = [];
  let max = 0;
  let min = 0;
  let row_count = [0, 0, 0]
  let orders = [
    [],
    [],
    []
  ]

  for (i = 0; i < 9; i++) {
    // Initialize the board
    board[i] = [0, 0, 0];

    // find the orders of the picked numbers
    orders[numbers[i].length - 1].push(numbers[i]);
  }
  while (row_count[0] < 5 && row_count[1] < 5 && row_count[2] < 5) {
    for (j = 2; j >= 0; j--) {
      // Set working array
      let work_arr = orders[j]
      // Pick a tuple

      let tuple_count = 0
      while (work_arr.length > 0) {
        // Pick a tuple
        let num_pkd = random(work_arr)
        // Find index of picked tuble
        let order_idx = work_arr.indexOf(num_pkd) // TODO is this used??

        if (j == 2) {
          // We place the tuples of length three
          let idx_board = numbers.indexOf(num_pkd)
          let sort_nums = num_pkd.sort()
          board[idx_board][0] = sort_nums[0]
          board[idx_board][1] = sort_nums[1]
          board[idx_board][2] = sort_nums[2]

          // Advance counters
          tuple_count++
          row_count[0]++
          row_count[1]++
          row_count[2]++

        } else if (j == 1) {

          // We place the tuples of length two
          let av_rows = [];
          // Check for available rows
          for (row = 0; row < 3; row++) {
            if (row_count[row] < 5) {
              av_rows.push(row)
            }
          }
          if (av_rows.length == 2) {
            // There are only two available rows
            let idx_board = numbers.indexOf(num_pkd)
            let sort_nums = num_pkd.sort()
            for (av_row = 0; av_row < 2; av_row++) {
              board[idx_board][av_rows[av_row]] = sort_nums[av_row]

              // Advance counters
              row_count[av_rows[av_row]]++
            }

            // Advance counters
            tuple_count++

          } else {

            let idx_board = numbers.indexOf(num_pkd)
            let sort_nums = num_pkd.sort()
            let pospos = [
              [0, 1],
              [1, 2]
            ]

            // Pick either high or low
            let high_low = random(pospos)
            let first_pos = random(high_low)
            let first_val = sort_nums[pospos.indexOf(high_low)]

            // Remove high_low from pospos
            pospos.splice(pospos.indexOf(high_low), 1);
            // Reduce dimensionality 
            pospos = pospos[0];

            // Remove first_pos from pospos
            if (pospos.indexOf(first_pos) > -1) {
              pospos.splice(pospos.indexOf(first_pos), 1);
            }
            // Pick Second Position
            let second_pos = random(pospos);
            let second_val = sort_nums[(sort_nums.indexOf(first_val) + 1) % 2]

            // Set board positions
            board[idx_board][first_pos] = first_val;
            board[idx_board][second_pos] = second_val;

            // Advance counters
            tuple_count++
            row_count[first_pos]++
            row_count[second_pos]++
          }
        } else {
          // We place the tuples of length one
          let idx_board = numbers.indexOf(num_pkd)
          let av_rows = [];
          // Check for available rows
          for (row = 0; row < 3; row++) {
            if (row_count[row] < 5) {
              av_rows.push(row)
            }
          }
          // Pick available position
          let pos = random(av_rows);

          // Set board value
          board[idx_board][pos] = num_pkd[0];

          // Advance counters 
          tuple_count++
          row_count[pos]++

        }
        // Remove tuple from working array
        work_arr.splice(order_idx, 1)
      }
    }
  }
  return board;
}

function mousePressed() {
  for (i = 0; i < Circles.length; i++) {
    Circles[i].clicked(mouseX, mouseY);
  }
}

function CreateCircles(board) {

  let offset = (h + w) * 0.05;

  let x_center = w / 2;
  let y_center = h / 2;

  let y_start = y_center - offset;

  for (i = 0; i < 3; i++) {
    let x_start = x_center - 4 * offset;
    for (j = 0; j < 9; j++) {
      thisCircle = new Circle(x_start, y_start, 0.5 * offset * 0.9, board[j][i])
      Circles.push(thisCircle)
      x_start += offset;
    }
    y_start += offset;
  }
}

function windowResized() {
  let w1 = w;
  let h1 = h;
  resizeCanvas(windowWidth, windowHeight);
  w = window.innerWidth;
  h = window.innerHeight;

  // Update circle size and position
  let offset = (h + w) * 0.05;

  let x_center = w / 2;
  let y_center = h / 2;

  for (circ = 0; circ < Circles.length; circ++) {
    let old_size = Circles[circ].size
    Circles[circ].size = 0.5 * offset * 0.9;
    Circles[circ].x = (w * Circles[circ].x / w1) * ((0.5 * offset * 0.9) / old_size);
    Circles[circ].y = (h * Circles[circ].y / h1) * ((0.5 * offset * 0.9) / old_size);
  }
}

function printTitle(sed) {

  textSize(h * 0.15);
  textFont("Tangerine")
  fill(255);
  textAlign(CENTER, CENTER);
  text(title, w / 2, h * (0.1));

  textSize(h * 0.15);
  textFont("Tangerine")
  fill(255, 160, 50);
  textAlign(CENTER, CENTER);
  text(title, w / 2 - 1.2, h * (0.1) - 1.2);

  textFont('p')
  // Print the seed
  textSize(h * 0.015);
  text('Dit plade nummer er: ' + str(sed), w / 2, h * (1 - 0.05));
  textAlign(CENTER, CENTER);
  fill(255);
}