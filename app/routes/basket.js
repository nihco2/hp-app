import Ember from "ember";

var BasketRoute = Ember.Route.extend({
  model: function() {
    if(!this.controllerFor('application').get('basket').get('length')){
      alert('aucun articles ajoutés');
      return this.transitionTo('books');
    }

    var isbns = Ember.A();

    this.controllerFor('application').get('basket').forEach(function(book){
      isbns.push(book.get('isbn'));
    });

    return this.store.find('commercial-offer',{
      isbns : isbns.join()
    }).then(function(offer){
      return offer;
    });
  }
});

export default BasketRoute;
