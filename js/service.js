var gBooks;
const PAGE_SIZE = 3;
var gPageIdx = 0;

function getBooks() {
  var books = gBooks;

  const startIdx = gPageIdx * PAGE_SIZE;
  books = books.slice(startIdx, startIdx + PAGE_SIZE);
  return books;
}

function createBooks() {
  var books = loadFromStorage('booksDB');
  console.log(books);
  if (books.length !== 0) gBooks = books;
  else {
    console.log('you are in create books');
    gBooks = [
      createBook('harry potter', '100$'),
      createBook('lord of the rings', '150$'),
      createBook('girl with a dragon tattoo', '122$'),
      createBook('every dog ', '100$'),
    ];
    saveToStorage('booksDB', gBooks);
  }
}

function createBook(name, price) {
  var book = {
    id: _makeId(),
    bookname: name,
    price: price,
    rate: 0,
  };
  return book;
}

function addBook(name, price) {
  console.log('you are in add books');
  var book = createBook(name, price);
  gBooks.unshift(book);
  saveToStorage('booksDB', gBooks);
}

function deleteBook(id) {
  console.log('you are on delete book');
  var bookIdx = gBooks.findIndex((book) => book.id === id);
  console.log(bookIdx);
  gBooks.splice(bookIdx, 1);
  saveToStorage('booksDB', gBooks);
  console.log(gBooks);
}

function updatedBookIdx(id, bookCurrPrice) {
  var updatedBookIdx = gBooks.findIndex((book) => book.id === id);
  console.log(updatedBookIdx);
  gBooks[updatedBookIdx].price = bookCurrPrice;
  saveToStorage('booksDB', gBooks);
}

function rateUpdate(bookId, key) {
  //   console.log(bookId);
  var UpdatedBookRateIdx = gBooks.findIndex((book) => book.id === bookId);
  if (gBooks[UpdatedBookRateIdx].rate === 0 && key === '-') return;
  if (gBooks[UpdatedBookRateIdx].rate === 9 && key === '+') return;
  if (key === '+') gBooks[UpdatedBookRateIdx].rate++;
  if (key === '-') gBooks[UpdatedBookRateIdx].rate--;
  saveToStorage('booksDB', gBooks);
}

function nextPage() {
  gPageIdx++;
  if (gPageIdx * PAGE_SIZE >= gBooks.length) {
    gPageIdx = 0;
  }
}

function prevPage() {
  if (gPageIdx === 0) {
    return;
  } else {
    gPageIdx--;
  }
}

function _makeId(length = 5) {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var txt = '';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
