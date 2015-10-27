import Ember from 'ember';
import {
  test, moduleFor
}
from 'ember-qunit';

moduleFor('controller:basket', 'Unit: controller/basket', {
  needs: ['controller:application']
});

test('it should have his own properties', function (assert) {
  assert.expect(3);
  var controller = this.subject();
  assert.ok(controller.reduction, 'Expected reduction property exist');
  assert.ok(controller.basketFinalPrice, 'Expected basketFinalPrice property exist');
  assert.ok(controller.basketToDisplay, 'Expected basketToDisplay property exist');
});

test('it should have his own methods', function (assert) {
  assert.expect(4);
  var controller = this.subject();
  assert.ok(controller.percentageOffer, 'Expected percentageOffer method exist');
  assert.ok(controller.minusOffer, 'Expected minusOffer method exist');
  assert.ok(controller.sliceOffer, 'Expected sliceOffer method exist');
  assert.ok(controller.basketUpdate, 'Expected basketUpdate method exist');
});

test('reduction property', function (assert) {
  assert.expect(1);
  var controller = this.subject();
  controller.set('basketPrice', 150);
  controller.set('basketFinalPrice', 120);
  assert.equal(controller.get('reduction'), 30);
});

test('basketFinalPrice property', function (assert) {
  assert.expect(1);
  var controller = this.subject();
  controller.set('basketPrice', 150);
  controller.set('offers', [130, 140, 145]);
  assert.equal(controller.get('basketFinalPrice'), 130);
});

test('basketToDisplay property', function (assert) {
  assert.expect(1);
  var controller = this.subject();
  controller.set('basket', [1, 1, 3]);

  assert.deepEqual(controller.get('basketToDisplay'), [1, 3]);
});

test('percentageOffer method', function (assert) {
  assert.expect(1);
  var controller = this.subject();
  controller.set('basketPrice', 150);

  assert.equal(controller.percentageOffer(5), 142.5);
});

test('minusOffer method', function (assert) {
  assert.expect(1);
  var controller = this.subject();
  controller.set('basketPrice', 150);

  assert.equal(controller.minusOffer(15), 135);
});

test('sliceOffer method', function (assert) {
  assert.expect(1);
  var controller = this.subject();
  controller.set('basketPrice', 150);

  assert.equal(controller.minusOffer(20, 100), 130);
});

test('basketUpdate observer', function (assert) {
  assert.expect(1);
  var controller = this.subject();
  controller.set('offers', [120, 130, 140]);
  var store = {
      commercialOffers : [{
          type: 'percentage',
          value: 5
        }, {
          type: 'minus',
          value: 15
        },{
          type: 'slice',
          sliceValue : 100,
          value: 10
        }
      ]
    };
  controller.set('store', store);
  assert.deepEqual(controller.get('offers'), [120, 130, 140]);
});
