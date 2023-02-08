let xnext = true;
let gameOver = false;
let state = new Array(9);
const lines = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
  [2, 4, 6],
];

for (let i = 0; i < 9; i++) {
  const cell = document.getElementById("cell-" + i);

  cell.onclick = (e) => {
    usermove(i);
  };
}

function usermove(pos) {
  if (gameOver || state[pos]) return;
  state[pos] = xnext ? "X" : "O";
  xnext = !xnext;

  update_board();
}

function update_board() {
  const st = document.getElementById("status");
  st.innerHTML = get_status();

  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById("cell-" + i);

    cell.innerHTML = state[i] ?? "";
  }
}

function get_status() {
  let status = xnext ? "Next: X" : "Next: O";
  status = get_winner() ?? status;
  return status;
}

function get_winner() {
  let a, b, c;
  for (let line of lines) {
    a = state[line[0]];
    b = state[line[1]];
    c = state[line[2]];
    console.log(line);
    if (a && a == b && b == c) {
      gameOver = true;
      if (a == "X") {
        return "X Won the match by 12/4 points";
      } else {
        return "O Won the match by 9/3 points";
      }
    }
  }

  if (isBoardFull()) {
    return "No ones win the match.So please go home ";
  }
  return null;
}

function isBoardFull() {
  var count = 0;
  for (let s of state) {
    if (s) {
      count++;
    }
  }
  if (count == 9) return true;
  return false;
}
function reSet() {
  xnext = true;
  gameOver = false;
  state = new Array(9);
  update_board();
}
