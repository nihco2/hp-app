import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('books', { path: '/books' }, function() {
    this.route('book');
  });
  this.resource('basket');
});

export default Router;
