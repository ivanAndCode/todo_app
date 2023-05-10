let todoForm;
let todoList;
let todoInput;

let todos = ['Buy milk', 'Complete all tasks'];

function getTodoInnerHtml(todoItem, index) {
  return `
      <span class="todo-text">${todoItem}</span>
      <button id="delete-button-${index}" onclick="deleteTodo(${index})">X</button>
    `;
}

function renderTodos() {
  console.log('inside renderTodo')

  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = getTodoInnerHtml(todo, index);
    todoList.appendChild(li);
  });

  todoInput.focus()
  checkTodoListLength()

}

function addTodo() {
  console.log('inside addTodo')

  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    todos.push(todoText);
    renderTodos();
    todoInput.value = '';
  }
}

function deleteTodo(index) {
  console.log('inside deleteTodo')
  const button = document.getElementById(`delete-button-${index}`);

  const li = button.parentElement;
  li.remove();

  todos.splice(index, 1);

  renderTodos()
}

function checkTodoListLength() {
  const todoList = document.getElementById('todo-list');
  const todoItems = todoList.getElementsByTagName('li');
  const banner = document.getElementById('banner');

  if (todoItems.length > 10) {
    banner.style.display = 'block';
  } else {
    banner.style.display = 'none';
  }
}


document.addEventListener('DOMContentLoaded', function () {
  todoForm = document.getElementById('todo-form');
  todoInput = document.getElementById('todo-input');
  todoList = document.getElementById('todo-list');

  todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addTodo();
  });

  if (todos.length > 0) {
    renderTodos()
  }
});
