import Ember from "ember";

var BookComponent = Ember.Component.extend({
   actions:{
     select:function(book){
       book.toggleProperty('selected');
       if(book.get('selected')){
         this.set('action','addArticle').sendAction('action',book);
       }
       else{
         this.set('action','removeArticle').sendAction('action',book);
       }
     }
   }
});

export default BookComponent;
