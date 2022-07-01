const form = document.getElementById('form');
let books = JSON.parse(localStorage.getItem('books'));

// Error message
function errorMessage(message) {
  document.querySelector('.error').textContent = message;
  setTimeout(() => {
    document.querySelector('.error').textContent = '';
  }, 4000);
}

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  addBook() {
    const { title, author, id } = this;
    const bookList = { title, author, id };
    books = JSON.parse(localStorage.getItem('books'));
    if (title === '' || author === '') {
      errorMessage('Kindly fill all inputs');
    } else if (books !== null) {
      books.push(bookList);
      localStorage.setItem('books', JSON.stringify(books));
      books = JSON.parse(localStorage.getItem('books'));
    } else {
      books = [];
      books.push(bookList);
      localStorage.setItem('books', JSON.stringify(books));
      books = JSON.parse(localStorage.getItem('books'));
    }
  }

  remove() {
    const { id } = this;
    books = books.filter((book) => {
      if (book.id === id) {
        return false;
      }
      return true;
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Function for displaying books
function displayBooks(title, author, id) {
  const bookList = document.querySelector('.book-list');
  const items = document.createElement('li');
  items.innerHTML += `
  <div class="title-div"><h2><q>${title}</q></h2>
  <h2> by </h2>
  <h2> ${author}</h2></div>
     `;
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'removeBtn';
  items.appendChild(removeBtn);
  bookList.appendChild(items);

  removeBtn.addEventListener('click', () => {
    const book = new Book(title, author, id);
    id = removeBtn.id;
    book.remove();
    items.remove();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const id = Date.now();
    const book = new Book(title, author, id);
    book.addBook();
    if (title && author) {
      displayBooks(book.title, book.author, book.id);
    }
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  });
});

// Appending book to empty object
if (books !== null) {
  books.forEach((book) => {
    displayBooks(book.title, book.author, book.id);
  });
}

// Navigation

function handleLinkClick(e) {
  const navLinks = document.getElementsByClassName('nav-link');
  for (let i = 0; i < navLinks.length; i += 1) {
    navLinks[i].style.color = '';
  }

  if (e.target.classList.contains('addNav')) {
    document.querySelector('#add').style.display = 'block';
    e.target.style.color = '#f5f5f5';
    document.querySelector('#contact').style.display = 'none';
    document.querySelector('#book-lists').style.display = 'none';
  }
  if (e.target.classList.contains('contact')) {
    document.querySelector('#contact').style.display = 'flex';
    e.target.style.color = '#f5f5f5';
    document.querySelector('#book-lists').style.display = 'none';
    document.querySelector('.form-section').style.display = 'none';
  }

  if (e.target.classList.contains('list')) {
    document.querySelector('#book-lists').style.display = 'block';
    e.target.style.color = '#f5f5f5';
    document.querySelector('#contact').style.display = 'none';
    document.querySelector('.form-section').style.display = 'none';
  }
}

document.addEventListener('click', (e) => {
  handleLinkClick(e);
});

// Date
const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');

/**
 * @param {Date} date
 */
function formatTime(date) {
  const hours12 = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const isAm = date.getHours() < 12;

  return `${hours12.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${isAm ? 'AM' : 'PM'}`;
}

/**
 * @param {Date} date
 */
function formatDate(date) {
  const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return `${DAYS[date.getDay()]}, ${
    MONTHS[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;
}

setInterval(() => {
  const now = new Date();

  timeElement.textContent = formatTime(now);
  dateElement.textContent = formatDate(now);
}, 200);
