import { test, moduleForModel } from 'ember-qunit';

moduleForModel('book', 'Book Model');

var BOOK_DATA = {
  isbn: '12345',
  title: 'Henri Potier et la coupe de cheveux',
  cover: 'http://cover.jpg',
  price: 42
};

test('a book should have an isbn', function (assert) {
  var book = this.subject(BOOK_DATA);
  var isbn = book.get('isbn');
  var title = book.get('title');
  var cover = book.get('cover');
  var price = book.get('price');

  assert.equal(book, BOOK_DATA.isbn);
  assert.equal(title, BOOK_DATA.title);
  assert.equal(cover, BOOK_DATA.cover);
  assert.equal(price, BOOK_DATA.price);
});
