import Ember from "ember";

var ApplicationRoute = Ember.Route.extend({
  model:function(){
    return this.store.createRecord('basket',{
      id:'basket',
      books:Ember.A()
    });
  },
  getBasket:function(){
    return this.store.all('basket').get('firstObject');
  },
  actions:{
    addArticle:function(book){
      this.getBasket().get('books').pushObject(book);
    },
    removeArticle:function(book){
      this.getBasket().get('books').removeObject(book);
    }
  }
});

export default ApplicationRoute;
