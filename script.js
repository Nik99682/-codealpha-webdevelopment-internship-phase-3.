let books = [];
let borrowHistory = [];

document.getElementById('addBookBtn').addEventListener('click', () => {
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const category = document.getElementById('category').value.trim();

    if (title && author && category) {
        const book = { id: Date.now(), title, author, category, borrowed: false };
        books.push(book);
        displayBooks(books);
        clearInputs();
    }
});

document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
    displayBooks(filtered);
});

function displayBooks(bookArray) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    bookArray.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} [${book.category}]`;
        
        const borrowBtn = document.createElement('button');
        borrowBtn.textContent = book.borrowed ? 'Return' : 'Borrow';
        borrowBtn.addEventListener('click', () => toggleBorrow(book.id));

        li.appendChild(borrowBtn);
        bookList.appendChild(li);
    });
}

function toggleBorrow(bookId) {
    const book = books.find(b => b.id === bookId);
    book.borrowed = !book.borrowed;

    if (book.borrowed) {
        borrowHistory.push({ title: book.title, date: new Date().toLocaleString() });
        updateBorrowHistory();
    }

    displayBooks(books);
}

function updateBorrowHistory() {
    const historyList = document.getElementById('borrowHistory');
    historyList.innerHTML = '';
    borrowHistory.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.title} borrowed on ${entry.date}`;
        historyList.appendChild(li);
    });
}

function clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('category').value = '';
}
