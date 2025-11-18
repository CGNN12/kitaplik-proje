class Book {
    constructor(ad, yazar, okunduMu) {
        this.ad = ad;
        this.yazar = yazar;
        this.okunduMu = okunduMu;
        this.id = Date.now().toString(); 
    }
}


class UI {
    static displayBooks() {
        const books = Storage.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        
        row.dataset.id = book.id;

        if (book.okunduMu) {
            row.classList.add('read-book');
        }

        row.innerHTML = `
            <td>${book.ad}</td>
            <td>${book.yazar}</td>
            <td>${book.okunduMu ? 'Okundu' : 'Okunmadı'}</td>
            <td>
                <button class="btn btn-toggle">Değiştir</button>
                <button class="btn btn-delete">Sil</button>
            </td>
        `;

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#book-name').value = '';
        document.querySelector('#book-author').value = '';
        document.querySelector('#book-read').checked = false;
    }

    static deleteBook(targetElement) {
        if (targetElement.classList.contains('btn-delete')) {
            targetElement.closest('tr').remove();
        }
    }

    static toggleReadStatus(targetElement) {
        if (targetElement.classList.contains('btn-toggle')) {
            const row = targetElement.closest('tr');
            const statusCell = row.children[2]; 
            
            if (row.classList.toggle('read-book')) {
                statusCell.textContent = 'Okundu';
                return true; 
            } else {
                statusCell.textContent = 'Okunmadı';
                return false; 
            }
        }
        return null; 
    }

    static showAlert(message, className) {
        const alertArea = document.querySelector('#alert-area');
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${className}`; 
        
        alertArea.appendChild(alertDiv);

        setTimeout(() => alertDiv.remove(), 3000);
    }
}


class Storage {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Storage.getBooks(); 
        books.push(book); 
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(id) {
        const books = Storage.getBooks();
        
        const updatedBooks = books.filter((book) => book.id !== id);

        localStorage.setItem('books', JSON.stringify(updatedBooks));
    }

    static toggleReadStatus(id, newStatus) {
        const books = Storage.getBooks();

        const bookToUpdate = books.find((book) => book.id === id);
        
        if (bookToUpdate) {
            bookToUpdate.okunduMu = newStatus; 
        }

        localStorage.setItem('books', JSON.stringify(books));
    }
}



document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const ad = document.querySelector('#book-name').value;
    const yazar = document.querySelector('#book-author').value;
    const okunduMu = document.querySelector('#book-read').checked;

    if (ad === '' || yazar === '') {
        UI.showAlert('Lütfen tüm alanları doldurun!', 'alert-danger');
        return;
    }

    const book = new Book(ad, yazar, okunduMu);

    UI.addBookToList(book);

    Storage.addBook(book);

    UI.showAlert('Kitap başarıyla eklendi.', 'alert-success');

    UI.clearFields();
});

document.querySelector('#book-list').addEventListener('click', (e) => {
    const target = e.target; 
    const row = target.closest('tr'); 
    
    const id = row.dataset.id; 

    if (target.classList.contains('btn-delete')) {
        UI.deleteBook(target);
        Storage.removeBook(id);
        UI.showAlert('Kitap silindi.', 'alert-success');
    }
    else if (target.classList.contains('btn-toggle')) {
        const newStatus = UI.toggleReadStatus(target);
        Storage.toggleReadStatus(id, newStatus);
    }
});