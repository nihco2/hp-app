import DS from "ember-data";

var Basket = DS.Model.extend({
  books: DS.hasMany('book', { async: false }),
  count: function(){
    return this.get('books').length;
  }.property('books'),
  plural: function(){
    return this.get('count') > 1;
  }.property('count')
});

export default Basket;
