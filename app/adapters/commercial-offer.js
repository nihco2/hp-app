import DS from "ember-data";

export default DS.RESTAdapter.extend(DS.BuildURLMixin,{
  host: 'http://henri-potier.xebia.fr/',
  namespace: Ember.computed('namespace',function(params){
    var basket = this.store.all('basket').get('firstObject'),
      isbns = Ember.A();
    basket.get('books').forEach(function(book){
      isbns.push(book.id);
    });
    return 'books/'+ isbns.join();
  })
});
