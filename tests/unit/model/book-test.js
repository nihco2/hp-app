import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('book', 'Book Model',{
  needs: ['model:basket']
});

var BOOK_DATA = {
  isbn: '12345',
  title: 'Henri Potier et la coupe de cheveux',
  cover: 'http://cover.jpg',
  price: 42,
  quantity: 5
};

test('it should have his own properties', function (assert) {
  var book = this.subject(BOOK_DATA);
  var isbn = book.get('isbn');
  var title = book.get('title');
  var cover = book.get('cover');
  var price = book.get('price');

  assert.equal(isbn, BOOK_DATA.isbn);
  assert.equal(title, BOOK_DATA.title);
  assert.equal(cover, BOOK_DATA.cover);
  assert.equal(price, BOOK_DATA.price);
});

test('it should have an isbn', function(assert) {
  var model = this.subject();
  var hasAttr = Object.keys(model.toJSON()).indexOf('isbn') > -1;
  assert.ok(hasAttr);
});

test('it should has a title', function(assert) {
  var model = this.subject();
  var hasAttr = Object.keys(model.toJSON()).indexOf('title') > -1;
  assert.ok(hasAttr);
});

test('it should has a cover', function(assert) {
  var model = this.subject();
  var hasAttr = Object.keys(model.toJSON()).indexOf('cover') > -1;
  assert.ok(hasAttr);
});

test('it should has a price', function(assert) {
  var model = this.subject();
  var hasAttr = Object.keys(model.toJSON()).indexOf('price') > -1;
  assert.ok(hasAttr);
});

test('it should have a computed property totalPrice', function (assert) {
  var book = this.subject(BOOK_DATA);
  var price = book.get('price');
  assert.equal(book.get('totalPrice'), BOOK_DATA.quantity * BOOK_DATA.price);
});

test('it should have a basket relationship', function(assert) {
  var model = this.store().modelFor('book');
  var relationship = Ember.get(model, 'relationshipsByName').get('basket');

  assert.equal(relationship.key, 'basket');
  assert.equal(relationship.kind, 'belongsTo');
});
