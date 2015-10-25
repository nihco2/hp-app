import Ember from "ember";

var BooksController = Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  books: Ember.computed.readOnly('applicationController.model')
});

export default BooksController;
