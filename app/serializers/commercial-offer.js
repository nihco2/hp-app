import DS from "ember-data";

export default DS.RESTSerializer.extend({
  normalizePayload: function (payload) {
    
    payload.offers.forEach(function(offer,index){
      offer.id = index;
    });

    var normalizedPayload = {
      commercialOffers : payload.offers
    };

    return this._super(normalizedPayload);
  }
});
