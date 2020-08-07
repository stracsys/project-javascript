const parity = document.querySelector('select');
for (let i = 1; i < 37; i++) {
  if (i === 1) parity.innerHTML += "<option>" + i + "</option>"
  else if (i % 2 === 0) parity.innerHTML += "<option>" + i + "</option>"
  else parity.innerHTML += "<option>" + i + "</option>"
}

let misePlayer, moneyPlayer = 100, moneyComputer = 0, add;

const status = document.getElementById('status');
const mise = document.querySelector('input[type="number"]');

mise.addEventListener('input', function (event) {
  if (event.target.value > 0) {
    status.style.color = "green"
    status.textContent = "Faites vos Jeux"
  }
  else {
    status.style.color = "red"
    status.textContent = "Mise Invalide";
  }
})

const img = document.getElementById('img');
const imgAttribute = (src) => {
  img.src = "Image/" + src;
  img.width = "300";
  img.height = "300";
}

const music = document.querySelector('audio');
const playMusic = () => {
  const son = document.querySelector('input[type="checkbox"]');
  if (son.checked === true) music.play();
}

const myMusic = (src) => {
  music.src = "Audio/" + src;
  playMusic();
}

let canvas = document.getElementById('result');
let ctx = canvas.getContext('2d');
ctx.font = "50pt Kaushan"

const win = (gain) => {
  add = misePlayer * gain;
  moneyPlayer += add;
  ctx.fillStyle = "green";
  imgAttribute("win.jpg");
  playMusic();
}

const lose = () => {
  moneyPlayer -= misePlayer;
  moneyComputer += misePlayer;
  ctx.fillStyle = "rgb(190, 56, 3)";
  imgAttribute("lose.webp");
  myMusic('lose.mp4');
}

const result = document.getElementById('result');
const money = document.getElementsByClassName('money');
const rotation = document.getElementById('rotation');
let randomNumber, process = false;
const game = () => {

  ctx.clearRect(0, 0, 300, 300);

  if (!process) {
    misePlayer = parseInt(mise.value);
    if (misePlayer > 0 && misePlayer <= moneyPlayer) {
      process = true;
      imgAttribute("win-lose.jpg");
      myMusic('suspense.mp3');
      status.textContent = "Les jeux sont faits"
      rotation.style.animationPlayState = "running"
      setTimeout(() => {
        randomNumber = Math.floor(Math.random() * Math.floor(37));
        rotation.style.animationPlayState = "paused"

        if (randomNumber === 0) lose();
        else if (randomNumber == parity[parity.selectedIndex].text) {
          music.src = "Audio/win-jackpot.mp3"
          win(36);
        } else if (randomNumber % 2 === 0 && parity.value === 'pair') {
          music.src = "Audio/win.mp3"
          win(2);
        } else if (randomNumber % 2 != 0 && parity.value === 'impair') {
          music.src = "Audio/win.mp3"
          win(2);
        } else lose();

        ctx.fillText(randomNumber, 120, 150);
        money[0].textContent = moneyPlayer + " mille FCFA"
        if (moneyComputer != 0) money[1].textContent = moneyComputer + " mille FCFA"
        status.textContent = "Faites vos Jeux"
        status.style.color = "green"
        process = false;
      }, 4000);

    } else if (misePlayer > moneyPlayer) {
      status.textContent = "Fond Insuffisant"
      status.style.color = "red"
    } else {
      status.textContent = "Entrez une mise >= mille FCFA"
    }
  } else {
    status.textContent = "Patientez"
    status.style.color = "red"
  }
}

const go = document.querySelector('button');
go.addEventListener('click', game);

let z = 1;
const diapo = () => {
  const body = document.querySelector('body');
  if (z === 6) z = 0;
  z++;
  body.style.backgroundImage = "url(Image/casino" + z + ".jpg)"
  setTimeout(diapo, 5000);
}
setTimeout(diapo, 5000);
