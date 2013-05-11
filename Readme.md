
# dom

  Create a dom like structure from html (WIP).

## Installation

    $ component install yields/dom

## Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>dom</title>
    <script src='build/build.js'></script>
  </head>
  <body>
    <script>
      var el = document.querySelector('html')
        , dom = require('dom')
        , html = el.outerHTML
        , refs = [];

      console.log(JSON.stringify(dom(html), stringify, 2));

      function stringify(key, val){
        if (key && 'object' == typeof val){
          if (~refs.indexOf(val)) {
            return val && val.name;
          }
          refs.push(val);
        }
        return val;
      }
    </script>
  </body>
</html>

```

```json
[
  {
    "attrs": {},
    "name": "html",
    "text": "\n  ",
    "els": [
      {
        "parent": "Circular(html)",
        "next": "Circular(body)",
        "attrs": {},
        "name": "head",
        "text": "\n  ",
        "els": [
          {
            "parent": "Circular(head)",
            "next": "Circular(script)",
            "attrs": {},
            "name": "title",
            "text": "dom",
            "els": []
          },
          {
            "parent": "Circular(head)",
            "prev": "Circular(title)",
            "attrs": {
              "src": "build/build.js"
            },
            "name": "script",
            "text": "",
            "els": []
          }
        ]
      },
      {
        "parent": "Circular(html)",
        "prev": "Circular(head)",
        "attrs": {},
        "name": "body",
        "text": "\n    ",
        "els": [
          {
            "parent": "Circular(body)",
            "attrs": {},
            "name": "script",
            "text": "\n      var el = document.querySelector('html')\n        , dom = require('dom')\n        , html = el.outerHTML\n        , refs = [];\n\n      console.log(JSON.stringify(dom(html), stringify, 2));\n\n      function stringify(key, val){\n        if (key && 'object' == typeof val){\n          if (!val) return;\n          if ('next' == key) return circular(val.name);\n          if ('prev' == key) return circular(val.name);\n          if ('parent' == key) return circular(val.name);\n          refs.push(val);\n        }\n        return val;\n      }\n\n      function circular(name){\n        return 'Circular(' + name + ')';\n      }\n    ",
            "els": []
          }
        ]
      }
    ]
  }
] 
```

## License

  MIT
