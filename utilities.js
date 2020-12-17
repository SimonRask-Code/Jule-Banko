class Circle {
  constructor(x, y, size, value) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.value = value;
    this.on = false;
  }

  display() {
    // Draw ellipse

    fill(255);
    noStroke();
    ellipse(this.x, this.y - 6, this.size * 2);
    if (this.on) {
      // If tuned on
      fill(DarkBackground)
      strokeWeight(4);
      stroke(DarkText)
    } else {
      fill(LightBackground);
      strokeWeight(4);
      stroke(LightText);
    }

    ellipse(this.x, this.y, this.size * 2);

    // Draw value
    noStroke();
    textSize(this.size * 0.8);
    textFont('none');

    if (this.value != 0) {
      if (this.on) {
        fill(DarkText)
        textAlign(CENTER, CENTER);
        text(this.value, this.x, this.y);
      } else {
        fill(LightText)
        textAlign(CENTER, CENTER);
        text(this.value, this.x, this.y);
      }
    }
  }

  clicked(x, y) {
    if (dist(x, y, this.x, this.y) < this.size && this.value != 0) {
      this.on = !this.on;
      return true
    } else {
      return false
    }
  }

}

class clearBoardButton {
  constructor() {
    let center_x = windowWidth * 0.5;
    let center_y = windowHeight * 0.5;

    let w_prime = center_x * (4 / 5);
    let h_prime = center_y * (1 / 3);

    let xoff = 2 * w_prime / 9;
    let yoff = 2 * h_prime / 3;

    let offset = 1.15 * min(xoff, yoff);

    this.x = windowWidth * 0.02;
    this.y = h - 0.9 * offset;
    this.size = 1.5 * offset;

    this.value = 'Ryd pladen';

    this.on = false;
    this.on_for = 0;
  }

  display() {
    // Draw ellipse

    fill(255);
    noStroke();
    rect(this.x, this.y - 6, this.size, this.size / 3, this.size / 6);
    if (this.on) {
      // If tuned on
      fill(DarkBackground)
      strokeWeight(4);
      stroke(DarkText)
    } else {
      fill(LightBackground);
      strokeWeight(4);
      stroke(LightText);
    }

    rect(this.x, this.y, this.size, this.size / 3, this.size / 6);

    // Draw value
    noStroke();
    textFont('none');
    textSize(this.size * 0.15);

    if (this.on) {
      fill(DarkText)
      textAlign(CENTER, CENTER);
      text(this.value, this.x + this.size / 2, this.y + this.size / 6);
      this.on_for++;

    } else {
      fill(LightText)
      textAlign(CENTER, CENTER);
      text(this.value, this.x + this.size / 2, this.y + this.size / 6);
    }

    if (this.on_for > 5) {
      this.on = false;
      this.on_for = 0;
    }
  }

  clicked(x, y, board) {
    if (
      x < this.x + this.size &&
      x > this.x &&
      y < this.y + this.size / 3 &&
      y > this.y
    ) {
      this.on = !this.on;
      // reset board
      for (i = 0; i < board.Circles.length; i++) {
        board.Circles[i].on = false
      }
      return true
    } else {
      return false
    }
  }

  resize() {
    let center_x = windowWidth * 0.5;
    let center_y = windowHeight * 0.5;

    let w_prime = center_x * (4 / 5);
    let h_prime = center_y * (1 / 3);

    let xoff = 2 * w_prime / 9;
    let yoff = 2 * h_prime / 3;

    let offset = 1.15 * min(xoff, yoff);

    this.x = windowWidth * 0.02;
    this.y = h - 0.9 * offset;
    this.size = 1.5 * offset;
  }
}


class newBoardButton {
  constructor() {
    let center_x = windowWidth * 0.5;
    let center_y = windowHeight * 0.5;

    let w_prime = center_x * (4 / 5);
    let h_prime = center_y * (1 / 3);

    let xoff = 2 * w_prime / 9;
    let yoff = 2 * h_prime / 3;

    let offset = 1.15 * min(xoff, yoff);

    this.size = 1.5 * offset;
    this.x = windowWidth * (1 - 0.02) - this.size;
    this.y = h - 0.9 * offset;




    this.value = 'Ny plade';

    this.on = false;
    this.on_for = 0;
  }

  display() {
    // Draw ellipse

    fill(255);
    noStroke();
    rect(this.x, this.y - 6, this.size, this.size / 3, this.size / 6);
    if (this.on) {
      // If tuned on
      fill(DarkBackground)
      strokeWeight(4);
      stroke(DarkText)
    } else {
      fill(LightBackground);
      strokeWeight(4);
      stroke(LightText);
    }

    rect(this.x, this.y, this.size, this.size / 3, this.size / 6);

    // Draw value
    noStroke();
    textFont('none');
    textSize(this.size * 0.15);

    if (this.on) {
      fill(DarkText)
      textAlign(CENTER, CENTER);
      text(this.value, this.x + this.size / 2, this.y + this.size / 6);
      this.on_for++;

    } else {
      fill(LightText)
      textAlign(CENTER, CENTER);
      text(this.value, this.x + this.size / 2, this.y + this.size / 6);
    }

    if (this.on_for > 5) {
      this.on = false;
      this.on_for = 0;
    }
  }

  clicked(x, y, board) {
    if (
      x < this.x + this.size &&
      x > this.x &&
      y < this.y + this.size / 3 &&
      y > this.y
    ) {
      this.on = !this.on;
      board.seed++;
      board.numbers = findNumbers(board.seed);
      board.board = placeNumbers(board.numbers);
      board.Circles = CreateCircles(board.board);

      return true
    } else {
      return false
    }
  }

  resize() {
    let center_x = windowWidth * 0.5;
    let center_y = windowHeight * 0.5;

    let w_prime = center_x * (4 / 5);
    let h_prime = center_y * (1 / 3);

    let xoff = 2 * w_prime / 9;
    let yoff = 2 * h_prime / 3;

    let offset = 1.15 * min(xoff, yoff);

    this.size = 1.5 * offset;
    this.x = windowWidth * (1 - 0.02) - this.size;
    this.y = h - 0.9 * offset;
  }
}

class newBoard {
  constructor(seed) {
    this.seed = seed;
    this.numbers = findNumbers(seed);
    this.board = placeNumbers(this.numbers);
    this.Circles = CreateCircles(this.board);
    this.displaying = true;
  }

  display() {
    if (this.displaying) {
      for (i = 0; i < this.Circles.length; i++) {
        this.Circles[i].display()
      }
    }
  }

  resize() {
    let center_x = windowWidth * 0.5;
    let center_y = windowHeight * 0.5;

    let w_prime = center_x * (4 / 5);
    let h_prime = center_y * (1 / 3);

    let xoff = 2 * w_prime / 9;
    let yoff = 2 * h_prime / 3;

    let offset = 1.15 * min(xoff, yoff);
    let y_start = center_y - offset;

    for (i = 0; i < 3; i++) {
      let x_start = center_x - 4 * offset;
      for (j = 0; j < 9; j++) {
        let index = i * 9 + j;
        this.Circles[index].x = x_start;
        this.Circles[index].y = y_start;
        this.Circles[index].size = 0.5 * offset * 0.9;

        x_start += offset;
      }
      y_start += offset;
    }
  }
  clicked(x, y) {
    if (this.displaying) {
      for (i = 0; i < this.Circles.length; i++) {
        this.Circles[i].clicked(x, y);
      }
    }

  }
}

// Functionalities
function findNumbers(seed) {
  randomSeed(seed)

  let all_numbers = [];

  for (i = 1; i < 91; i++) {
    append(all_numbers, i)
  }

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

function CreateCircles(board) {
  let Circles = [];

  let center_x = windowWidth * 0.5;
  let center_y = windowHeight * 0.5;

  let w_prime = center_x * (4 / 5);
  let h_prime = center_y * (1 / 3);

  let xoff = 2 * w_prime / 9;
  let yoff = 2 * h_prime / 3;

  let offset = 1.15 * min(xoff, yoff);
  let y_start = center_y - offset;

  for (i = 0; i < 3; i++) {
    let x_start = center_x - 4 * offset;
    for (j = 0; j < 9; j++) {
      thisCircle = new Circle(x_start, y_start, 0.5 * offset * 0.9, board[j][i])
      Circles.push(thisCircle)
      x_start += offset;
    }
    y_start += offset;
  }
  return Circles
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
      // Loop the through the tuples in random order
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

function printTitle() {
  let h = windowHeight;
  let w = windowWidth;

  let center_x = w * 0.5;
  let center_y = h * 0.5;

  let w_prime = center_x * (4 / 5);
  let h_prime = center_y * (1 / 3);

  let xoff = 2 * w_prime / 9;
  let yoff = 2 * h_prime / 3;

  let offset = 1.15 * min(xoff, yoff);

  textSize(1.2 * offset);
  textFont("Tangerine")
  // snow color
  fill(255);
  textAlign(CENTER, CENTER);
  text(title, w / 2, 1.25 * offset);

  textSize(1.2 * offset);
  textFont("Tangerine")

  fill(LightText);
  textAlign(CENTER, CENTER);
  text(title, w / 2 - 1.2, 1.25 * offset - 1.2);

  textFont("Roboto Condensed")
  textSize(h * 0.018);
  text('Made by: Simon Rask', w / 2, h * (1 - 0.05));
  textAlign(CENTER, CENTER);
  fill(255);
}
