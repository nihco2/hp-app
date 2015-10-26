import DS from "ember-data";
import Ember from "ember";

export default DS.RESTAdapter.extend(DS.BuildURLMixin,{
  host: 'http://henri-potier.xebia.fr',
  ajax: function(url,type,hash){
    url = url.replace(':isbns', hash.data.isbns);
    return this._super(url, type);
  },
  namespace: Ember.computed('namespace',function(){
    return 'books/:isbns';
  })
});
