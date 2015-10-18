import Ember from "ember";

var IndexRoute = Ember.Route.extend({
  beforeModel: function () {
    this.transitionTo('books');
  }
});

export default IndexRoute;
