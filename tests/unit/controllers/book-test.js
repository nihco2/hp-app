import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:books', 'Unit: controller/books');

test('it should have his own properties', function (assert) {
  assert.expect(2);
  var controller = this.subject();
  assert.ok(controller.applicationController, 'Expected applicationController property exist');
  assert.ok(controller.books, 'Expected books property exist');
});
