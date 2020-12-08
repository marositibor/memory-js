const array16 = [
  "🎄",
  "❤️",
  "👼",
  "🎅",
  "🎁",
  "☃️",
  "❄️",
  "🍪",
  "🎄",
  "❤️",
  "👼",
  "🎅",
  "🎁",
  "☃️",
  "❄️",
  "🍪"
];

const game = {
  status: "game",
  board: [],
  startTime: 0,
  selection: [],
  score: 0
};
const board = document.getElementById("board");
const start = document.getElementById("start");
const menu = document.getElementById("menu");

start.addEventListener("click", () => {
  gameInit();
});

//https://stackoverflow.com/a/12646864
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function gameInit() {
  shuffleArray(array16);
  menu.innerHTML = `<div><span>Talált párok:</span> <span id="score">0</span></div>
  <div><span>Hátravan még:</span> <span id="remaining">8</span></div>`;
  board.innerHTML = "";
  game.board = array16.map((emoji, index) => {
    const element = document.createElement("div");
    element.textContent = emoji;
    element.setAttribute("index", index);
    element.setAttribute("hidden", true);
    element.addEventListener("click", handleClickField);
    return element;
  });

  game.board.forEach((element) => board.appendChild(element));
  game.status = "game";
  game.score = 0;
  game.selection = [];
  game.startTime = Date.now();
}

function handleClickField(event) {
  console.log(event.target);
  console.log(game.selection[0] instanceof HTMLElement);
  console.log(game.selection[1] instanceof HTMLElement);
  if (event.target.hasAttribute("hidden")) {
    if (game.selection.length < 2) {
      game.selection.push(event.target);
      event.target.removeAttribute("hidden");
    }
    if (game.selection.length === 2) {
      if (game.selection[0].textContent === game.selection[1].textContent) {
        console.log("SAME!");
        game.selection.forEach((el) => {
          el.style.setProperty("background", "green");
        });
        const timeout = setTimeout(() => {
          game.selection.forEach((el) => {
            el.setAttribute("found", true);
          });
          game.selection = [];
          clearTimeout(timeout);
          checkWinCondAndScore();
        }, 1000);
      } else {
        console.log("DIFFERENT");
        const timeout = setTimeout(() => {
          game.selection.forEach((el) => {
            el.setAttribute("hidden", true);
          });
          game.selection = [];
          clearTimeout(timeout);
        }, 1000);
      }
    }
  }
}

function checkWinCondAndScore() {
  let foundNr = 0;
  game.board.forEach((element) => {
    if (element.hasAttribute("found")) {
      foundNr++;
    }
  });
  document.getElementById("score").innerHTML = foundNr / 2;
  document.getElementById("remaining").innerHTML = 8 - foundNr / 2;
  if (foundNr === 16) {
    youWon();
  }
}

function youWon() {
  board.innerHTML = `<span>🎉Gratulálok, Nyertél!🎉</span><span>${
    (Date.now() - game.startTime) / 1000
  } másodperc alatt</span><button id="restart">Újra!</button>`;
  const restart = document.getElementById("restart");

  restart.addEventListener("click", () => {
    gameInit();
  });
}
