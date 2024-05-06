"use strict";

const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("todo-btn");
const todoContents = document.querySelector(".task__list");

addBtn.addEventListener("click", addTodo);
todoContents.addEventListener("click", completedTodo);
todoContents.addEventListener("click", removeTodo);

document.addEventListener("DOMContentLoaded", () => getTodos());

// document.querySelector(".todo-input").addEventListener("keydown", function (e) {
//   if (e.key === "Enter") {
//     addTodo(e);
//   }
// });

function addTodo(e) {
  e.preventDefault();

  if (todoInput.value === "") return;
  else {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);

    const trashButton = document.createElement("button");
    trashButton.textContent = "Delete";
    // trashButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoContents.appendChild(todoDiv);

    todoInput.value = "";
  }
}

function completedTodo(e) {
  if (e.target.classList.contains("todo-item")) {
    e.target.classList.toggle("completed");
  }
}

function removeTodo(e) {
  if (e.target.classList.contains("trash-btn")) {
    e.target.parentElement.remove();
    removeLocalTodos(e.target.parentElement);
  }
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const trashButton = document.createElement("button");
    trashButton.textContent = "Delete";
    // trashButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoContents.appendChild(todoDiv);

    localStorage.setItem("todos", JSON.stringify(todos));
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
