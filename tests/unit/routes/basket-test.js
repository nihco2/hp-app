import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';

moduleFor('route:basket', 'Unit: route/basket');

test('it exists', function(assert) {
  assert.expect(2);
  var route = this.subject();

  assert.ok(route);
  assert.ok(route instanceof Ember.Route);
});
