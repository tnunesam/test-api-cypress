import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import AccountService from '../api_objects/Account.service.js';
import BookStoreService from '../api_objects/BookStore.service.js';

// Gerador de nome de usuário único
function gerarNomeUsuario() {
  return `TestUser_${Date.now()}_${Cypress._.random(1000, 9999)}`;
}

const password = 'Password@123'; 

Given('que eu crio um novo usuário com credenciais dinâmicas', function () {
  this.userName = gerarNomeUsuario();

  AccountService.createUser(this.userName, password).then((response) => {
    expect(response.status).to.eq(201);
    this.userId = response.body.userID;
  });
});


Given('que eu possua um usuario criado', function () {
  cy.log('Usuário já foi criado anteriormente');
});


When('eu gero um token de acesso para este usuário', function () {
  AccountService.generateToken(this.userName, password).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.token).to.not.be.empty;
    this.token = response.body.token;
  });
});

When('confirmo que o usuário criado está autorizado', function () {
  AccountService.checkUserAuthorized(this.userName, password).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.true;
  });
});


Then('eu vejo os detalhes do usuário criado corretamente', function () {
  AccountService.getUserDetails(this.userId, this.token).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.userId).to.eq(this.userId);
    expect(response.body.username).to.eq(this.userName);
    expect(response.body.books).to.be.an('array').that.is.empty;
  });
});


When('busco a lista de livros disponíveis', function () {
  BookStoreService.getAllBooks().then((response) => {
    expect(response.status).to.eq(200);
    this.bookList = response.body.books;
  });
});


When('adiciono dois livros da lista à minha coleção', function () {
  const booksToAdd = [this.bookList[0].isbn, this.bookList[1].isbn];
  this.addedIsbns = booksToAdd;

  BookStoreService.addBooksToCollection(this.userId, booksToAdd, this.token).then((response) => {
    expect(response.status).to.eq(201);
  });
});


Then('eu vejo os detalhes do usuário com os dois livros adicionados corretamente', function () {
  AccountService.getUserDetails(this.userId, this.token).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.userId).to.eq(this.userId);
    expect(response.body.username).to.eq(this.userName);
    expect(response.body.books).to.have.lengthOf(2);
    const userBooksIsbns = response.body.books.map((book) => book.isbn);
    expect(userBooksIsbns).to.deep.equal(this.addedIsbns);
  });
});
