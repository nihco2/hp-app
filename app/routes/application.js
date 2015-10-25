import Ember from "ember";

var ApplicationRoute = Ember.Route.extend({
  model:function(){
    return this.store.findAll('book');
  },
  actions:{
    addArticle:function(book){
      this.controllerFor('application').get('basket').pushObject(book);
    },
    removeArticle:function(book){
      this.controllerFor('application').get('basket').removeObject(book);
    }
  }
});

export default ApplicationRoute;
