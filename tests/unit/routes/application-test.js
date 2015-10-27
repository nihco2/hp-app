import Ember from 'ember';
import {
  test, moduleFor
}
from 'ember-qunit';

moduleFor('route:application', 'Unit: route/application', {
  needs: ['controller:application']
});

test('it exists', function (assert) {
  assert.expect(2);
  var route = this.subject();

  assert.ok(route);
  assert.ok(route instanceof Ember.Route);
});

test('should return a list of books', function (assert) {
  var store = {
    findAll: function (type) {
      return new Ember.RSVP.Promise(function (resolve) {
        resolve([{
          id: 1,
          title: 'livre 1',
          isbn: '12345'
        }, {
          id: 2,
          title: 'livre 2',
          isbn: '6789'
        }]);
      });
    }
  };
  var route = this.subject();
  route.set('store', store);
  assert.deepEqual(route.model()._result, [{
    id: 1,
    title: 'livre 1',
    isbn: '12345'
  }, {
    id: 2,
    title: 'livre 2',
    isbn: '6789'
  }]);
});
