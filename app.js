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

// const book = new Book();
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
  // removeBtn.id = id;
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
