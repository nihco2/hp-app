import Ember from 'ember';

import { moduleFor, test } from 'ember-qunit';

moduleFor('route:index', 'Unit: route/index');

test('it exists', function(assert) {
  assert.expect(2);
  var route = this.subject();
  assert.ok(route);
  assert.ok(route instanceof Ember.Route);
});
