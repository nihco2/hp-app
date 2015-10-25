"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('hp-app/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].RESTAdapter.extend({
		shouldReloadAll: function shouldReloadAll() {
			return true;
		}
	});

});
define('hp-app/adapters/book', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].RESTAdapter.extend({
		host: 'http://henri-potier.xebia.fr/'
	});

});
define('hp-app/adapters/commercial-offer', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTAdapter.extend(DS['default'].BuildURLMixin, {
    host: 'http://henri-potier.xebia.fr',
    ajax: function ajax(url, type, hash) {
      console.log(url);
      url = url.replace('books', 'books/' + hash.data.isbns);
      return this._super(url, type);
    },
    namespace: Ember.computed('namespace', function (params) {
      return 'books';
    })
  });

});
define('hp-app/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'hp-app/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('hp-app/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'hp-app/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('hp-app/components/book-component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var BookComponent = Ember['default'].Component.extend({
    actions: {
      add: function add(book) {
        this.set('action', 'addArticle').sendAction('action', book);
      },
      remove: function remove(book) {
        this.set('action', 'removeArticle').sendAction('action', book);
      }
    }
  });

  exports['default'] = BookComponent;

});
define('hp-app/controllers/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ApplicationController = Ember['default'].Controller.extend({
    basket: Ember['default'].A(),
    basketPrice: (function () {
      var basketPrice = 0;
      this.get('model').filter(function (book) {
        basketPrice += book.get('totalPrice');
      });
      return basketPrice;
    }).property('model.@each.totalPrice'),
    count: (function () {
      var quantity = 0;
      this.get('model').filter(function (book) {
        quantity += book.get('quantity');
      });
      return quantity;
    }).property('model.@each.quantity'),
    plural: (function () {
      return this.get('count') > 1;
    }).property('count')
  });

  exports['default'] = ApplicationController;

});
define('hp-app/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('hp-app/controllers/basket', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var BasketController = Ember['default'].Controller.extend({
    applicationController: Ember['default'].inject.controller('application'),
    basket: Ember['default'].computed.alias('applicationController.basket'),
    basketPrice: Ember['default'].computed.alias('applicationController.basketPrice'),
    offers: Ember['default'].A(),
    reduction: (function () {
      var diff = this.get('basketPrice') - this.get('basketFinalPrice');
      var round = Math.round(diff * 100);
      return round / 100;
    }).property('basketPrice', 'basketFinalPrice'),
    basketFinalPrice: (function () {
      var finalOffer;
      this.get('offers').forEach(function (offer) {
        if (!finalOffer || offer < finalOffer) {
          finalOffer = offer;
        }
      });
      return finalOffer;
    }).property('basketPrice'),
    basketToDisplay: (function () {
      var books = Ember['default'].A();
      this.get('basket').forEach(function (book) {
        if (!books.contains(book)) {
          books.pushObject(book);
        }
      });
      return books;
    }).property('model.@each.content'),
    percentageOffer: function percentageOffer(value) {
      var percent = value / 100;
      return this.get('basketPrice') - this.get('basketPrice') * percent;
    },
    minusOffer: function minusOffer(value) {
      return this.get('basketPrice') - value;
    },
    sliceOffer: function sliceOffer(value) {
      var step = Math.floor(this.get('basketPrice') / 100);
      return this.get('basketPrice') - step * value;
    },
    basketUpdate: (function () {
      var self = this;
      this.get('offers').clear();
      this.store.all('commercialOffer').filter(function (offer) {
        switch (offer.get('type')) {
          case 'percentage':
            //console.log('percentage::', self.percentageOffer(offer.get('value')));
            self.get('offers').push(self.percentageOffer(offer.get('value')));
            break;
          case 'minus':
            //console.log('minus::', self.minusOffer(offer.get('value')));
            self.get('offers').push(self.minusOffer(offer.get('value')));
            break;
          case 'slice':
            //console.log('slice::', self.sliceOffer(offer.get('value')));
            self.get('offers').push(self.sliceOffer(offer.get('value')));
            break;
          default:
            self.get('offers').push(self.get('basketPrice'));
        }
      });
    }).observes('model.@each.content')
  });

  exports['default'] = BasketController;

});
define('hp-app/controllers/books', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var BooksController = Ember['default'].Controller.extend({
    applicationController: Ember['default'].inject.controller('application'),
    books: Ember['default'].computed.readOnly('applicationController.model')
  });

  exports['default'] = BooksController;

});
define('hp-app/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('hp-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'hp-app/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('hp-app/initializers/export-application-global', ['exports', 'ember', 'hp-app/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('hp-app/models/basket', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Basket = DS['default'].Model.extend({
    books: DS['default'].hasMany('book')
  });

  exports['default'] = Basket;

});
define('hp-app/models/book', ['exports', 'ember-data', 'ember'], function (exports, DS, Ember) {

  'use strict';

  var Book = DS['default'].Model.extend(Ember['default'].Copyable, {
    isbn: DS['default'].attr('string'),
    title: DS['default'].attr('string'),
    cover: DS['default'].attr('string'),
    price: DS['default'].attr('number'),
    cover: DS['default'].attr('string'),
    selected: DS['default'].attr('boolean'),
    quantity: DS['default'].attr('number'),
    totalPrice: (function () {
      return this.get('quantity') * this.get('price');
    }).property('quantity', 'price')
  });

  exports['default'] = Book;

});
define('hp-app/models/commercial-offer', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Offer = DS['default'].Model.extend({
    type: DS['default'].attr('string'),
    sliceValue: DS['default'].attr('number'),
    value: DS['default'].attr('number')
  });

  exports['default'] = Offer;

});
define('hp-app/router', ['exports', 'ember', 'hp-app/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.resource('books', { path: '/books' }, function () {
      this.route('book');
    });
    this.resource('basket');
  });

  exports['default'] = Router;

});
define('hp-app/routes/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ApplicationRoute = Ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('book');
    },
    actions: {
      addArticle: function addArticle(book) {
        this.controllerFor('application').get('basket').pushObject(book);
      },
      removeArticle: function removeArticle(book) {
        this.controllerFor('application').get('basket').removeObject(book);
      }
    }
  });

  exports['default'] = ApplicationRoute;

});
define('hp-app/routes/basket', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var BasketRoute = Ember['default'].Route.extend({
    model: function model() {
      if (!this.controllerFor('application').get('basket').get('length')) {
        return this.transitionTo('books');
      }

      var isbns = Ember['default'].A();

      this.controllerFor('application').get('basket').forEach(function (book) {
        isbns.push(book.get('isbn'));
      });

      return this.store.find('commercial-offer', {
        isbns: isbns.join()
      }).then(function (offer) {
        return offer;
      });
    }
  });

  exports['default'] = BasketRoute;

});
define('hp-app/routes/books', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var BooksRoute = Ember['default'].Route.extend({
    actions: {
      addArticle: function addArticle(book) {
        book.incrementProperty('quantity');
        return true;
      },
      removeArticle: function removeArticle(book) {
        if (book.get('quantity') > 0) {
          book.decrementProperty('quantity');
          return true;
        }
      }
    }
  });

  exports['default'] = BooksRoute;

});
define('hp-app/routes/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var IndexRoute = Ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo('books');
    }
  });

  exports['default'] = IndexRoute;

});
define('hp-app/serializers/book', ['exports', 'ember', 'ember-data'], function (exports, Ember, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend({
    normalizePayload: function normalizePayload(payload) {
      var books = Ember['default'].A();

      payload.forEach(function (book) {
        book.id = book.isbn;
        book.quantity = 0;
        books.push(book);
      });

      var normalizedPayload = {
        books: books
      };

      return this._super(normalizedPayload);
    }
  });

});
define('hp-app/serializers/commercial-offer', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend({
    normalizePayload: function normalizePayload(payload) {

      payload.offers.forEach(function (offer, index) {
        offer.id = index;
      });

      var normalizedPayload = {
        commercialOffers: payload.offers
      };

      return this._super(normalizedPayload);
    }
  });

});
define('hp-app/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 5,
                "column": 2
              },
              "end": {
                "line": 7,
                "column": 2
              }
            },
            "moduleName": "hp-app/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  articles\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 2
              },
              "end": {
                "line": 9,
                "column": 2
              }
            },
            "moduleName": "hp-app/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  article\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 2
            },
            "end": {
              "line": 10,
              "column": 2
            }
          },
          "moduleName": "hp-app/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  Panier: ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["content","count",["loc",[null,[4,10],[4,19]]]],
          ["block","if",[["get","plural",["loc",[null,[5,8],[5,14]]]]],[],0,1,["loc",[null,[5,2],[9,9]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "hp-app/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("header");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2,"id","title");
        var el3 = dom.createTextNode("La bibliothèque d’Henri Potier");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),3,3);
        morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
        return morphs;
      },
      statements: [
        ["block","link-to",["basket"],["class","basket"],0,null,["loc",[null,[3,2],[10,14]]]],
        ["content","outlet",["loc",[null,[12,0],[12,10]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('hp-app/templates/basket', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 2
            },
            "end": {
              "line": 38,
              "column": 2
            }
          },
          "moduleName": "hp-app/templates/basket.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","disptr");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","disptc");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("img");
          dom.setAttribute(el3,"width","50");
          dom.setAttribute(el3,"height","71");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","disptc basket-cell");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("h5");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","disptc basket-cell");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("p");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","disptc basket-cell");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("p");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("€");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1, 1]);
          var morphs = new Array(5);
          morphs[0] = dom.createAttrMorph(element1, 'src');
          morphs[1] = dom.createAttrMorph(element1, 'alt');
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [3, 1]),0,0);
          morphs[3] = dom.createMorphAt(dom.childAt(element0, [5, 1]),0,0);
          morphs[4] = dom.createMorphAt(dom.childAt(element0, [7, 1]),0,0);
          return morphs;
        },
        statements: [
          ["attribute","src",["concat",[["get","book.cover",["loc",[null,[26,20],[26,30]]]]]]],
          ["attribute","alt",["concat",[["get","book.title",["loc",[null,[26,41],[26,51]]]]]]],
          ["content","book.title",["loc",[null,[29,12],[29,26]]]],
          ["content","book.quantity",["loc",[null,[32,11],[32,28]]]],
          ["content","book.totalPrice",["loc",[null,[35,11],[35,30]]]]
        ],
        locals: ["book"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 40,
            "column": 0
          }
        },
        "moduleName": "hp-app/templates/basket.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Votre Panier:");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","dispt tac");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","disptr");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","disptc");
        var el4 = dom.createTextNode("\n\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","disptc");
        var el4 = dom.createTextNode("\n      Livre\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","disptc");
        var el4 = dom.createTextNode("\n      Quantité\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","disptc");
        var el4 = dom.createTextNode("\n      Prix\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","disptc basket-cell");
        var el4 = dom.createTextNode("\n      Réduction:");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("€\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","disptc basket-cell");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("strong");
        var el5 = dom.createTextNode("TOTAL:");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("€\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [2]);
        var element3 = dom.childAt(element2, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element3, [9]),2,2);
        morphs[1] = dom.createMorphAt(dom.childAt(element3, [11]),3,3);
        morphs[2] = dom.createMorphAt(element2,3,3);
        return morphs;
      },
      statements: [
        ["content","reduction",["loc",[null,[17,20],[17,33]]]],
        ["content","basketFinalPrice",["loc",[null,[20,33],[20,53]]]],
        ["block","each",[["get","basketToDisplay",["loc",[null,[23,10],[23,25]]]]],[],0,null,["loc",[null,[23,2],[38,11]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('hp-app/templates/books', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 2
            }
          },
          "moduleName": "hp-app/templates/books.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","book-component",[],["book",["subexpr","@mut",[["get","book",["loc",[null,[3,26],[3,30]]]]],[],[]]],["loc",[null,[3,4],[3,32]]]]
        ],
        locals: ["book"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "hp-app/templates/books.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model",["loc",[null,[2,10],[2,15]]]]],[],0,null,["loc",[null,[2,2],[4,11]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('hp-app/templates/components/book-component', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "hp-app/templates/components/book-component.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","book");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2,"width","200");
        dom.setAttribute(el2,"height","286");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","buttons");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        var el4 = dom.createTextNode("-");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        var el4 = dom.createTextNode("+");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        var el4 = dom.createTextNode("(");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(")");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        dom.setAttribute(el2,"class","price");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("€");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element0, [5]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element2, [3]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[1] = dom.createAttrMorph(element1, 'class');
        morphs[2] = dom.createAttrMorph(element1, 'src');
        morphs[3] = dom.createAttrMorph(element1, 'alt');
        morphs[4] = dom.createElementMorph(element3);
        morphs[5] = dom.createElementMorph(element4);
        morphs[6] = dom.createMorphAt(dom.childAt(element2, [5]),1,1);
        morphs[7] = dom.createMorphAt(dom.childAt(element0, [7]),0,0);
        return morphs;
      },
      statements: [
        ["content","book.title",["loc",[null,[2,6],[2,20]]]],
        ["attribute","class",["concat",[["subexpr","if",[["get","book.selected",["loc",[null,[3,19],[3,32]]]],"selected"],[],["loc",[null,[3,14],[3,45]]]]]]],
        ["attribute","src",["concat",[["get","book.cover",["loc",[null,[3,54],[3,64]]]]]]],
        ["attribute","alt",["concat",[["get","book.title",["loc",[null,[3,75],[3,85]]]]]]],
        ["element","action",["remove",["get","book",["loc",[null,[5,30],[5,34]]]]],[],["loc",[null,[5,12],[5,36]]]],
        ["element","action",["add",["get","book",["loc",[null,[6,27],[6,31]]]]],[],["loc",[null,[6,12],[6,33]]]],
        ["content","book.quantity",["loc",[null,[7,11],[7,28]]]],
        ["content","book.price",["loc",[null,[9,19],[9,33]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('hp-app/tests/adapters/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('hp-app/tests/adapters/book.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/book.js should pass jshint', function(assert) { 
    assert.ok(true, 'adapters/book.js should pass jshint.'); 
  });

});
define('hp-app/tests/adapters/commercial-offer.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/commercial-offer.js should pass jshint', function(assert) { 
    assert.ok(false, 'adapters/commercial-offer.js should pass jshint.\nadapters/commercial-offer.js: line 10, col 14, \'Ember\' is not defined.\nadapters/commercial-offer.js: line 10, col 50, \'params\' is defined but never used.\n\n2 errors'); 
  });

});
define('hp-app/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.ok(true, 'app.js should pass jshint.'); 
  });

});
define('hp-app/tests/components/book-component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/book-component.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/book-component.js should pass jshint.'); 
  });

});
define('hp-app/tests/controllers/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'controllers/application.js should pass jshint.'); 
  });

});
define('hp-app/tests/controllers/basket.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/basket.js should pass jshint', function(assert) { 
    assert.ok(true, 'controllers/basket.js should pass jshint.'); 
  });

});
define('hp-app/tests/controllers/books.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/books.js should pass jshint', function(assert) { 
    assert.ok(true, 'controllers/books.js should pass jshint.'); 
  });

});
define('hp-app/tests/helpers/resolver', ['exports', 'ember/resolver', 'hp-app/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('hp-app/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('hp-app/tests/helpers/start-app', ['exports', 'ember', 'hp-app/app', 'hp-app/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('hp-app/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('hp-app/tests/models/basket.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/basket.js should pass jshint', function(assert) { 
    assert.ok(true, 'models/basket.js should pass jshint.'); 
  });

});
define('hp-app/tests/models/book.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/book.js should pass jshint', function(assert) { 
    assert.ok(false, 'models/book.js should pass jshint.\nmodels/book.js: line 9, col 8, Duplicate key \'cover\'.\n\n1 error'); 
  });

});
define('hp-app/tests/models/commercial-offer.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/commercial-offer.js should pass jshint', function(assert) { 
    assert.ok(true, 'models/commercial-offer.js should pass jshint.'); 
  });

});
define('hp-app/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function(assert) { 
    assert.ok(true, 'router.js should pass jshint.'); 
  });

});
define('hp-app/tests/routes/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('hp-app/tests/routes/basket.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/basket.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/basket.js should pass jshint.'); 
  });

});
define('hp-app/tests/routes/books.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/books.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/books.js should pass jshint.'); 
  });

});
define('hp-app/tests/routes/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/index.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/index.js should pass jshint.'); 
  });

});
define('hp-app/tests/serializers/book.jshint', function () {

  'use strict';

  QUnit.module('JSHint - serializers');
  QUnit.test('serializers/book.js should pass jshint', function(assert) { 
    assert.ok(true, 'serializers/book.js should pass jshint.'); 
  });

});
define('hp-app/tests/serializers/commercial-offer.jshint', function () {

  'use strict';

  QUnit.module('JSHint - serializers');
  QUnit.test('serializers/commercial-offer.js should pass jshint', function(assert) { 
    assert.ok(true, 'serializers/commercial-offer.js should pass jshint.'); 
  });

});
define('hp-app/tests/test-helper', ['hp-app/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('hp-app/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('hp-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'hp-app';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("hp-app/tests/test-helper");
} else {
  require("hp-app/app")["default"].create({"name":"hp-app","version":"0.0.0+"});
}

/* jshint ignore:end */
//# sourceMappingURL=hp-app.map