document.addEventListener("DOMContentLoaded", function() {
  const inputForm = document.getElementById("inputBook");
  const searchForm = document.getElementById("searchBook");

  inputForm.addEventListener("submit", function(event) {
    event.preventDefault();
    addBook();

    document.getElementById("inputBookTitle").value = "";
    document.getElementById("inputBookAuthor").value = "";
    document.getElementById("inputBookYear").value = "";
    document.getElementById("inputBookIsComplete").checked = false;
  })

  searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const inputSearch = document.getElementById("searchBookTitle").value;
    searchBook(inputSearch);
  })

  if (isStorageSupported()) {
    fetchJson();
  }
})

document.addEventListener("onjsonfetched", function() {
  renderFromBooks();
})