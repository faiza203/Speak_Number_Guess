const msgDoc = document.getElementById("msg");
const ranNum = getRandomNumber();
console.log("Number:", ranNum);
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
recognition.start();
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}
function writeMessage(msg) {
  msgDoc.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}
function checkNumber(msg) {
  const num = +msg;
  if (Number.isNaN(num)) {
    msgDoc.innerHTML += "<div>That is not a valid number</div>";
    return;
  }
  if (num > 100 || num < 1) {
    msgDoc.innerHTML += "<div>Number must be between 1 and 100</div>";
    return;
  }
  if (num === ranNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > ranNum) {
    msgDoc.innerHTML += "<div>GO LOWER</div>";
  } else {
    msgDoc.innerHTML += "<div>GO HIGHER</div>";
  }
}
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
recognition.addEventListener("result", onSpeak);
recognition.addEventListener("end", () => recognition.start());
document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
