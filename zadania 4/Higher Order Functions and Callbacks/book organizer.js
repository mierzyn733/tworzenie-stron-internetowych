function sortByYear(book1, book2) {
    if (book1.releaseYear < book2.releaseYear) {
        return -1;
    } else if (book1.releaseYear > book2.releaseYear) {
        return 1;
    } else {
        return 0;
    }
}
sortByYear(20,23);
const books = [
    { title: "Wiedźmin: Ostatnie Życzenie", authorName: "Andrzej Sapkowski", releaseYear: 1993 },
    { title: "1984", authorName: "George Orwell", releaseYear: 1949 },
    { title: "Harry Potter i Kamień Filozoficzny", authorName: "J.K. Rowling", releaseYear: 1997 },
    { title: "Zbrodnia i Kara", authorName: "Fiodor Dostojewski", releaseYear: 1866 },
    { title: "Duma i Uprzedzenie", authorName: "Jane Austen", releaseYear: 1813 }
];
  



const filteredBooks = books.filter(book => book.releaseYear > 1900);


filteredBooks.sort(sortByYear);

console.log("Posortowane i przefiltrowane książki:", filteredBooks);
