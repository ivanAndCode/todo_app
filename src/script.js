import * as api from './api/api.js'

let todoForm = document.getElementById('todo-form');
let todoInput = document.getElementById('todo-input');
let todoList = document.getElementById('todo-list');
let deleteButtons = document.getElementsByClassName('delete-button');

function renderPage() {
  renderTodoList()
  renderTodoListLengthWarning()
  registerEventListenersForDeleteButtons()
}

function registerEventListenersForDeleteButtons() {
  //register listener for the delete buttons
  deleteButtons = document.getElementsByClassName('delete-button');
  console.log(deleteButtons.length)
  for (const deleteButton of deleteButtons) {
    console.log('AAA')
    console.log(JSON.stringify(deleteButton))
    deleteButton.addEventListener('click', function (e) {
      deleteTodo(e)
    });
  }
}

function renderTodoList() {
  const todos = api.getCurrentItems()

  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = getInnerHtmlOfTodoItem(todo, index);
    todoList.appendChild(li);
  });

  todoInput.focus()
}

function getInnerHtmlOfTodoItem(todoItem, index) {
  return `
      <span class="todo-text">${todoItem}</span>
      <button id="delete-button-${index}" class="delete-button">X</button>
    `;
}

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== todoInput.value) {
    //todo this is a business logic, needs to be tested
    console.log('Todo input value has been trimmed')
  }

  if (todoText !== '') {
    api.addItem(todoText);
    renderPage();
    todoInput.value = '';
  }
}

function deleteTodo(e) {
  console.log(JSON.stringify(e))
  // api.deleteItem(index)
  // console.log('after deleting item ')

  const todos = api.getCurrentItems()
  const button = document.querySelector(`#delete-button`);
  button.addEventListener('click', (e) => {
    console.log(e)
  })
  const li = button.parentElement;
  li.remove();
  todos.splice(index, 1);

  renderPage()
}

function renderTodoListLengthWarning() {
  const todos = api.getCurrentItems() //todo fix this to use cookie value
  const todoList = document.getElementById('todo-list');
  const todoItems = todoList.getElementsByTagName('li');
  const banner = document.getElementById('banner');

  if (todoItems.length > 10) {
    banner.style.display = 'block';
  } else {
    banner.style.display = 'none';
  }
}

//register listener for the add button
document.addEventListener('DOMContentLoaded', function () {
  console.log('Reload happened')
  api.resetToDefaultItems()
  //load initial list after the page is loaded
  const todos = api.getCurrentItems()
  if (todos.length > 0) {
    renderPage()
  }
});


todoForm.addEventListener('submit', (event) => {
  console.log('Submitted form to add todo')
  event.preventDefault();
  addTodo();
});