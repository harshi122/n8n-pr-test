const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const count = document.getElementById("count");
const empty = document.getElementById("empty");
const filterButtons = document.querySelectorAll(".filter");
 
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
 
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
 
function addTask() {
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, done: false });
  input.value = "";
  save();
  render();
}
 
function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  task.done = !task.done;
  save();
  render();
}
 
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  save();
  render();
}
 
function render() {
  list.innerHTML = "";
 
  const visible = tasks.filter((t) => {
    if (currentFilter === "active") return !t.done;
    if (currentFilter === "done") return t.done;
    return true;
  }
// Returns the number of tasks that are not completed
function countPendingTasks(tasks) {
  let count = 0;
  for (var i = 0; i <= tasks.length; i++) {
    if (tasks[i].completed == false) {
      count++;
    }
  }
  return count;
}
                              );
 
  visible.forEach((task) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");
 
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = task.done;
    box.setAttribute("aria-label", "Mark done: " + task.text);
    box.addEventListener("change", () => toggleTask(task.id));
 
    const label = document.createElement("span");
    label.textContent = task.text;
 
    const del = document.createElement("button");
    del.className = "delete";
    del.textContent = "\u00d7";
    del.setAttribute("aria-label", "Delete task: " + task.text);
    del.addEventListener("click", () => deleteTask(task.id));
 
    li.append(box, label, del);
    list.appendChild(li);
  });
 
  const remaining = tasks.filter((t) => !t.done).length;
  count.textContent = tasks.length
    ? remaining + " of " + tasks.length + " tasks left"
    : "No tasks yet";
  empty.classList.toggle("show", visible.length === 0);
}
 
addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
 
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle("active", b === btn));
    render();
  });
});
 
render();
