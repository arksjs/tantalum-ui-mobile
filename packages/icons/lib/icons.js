/* eslint-disable */
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var deepmerge = {exports: {}};

(function (module, exports) {
(function (root, factory) {
    {
        module.exports = factory();
    }
}(commonjsGlobal, function () {

function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object';

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

return deepmerge

}));
}(deepmerge));

var merge = deepmerge.exports;

//      
// An event handler can take an optional event argument
// and should not return a value
                                          
// An array of all currently registered event handlers for a type
                                            
// A map of event types and their corresponding event handlers.
                        
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberof mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).map(function (handler) { handler(evt); });
			(all['*'] || []).map(function (handler) { handler(type, evt); });
		}
	};
}

var namespaces$1 = {exports: {}};

(function (module, exports) {
const namespaces = {
  svg: {
    name: 'xmlns',
    uri: 'http://www.w3.org/2000/svg'
  },
  xlink: {
    name: 'xmlns:xlink',
    uri: 'http://www.w3.org/1999/xlink'
  }
};

exports.default = namespaces;
module.exports = exports.default;
}(namespaces$1, namespaces$1.exports));

var namespaces = namespaces$1.exports;

/**
 * @param {Object} attrs
 * @return {string}
 */
function objectToAttrsString (attrs) {
  return Object.keys(attrs).map((attr) => {
    const value = attrs[attr].toString().replace(/"/g, '&quot;');
    return `${attr}="${value}"`;
  }).join(' ');
}

const { svg: svg$1, xlink: xlink$1 } = namespaces;

const defaultAttrs = {
  [svg$1.name]: svg$1.uri,
  [xlink$1.name]: xlink$1.uri
};

/**
 * @param {string} [content]
 * @param {Object} [attributes]
 * @return {string}
 */
function wrapInSvgString (content = '', attributes) {
  const attrs = merge(defaultAttrs, attributes || {});
  const attrsRendered = objectToAttrsString(attrs);
  return `<svg ${attrsRendered}>${content}</svg>`;
}

const { svg, xlink } = namespaces;

var defaultConfig$1 = {
  attrs: {
    [svg.name]: svg.uri,
    [xlink.name]: xlink.uri,
    style: ['position: absolute', 'width: 0', 'height: 0'].join('; '),
    'aria-hidden': 'true'
  }
};

class Sprite {
  /**
   * @param {Object} [config]
   */
  constructor(config) {
    this.config = merge(defaultConfig$1, config || {});
    this.symbols = [];
  }

  /**
   * Add new symbol. If symbol with the same id exists it will be replaced.
   * @param {SpriteSymbol} symbol
   * @return {boolean} `true` - symbol was added, `false` - replaced
   */
  add(symbol) {
    const { symbols } = this;
    const existing = this.find(symbol.id);

    if (existing) {
      symbols[symbols.indexOf(existing)] = symbol;
      return false;
    }

    symbols.push(symbol);
    return true;
  }

  /**
   * Remove symbol & destroy it
   * @param {string} id
   * @return {boolean} `true` - symbol was found & successfully destroyed, `false` - otherwise
   */
  remove(id) {
    const { symbols } = this;
    const symbol = this.find(id);

    if (symbol) {
      symbols.splice(symbols.indexOf(symbol), 1);
      symbol.destroy();
      return true;
    }

    return false;
  }

  /**
   * @param {string} id
   * @return {SpriteSymbol|null}
   */
  find(id) {
    return this.symbols.filter(s => s.id === id)[0] || null;
  }

  /**
   * @param {string} id
   * @return {boolean}
   */
  has(id) {
    return this.find(id) !== null;
  }

  /**
   * @return {string}
   */
  stringify() {
    const { attrs } = this.config;
    const stringifiedSymbols = this.symbols.map(s => s.stringify()).join('');
    return wrapInSvgString(stringifiedSymbols, attrs);
  }

  /**
   * @return {string}
   */
  toString() {
    return this.stringify();
  }

  destroy() {
    this.symbols.forEach(s => s.destroy());
  }
}

class SpriteSymbol {
  constructor({ id, viewBox, content }) {
    this.id = id;
    this.viewBox = viewBox;
    this.content = content;
  }

  /**
   * @return {string}
   */
  stringify() {
    return this.content;
  }

  /**
   * @return {string}
   */
  toString() {
    return this.stringify();
  }

  destroy() {
    ['id', 'viewBox', 'content'].forEach(prop => delete this[prop]);
  }
}

/**
 * @param {string} content
 * @return {Element}
 */
function parse (content) {
  const hasImportNode = !!document.importNode;
  const doc = new DOMParser().parseFromString(content, 'image/svg+xml').documentElement;

  /**
   * Fix for browser which are throwing WrongDocumentError
   * if you insert an element which is not part of the document
   * @see http://stackoverflow.com/a/7986519/4624403
   */
  if (hasImportNode) {
    return document.importNode(doc, true);
  }

  return doc;
}

class BrowserSpriteSymbol extends SpriteSymbol {
  get isMounted() {
    return !!this.node;
  }

  /**
   * @param {Element} node
   * @return {BrowserSpriteSymbol}
   */
  static createFromExistingNode(node) {
    return new BrowserSpriteSymbol({
      id: node.getAttribute('id'),
      viewBox: node.getAttribute('viewBox'),
      content: node.outerHTML
    });
  }

  destroy() {
    if (this.isMounted) {
      this.unmount();
    }
    super.destroy();
  }

  /**
   * @param {Element|string} target
   * @return {Element}
   */
  mount(target) {
    if (this.isMounted) {
      return this.node;
    }

    const mountTarget = typeof target === 'string' ? document.querySelector(target) : target;
    const node = this.render();
    this.node = node;

    mountTarget.appendChild(node);

    return node;
  }

  /**
   * @return {Element}
   */
  render() {
    const content = this.stringify();
    return parse(wrapInSvgString(content)).childNodes[0];
  }

  unmount() {
    this.node.parentNode.removeChild(this.node);
  }
}

var defaultConfig = {
  /**
   * Should following options be automatically configured:
   * - `syncUrlsWithBaseTag`
   * - `locationChangeAngularEmitter`
   * - `moveGradientsOutsideSymbol`
   * @type {boolean}
   */
  autoConfigure: true,

  /**
   * Default mounting selector
   * @type {string}
   */
  mountTo: 'body',

  /**
   * Fix disappearing SVG elements when <base href> exists.
   * Executes when sprite mounted.
   * @see http://stackoverflow.com/a/18265336/796152
   * @see https://github.com/everdimension/angular-svg-base-fix
   * @see https://github.com/angular/angular.js/issues/8934#issuecomment-56568466
   * @type {boolean}
   */
  syncUrlsWithBaseTag: false,

  /**
   * Should sprite listen custom location change event
   * @type {boolean}
   */
  listenLocationChangeEvent: true,

  /**
   * Custom window event name which should be emitted to update sprite urls
   * @type {string}
   */
  locationChangeEvent: 'locationChange',

  /**
   * Emit location change event in Angular automatically
   * @type {boolean}
   */
  locationChangeAngularEmitter: false,

  /**
   * Selector to find symbols usages when updating sprite urls
   * @type {string}
   */
  usagesToUpdate: 'use[*|href]',

  /**
   * Fix Firefox bug when gradients and patterns don't work if they are within a symbol.
   * Executes when sprite is rendered, but not mounted.
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=306674
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=353575
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=1235364
   * @type {boolean}
   */
  moveGradientsOutsideSymbol: false
};

/**
 * @param {*} arrayLike
 * @return {Array}
 */
function arrayFrom (arrayLike) {
  return Array.prototype.slice.call(arrayLike, 0);
}

var browser = {
  isChrome: () => /chrome/i.test(navigator.userAgent),
  isFirefox: () => /firefox/i.test(navigator.userAgent),

  // https://msdn.microsoft.com/en-us/library/ms537503(v=vs.85).aspx
  isIE: () => /msie/i.test(navigator.userAgent) || /trident/i.test(navigator.userAgent),
  isEdge: () => /edge/i.test(navigator.userAgent)
};

/**
 * @param {string} name
 * @param {*} data
 */
function dispatchEvent (name, data) {
  const event = document.createEvent('CustomEvent');
  event.initCustomEvent(name, false, false, data);
  window.dispatchEvent(event);
}

/**
 * IE doesn't evaluate <style> tags in SVGs that are dynamically added to the page.
 * This trick will trigger IE to read and use any existing SVG <style> tags.
 * @see https://github.com/iconic/SVGInjector/issues/23
 * @see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10898469/
 *
 * @param {Element} node DOM Element to search <style> tags in
 * @return {Array<HTMLStyleElement>}
 */
function evalStylesIEWorkaround (node) {
  const updatedNodes = [];

  arrayFrom(node.querySelectorAll('style'))
    .forEach((style) => {
      style.textContent += '';
      updatedNodes.push(style);
    });

  return updatedNodes;
}

/**
 * @param {string} [url] If not provided - current URL will be used
 * @return {string}
 */
function getUrlWithoutFragment (url) {
  return (url || window.location.href).split('#')[0];
}

/* global angular */

/**
 * @param {string} eventName
 */
function locationChangeAngularEmitter (eventName) {
  angular.module('ng').run(['$rootScope', ($rootScope) => {
    $rootScope.$on('$locationChangeSuccess', (e, newUrl, oldUrl) => {
      dispatchEvent(eventName, { oldUrl, newUrl });
    });
  }]);
}

const defaultSelector = 'linearGradient, radialGradient, pattern, mask, clipPath';

/**
 * @param {Element} svg
 * @param {string} [selector]
 * @return {Element}
 */
function moveGradientsOutsideSymbol (svg, selector = defaultSelector) {
  arrayFrom(svg.querySelectorAll('symbol')).forEach((symbol) => {
    arrayFrom(symbol.querySelectorAll(selector)).forEach((node) => {
      symbol.parentNode.insertBefore(node, symbol);
    });
  });
  return svg;
}

/**
 * @param {NodeList} nodes
 * @param {Function} [matcher]
 * @return {Attr[]}
 */
function selectAttributes(nodes, matcher) {
  const attrs = arrayFrom(nodes).reduce((acc, node) => {
    if (!node.attributes) {
      return acc;
    }

    const arrayfied = arrayFrom(node.attributes);
    const matched = matcher ? arrayfied.filter(matcher) : arrayfied;
    return acc.concat(matched);
  }, []);

  return attrs;
}

const xLinkNS = namespaces.xlink.uri;
const xLinkAttrName = 'xlink:href';

// eslint-disable-next-line no-useless-escape
const specialUrlCharsPattern = /[{}|\\\^\[\]`"<>]/g;

function encoder(url) {
  return url.replace(specialUrlCharsPattern, (match) => {
    return `%${match[0].charCodeAt(0).toString(16).toUpperCase()}`;
  });
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

/**
 * @param {NodeList} nodes
 * @param {string} startsWith
 * @param {string} replaceWith
 * @return {NodeList}
 */
function updateReferences(nodes, startsWith, replaceWith) {
  arrayFrom(nodes).forEach((node) => {
    const href = node.getAttribute(xLinkAttrName);
    if (href && href.indexOf(startsWith) === 0) {
      const newUrl = href.replace(startsWith, replaceWith);
      node.setAttributeNS(xLinkNS, xLinkAttrName, newUrl);
    }
  });

  return nodes;
}

/**
 * List of SVG attributes to update url() target in them
 */
const attList = [
  'clipPath',
  'colorProfile',
  'src',
  'cursor',
  'fill',
  'filter',
  'marker',
  'markerStart',
  'markerMid',
  'markerEnd',
  'mask',
  'stroke',
  'style'
];

const attSelector = attList.map(attr => `[${attr}]`).join(',');

/**
 * Update URLs in svg image (like `fill="url(...)"`) and update referencing elements
 * @param {Element} svg
 * @param {NodeList} references
 * @param {string|RegExp} startsWith
 * @param {string} replaceWith
 * @return {void}
 *
 * @example
 * const sprite = document.querySelector('svg.sprite');
 * const usages = document.querySelectorAll('use');
 * updateUrls(sprite, usages, '#', 'prefix#');
 */
function updateUrls (svg, references, startsWith, replaceWith) {
  const startsWithEncoded = encoder(startsWith);
  const replaceWithEncoded = encoder(replaceWith);

  const nodes = svg.querySelectorAll(attSelector);
  const attrs = selectAttributes(nodes, ({ localName, value }) => {
    return attList.indexOf(localName) !== -1 && value.indexOf(`url(${startsWithEncoded}`) !== -1;
  });

  attrs.forEach(attr => attr.value = attr.value.replace(new RegExp(escapeRegExp(startsWithEncoded), 'g'), replaceWithEncoded));
  updateReferences(references, startsWithEncoded, replaceWithEncoded);
}

/**
 * Internal emitter events
 * @enum
 * @private
 */
const Events = {
  MOUNT: 'mount',
  SYMBOL_MOUNT: 'symbol_mount'
};

class BrowserSprite extends Sprite {
  constructor(cfg = {}) {
    super(merge(defaultConfig, cfg));

    const emitter = mitt();
    this._emitter = emitter;
    this.node = null;

    const { config } = this;

    if (config.autoConfigure) {
      this._autoConfigure(cfg);
    }

    if (config.syncUrlsWithBaseTag) {
      const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
      emitter.on(Events.MOUNT, () => this.updateUrls('#', baseUrl));
    }

    const handleLocationChange = this._handleLocationChange.bind(this);
    this._handleLocationChange = handleLocationChange;

    // Provide way to update sprite urls externally via dispatching custom window event
    if (config.listenLocationChangeEvent) {
      window.addEventListener(config.locationChangeEvent, handleLocationChange);
    }

    // Emit location change event in Angular automatically
    if (config.locationChangeAngularEmitter) {
      locationChangeAngularEmitter(config.locationChangeEvent);
    }

    // After sprite mounted
    emitter.on(Events.MOUNT, (spriteNode) => {
      if (config.moveGradientsOutsideSymbol) {
        moveGradientsOutsideSymbol(spriteNode);
      }
    });

    // After symbol mounted into sprite
    emitter.on(Events.SYMBOL_MOUNT, (symbolNode) => {
      if (config.moveGradientsOutsideSymbol) {
        moveGradientsOutsideSymbol(symbolNode.parentNode);
      }

      if (browser.isIE() || browser.isEdge()) {
        evalStylesIEWorkaround(symbolNode);
      }
    });
  }

  /**
   * @return {boolean}
   */
  get isMounted() {
    return !!this.node;
  }

  /**
   * Automatically configure following options
   * - `syncUrlsWithBaseTag`
   * - `locationChangeAngularEmitter`
   * - `moveGradientsOutsideSymbol`
   * @param {Object} cfg
   * @private
   */
  _autoConfigure(cfg) {
    const { config } = this;

    if (typeof cfg.syncUrlsWithBaseTag === 'undefined') {
      config.syncUrlsWithBaseTag = typeof document.getElementsByTagName('base')[0] !== 'undefined';
    }

    if (typeof cfg.locationChangeAngularEmitter === 'undefined') {
        config.locationChangeAngularEmitter = typeof window.angular !== 'undefined';
    }

    if (typeof cfg.moveGradientsOutsideSymbol === 'undefined') {
      config.moveGradientsOutsideSymbol = browser.isFirefox();
    }
  }

  /**
   * @param {Event} event
   * @param {Object} event.detail
   * @param {string} event.detail.oldUrl
   * @param {string} event.detail.newUrl
   * @private
   */
  _handleLocationChange(event) {
    const { oldUrl, newUrl } = event.detail;
    this.updateUrls(oldUrl, newUrl);
  }

  /**
   * Add new symbol. If symbol with the same id exists it will be replaced.
   * If sprite already mounted - `symbol.mount(sprite.node)` will be called.
   * @fires Events#SYMBOL_MOUNT
   * @param {BrowserSpriteSymbol} symbol
   * @return {boolean} `true` - symbol was added, `false` - replaced
   */
  add(symbol) {
    const sprite = this;
    const isNewSymbol = super.add(symbol);

    if (this.isMounted && isNewSymbol) {
      symbol.mount(sprite.node);
      this._emitter.emit(Events.SYMBOL_MOUNT, symbol.node);
    }

    return isNewSymbol;
  }

  /**
   * Attach to existing DOM node
   * @param {string|Element} target
   * @return {Element|null} attached DOM Element. null if node to attach not found.
   */
  attach(target) {
    const sprite = this;

    if (sprite.isMounted) {
      return sprite.node;
    }

    /** @type Element */
    const node = typeof target === 'string' ? document.querySelector(target) : target;
    sprite.node = node;

    // Already added symbols needs to be mounted
    this.symbols.forEach((symbol) => {
      symbol.mount(sprite.node);
      this._emitter.emit(Events.SYMBOL_MOUNT, symbol.node);
    });

    // Create symbols from existing DOM nodes, add and mount them
    arrayFrom(node.querySelectorAll('symbol'))
      .forEach((symbolNode) => {
        const symbol = BrowserSpriteSymbol.createFromExistingNode(symbolNode);
        symbol.node = symbolNode; // hack to prevent symbol mounting to sprite when adding
        sprite.add(symbol);
      });

    this._emitter.emit(Events.MOUNT, node);

    return node;
  }

  destroy() {
    const { config, symbols, _emitter } = this;

    symbols.forEach(s => s.destroy());

    _emitter.off('*');
    window.removeEventListener(config.locationChangeEvent, this._handleLocationChange);

    if (this.isMounted) {
      this.unmount();
    }
  }

  /**
   * @fires Events#MOUNT
   * @param {string|Element} [target]
   * @param {boolean} [prepend=false]
   * @return {Element|null} rendered sprite node. null if mount node not found.
   */
  mount(target = this.config.mountTo, prepend = false) {
    const sprite = this;

    if (sprite.isMounted) {
      return sprite.node;
    }

    const mountNode = typeof target === 'string' ? document.querySelector(target) : target;
    const node = sprite.render();
    this.node = node;

    if (prepend && mountNode.childNodes[0]) {
      mountNode.insertBefore(node, mountNode.childNodes[0]);
    } else {
      mountNode.appendChild(node);
    }

    this._emitter.emit(Events.MOUNT, node);

    return node;
  }

  /**
   * @return {Element}
   */
  render() {
    return parse(this.stringify());
  }

  /**
   * Detach sprite from the DOM
   */
  unmount() {
    this.node.parentNode.removeChild(this.node);
  }

  /**
   * Update URLs in sprite and usage elements
   * @param {string} oldUrl
   * @param {string} newUrl
   * @return {boolean} `true` - URLs was updated, `false` - sprite is not mounted
   */
  updateUrls(oldUrl, newUrl) {
    if (!this.isMounted) {
      return false;
    }

    const usages = document.querySelectorAll(this.config.usagesToUpdate);

    updateUrls(
      this.node,
      usages,
      `${getUrlWithoutFragment(oldUrl)}#`,
      `${getUrlWithoutFragment(newUrl)}#`
    );

    return true;
  }

}

const spriteNodeId = '__SVG_SPRITE_NODE__';
const spriteGlobalVarName = '__SVG_SPRITE__';

const loadSprite = () => {
  /**
   * Check for page already contains sprite node
   * If found - attach to and reuse it's content
   * If not - render and mount the new sprite
   */
  const existing = document.getElementById(spriteNodeId);

  if (existing) {
    sprite.attach(existing);
  } else {
    sprite.mount(document.body, true);
  }
};

/*!
 * domready (c) Dustin Diaz 2014 - License MIT
 */
const createDomReady = () => {
  var fns = [],
    listener,
    doc = document,
    hack = doc.documentElement.doScroll,
    domContentLoaded = 'DOMContentLoaded',
    loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

  if (!loaded)
    doc.addEventListener(
      domContentLoaded,
      (listener = function () {
        doc.removeEventListener(domContentLoaded, listener);
        loaded = 1;
        while ((listener = fns.shift())) listener();
      })
    );

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  }
};

let sprite = new BrowserSprite({
  attrs: {
    id: spriteNodeId,
    'aria-hidden': 'true'
  },
  autoConfigure: typeof document !== 'undefined',
  listenLocationChangeEvent: typeof window !== 'undefined'
});

const init = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  if (window[spriteGlobalVarName]) {
    sprite = window[spriteGlobalVarName];
  } else {
    window[spriteGlobalVarName] = sprite;
  }

  if (document.body) {
    loadSprite();
  } else {
    createDomReady()(loadSprite);
  }
};

init();

const symbol$M = new BrowserSpriteSymbol({"id":"CheckCircleFilled","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"CheckCircleFilled\">\n  <path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$M);

var require_context_module_0_0 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$M
});

const symbol$L = new BrowserSpriteSymbol({"id":"CheckSquareFilled","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"CheckSquareFilled\">\n  <path d=\"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM695.5 365.7l-210.6 292a31.8 31.8 0 01-51.7 0L308.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H689c6.5 0 10.3 7.4 6.5 12.7z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$L);

var require_context_module_0_1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$L
});

const symbol$K = new BrowserSpriteSymbol({"id":"CloseCircleFilled","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"CloseCircleFilled\">\n  <path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$K);

var require_context_module_0_2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$K
});

const symbol$J = new BrowserSpriteSymbol({"id":"HeartFilled","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"HeartFilled\">\n  <path d=\"M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$J);

var require_context_module_0_3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$J
});

const symbol$I = new BrowserSpriteSymbol({"id":"InfoCircleFilled","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"InfoCircleFilled\">\n  <path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$I);

var require_context_module_0_4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$I
});

const symbol$H = new BrowserSpriteSymbol({"id":"StarFilled","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"StarFilled\">\n  <path d=\"M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$H);

var require_context_module_0_5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$H
});

const symbol$G = new BrowserSpriteSymbol({"id":"WarningFilled","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"WarningFilled\">\n  <path d=\"M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$G);

var require_context_module_0_6 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$G
});

const symbol$F = new BrowserSpriteSymbol({"id":"BackspaceOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"BackspaceOutlined\">\n  <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M898,264H336.7L113.6,512l223.2,248H898V264z M336.7,202.1c-17.6,0-34.3,7.5-46.1,20.5l-223.2,248c-21.2,23.6-21.2,59.4,0,82.9l223.2,248c11.8,13.1,28.5,20.5,46.1,20.5H898c34.2,0,62-27.8,62-62V264c0-34.2-27.8-62-62-62H336.7z\" />\n  <path d=\"M743.7,376.7c0-3.7-3-6.7-6.7-6.7l-55.1,0.3l-83,99l-82.9-98.9l-55.2-0.3c-3.7,0-6.7,2.9-6.7,6.7c0,1.6,0.6,3.1,1.6,4.3l108.7,129.5L455.6,640c-1,1.3-1.6,2.8-1.6,4.3c0,3.7,3,6.7,6.7,6.7l55.2-0.3l82.9-99l82.9,98.9l55.1,0.3c3.7,0,6.7-2.9,6.7-6.7c0-1.6-0.6-3.1-1.6-4.3L633.5,510.5L742.2,381C743.2,379.9,743.7,378.3,743.7,376.7z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$F);

var require_context_module_0_7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$F
});

const symbol$E = new BrowserSpriteSymbol({"id":"BorderOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"BorderOutlined\">\n  <path d=\"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$E);

var require_context_module_0_8 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$E
});

const symbol$D = new BrowserSpriteSymbol({"id":"CheckCircleOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"CheckCircleOutlined\">\n  <path d=\"M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z\" />\n  <path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$D);

var require_context_module_0_9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$D
});

const symbol$C = new BrowserSpriteSymbol({"id":"CheckSquareOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"CheckSquareOutlined\">\n  <path d=\"M433.1 657.7a31.8 31.8 0 0051.7 0l210.6-292c3.8-5.3 0-12.7-6.5-12.7H642c-10.2 0-19.9 4.9-25.9 13.3L459 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H315c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8z\" />\n  <path d=\"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$C);

var require_context_module_0_10 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$C
});

const symbol$B = new BrowserSpriteSymbol({"id":"CheckOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"CheckOutlined\">\n  <path d=\"M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$B);

var require_context_module_0_11 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$B
});

const symbol$A = new BrowserSpriteSymbol({"id":"CircleOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"CircleOutlined\">\n  <path d=\"M512,140c50.3,0,99,9.8,144.8,29.2c44.3,18.7,84.1,45.6,118.3,79.8c34.2,34.2,61,74,79.8,118.3C874.2,413,884,461.7,884,512s-9.8,99-29.2,144.8c-18.7,44.3-45.6,84.1-79.8,118.3c-34.2,34.2-74,61-118.3,79.8C611,874.2,562.3,884,512,884s-99-9.8-144.8-29.2c-44.3-18.7-84.1-45.6-118.3-79.8c-34.2-34.2-61-74-79.8-118.3C149.8,611,140,562.3,140,512s9.8-99,29.2-144.8c18.7-44.3,45.6-84.1,79.8-118.3c34.2-34.2,74-61,118.3-79.8C413,149.8,461.7,140,512,140 M512,64C264.6,64,64,264.6,64,512s200.6,448,448,448s448-200.6,448-448S759.4,64,512,64L512,64z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$A);

var require_context_module_0_12 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$A
});

const symbol$z = new BrowserSpriteSymbol({"id":"CloseCircleOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"CloseCircleOutlined\">\n  <path d=\"M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z\" />\n  <path d=\"M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$z);

var require_context_module_0_13 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$z
});

const symbol$y = new BrowserSpriteSymbol({"id":"CloseOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"CloseOutlined\">\n  <path d=\"M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$y);

var require_context_module_0_14 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$y
});

const symbol$x = new BrowserSpriteSymbol({"id":"DeleteOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"DeleteOutlined\">\n  <path d=\"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$x);

var require_context_module_0_15 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$x
});

const symbol$w = new BrowserSpriteSymbol({"id":"DownCircleOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"DownCircleOutlined\">\n  <path d=\"M690 405h-46.9c-10.2 0-19.9 4.9-25.9 13.2L512 563.6 406.8 418.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246c3.2 4.4 9.7 4.4 12.9 0l178-246c3.9-5.3.1-12.7-6.4-12.7z\" />\n  <path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$w);

var require_context_module_0_16 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$w
});

const symbol$v = new BrowserSpriteSymbol({"id":"DownOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"DownOutlined\">\n  <path d=\"M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$v);

var require_context_module_0_17 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$v
});

const symbol$u = new BrowserSpriteSymbol({"id":"EditOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"EditOutlined\">\n  <path d=\"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$u);

var require_context_module_0_18 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$u
});

const symbol$t = new BrowserSpriteSymbol({"id":"ExclamationCircleOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"ExclamationCircleOutlined\">\n  <path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z\" />\n  <path d=\"M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$t);

var require_context_module_0_19 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$t
});

const symbol$s = new BrowserSpriteSymbol({"id":"ExclamationOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"ExclamationOutlined\">\n  <path d=\"M448 804a64 64 0 10128 0 64 64 0 10-128 0zm32-168h64c4.4 0 8-3.6 8-8V164c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$s);

var require_context_module_0_20 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$s
});

const symbol$r = new BrowserSpriteSymbol({"id":"HeartOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"HeartOutlined\">\n  <path d=\"M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$r);

var require_context_module_0_21 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$r
});

const symbol$q = new BrowserSpriteSymbol({"id":"HomeOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"HomeOutlined\">\n  <path d=\"M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$q);

var require_context_module_0_22 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$q
});

const symbol$p = new BrowserSpriteSymbol({"id":"ImageBreakOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"ImageBreakOutlined\">\n  <path d=\"M304,280c-48.6,0-88,39.4-88,88c0,48.6,39.4,88,88,88s88-39.4,88-88C392,319.4,352.6,280,304,280z M928,160H525.3l-58,72H888v430.2L664.2,396.8c-3.2-3.8-9-3.8-12.2,0l-62.7,74.3l174.9,214.4L624.6,864H928c17.7,0,32-14.3,32-32V192C960,174.3,945.7,160,928,160z M536.8,533.3L424.6,666.4l-144-170.7c-3.2-3.8-9-3.8-12.2,0L136,652.7V232h245.3l58-72H96c-17.7,0-32,14.3-32,32v640c0,17.7,14.3,32,32,32h427l138.8-177.5L536.8,533.3z M304,280c-48.6,0-88,39.4-88,88c0,48.6,39.4,88,88,88s88-39.4,88-88C392,319.4,352.6,280,304,280z M304,280c-48.6,0-88,39.4-88,88c0,48.6,39.4,88,88,88s88-39.4,88-88C392,319.4,352.6,280,304,280z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$p);

var require_context_module_0_23 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$p
});

const symbol$o = new BrowserSpriteSymbol({"id":"ImageOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"ImageOutlined\">\n  <path d=\"M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z\" />\n  <path d=\"M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$o);

var require_context_module_0_24 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$o
});

const symbol$n = new BrowserSpriteSymbol({"id":"InfoCircleOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"InfoCircleOutlined\">\n  <path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z\" />\n  <path d=\"M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$n);

var require_context_module_0_25 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$n
});

const symbol$m = new BrowserSpriteSymbol({"id":"InfoOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"InfoOutlined\">\n  <path d=\"M448 224a64 64 0 10128 0 64 64 0 10-128 0zm96 168h-64c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V400c0-4.4-3.6-8-8-8z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$m);

var require_context_module_0_26 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$m
});

const symbol$l = new BrowserSpriteSymbol({"id":"KeyboardOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"KeyboardOutlined\">\n  <path d=\"M903.94,800.26H119.06A56.13,56.13,0,0,1,63,744.2V295.69a56.13,56.13,0,0,1,56.06-56.07H903.94A56.13,56.13,0,0,1,960,295.69V744.2A56.13,56.13,0,0,1,903.94,800.26ZM119.06,295.69h0l0,448.51H903.94V295.69Z\" />\n  <rect x=\"203.15\" y=\"379.78\" width=\"56.06\" height=\"56.06\" rx=\"14.02\" />\n  <rect x=\"315.28\" y=\"379.78\" width=\"56.06\" height=\"56.06\" rx=\"14.02\" />\n  <rect x=\"427.4\" y=\"379.78\" width=\"56.06\" height=\"56.06\" rx=\"14.02\" />\n  <rect x=\"539.53\" y=\"379.78\" width=\"56.06\" height=\"56.06\" rx=\"14.02\" />\n  <rect x=\"651.65\" y=\"379.78\" width=\"56.06\" height=\"56.06\" rx=\"14.02\" />\n  <rect x=\"763.78\" y=\"379.78\" width=\"56.06\" height=\"56.06\" rx=\"14.02\" />\n  <rect x=\"259.21\" y=\"491.91\" width=\"56.06\" height=\"56.06\" rx=\"14.02\" />\n  <rect x=\"371.34\" y=\"491.91\" width=\"56.06\" height=\"56.06\" rx=\"14.02\" />\n  <rect x=\"483.46\" y=\"491.91\" width=\"56.06\" height=\"56.06\" rx=\"14.02\" />\n  <rect x=\"595.59\" y=\"491.91\" width=\"56.06\" height=\"56.06\" rx=\"14.02\" />\n  <rect x=\"707.71\" y=\"491.91\" width=\"56.06\" height=\"56.06\" rx=\"14.02\" />\n  <rect x=\"203.15\" y=\"604.03\" width=\"56.06\" height=\"56.06\" rx=\"14.02\" />\n  <rect x=\"315.28\" y=\"604.03\" width=\"392.44\" height=\"56.06\" rx=\"14.02\" />\n  <rect x=\"763.78\" y=\"604.03\" width=\"56.06\" height=\"56.06\" rx=\"14.02\" />\n  <path d=\"M512,912.38l-60.69-84.1H572.69Z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$l);

var require_context_module_0_27 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$l
});

const symbol$k = new BrowserSpriteSymbol({"id":"LeftOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"LeftOutlined\">\n  <path d=\"M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$k);

var require_context_module_0_28 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$k
});

const symbol$j = new BrowserSpriteSymbol({"id":"LoadingOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"LoadingOutlined\">\n  <path d=\"M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$j);

var require_context_module_0_29 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$j
});

const symbol$i = new BrowserSpriteSymbol({"id":"ManOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"ManOutlined\">\n  <path d=\"M874 120H622c-3.3 0-6 2.7-6 6v56c0 3.3 2.7 6 6 6h160.4L583.1 387.3c-50-38.5-111-59.3-175.1-59.3-76.9 0-149.3 30-203.6 84.4S120 539.1 120 616s30 149.3 84.4 203.6C258.7 874 331.1 904 408 904s149.3-30 203.6-84.4C666 765.3 696 692.9 696 616c0-64.1-20.8-124.9-59.2-174.9L836 241.9V402c0 3.3 2.7 6 6 6h56c3.3 0 6-2.7 6-6V150c0-16.5-13.5-30-30-30zM408 828c-116.9 0-212-95.1-212-212s95.1-212 212-212 212 95.1 212 212-95.1 212-212 212z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$i);

var require_context_module_0_30 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$i
});

const symbol$h = new BrowserSpriteSymbol({"id":"MenuOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"MenuOutlined\">\n  <path d=\"M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$h);

var require_context_module_0_31 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$h
});

const symbol$g = new BrowserSpriteSymbol({"id":"MinusOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"MinusOutlined\">\n  <path d=\"M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$g);

var require_context_module_0_32 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$g
});

const symbol$f = new BrowserSpriteSymbol({"id":"MoonOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"MoonOutlined\">\n  <path d=\"M923.306667 554.666667a42.666667 42.666667 0 0 0-44.8-5.973334 343.466667 343.466667 0 0 1-143.786667 31.146667 347.733333 347.733333 0 0 1-347.306667-345.6 366.506667 366.506667 0 0 1 10.666667-85.333333A42.666667 42.666667 0 0 0 341.333333 100.693333a432.64 432.64 0 1 0 597.333334 498.773334 42.666667 42.666667 0 0 0-15.36-44.8z m-405.333334 285.44A347.306667 347.306667 0 0 1 302.08 222.72v11.52a433.066667 433.066667 0 0 0 432.64 432.64 417.706667 417.706667 0 0 0 89.6-9.386667 346.026667 346.026667 0 0 1-306.346667 184.32z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$f);

var require_context_module_0_33 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$f
});

const symbol$e = new BrowserSpriteSymbol({"id":"PlusOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"PlusOutlined\">\n  <path d=\"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z\" />\n  <path d=\"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$e);

var require_context_module_0_34 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$e
});

const symbol$d = new BrowserSpriteSymbol({"id":"ReloadOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"ReloadOutlined\">\n  <path d=\"M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$d);

var require_context_module_0_35 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$d
});

const symbol$c = new BrowserSpriteSymbol({"id":"RightOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"RightOutlined\">\n  <path d=\"M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$c);

var require_context_module_0_36 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$c
});

const symbol$b = new BrowserSpriteSymbol({"id":"ScanOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"ScanOutlined\">\n  <path d=\"M136 384h56c4.4 0 8-3.6 8-8V200h176c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H196c-37.6 0-68 30.4-68 68v180c0 4.4 3.6 8 8 8zm512-184h176v176c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V196c0-37.6-30.4-68-68-68H648c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zM376 824H200V648c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v180c0 37.6 30.4 68 68 68h180c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm512-184h-56c-4.4 0-8 3.6-8 8v176H648c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h180c37.6 0 68-30.4 68-68V648c0-4.4-3.6-8-8-8zm16-164H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$b);

var require_context_module_0_37 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$b
});

const symbol$a = new BrowserSpriteSymbol({"id":"SearchOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"SearchOutlined\">\n  <path d=\"M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$a);

var require_context_module_0_38 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$a
});

const symbol$9 = new BrowserSpriteSymbol({"id":"SettingOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"SettingOutlined\">\n  <path d=\"M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$9);

var require_context_module_0_39 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$9
});

const symbol$8 = new BrowserSpriteSymbol({"id":"ShareAltOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"ShareAltOutlined\">\n  <path d=\"M752 664c-28.5 0-54.8 10-75.4 26.7L469.4 540.8a160.68 160.68 0 000-57.6l207.2-149.9C697.2 350 723.5 360 752 360c66.2 0 120-53.8 120-120s-53.8-120-120-120-120 53.8-120 120c0 11.6 1.6 22.7 4.7 33.3L439.9 415.8C410.7 377.1 364.3 352 312 352c-88.4 0-160 71.6-160 160s71.6 160 160 160c52.3 0 98.7-25.1 127.9-63.8l196.8 142.5c-3.1 10.6-4.7 21.8-4.7 33.3 0 66.2 53.8 120 120 120s120-53.8 120-120-53.8-120-120-120zm0-476c28.7 0 52 23.3 52 52s-23.3 52-52 52-52-23.3-52-52 23.3-52 52-52zM312 600c-48.5 0-88-39.5-88-88s39.5-88 88-88 88 39.5 88 88-39.5 88-88 88zm440 236c-28.7 0-52-23.3-52-52s23.3-52 52-52 52 23.3 52 52-23.3 52-52 52z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$8);

var require_context_module_0_40 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$8
});

const symbol$7 = new BrowserSpriteSymbol({"id":"SoundOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"SoundOutlined\">\n  <path d=\"M625.9 115c-5.9 0-11.9 1.6-17.4 5.3L254 352H90c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h164l354.5 231.7c5.5 3.6 11.6 5.3 17.4 5.3 16.7 0 32.1-13.3 32.1-32.1V147.1c0-18.8-15.4-32.1-32.1-32.1zM586 803L293.4 611.7l-18-11.7H146V424h129.4l17.9-11.7L586 221v582zm348-327H806c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16zm-41.9 261.8l-110.3-63.7a15.9 15.9 0 00-21.7 5.9l-19.9 34.5c-4.4 7.6-1.8 17.4 5.8 21.8L856.3 800a15.9 15.9 0 0021.7-5.9l19.9-34.5c4.4-7.6 1.7-17.4-5.8-21.8zM760 344a15.9 15.9 0 0021.7 5.9L892 286.2c7.6-4.4 10.2-14.2 5.8-21.8L878 230a15.9 15.9 0 00-21.7-5.9L746 287.8a15.99 15.99 0 00-5.8 21.8L760 344z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$7);

var require_context_module_0_41 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$7
});

const symbol$6 = new BrowserSpriteSymbol({"id":"StarOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"StarOutlined\">\n  <path d=\"M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$6);

var require_context_module_0_42 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$6
});

const symbol$5 = new BrowserSpriteSymbol({"id":"StopOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"StopOutlined\">\n  <path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372 0-89 31.3-170.8 83.5-234.8l523.3 523.3C682.8 852.7 601 884 512 884zm288.5-137.2L277.2 223.5C341.2 171.3 423 140 512 140c205.4 0 372 166.6 372 372 0 89-31.3 170.8-83.5 234.8z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$5);

var require_context_module_0_43 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$5
});

const symbol$4 = new BrowserSpriteSymbol({"id":"SunOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"SunOutlined\">\n  <path d=\"M512 256a42.666667 42.666667 0 0 0 42.666667-42.666667V128a42.666667 42.666667 0 0 0-85.333334 0v85.333333a42.666667 42.666667 0 0 0 42.666667 42.666667zM896 469.333333h-85.333333a42.666667 42.666667 0 0 0 0 85.333334h85.333333a42.666667 42.666667 0 0 0 0-85.333334zM256 512a42.666667 42.666667 0 0 0-42.666667-42.666667H128a42.666667 42.666667 0 0 0 0 85.333334h85.333333a42.666667 42.666667 0 0 0 42.666667-42.666667zM265.386667 213.333333a42.666667 42.666667 0 0 0-59.306667 62.72l61.44 59.306667a42.666667 42.666667 0 0 0 31.146667 11.946667 42.666667 42.666667 0 0 0 30.72-13.226667 42.666667 42.666667 0 0 0 0-60.16zM725.333333 347.306667a42.666667 42.666667 0 0 0 29.44-11.946667l61.44-59.306667A42.666667 42.666667 0 0 0 758.613333 213.333333l-61.44 60.586667a42.666667 42.666667 0 0 0 0 60.16 42.666667 42.666667 0 0 0 28.16 13.226667zM512 768a42.666667 42.666667 0 0 0-42.666667 42.666667v85.333333a42.666667 42.666667 0 0 0 85.333334 0v-85.333333a42.666667 42.666667 0 0 0-42.666667-42.666667zM756.48 688.64a42.666667 42.666667 0 0 0-59.306667 61.44L758.613333 810.666667a42.666667 42.666667 0 0 0 29.44 11.946666 42.666667 42.666667 0 0 0 30.72-12.8 42.666667 42.666667 0 0 0 0-60.586666zM267.52 688.64l-61.44 59.306667a42.666667 42.666667 0 0 0 0 60.586666 42.666667 42.666667 0 0 0 30.72 12.8 42.666667 42.666667 0 0 0 28.586667-10.666666l61.44-59.306667a42.666667 42.666667 0 0 0-59.306667-61.44zM512 341.333333a170.666667 170.666667 0 1 0 170.666667 170.666667 170.666667 170.666667 0 0 0-170.666667-170.666667z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$4);

var require_context_module_0_44 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$4
});

const symbol$3 = new BrowserSpriteSymbol({"id":"UpCircleOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"UpCircleOutlined\">\n  <path d=\"M518.5 360.3a7.95 7.95 0 00-12.9 0l-178 246c-3.8 5.3 0 12.7 6.5 12.7H381c10.2 0 19.9-4.9 25.9-13.2L512 460.4l105.2 145.4c6 8.3 15.6 13.2 25.9 13.2H690c6.5 0 10.3-7.4 6.5-12.7l-178-246z\" />\n  <path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$3);

var require_context_module_0_45 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$3
});

const symbol$2 = new BrowserSpriteSymbol({"id":"UpOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"UpOutlined\">\n  <path d=\"M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$2);

var require_context_module_0_46 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$2
});

const symbol$1 = new BrowserSpriteSymbol({"id":"UserOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"UserOutlined\">\n  <path d=\"M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$1);

var require_context_module_0_47 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol$1
});

const symbol = new BrowserSpriteSymbol({"id":"WomanOutlined","content":"<symbol viewBox=\"0 0 1024 1024\" id=\"WomanOutlined\">\n  <path d=\"M712.8 548.8c53.6-53.6 83.2-125 83.2-200.8 0-75.9-29.5-147.2-83.2-200.8C659.2 93.6 587.8 64 512 64s-147.2 29.5-200.8 83.2C257.6 200.9 228 272.1 228 348c0 63.8 20.9 124.4 59.4 173.9 7.3 9.4 15.2 18.3 23.7 26.9 8.5 8.5 17.5 16.4 26.8 23.7 39.6 30.8 86.3 50.4 136.1 57V736H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h114v140c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V812h114c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8H550V629.5c61.5-8.2 118.2-36.1 162.8-80.7zM512 556c-55.6 0-107.7-21.6-147.1-60.9C325.6 455.8 304 403.6 304 348s21.6-107.7 60.9-147.1C404.2 161.5 456.4 140 512 140s107.7 21.6 147.1 60.9C698.4 240.2 720 292.4 720 348s-21.6 107.7-60.9 147.1C619.7 534.4 567.6 556 512 556z\" />\n</symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol);

var require_context_module_0_48 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': symbol
});

const req = 
  (function() {
    var map = {
      './filled/check-circle.svg': require_context_module_0_0,
'./filled/check-square.svg': require_context_module_0_1,
'./filled/close-circle.svg': require_context_module_0_2,
'./filled/heart.svg': require_context_module_0_3,
'./filled/info-circle.svg': require_context_module_0_4,
'./filled/star.svg': require_context_module_0_5,
'./filled/warning.svg': require_context_module_0_6,
'./outlined/backspace.svg': require_context_module_0_7,
'./outlined/border.svg': require_context_module_0_8,
'./outlined/check-circle.svg': require_context_module_0_9,
'./outlined/check-square.svg': require_context_module_0_10,
'./outlined/check.svg': require_context_module_0_11,
'./outlined/circle.svg': require_context_module_0_12,
'./outlined/close-circle.svg': require_context_module_0_13,
'./outlined/close.svg': require_context_module_0_14,
'./outlined/delete.svg': require_context_module_0_15,
'./outlined/down-circle.svg': require_context_module_0_16,
'./outlined/down.svg': require_context_module_0_17,
'./outlined/edit.svg': require_context_module_0_18,
'./outlined/exclamation-circle.svg': require_context_module_0_19,
'./outlined/exclamation.svg': require_context_module_0_20,
'./outlined/heart.svg': require_context_module_0_21,
'./outlined/home.svg': require_context_module_0_22,
'./outlined/image-break.svg': require_context_module_0_23,
'./outlined/image.svg': require_context_module_0_24,
'./outlined/info-circle.svg': require_context_module_0_25,
'./outlined/info.svg': require_context_module_0_26,
'./outlined/keyboard.svg': require_context_module_0_27,
'./outlined/left.svg': require_context_module_0_28,
'./outlined/loading.svg': require_context_module_0_29,
'./outlined/man.svg': require_context_module_0_30,
'./outlined/menu.svg': require_context_module_0_31,
'./outlined/minus.svg': require_context_module_0_32,
'./outlined/moon.svg': require_context_module_0_33,
'./outlined/plus.svg': require_context_module_0_34,
'./outlined/reload.svg': require_context_module_0_35,
'./outlined/right.svg': require_context_module_0_36,
'./outlined/scan.svg': require_context_module_0_37,
'./outlined/search.svg': require_context_module_0_38,
'./outlined/setting.svg': require_context_module_0_39,
'./outlined/share-alt.svg': require_context_module_0_40,
'./outlined/sound.svg': require_context_module_0_41,
'./outlined/star.svg': require_context_module_0_42,
'./outlined/stop.svg': require_context_module_0_43,
'./outlined/sun.svg': require_context_module_0_44,
'./outlined/up-circle.svg': require_context_module_0_45,
'./outlined/up.svg': require_context_module_0_46,
'./outlined/user.svg': require_context_module_0_47,
'./outlined/woman.svg': require_context_module_0_48,

    };
    var req = function req(key) {
      return map[key] || (function() { throw new Error("Cannot find module '" + key + "'.") }());
    };
    req.keys = function() {
      return Object.keys(map);
    };
    return req;
  })();


const obj = {};

req
  .keys()
  .map(req)
  .forEach(v => {
    obj[v.default.id] = v.default;
  });

export { obj as default };
