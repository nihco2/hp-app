import Ember from "ember";

var BooksRoute = Ember.Route.extend({
  actions:{
    addArticle:function(book){
      book.incrementProperty('quantity');
      return true;
    },
    removeArticle:function(book){
      if(book.get('quantity') > 0){
        book.decrementProperty('quantity');
        return true;
      }
    }
  }
});

export default BooksRoute;
