import Ember from "ember";
import DS from "ember-data";

export default DS.RESTSerializer.extend({
  normalizePayload: function (payload) {
    var books = Ember.A();

    payload.forEach(function(book){
      book.id = book.isbn;
      books.push(book);
    });

    var normalizedPayload = {
      books : books
    };
    
    return this._super(normalizedPayload);
  }
});
