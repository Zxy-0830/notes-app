'use strict';

const notes = [];
const date = new Date;
const input = new String; 
let count = 0;

class Note {
  #title;
  #content;
  #date;

  constructor(title, content) {
    this.#title = title;
    this.#content = content;
    this.#date = new Date().toDateString();
  }

  set title(title) {
    if (title.length > 0) {
      this.#title = title
    }
  }

  get title() {
    return this.#title;
  }
  
  set content(content) {
    if (content.length > 0) {
      this.#content = content
    }
  }

  get content() {
    return this.#content;
  }

  set date(date) {
    this.#date = date;
  }

  get date() {
    return this.#date;
  }
}

const noteForm = document.getElementById('noteForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const titleError = document.getElementById('titleError');
const contentError = document.getElementById('contentError');
const noteCount = document.getElementById('noteCount');
const notesContainer = document.getElementById('notesContainer');
const button = document.getElementById('button');
const output = document.getElementById('output');

function listEntries(div, input) {
  let title = document.createElement('div');
  let content = document.createElement('div');
  let date = document.createElement('div');

  div.classList.add('note');

  title.innerText = `${input.title}`;
  content.innerText = `${input.content}`;
  date.innerText = `${input.date}`;

  div.append(title, content, date);
  div.appendChild(createDeleteButton());
  notesContainer.append(div);
}

function divNote() {
  let div = document.createElement('div');

  const note = new Note(titleInput.value, contentInput.value);

  if (titleInput.value.trim().length > 0 && contentInput.value.trim().length > 0) {
    notes.unshift(note);
    listEntries(div, note);
    count++;
    noteCount.innerText = `Total Notes: ${count}`;

    titleInput.value = "";
    contentInput.value = "";
    return;
  }
}

button.addEventListener('click', function(event) {
  event.preventDefault();
  if (checkInput()) {
    divNote();
  }
});

function  createDeleteButton() {
  const deleteBtn = document.createElement('span');

  deleteBtn.innerText = 'delete';
  deleteBtn.style.cursor = 'pointer';
  deleteBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const noteDiv = event.target.parentElement;
    noteDiv.remove();
    count--;
    noteCount.innerText = `Total Notes: ${count}`;
  });
  return deleteBtn;
}

function checkInput() {
  if (titleInput.value.trim().length <= 0) {
    titleError.innerText = 'Please enter title here';
    return false;
  } else {
    titleError.innerText = '';
  }

  if (contentInput.value.trim().length <= 0) {
    contentError.innerText = 'Please enter content here';
    return false;
  } else {
    contentError.innerText = '';
  }

  return true;
}