import DS from "ember-data";
import Ember from "ember";

var Book = DS.Model.extend(Ember.Copyable,{
  isbn: DS.attr('string'),
  title: DS.attr('string'),
  cover: DS.attr('string'),
  price: DS.attr('number'),
  cover: DS.attr('string'),
  selected: DS.attr('boolean'),
  quantity: DS.attr('number'),
  totalPrice : function(){
    return this.get('quantity') * this.get('price');
  }.property('quantity','price')
});

export default Book;
