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
  var controller = this.subject();

  controller.set('model',{books:[{
      totalPrice: 5
    },
    {
      totalPrice: 10
    }
  ]});

  controller.get('model').filter = function(){

  };

  assert.equal(controller.get('basketPrice'), 0);
});
