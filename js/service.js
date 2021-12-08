var gBooks;
const PAGE_SIZE = 3;
var gPageIdx = 0;
var gSortTxt = false;
var gSortId = false;
var gSortRate = false;
var gSortPrice = false;

function getBooks() {
  var books = gBooks;

  const startIdx = gPageIdx * PAGE_SIZE;
  books = books.slice(startIdx, startIdx + PAGE_SIZE);
  return books;
}

function createBooks() {
  var books = loadFromStorage('booksDB');
  console.log(books);

  if (!books || books.length === 0) {
    console.log('you are in create books');
    gBooks = [
      createBook('harry potter', '101', '$'),
      createBook('lord of the rings', '150', '$'),
      createBook('girl with a dragon tattoo', '123', '$'),
      createBook('every dog ', '101', '$'),
    ];
    saveToStorage('booksDB', gBooks);
  } else gBooks = books;
}

function createBook(name, price, mark) {
  var book = {
    id: _makeId(),
    bookname: name,
    price: price,
    mark: mark,
    rate: 0,
  };
  return book;
}

function addBook(name, price) {
  console.log('you are in add books');
  var lang = getLang();
  var key;
  if (lang === 'he') key = '₪';
  else key = '$';
  var book = createBook(name, price, key);
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
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var txt = '';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function setSort(sortBy) {
  if (sortBy === 'TXT') {
    if (gSortTxt === false) {
      gSortTxt = true;
      gBooks.sort(function (a, b) {
        var nameA = a.bookname.toUpperCase(); // ignore upper and lowercase
        var nameB = b.bookname.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      gBooks.reverse();
      gSortTxt = false;
    }
  } else if (sortBy === 'ID') {
    if (gSortId === false) {
      gSortId = true;
      gBooks.sort(function (a, b) {
        var nameA = a.id.toUpperCase(); // ignore upper and lowercase
        var nameB = b.id.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      gBooks.reverse();
      gSortId = false;
    }
  } else if (sortBy === 'RATE') {
    if (gSortRate === false) {
      gSortRate = true;
      gBooks.sort(function (a, b) {
        return a.rate - b.rate;
      });
    } else {
      gBooks.reverse();
      gSortRate = false;
    }
  } else if (sortBy === 'PRICE') {
    if (gSortPrice === false) {
      gSortPrice = true;
      gBooks.sort(function (a, b) {
        return a.price - b.price;
      });
    } else {
      gBooks.reverse();
      gSortPrice = false;
    }
  }
  renderTable();
}

function changeMoney(lang) {
  gBooks.forEach((book) => {
    if (lang === 'he') {
      book.price = book.price * 3;
      book.mark = '₪';
    } else if (lang === 'en') {
      book.price = book.price / 3;
      book.mark = '$';
    }
  });
}

function getPagesNum() {
  return Math.ceil(gBooks.length / PAGE_SIZE);
}

function sendToPage(num) {
  gPageIdx = num;
  renderTable();
}
function getPage() {
  return gPageIdx;
}

function checkPages() {
  console.log(Math.ceil(gBooks.length / PAGE_SIZE));
  if (Math.ceil(gBooks.length / PAGE_SIZE) <= gPageIdx) {
    --gPageIdx;
  }
  console.log('hi');
}
