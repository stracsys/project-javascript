const parity = document.querySelector('select');
for (let i = 1; i < 37; i++) {
  if (i === 1) parity.innerHTML += "<option value=\"impair\" selected>" + i + "</option>"
  else if (i % 2 === 0) parity.innerHTML += "<option value=\"pair\">" + i + "</option>"
  else parity.innerHTML += "<option value=\"impair\">" + i + "</option>"
}

let misePlayer = 5, moneyPlayer = 100, moneyComputer = 0, add;

const status = document.getElementById('status');
const mise = document.querySelector('input[type="number"]');
mise.addEventListener('input', function (event) {
  misePlayer = parseInt(event.target.value);
  if (misePlayer > 4) {
    status.style.color = "green"
    status.textContent = "Faites vos Jeux"
  }
  else {
    status.style.color = "red"
    status.textContent = "Montant Invalide";
  }
})

const img = document.getElementById('img');
const imgAttribute = (src, width, height) => {
  img.src = "Image/" + src;
  img.width = width;
  img.height = height;
}

const music = document.querySelector('audio');
const playMusic = () => {
  const son = document.querySelector('input[type="checkbox"]');
  if (son.checked === true) music.play();
}

const win = (gain) => {
  add = misePlayer * gain;
  moneyPlayer += add;
  imgAttribute("win.jpg", "285", "280");
  playMusic();
}

const myMusic = (src) => {
  music.src = "Audio/" + src;
  playMusic();
}
const lose = () => {
  moneyPlayer -= misePlayer;
  moneyComputer += misePlayer;
  imgAttribute("lose.webp", "285", "280");
  myMusic('lose.mp4');
}

const result = document.getElementById('result');
const money = document.getElementsByClassName('money');

let randomNumber, process = false;
const number = document.getElementById('number');
const game = () => {
  if (!process) {
    if (misePlayer > 4) {
      process = true;
      imgAttribute("win-lose.jpg", "285", "280");
      myMusic('suspense.mp3');
      status.textContent = "Les jeux sont faits"
      result.textContent = ""
      setTimeout(() => {
        randomNumber = Math.floor(Math.random() * Math.floor(37));
        if (randomNumber === 0) {
          result.textContent = randomNumber + " Lose"
          lose();
        } else if (randomNumber == parity.children[parity.selectedIndex].text) {
          music.src = "Audio/win-jackpot.mp3"
          win(36);
          result.textContent = randomNumber + " Parfait - Win " + add + " mille FCFA"
        } else if (randomNumber % 2 === 0 && parity.value === 'pair') {
          music.src = "Audio/win.mp3"
          win(2);
          result.textContent = randomNumber + " Pair - Win " + add + " mille FCFA"
        } else if (randomNumber % 2 != 0 && parity.value === 'impair') {
          music.src = "Audio/win.mp3"
          win(2);
          result.textContent = randomNumber + " Impair - Win " + add + " mille FCFA"
        } else {
          if (randomNumber % 2 === 0 && parity.value === 'impair') {
            result.textContent = randomNumber + " Pair - Lose"
          } else {
            result.textContent = randomNumber + " Impair - Lose"
          }
          lose();
        }
        money[0].textContent = moneyPlayer + " mille FCFA"
        if (moneyComputer != 0) money[1].textContent = moneyComputer + " mille FCFA"
        status.textContent = "Faites vos Jeux"
        status.style.color = "green"
        process = false;
      }, 5000);
    } else {
      status.textContent = "Saisissez un montant >= 5 mille FCFA"
      result.textContent = ""
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
