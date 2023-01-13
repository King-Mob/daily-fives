if (!localStorage.getItem("past")) {
  const past = [];
  localStorage.setItem("past", JSON.stringify(past));
}

const past = JSON.parse(localStorage.getItem("past"));

if (localStorage.getItem("today")) {
  const day = JSON.parse(localStorage.getItem("today"));

  const dayDate = day.date.slice(0, 10);
  const todayDate = new Date().toISOString().slice(0, 10);

  if (dayDate !== todayDate) {
    past.push(day);
    localStorage.setItem("past", JSON.stringify(past));
    localStorage.removeItem("today");
  }
} else {
  const newDay = {
    date: new Date(),
    meditate: false,
    eat: false,
    gym: false,
    work: false,
    recreate: false,
  };
  localStorage.setItem("today", JSON.stringify(newDay));
}

const today = JSON.parse(localStorage.getItem("today"));

console.log(past);
console.log(today);

function toggleItem(itemName) {
  today[itemName] = !today[itemName];
  localStorage.setItem("today", JSON.stringify(today));
  applyColours();
}

const meditateButton = document.getElementById("meditate");
const gymButton = document.getElementById("gym");
const eatButton = document.getElementById("eat");
const workButton = document.getElementById("work");
const recreateButton = document.getElementById("recreate");

const buttons = [
  meditateButton,
  gymButton,
  eatButton,
  workButton,
  recreateButton,
];

buttons.forEach((button) => (button.onclick = () => toggleItem(button.id)));

function applyColours() {
  buttons.forEach((button) => {
    if (today[button.id]) {
      button.className = "done";
    } else {
      button.className = "not-done";
    }
  });
}

applyColours();
