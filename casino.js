const parity = document.querySelector('select');
for (let i = 1; i < 37; i++) {
  if (i === 1) parity.innerHTML += "<option value=\"impair\" selected>" + i + "</option>"
  else if (i % 2 === 0) parity.innerHTML += "<option value=\"pair\">" + i + "</option>"
  else parity.innerHTML += "<option value=\"impair\">" + i + "</option>"
}

let misePlayer = 5, moneyPlayer = 100, moneyComputer = 0, add;

const status = document.getElementById('status');
const mise = document.querySelector('input');
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

let randomNumber, process = false;

const img = document.getElementById('img');
const imgAttribute = (src, width, height) => {
  img.src = "Image/" + src;
  img.width = width;
  img.height = height;
}

const music = document.querySelector('audio');
const result = document.getElementById('result');
const portefeuille = document.getElementById('portefeuille');
const win = (gain) => {
  add = misePlayer * gain;
  moneyPlayer += add;
  imgAttribute("win.jpg", "285", "280");
  music.play();
}

const myMusic = (src) => {
  music.src = "Audio/" + src;
  music.play();
}
const lost = () => {
  moneyPlayer -= misePlayer;
  moneyComputer += misePlayer;
  imgAttribute("lose.webp", "285", "280");
  myMusic('lose.mp4');
}

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
          lost();
        } else if (randomNumber == parity.children[parity.selectedIndex].text) {
          music.src = "win-jackpot.mp3"
          win(36);
          result.textContent = randomNumber + " Parfait - Win " + add + " mille FCFA"
        } else if (randomNumber % 2 === 0 && parity.value === 'pair') {
          music.src = "win.mp3"
          win(2);
          result.textContent = randomNumber + " Pair - Win " + add + " mille FCFA"
        } else if (randomNumber % 2 != 0 && parity.value === 'impair') {
          music.src = "win.mp3"
          win(2);
          result.textContent = randomNumber + " Impair - Win " + add + " mille FCFA"
        } else {
          if (randomNumber % 2 === 0 && parity.value === 'impair') {
            lost();
            result.textContent = randomNumber + " Pair - Lose"
          } else {
            lost();
            result.textContent = randomNumber + " Impair - Lose"
          }
        }
        portefeuille.firstElementChild.firstElementChild.textContent = moneyPlayer + " mille FCFA"
        if (moneyComputer != 0) portefeuille.lastElementChild.firstElementChild.textContent = moneyComputer + " mille FCFA"
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