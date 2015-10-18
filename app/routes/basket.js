import Ember from "ember";

var BasketRoute = Ember.Route.extend({
  model: function() {
    if(!this.modelFor('application').get('books').length){
      return false;
    }
    return this.store.findAll('commercial-offer');
  }
});

export default BasketRoute;
