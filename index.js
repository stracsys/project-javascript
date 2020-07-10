const parity = document.querySelector('select');
for (let i = 1; i < 37; i++) {
  if (i === 1) parity.innerHTML += "<option value=\"impair\" selected>" + i + "</option>"
  else if (i % 2 === 0) parity.innerHTML += "<option value=\"pair\">" + i + "</option>"
  else parity.innerHTML += "<option value=\"impair\">" + i + "</option>"
}

let misePlayer = 5, moneyPlayer = 100, moneyComputer = 0, add;

const mise = document.querySelector('input');
mise.addEventListener('input', function (event) {
  misePlayer = parseInt(event.target.value)
})

let randomNumber;

const result = document.getElementById('result');
const portefeuille = document.getElementById('portefeuille');
const win = (gain) => {
  add = misePlayer * gain;
  moneyPlayer += add;
}
const lost = () => {
  moneyPlayer -= misePlayer;
  moneyComputer += misePlayer;
}

const number = document.getElementById('number');
const game = () => {
  randomNumber = Math.floor(Math.random() * Math.floor(37));
  if (randomNumber === 0) {
    result.textContent = randomNumber + " Lose"
    lost();
  } else if (randomNumber == parity.children[parity.selectedIndex].text) {
    win(36);
    result.textContent = randomNumber + " Parfait - Win " + add + " mille FCFA"
  } else if (randomNumber % 2 === 0 && parity.value === 'pair') {
    win(2);
    result.textContent = randomNumber + " Pair - Win " + add + " mille FCFA"
  } else if (randomNumber % 2 != 0 && parity.value === 'impair') {
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
}

const go = document.querySelector('button');
go.addEventListener('click', game);

let z = 1;
const img = () => {
  const body = document.querySelector('body');
  if (z === 6) z = 0;
  z++;
  body.style.backgroundImage = "url(./casino" + z + ".jpg)"
  setTimeout(img, 5000);
}
setTimeout(img, 5000);