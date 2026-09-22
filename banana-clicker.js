#!/usr/bin/env node
// Banana Clicker — a terminal app for BananaPeel.
// SPACE = pick a banana, M = buy a monkey (picks bananas for you), Q = quit.

let bananas = 0;
let monkeys = 0;
let msg = "";
const monkeyPrice = () => 10 + monkeys * 5;

const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

const BANANA = [
  "        _",
  "       //\\",
  "       V  \\",
  "        \\  \\_",
  "         \\,'.`-.",
  "          |\\ `. `.",
  "          ( \\  `. `-.                        _,.-:\\",
  "           \\ \\   `.  `-._             __..--' ,-';/",
  "            \\ `.   `-.   `-..___..---'   _.--' ,'/",
  "             `. `.    `-._        __..--'    ,' /",
  "               `. `-_     ``--..''       _.-' ,'",
  "                 `-_ `-.___        __,--'   ,'",
  "                    `-.__  `----\"\"\"    __.-'",
  "                         `--..____..--'",
];

function draw() {
  process.stdout.write("\x1b[2J\x1b[H"); // clear screen
  console.log(bold(yellow("\n   🍌  BANANA CLICKER  🍌\n")));
  console.log(yellow(BANANA.join("\n")));
  console.log(`\n   ${bold(bananas + (bananas === 1 ? " banana" : " bananas"))}`);
  console.log(`   🐒 monkeys: ${monkeys}  ${dim(`(each picks 1 banana per second)`)}\n`);
  console.log(`   ${bold("SPACE")} pick a banana   ${bold("M")} buy a monkey (${monkeyPrice()} 🍌)   ${bold("Q")} quit`);
  if (msg) console.log(`\n   ${msg}`);
}

function quit() {
  process.stdout.write("\x1b[?25h"); // show cursor again
  console.log(`\n   You finished with ${bananas} bananas and ${monkeys} monkeys. Bye! 🍌\n`);
  process.exit(0);
}

if (!process.stdin.isTTY) {
  console.log("Banana Clicker needs a real terminal window.");
  process.exit(1);
}

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdout.write("\x1b[?25l"); // hide cursor

process.stdin.on("data", (key) => {
  if (key === "q" || key === "Q" || key === "\u0003") return quit(); // Q or Ctrl+C
  if (key === " " || key === "\r") {
    bananas++;
    msg = "";
  } else if (key === "m" || key === "M") {
    if (bananas >= monkeyPrice()) {
      bananas -= monkeyPrice();
      monkeys++;
      msg = "🐒 You got a monkey!";
    } else {
      msg = `Not enough bananas — you need ${monkeyPrice()}.`;
    }
  }
  draw();
});

setInterval(() => {
  if (monkeys > 0) { bananas += monkeys; draw(); }
}, 1000);

draw();
