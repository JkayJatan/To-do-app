let tasks = [];
const renderTasks = () => {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        listitem.innerHTML = `
                <div class="listitem">
                    <div class="task">
                        <input type="checkbox" class="checkbox">
                        <p>finish this project</p>
                    </div>
                    <div class="icons">
                        <img src="edit.png" alt="edit.png">
                        <img src="delete.png" alt="delete.png">
                    </div>
                </div>`;
                
        taskList.appendChild(li);
    });

};
const addtask = () => {
    const taskinput = document.getElementById("taskinput");
    const text = taskinput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        taskinput.value = "";
        console.log(tasks);
        renderTasks();
    }
}

let inputtask = document.getElementById("taskinput");
document.getElementById("addtaskbtn").addEventListener('click', function (e) {
    e.preventDefault();
    addtask();
});
