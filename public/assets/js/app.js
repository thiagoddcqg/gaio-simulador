let state = {
  week: 1,
  productivity: 70,
  morale: 70,
  burnout: 20,
  risk: 25,
  budget: 100000
};

let events = [];

async function loadEvents() {
  const res = await fetch("/api/events");
  events = await res.json();
}

function updateUI() {
  document.getElementById("week").textContent = state.week;
  document.getElementById("productivity").textContent = state.productivity;
  document.getElementById("morale").textContent = state.morale;
  document.getElementById("burnout").textContent = state.burnout;
  document.getElementById("risk").textContent = state.risk;
  document.getElementById("budget").textContent = state.budget;
}

function randomEvent() {
  const event = events[Math.floor(Math.random() * events.length)];
  document.getElementById("eventText").textContent = event.text;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  event.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.label;
    btn.onclick = () => {
      Object.keys(choice.effect).forEach(key => {
        state[key] += choice.effect[key];
      });
      state.week++;
      updateUI();
      choicesDiv.innerHTML = "";
      document.getElementById("eventText").textContent = "Decisão aplicada. Avance para próxima semana.";
    };
    choicesDiv.appendChild(btn);
  });
}

document.getElementById("nextWeek").addEventListener("click", randomEvent);

loadEvents().then(updateUI);