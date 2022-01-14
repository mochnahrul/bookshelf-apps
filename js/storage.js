const STORAGE_KEY = "BOOKSHELF_APPS";
let books = [];

function isStorageSupported() {
  if (typeof(Storage) === undefined){
    alert("Browser does not support local storage");
    return false;
  } else {
    return true;
  }
}

function updateJson() {
  if (isStorageSupported()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }
}

function fetchJson() {
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (data !== null) {
    books = data;
  }

  document.dispatchEvent(new Event("onjsonfetched"));
}

function composeBookObject(id, title, author, year, isComplete) {
  return {
    id, 
    title, 
    author, 
    year, 
    isComplete
  }
}

function renderFromBooks() {
  for (book of books) {
    const newBook = createBook(book.id, book.title, book.author, book.year, book.isComplete);

    if (book.isComplete) {
      document.getElementById(COMPLETE_BOOKSHELF_LIST).append(newBook);
    } else {
      document.getElementById(INCOMPLETE_BOOKSHELF_LIST).append(newBook);
    }
  }
}

function deleteBookFromJson(bookId) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == bookId) {
      books.splice(i, 1);
      break;
    }
  }
}