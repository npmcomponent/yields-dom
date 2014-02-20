
/**
 * dependencies
 */

var scan = require('yields-scan-html');

/**
 * Generate a dom like structure from the given `html`.
 * 
 * Example:
 * 
 *        dom('<div foo="baz" baz><h1>hello</h1></div>');
 *        
 *        [
 *          {
 *            parent: null,
 *            name: 'div',
 *            next: null,
 *            prev: null,
 *            text: '',
 *            attrs: { foo: "baz", baz: "" },
 *            els: [
 *              {
 *                parent: circular,
 *                next: null,
 *                prev: null,
 *                name: 'h1',
 *                text: 'hello',
 *                attrs: {},
 *                els: []
 *              }
 *            ]
 *          }
 *        ]
 * 
 * @param {String} html
 * @return {Array}
 */

module.exports = function(html){
  var root = []
    , tags = []
    , attr;

  /**
   * scan
   */
  
  scan(html, tok);
  return root;

  /**
   * handle the given `type` and `val`.
   */
  
  function tok(type, val){
    switch (type) {
      case 'open': return open(val);
      case 'text': return text(val);
      case 'close': return close(val);
      case 'attrkey': return key(val);
      case 'attrval': return value(val);
    }
  }

  /**
   * Open `tag`.
   */
  
  function open(tag){
    var parent = tags[tags.length - 1]
      , el = element(parent, tag)
      , els
      , i;

    // add
    tags.push(el);

    // root
    if (!parent) {
      root.push(el);
      return;
    }

    // child
    els = parent.els;
    i = els.length - 1;
    if (els[i]) el.prev = els[i];
    if (els[i]) els[i].next = el;
    els.push(el);
  }

  /**
   * Close `tag`.
   */
  
  function close(tag){
    tags.pop();
  }

  /**
   * attrkey
   */
  
  function key(val){
    var el = tags[tags.length - 1];
    if (!el.attrs[val]) el.attrs[val] = '';
    attr = val;
  }

  /**
   * attrval
   */
  
  function value(val){
    var el = tags[tags.length - 1];
    if (!el.attrs[attr]) el.attrs[attr] = val;
  }

  /**
   * text
   */
  
  function text(val){
    var el = tags[tags.length - 1];
    if (el) el.text = val;
  }

  /**
   * Create an element.
   */
  
  function element(parent, name){
    return {
      parent: parent || null,
      next: null,
      prev: null,
      attrs: {},
      name: name,
      text: '',
      els: []
    };
  }
};
