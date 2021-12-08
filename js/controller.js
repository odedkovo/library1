function onInit() {
  createBooks();
  renderTable();
}
function renderTable() {
  var books = getBooks();

  //   console.log(books);
  var strHTMLs = [];
  strHTMLs.push(
    books.map(
      (book) => `<tr><td>${book.id}</td>
  <td>${book.bookname}</td>
  <td>${book.price} ${book.mark}</td>
  <td> <img src="img/${book.bookname}.png" alt=""></td>
  <td> <button data-trans="read-button" onclick="onReadBook('${book.id}')">read</button>
  <button  data-trans="update-button" onclick="onUpdateBook ('${book.id}')">update</button>
  <button  data-trans="delete-button" onclick="onDeleteBook('${book.id}')">delete</button></td>
  <td><button onclick="onPlusButton('${book.id}')">+</button><span class="rate-span">${book.rate}</span><button onclick="onMinusButton('${book.id}')">-</button></td>
  </tr>`
    )
  );
  //   console.log(strHTMLs);

  document.querySelector('tbody').innerHTML = strHTMLs.join('');
  rednerPagesButtons();
  doTrans();
}

function onAddBooks() {
  var elBookName = document.querySelector('.book-name').value;
  var elBookPrice = document.querySelector('.book-price').value;
  console.log(elBookName);
  console.log(elBookPrice);
  addBook(elBookName, elBookPrice);
  renderTable();
  document.querySelector('.book-name').value = '';
  document.querySelector('.book-price').value = '';
  var lang = getLang();
  if (lang === 'en') onFlashModal('added');
  else if (lang === 'he') onFlashModal('התווסף');
}

function onDeleteBook(id) {
  console.log('you are on onDeleteBooks');
  deleteBook(id);
  checkPages();
  renderTable();
  var lang = getLang();
  if (lang === 'en') onFlashModal('deleted');
  else if (lang === 'he') onFlashModal('נמחק');
}

function onUpdateBook(bookId) {
  var newPrice = prompt('update the price');
  updatedBookIdx(bookId, newPrice);
  renderTable();
  var lang = getLang();
  if (lang === 'en') onFlashModal('updated');
  else if (lang === 'he') onFlashModal('עודכן');
}

function onReadBook(bookId) {
  renderModal(bookId);
}

function renderModal(bookId) {
  var img = 'img';
  var books = getBooks();
  var bookToRead = books.find((book) => book.id === bookId);
  console.log(bookToRead);

  var elModal = document.querySelector('.modal');
  elModal.style.marginInlineStart = '75%';

  elModal.innerHTML = `<h3> ${bookToRead.bookname}</h3><br/>the name of the book is ${bookToRead.bookname}</br>
     the id of the book in the library is ${bookToRead.id}</br>
     the price of the book in our library is  ${bookToRead.price}
     and this is the picture of the book:<br/> <img src="img/${bookToRead.bookname}.png" alt="">  <br/>
       <button onclick="onCloseModal()">Close</button> `;
}

function onCloseModal() {
  var elModal = document.querySelector('.modal');
  elModal.style.marginInlineStart = '150%';
}

function onPlusButton(id) {
  //   console.log(id);
  rateUpdate(id, '+');
  renderTable();
  var lang = getLang();
  if (lang === 'en') onFlashModal('updated the rate of');
  else if (lang === 'he') onFlashModal('עודכן');
}
function onMinusButton(id) {
  console.log(id);
  rateUpdate(id, '-');
  renderTable();
  var lang = getLang();
  if (lang === 'en') onFlashModal('updated the rate of');
  else if (lang === 'he') onFlashModal('עודכן');
}

function showAddModal() {
  document.querySelector('.add-book-modal').style.marginInlineStart = '2%';
}

function onCloseAddBookModal() {
  document.querySelector('.add-book-modal').style.marginInlineStart = '-50%';
}

function onNextPage() {
  nextPage();
  renderTable();
}
function onPrevPage() {
  prevPage();
  renderTable();
}

function onSetLang(lang) {
  console.log(lang);
  setLang(lang);
  if (lang === 'he') {
    document.body.classList.add('rtl');
    changeMoney('he');
  } else {
    document.body.classList.remove('rtl');
    changeMoney('en');
  }
  renderTable();
}

function onFlashModal(word) {
  document.querySelector('.flash-modal').style.bottom = '100px';
  var lang = getLang();
  if (lang === 'he')
    document.querySelector('.flash-modal').innerText = `ספר ${word} `;
  else if (lang === 'en')
    document.querySelector(
      '.flash-modal'
    ).innerText = `you have ${word} a book`;
  setTimeout(() => {
    document.querySelector('.flash-modal').style.bottom = '-200px';
  }, 1000);
}

function rednerPagesButtons() {
  var pagesNum = getPagesNum();
  var strHTML = '';
  for (var i = 1; i <= pagesNum; i++) {
    strHTML += `<button onclick="sendToPage(${i - 1})">${i}</button>`;
  }
  console.log(strHTML);
  document.querySelector('.pages-num').innerHTML = strHTML;
}
