import Ember from 'ember';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('basket', 'Basket Model', {
  needs: ['model:book']
});

test('it should have a book relationship', function (assert) {
  var Basket = this.store().modelFor('basket');
  var relationship = Ember.get(Basket, 'relationshipsByName').get('books');

  assert.equal(relationship.key, 'books');
  assert.equal(relationship.kind, 'hasMany');
});
