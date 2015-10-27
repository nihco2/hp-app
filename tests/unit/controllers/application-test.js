import Ember from 'ember';
import DS from 'ember-data';
import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:application', 'Unit: controller/application');

test('it should have his own properties' ,function(assert) {
  assert.expect(3);
  var controller = this.subject();
  assert.ok(controller.basketPrice, 'Expected basketPrice property exist');
  assert.ok(controller.count, 'Expected count property exist');
  assert.ok(controller.plural, 'Expected plural property exist');
});

test('basketPrice method should return a price' ,function(assert) {
  assert.expect(1);

  var controller = this.subject();

  controller.set('model',{books:[]});

  controller.get('model').filter = function(){

  };

  assert.equal(controller.get('basketPrice'), 0);
});

test('count method should return a quantity' ,function(assert) {
  assert.expect(1);

  var controller = this.subject();

  controller.set('model',{books:[]});

  controller.get('model').filter = function(){

  };

  assert.equal(controller.get('count'), 0);
});

test('count plural should return true' ,function(assert) {
  assert.expect(1);

  var controller = this.subject();
  controller.set('count', 2);

  assert.equal(controller.get('plural'), true);
});

test('count plural should return false' ,function(assert) {
  assert.expect(1);
  
  var controller = this.subject();
  controller.set('count', 1);

  assert.equal(controller.get('plural'), false);
});
