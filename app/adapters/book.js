import DS from "ember-data";

export default DS.RESTAdapter.extend({
  host: 'http://henri-potier.xebia.fr/',
  shouldReloadAll:function(){
    return false;
  }
});