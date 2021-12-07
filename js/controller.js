function onInit() {
  createBooks();
  renderTable();
}
function renderTable() {
  var books = getBooks();

  //   console.log(books);
  var strHTMLs = [
    ` <tr>
  <td>id</td>
  <td>title</td>
  <td>price</td>
  <td>img</>
  <td>actions</td>
  <td>rate</td>
</tr>`,
  ];
  strHTMLs.push(
    books.map(
      (book) => `<tr><td>${book.id}</td>
  <td>${book.bookname}</td>
  <td>${book.price}</td>
  <td> <img src="img/${book.bookname}.png" alt=""></td>
  <td> <button onclick="onReadBook('${book.id}')">read</button>
  <button onclick="onUpdateBook ('${book.id}')">update</button>
  <button onclick="onDeleteBook('${book.id}')">delete</button></td>
  <td><button onclick="onPlusButton('${book.id}')">+</button><span class="rate-span">${book.rate}</span><button onclick="onMinusButton('${book.id}')">-</button></td>
  </tr>`
    )
  );
  //   console.log(strHTMLs);

  document.querySelector('table').innerHTML = strHTMLs.join('');
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
}

function onDeleteBook(id) {
  console.log('you are on onDeleteBooks');
  deleteBook(id);
  renderTable();
}

function onUpdateBook(bookId) {
  var newPrice = prompt('update the price');
  updatedBookIdx(bookId, newPrice);
  renderTable();
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
  elModal.style.left = '75%';

  elModal.innerHTML = `<h3> ${bookToRead.bookname}</h3><br/>the name of the book is ${bookToRead.bookname}</br>
     the id of the book in the library is ${bookToRead.id}</br>
     the price of the book in our library is  ${bookToRead.price}
     and this is the picture of the book:<br/> <img src="img/${bookToRead.bookname}.png" alt="">  <br/>
       <button onclick="onCloseModal()">Close</button> `;
}

function onCloseModal() {
  var elModal = document.querySelector('.modal');
  elModal.style.left = '100%';
}

function onPlusButton(id) {
  //   console.log(id);
  rateUpdate(id, '+');
  renderTable();
}
function onMinusButton(id) {
  console.log(id);
  rateUpdate(id, '-');
  renderTable();
}

function showAddModal() {
  document.querySelector('.add-book-modal').style.left = '0%';
}

function onCloseAddBookModal() {
  document.querySelector('.add-book-modal').style.left = '-30%';
}

function onNextPage() {
  nextPage();
  renderTable();
}
function onPrevPage() {
  prevPage();
  renderTable();
}
