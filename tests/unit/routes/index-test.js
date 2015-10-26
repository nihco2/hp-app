import Ember from 'ember';

import { moduleFor } from 'ember-qunit';
import { test } from 'ember-qunit-mock/lib/test';
import testHelper from '../../test-helper';

moduleFor('route:index', 'Unit: route/index');

test('it exists', function(assert) {
  assert.expect(2);
  var route = this.subject();

  assert.ok(route);
  assert.ok(route instanceof Ember.Route);
});
