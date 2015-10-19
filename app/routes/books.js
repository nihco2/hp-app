import Ember from "ember";

var BooksRoute = Ember.Route.extend({
  model:function(){
    return this.store.findAll('book');
  },
  actions:{
    addArticle:function(book){
      book.incrementProperty('quantity');
      book.id = book.get('quantity');
      return true;
    },
    removeArticle:function(book){
      book.decrementProperty('quantity');
      book.id = book.get('quantity');
      return true;
    }
  }
});

export default BooksRoute;
