import Ember from "ember";

var ApplicationController = Ember.Controller.extend({
  basket: Ember.A(),
  basketPrice: function(){
    var basketPrice = 0;
    this.get('model').filter(function(book){
      basketPrice += book.get('totalPrice');
    });
    return basketPrice;
  }.property('model.@each.totalPrice'),
  count: function(){
    var quantity = 0;
    this.get('model').filter(function(book){
      quantity += book.get('quantity');
    });
    return quantity;
  }.property('model.@each.quantity'),
  plural: function(){
    return this.get('count') > 1;
  }.property('count')
});

export default ApplicationController;
