const taskInput = document.getElementById("taskinput");
const addTaskBtn = document.getElementById("addtaskbtn");
const taskList = document.getElementById("taskList");
const countDivs = document.querySelectorAll(".count div");

let pendingCount = 0;
let completedCount = 0;

addTaskBtn.addEventListener("click", function (e) {
    e.preventDefault(); 

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    const li = document.createElement("li");
    li.className = "task-item";

    li.innerHTML = `
        <span>${taskText}</span>
        <div class="actions">
            <button class="complete-btn">✔</button>
            <button class="delete-btn">❌</button>
        </div>
    `;

    // Add to list
    taskList.appendChild(li);
    taskInput.value = ""; // clear input
    pendingCount++;
    updateCounts();
});

taskList.addEventListener("click", function (e) {
    if (e.target.classList.contains("complete-btn")) {
        const taskItem = e.target.closest("li");
        taskItem.classList.toggle("completed");

        if (taskItem.classList.contains("completed")) {
            pendingCount--;
            completedCount++;
        } else {
            pendingCount++;
            completedCount--;
        }

        updateCounts();
    }

    if (e.target.classList.contains("delete-btn")) {
        const taskItem = e.target.closest("li");

        if (taskItem.classList.contains("completed")) {
            completedCount--;
        } else {
            pendingCount--;
        }

        taskItem.remove();
        updateCounts();
    }
});

function updateCounts() {
    countDivs[0].innerText = `Task Pending(${pendingCount})`;
    countDivs[1].innerText = `Task Completed(${completedCount || "N.A"})`;
}
