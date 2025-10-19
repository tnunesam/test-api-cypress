// Classe para encapsular as chamadas para os endpoints da livraria
class BookStoreService {
    static getAllBooks() {
        return cy.request({
            method: 'GET',
            url: 'https://demoqa.com/BookStore/v1/Books'
        });
    }

    static addBooksToCollection(userId, isbns, token) {
        // A API espera um array de objetos, cada um com a chave "isbn"
        const collectionOfIsbns = isbns.map(isbn => ({ isbn }));

        return cy.request({
            method: 'POST',
            url: 'https://demoqa.com/BookStore/v1/Books',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                userId: userId,
                collectionOfIsbns: collectionOfIsbns
            }
        });
    }
}

export default BookStoreService;