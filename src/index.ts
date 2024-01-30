import { v4 as uuidV4 } from "uuid";

// Defining the structure of a Task
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

// Logging a randomly generated UUID
console.log(uuidV4());

// Selecting DOM elements
const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
// Loading tasks from local storage or initializing an empty array
const tasks: Task[] = loadTasks();
// Iterating through each task and adding it to the list
tasks.forEach(addListItem);

// Adding event listener to the form for task submission
form?.addEventListener("submit", e => {
  e.preventDefault();

  // Checking if the input value is empty or null
  if (input?.value == "" || input?.value == null) return;

  // Creating a new task object with a UUID, title, completion status, and creation date
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  };
  // Pushing the new task to the tasks array and saving it to local storage
  tasks.push(newTask);
  saveTasks();

  // Adding the new task to the list and resetting the input value
  addListItem(newTask);
  input.value = "";
});

// Function to add a task to the list
function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  // Adding event listener to the checkbox for updating task completion status
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  // Appending checkbox and task title to the label
  label.append(checkbox, task.title);
  // Appending label to the list item
  item.append(label);
  // Appending list item to the list
  list?.append(item);
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  // Returning an empty array if there are no tasks stored
  if (taskJSON == null) return [];
  // Parsing the stored JSON string into an array of Task objects
  return JSON.parse(taskJSON);
}
