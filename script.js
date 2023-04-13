function Book(title, author, numPages, hasRead){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasRead = hasRead;
}

Book.prototype.info = function() {
    return (this.hasRead == true) ? 
    `${this.title} by ${this.author}, ${this.numPages}, has been read` :
    `${this.title} by ${this.author}, ${this.numPages}, not read yet` ;
};

let myLibrary = [];


// Create Book
const addBookToLibrary = function (newBook) {
    'use strict';
    myLibrary.push(newBook);
    createBookUI(newBook);
}

const createBookUI = function (book) {
    let myBook = document.createElement("div");
    myBook.classList.add("book");
    myBook.setAttribute("data-index", `book-${myLibrary.length - 1}`);


    let title = document.createElement("p");
    let author = document.createElement("p");
    let pages = document.createElement("p");
    let status = document.createElement("button");
    status.classList.add("status");

    let remove = document.createElement("button");
    remove.classList.add("remove");
    
    title.textContent = `Title: ${book.title}`;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `Pages: ${book.numPages}`;

    status.textContent = book.hasRead ? 'Read' : 'Not Read';
    status.addEventListener('click', e => {
        updateReadStatus(myBook.getAttribute('data-index').replace('book-', ''));
    });

    book.hasRead ? status.style.setProperty('background-color', 'var(--read-status-color)') : status.style.setProperty('background-color', 'var(--not-read-status-color)');

    remove.textContent = "Remove";
    remove.addEventListener('click', e => {
        removeBook(myBook.getAttribute('data-index').replace('book-', ''));
    });

    myBook.appendChild(title);
    myBook.appendChild(author);
    myBook.appendChild(pages);
    myBook.appendChild(status);
    myBook.appendChild(remove);

    document.getElementsByClassName("books")[0].appendChild(myBook);
}


// Update Read Status
function updateReadStatus(index) {
    myLibrary[index].hasRead ? myLibrary[index].hasRead = false : myLibrary[index].hasRead = true;
    changeStatusUI(index);
}

const changeStatusUI = function(index){
    let statusButton = document.querySelector(`.book[data-index=book-${index}] .status`);

    myLibrary[index].hasRead ? statusButton.textContent = "Read" : statusButton.textContent = "Not Read";
    myLibrary[index].hasRead ? statusButton.style.setProperty('background-color', 'var(--read-status-color)') : statusButton.style.setProperty('background-color', 'var(--not-read-status-color)');

}


// Remove/Delete Book
function removeBook(index) {
    myLibrary.pop(index);
    deleteBookUI(index);
}


const deleteBookUI = function(index){
    let deleteBook = document.querySelector(`.book[data-index=book-${index}]`);
    deleteBook.remove();
}

const submitBookBtn = document.querySelector(".modal form button[type='submit']");
submitBookBtn.addEventListener('click', e => {

    e.preventDefault();

    const bookTitle = document.querySelector(".modal form input[name='title']").value;
    const bookAuthor = document.querySelector(".modal form input[name='author']").value;
    const bookPages = document.querySelector(".modal form input[name='pages']").value;
    
    const bookStatusCheckbox = document.querySelector(".modal form input[name='has-read']");

    const bookIsRead = (bookStatusCheckbox.checked) ? true : false;
    
    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookIsRead);
    addBookToLibrary(newBook);

    closeModal();
})



// Add & Close Book Modal & Overlay
const addBtn = document.querySelector(".add-btn");
addBtn.addEventListener('click', e => {

    const modal = document.querySelector(".modal");
    (modal.style.getPropertyValue('visibility') == 'visible') ? modal.style.setProperty('visibility', 'hidden') : modal.style.setProperty('visibility', 'visible');

    const overlay = document.querySelector(".overlay");
    (overlay.style.getPropertyValue('visibility') == 'visible') ? overlay.style.setProperty('visibility', 'hidden') : overlay.style.setProperty('visibility', 'visible');
});


window.onclick = e => {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");

    const withinBoundaries = e.composedPath().includes(modal);
    const withinButton = e.composedPath().includes(addBtn);

    if (!withinBoundaries && !withinButton) {    
        modal.style.setProperty('visibility', 'hidden');
        overlay.style.setProperty('visibility', 'hidden');
    }

}

function closeModal() {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    
    modal.style.setProperty('visibility', 'hidden');
    overlay.style.setProperty('visibility', 'hidden');
}