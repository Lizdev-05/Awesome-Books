const form = document.getElementById('form');
// const list = document.querySelector('.table-part');
const tableList = document.querySelector('.table-list');

let books = [];

function displayBooks(id, title, author) {
  const items = document.createElement('li');
  items.innerHTML = `
    <h2>Title: ${title}
     <h2>By: ${author}</h2>
     `;
  const removeBtn = document.createElement('button');
  const bookLine = document.createElement('hr');
  removeBtn.textContent = 'Remove';
  removeBtn.id = id;
  items.append(removeBtn, bookLine);
  removeBtn.addEventListener('click', () => {
    books = books.filter((book) => {
      if (book.id === id) {
        return false;
      }
      return true;
    });
    localStorage.setItem('books', JSON.stringify(books));
    items.remove();
  });
  tableList.appendChild(items);
}

// Error message
function errorMessage(message) {
  document.querySelector('.error').textContent = message;
  setTimeout(() => {
    document.querySelector('.error').textContent = '';
  }, 4000);
}

//  Add book

function addBook(title, author) {
  const id = Date.now();
  const bookList = {
    id,
    title,
    author,
  };

  if (title === '' || author === '') {
    errorMessage('Kindly fill all inputs');
  } else {
    books.push(bookList);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks(bookList.id, bookList.title, bookList.author);
  }
}

// Global variable to check local storage

const myBook = JSON.parse(localStorage.getItem('books'));
if (myBook) {
  books = myBook;
}
books.forEach((book) => {
  displayBooks(book.id, book.title, book.author);
});

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    // if (title.value && author.value) {
    addBook(title.value, author.value);

    // clear input
    title.value = '';
    author.value = '';
  });
});
