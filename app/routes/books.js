import Ember from "ember";

var BooksRoute = Ember.Route.extend({
  model:function(){
    return this.store.findAll('book');
  }
});

export default BooksRoute;
