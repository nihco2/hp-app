import DS from "ember-data";

var Book = DS.Model.extend({
  isbn: DS.attr('string'),
  title: DS.attr('string'),
  cover: DS.attr('string'),
  price: DS.attr('number'),
  cover: DS.attr('string'),
  selected: DS.attr('boolean'),
  basket: DS.belongsTo('basket')
});

export default Book;
