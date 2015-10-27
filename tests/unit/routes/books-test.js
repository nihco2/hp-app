import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';

moduleFor('route:books', 'Unit: route/books');

test('it exists', function(assert) {
  assert.expect(2);
  var route = this.subject();

  assert.ok(route);
  assert.ok(route instanceof Ember.Route);
});
