(function (React, client, semanticUiReact, Plot) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var Plot__namespace = /*#__PURE__*/_interopNamespace(Plot);

  const LIMIT_PER_PAGE = 3;
  // import Feed from './Feed';
  // import Quote from './Quote';
  // import Rate from './Rate';

  class Dashboard extends React__default["default"].Component {
    state = {
      network: 'playnet'
    };

    constructor(props = {}) {
      super(props);
      this._state = {
        assets: {},
        content: this.state // TODO: inherit get state () from Actor

      };
      this.ref = /*#__PURE__*/React__default["default"].createRef();
      this.chart = /*#__PURE__*/React__default["default"].createRef();
      return this;
    }

    componentDidMount() {
      const self = this;
      self._monitor = setInterval(async () => {
        const _GET = async function _GET(path) {
          const delta = (Math.random() < 0.5 ? 1 : -1) * Math.random();

          switch (path) {
            default:
              return {
                quotes: self.state.quotes
              };

            case '/quotes':
              return self.state.quotes.concat({
                created: new Date().toISOString(),
                delta: delta,
                rate: self.state.quotes[self.state.quotes.length - 1].rate + delta,
                currency: 'USD',
                symbol: 'BTC'
              });
          }
        };

        const simulator = {
          _GET
        };
        const remote = simulator; // new Remote({ authority: 'localhost:3000' });

        const result = await remote._GET('/quotes');
        self._state.content.quotes = result;
        self.setState(self._state.content);
      }, 2500);
    }

    trust(source) {
      source.on('log', this._handleSourceLog.bind(this));
    }

    _handleBridgeChange(change) {
      console.log('[FEED] Bridge Reported Change:', change);
    }

    _handleBridgeReady(info) {
      console.log('[FEED] Bridge Reported Ready:', info);
    }

    _handleSourceLog(log) {
      this.emit('log', `Source log: ${log}`);
    }

    registerSymbol(symbol) {
      this._state.assets[symbol] = {
        symbol,
        quotes: []
      }; // return new Actor(this._state.assets[symbol]);
    }

    render() {
      const quotes = [].concat(this.state.quotes).sort((a, b) => {
        return Date.parse(a.created) > Date.parse(b.created) ? -1 : 1;
      });
      const quoteView = quotes.slice(0, LIMIT_PER_PAGE);
      const outOfBounds = quotes.length - quoteView.length;
      const chart = Plot__namespace.line(quotes.map(x => {
        return { ...x,
          created: new Date(x.created)
        };
      }), {
        x: 'created',
        y: 'rate'
      }).plot({
        marginBottom: 50,
        marginLeft: 75,
        width: this.chart.current ? this.chart.current.offsetWidth : 600,
        x: {
          tickRotate: 45
        }
      });
      return /*#__PURE__*/React__default["default"].createElement("fabric-content-page", {
        className: "ui page",
        ref: this.ref
      }, /*#__PURE__*/React__default["default"].createElement(semanticUiReact.Segment, null, /*#__PURE__*/React__default["default"].createElement(semanticUiReact.Header, null, /*#__PURE__*/React__default["default"].createElement("h1", null, "Price")), /*#__PURE__*/React__default["default"].createElement(Feed, null), /*#__PURE__*/React__default["default"].createElement(semanticUiReact.Header, null, /*#__PURE__*/React__default["default"].createElement("h2", null, "Symbols")), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "ui cards"
      }, this.state.symbols.map((symbol, i) => {
        return /*#__PURE__*/React__default["default"].createElement(semanticUiReact.Card, {
          key: i
        }, /*#__PURE__*/React__default["default"].createElement(semanticUiReact.Card.Content, null, /*#__PURE__*/React__default["default"].createElement(semanticUiReact.Header, null, symbol), /*#__PURE__*/React__default["default"].createElement(Rate, {
          currency: this.state.currency,
          symbol: symbol
        })));
      })), /*#__PURE__*/React__default["default"].createElement(semanticUiReact.Header, null, /*#__PURE__*/React__default["default"].createElement("h2", null, "Quotes")), /*#__PURE__*/React__default["default"].createElement(semanticUiReact.Segment, {
        ref: this.chart,
        class: "chart",
        dangerouslySetInnerHTML: {
          __html: chart.outerHTML
        }
      }), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "ui cards"
      }, quoteView.map((quote, i) => {
        const id = quotes.length - i;
        return /*#__PURE__*/React__default["default"].createElement(semanticUiReact.Card, {
          key: id
        }, /*#__PURE__*/React__default["default"].createElement(semanticUiReact.Card.Content, null, /*#__PURE__*/React__default["default"].createElement(semanticUiReact.Header, null, /*#__PURE__*/React__default["default"].createElement("strong", null, "Quote #", id)), /*#__PURE__*/React__default["default"].createElement(Quote, {
          symbol: quote.symbol,
          currency: quote.currency,
          rate: quote.rate
        })));
      }), outOfBounds ? /*#__PURE__*/React__default["default"].createElement(semanticUiReact.Card, null, /*#__PURE__*/React__default["default"].createElement(semanticUiReact.Card.Content, null, /*#__PURE__*/React__default["default"].createElement(semanticUiReact.Button, null, outOfBounds, " more"))) : undefined)));
    }

  }

  if (!window) throw new Error('Not running in browser.  Exiting.'); // Dependencies

  const settings = {
    currency: 'USD',
    symbols: ['BTC', 'LTC', 'NMC']
  }; // Main Process Definition

  async function main(input = {}) {
    const container = document.getElementById('feed');
    const root = client.createRoot(container);
    root.render( /*#__PURE__*/React__namespace.createElement(Dashboard, {
      state: input
    }));
    return {
      react: {
        root
      }
    };
  } // Run Main Process


  main(settings).catch(exception => {
    console.error('[PORTAL:FEED] Main Process Exception:', exception);
  }).then(output => {
    console.log('[PORTAL:FEED] Main Process Output:', output);
  });

})(React, client, semanticUIReact, Plot);
