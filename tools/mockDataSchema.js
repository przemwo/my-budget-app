export const schema = {
  "type": "object",
  "properties": {
    "spendings": {
      "type": "array",
      "minItems": 10,
      "maxItems": 15,
      "items": {
        "type": "object",
        "properties": {
          "year": {
           "type": "integer",
           "enum": [2017]
          },
          "month": {
           "type": "integer",
           "enum": [1]
          },
          "amount": {
           "type": "integer",
           "minimum": 0,
           "maximum": 500
          },
          "category": {
           "type": "string",
           "enum": ["mieszkanie", "jedzenie", "transport", "inne"]
          },
          "description": {
            "type": "string",
            "faker": {
              "fake": "{{lorem.sentence}}"
            }
          }
        },
        "required": ["year", "month", "amount", "category", "description"]
      }
    }
  },
  "required": ['users']
};
