let days = [
  {
    title: "Day 1 – Arrival & Shibuya",
    highlights: ["Arrive at HND", "Check-in at hotel", "Shibuya Crossing", "Ramen dinner"]
  },
  {
    title: "Day 2 – Asakusa & Akihabara",
    highlights: ["Senso-ji Temple", "Street food", "Akihabara arcades"]
  }
];

let packingItems = ["Passport", "Travel insurance", "Power adapter", "Comfortable shoes"];

const dayListEl = document.getElementById("day-list");
const addDayForm = document.getElementById("add-day-form");
const dayTitleInput = document.getElementById("day-title");
const dayHighlightsInput = document.getElementById("day-highlights");

const packingListEl = document.getElementById("packing-list");
const addItemForm = document.getElementById("add-item-form");
const itemNameInput = document.getElementById("item-name");

const notesText = document.getElementById("notes-text");
const saveNotesBtn = document.getElementById("save-notes");

function renderDays() {
  dayListEl.innerHTML = "";
  days.forEach((day, index) => {
    const card = document.createElement("div");
    card.className = "day-card";

    const header = document.createElement("div");
    header.className = "day-header";

    const title = document.createElement("div");
    title.className = "day-title";
    title.textContent = day.title;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      days.splice(index, 1);
      renderDays();
    });

    header.appendChild(title);
    header.appendChild(removeBtn);

    const highlights = document.createElement("div");
    highlights.className = "day-highlights";
    highlights.textContent = day.highlights.join(" • ");

    card.appendChild(header);
    card.appendChild(highlights);
    dayListEl.appendChild(card);
  });
}

function renderPacking() {
  packingListEl.innerHTML = "";
  packingItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "packing-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = item;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "x";
    removeBtn.addEventListener("click", () => {
      packingItems.splice(index, 1);
      renderPacking();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(removeBtn);
    packingListEl.appendChild(li);
  });
}

addDayForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = dayTitleInput.value.trim();
  const highlightsRaw = dayHighlightsInput.value.trim();

  if (!title || !highlightsRaw) return;

  const highlights = highlightsRaw.split(",").map((h) => h.trim()).filter(Boolean);

  days.push({ title, highlights });
  renderDays();

  dayTitleInput.value = "";
  dayHighlightsInput.value = "";
});

addItemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const item = itemNameInput.value.trim();
  if (!item) return;
  packingItems.push(item);
  renderPacking();
  itemNameInput.value = "";
});

const NOTES_KEY = "travel_itinerary_notes";

function loadNotes() {
  const saved = localStorage.getItem(NOTES_KEY);
  if (saved) {
    notesText.value = saved;
  }
}

saveNotesBtn.addEventListener("click", () => {
  localStorage.setItem(NOTES_KEY, notesText.value);
  saveNotesBtn.textContent = "Saved!";
  setTimeout(() => (saveNotesBtn.textContent = "Save Notes"), 1000);
});

renderDays();
renderPacking();
loadNotes();
