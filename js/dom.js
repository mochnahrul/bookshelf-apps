const INCOMPLETE_BOOKSHELF_LIST = "incompleteBookshelfList";
const COMPLETE_BOOKSHELF_LIST = "completeBookshelfList";

function addBook() {
  const bookId = +new Date();
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const bookIsComplete = document.getElementById("inputBookIsComplete").checked;

  const book = createBook(bookId, bookTitle, bookAuthor, bookYear, bookIsComplete);
  const bookObject = composeBookObject(bookId, bookTitle, bookAuthor, bookYear, bookIsComplete);

  books.push(bookObject);

  if (bookIsComplete) {
    document.getElementById(COMPLETE_BOOKSHELF_LIST).append(book);
  } else {
    document.getElementById(INCOMPLETE_BOOKSHELF_LIST).append(book);
  }

  updateJson();
}

function createBook(bookId, bookTitle, bookAuthor, bookYear, bookIsComplete) {
  const textTitle = document.createElement("h4");
  textTitle.innerText = bookTitle;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = bookAuthor;

  const textYear = document.createElement("p");
  textYear.innerText = bookYear;

  const actions = addAction(bookIsComplete, bookId);

  const article = document.createElement("article");
  article.setAttribute("id", bookId);
  article.classList.add("book_item");
  article.append(textTitle, textAuthor, textYear, actions);

  return article;
}

function addAction(bookIsComplete, bookId) {
  const actions = document.createElement("div");
  actions.classList.add("action");

  const readButton = createReadButton(bookId);
  const deleteButton = createDeleteButton(bookId);
  const undoButton = createUndoButton(bookId);

  if (bookIsComplete) {
    actions.append(undoButton);
  } else {
    actions.append(readButton);
  }

  actions.append(deleteButton);

  return actions;
}

function createDeleteButton(bookId) {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("red");
  deleteButton.innerText = "Delete";

  deleteButton.addEventListener("click", function() {
    let confirmation = confirm("Delete this book?");

    if (confirmation) {
      const parent = document.getElementById(bookId);
      parent.addEventListener("eventDelete", function(event) {
        event.target.remove();
      });
      parent.dispatchEvent(new Event("eventDelete"));

      deleteBookFromJson(bookId);
      updateJson();
    }
  });

  return deleteButton;
}

function createReadButton(bookId) {
  const readButton = document.createElement("button");
  readButton.classList.add("green");
  readButton.innerText = "Read";

  readButton.addEventListener("click", function() {
    const parent = document.getElementById(bookId);

    const bookTitle = parent.querySelector("h4").innerText;
    const bookAuthor = parent.querySelectorAll("p")[0].innerText;
    const bookYear = parent.querySelectorAll("p")[1].innerText;

    parent.remove();

    const book = createBook(bookId, bookTitle, bookAuthor, bookYear, true);
    document.getElementById(COMPLETE_BOOKSHELF_LIST).append(book);

    deleteBookFromJson(bookId);
    const bookObject = composeBookObject(bookId, bookTitle, bookAuthor, bookYear, true);

    books.push(bookObject);
    updateJson();
  });

  return readButton;
}

function createUndoButton(bookId) {
  const undoButton = document.createElement("button");
  undoButton.classList.add("green");
  undoButton.innerText = "Unread";

  undoButton.addEventListener("click", function() {
    const parent = document.getElementById(bookId);

    const bookTitle = parent.querySelector("h4").innerText;
    const bookAuthor = parent.querySelectorAll("p")[0].innerText;
    const bookYear = parent.querySelectorAll("p")[1].innerText;

    parent.remove();

    const book = createBook(bookId, bookTitle, bookAuthor, bookYear, false);
    document.getElementById(INCOMPLETE_BOOKSHELF_LIST).append(book);

    deleteBookFromJson(bookId);
    const bookObject = composeBookObject(bookId, bookTitle, bookAuthor, bookYear, false);

    books.push(bookObject);
    updateJson();
  });

  return undoButton;
}

function searchBook(key) {
  const filter = key.toUpperCase();
  const title = document.getElementsByTagName("h4");

  for (let i = 0; i < title.length; i++) {
    const textTitle = title[i].textContent || title[i].innerText;

    if (textTitle.toUpperCase().indexOf(filter) > -1) {
      title[i].closest(".book_item").style.display = "";
    } else {
      title[i].closest(".book_item").style.display = "none";
    }
  }
}

