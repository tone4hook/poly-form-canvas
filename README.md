# Poly Form Canvas

## Example of using JSON Forms with Canvas Object

[View on Github Pages](https://tone4hook.github.io/poly-form-canvas/)

+ This JSON Form Schema defines a property `corners` which is an array of exactly 4 items.
+ Each item is an object with two required properties `x` and `y`, both of which are numbers.

```
{
  "properties": {
    "corners": {
      "type": "array",
      "minItems": 4,
      "maxItems": 4,
      "items": {
        "type": "object",
        "properties": {
          "x": { "type": "number" },
          "y": { "type": "number" }
        },
        "required": ["x", "y"]
      }
    }
  }
}
```

+ This UI Schema defines a vertical layout with one control element.
+ The control is bound to the `corners` property of the form data (`#/properties/corners`).
+ The `showSortButtons` option is set to `false`, which means that the sort buttons will not be displayed for this control.

```
{
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/corners",
      "options": {
        "showSortButtons": false
      }
    }
  ]
}
```

### Get Started

- `git clone`

- `cd poly-form-canvas`

- `npm i`

- `npm run dev`

## JSON Forms

_Vue is not as documented compared to React_

- [Docs](https://jsonforms.io/)

- [JSON Forms Vue Info](https://jsonforms.io/docs/integrations/vue/)
