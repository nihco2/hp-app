import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('book-component', {
  unit: true
});

test('it should set action addArticle', function(assert) {
  assert.expect(1);
  var component = this.subject();
  component.send('add');
  assert.equal(component.get('action'),'addArticle');
});

test('it should set action removeArticle', function(assert) {
  assert.expect(1);
  var component = this.subject();
  component.send('remove');
  assert.equal(component.get('action'),'removeArticle');
});
