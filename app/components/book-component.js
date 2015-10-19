import Ember from "ember";

var BookComponent = Ember.Component.extend({
   actions:{
     add:function(book){
       this.set('action','addArticle').sendAction('action',book);
     },
     remove:function(book){
       this.set('action','removeArticle').sendAction('action',book);
     }
   }
});

export default BookComponent;
