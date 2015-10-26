import Ember from "ember";

var BasketController = Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  basket: Ember.computed.alias('applicationController.basket'),
  basketPrice: Ember.computed.alias('applicationController.basketPrice'),
  offers: Ember.A(),
  reduction: function () {
    var diff = this.get('basketPrice') - this.get('basketFinalPrice');
    var round = Math.round(diff * 100);
    return round / 100;
  }.property('basketPrice', 'basketFinalPrice'),
  basketFinalPrice: function () {
    var finalOffer;
    this.get('offers').forEach(function (offer) {
      if (!finalOffer || offer < finalOffer) {
        finalOffer = offer;
      }
    });
    return finalOffer;
  }.property('basketPrice'),
  basketToDisplay: function () {
    var books = Ember.A();
    this.get('basket').forEach(function (book) {
      if (!books.contains(book)) {
        books.pushObject(book);
      }
    });
    return books;
  }.property('model.@each.content'),
  percentageOffer: function (value) {
    var percent = value / 100;
    return this.get('basketPrice') - (this.get('basketPrice') * percent);
  },
  minusOffer: function (value) {
    return this.get('basketPrice') - value;
  },
  sliceOffer: function (value, sliceValue) {
    var step = Math.floor(this.get('basketPrice') / sliceValue);
    return this.get('basketPrice') - (step * value);
  },
  basketUpdate: function () {
    var self = this;
    this.get('offers').clear();
    this.store.all('commercialOffer').filter(function (offer) {
      switch (offer.get('type')) {
      case 'percentage':
        //console.log('percentage::', self.percentageOffer(offer.get('value')));
        self.get('offers').push(self.percentageOffer(offer.get('value')));
        break;
      case 'minus':
        //console.log('minus::', self.minusOffer(offer.get('value')));
        self.get('offers').push(self.minusOffer(offer.get('value')));
        break;
      case 'slice':
        //console.log('slice::', self.sliceOffer(offer.get('value'),offer.get('sliceValue')));
        self.get('offers').push(self.sliceOffer(offer.get('value'), offer.get('sliceValue')));
        break;
      default:
        self.get('offers').push(self.get('basketPrice'));
      }
    });
  }.observes('model.@each.content')
});

export default BasketController;
