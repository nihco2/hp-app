import DS from "ember-data";

var Basket = DS.Model.extend({
  books: DS.hasMany('book')
});

export default Basket;
