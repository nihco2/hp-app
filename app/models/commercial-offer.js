import DS from "ember-data";

var Offer = DS.Model.extend({
  type: DS.attr('string'),
  sliceValue: DS.attr('number'),
  value: DS.attr('number')
});

export default Offer;
