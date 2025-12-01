const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const themeToggle = document.getElementById("theme-toggle");

function addTask() {
  const text = inputBox.value.trim();
  if (!text) {
    alert("You must write something!");
    return;
  }
  const li = document.createElement("li");
  li.textContent = text;
  const span = document.createElement("span");
  span.className = 'delete';
  span.setAttribute('aria-label','Delete task');
  span.setAttribute('role','button');
  span.innerHTML = '';
  li.appendChild(span);
  listContainer.appendChild(li);
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  const data = localStorage.getItem("data");
  if (data) listContainer.innerHTML = data;
  const spans = listContainer.querySelectorAll('li span');
  spans.forEach(s => {
    s.classList.add('delete');
    s.setAttribute('aria-label','Delete task');
    s.setAttribute('role','button');
    if (s.textContent.trim() === '×' || s.textContent.trim() === '\u00d7') s.textContent = '';
  });
}
function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeToggle) themeToggle.textContent = '🌙';
  }
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) applyTheme(saved);
  else applyTheme('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
}
inputBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

showTask();
initTheme();
