import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('commercial-offer', 'Commercial Offer Model');

var OFFERS_DATA = {
  type: 'percentage',
  sliceValue: '5',
  value: '15'
};

test('it should have his own properties', function (assert) {
  var commercialOffers = this.subject(OFFERS_DATA);
  var type = commercialOffers.get('type');
  var sliceValue = commercialOffers.get('sliceValue');
  var value = commercialOffers.get('value');

  assert.equal(type, OFFERS_DATA.type);
  assert.equal(sliceValue, OFFERS_DATA.sliceValue);
  assert.equal(value, OFFERS_DATA.value);
});

test('it should have a type', function(assert) {
  var model = this.subject();
  var hasAttr = Object.keys(model.toJSON()).indexOf('type') > -1;
  assert.ok(hasAttr);
});

test('it should has a sliceValue', function(assert) {
  var model = this.subject();
  var hasAttr = Object.keys(model.toJSON()).indexOf('sliceValue') > -1;
  assert.ok(hasAttr);
});

test('it should has a value', function(assert) {
  var model = this.subject();
  var hasAttr = Object.keys(model.toJSON()).indexOf('value') > -1;
  assert.ok(hasAttr);
});
