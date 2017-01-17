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
          "id": {
            "type": "string",
            "chance": "guid"
          },
          "timestamp": {
            "type": "string",
            "chance": "timestamp",
          },
          "year": {
           "type": "integer",
           "enum": [2017]
          },
          "month": {
           "type": "integer",
           "enum": [1]
          },
          "day": {
           "type": "integer",
           "chance": {
             "integer": {
               "min": 1,
               "max": 31
             }
           }
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
        "required": ["id", "timestamp", "year", "month", "day", "amount", "category", "description"]
      }
    },
    "categories": {
      "type": "array",
      "chance": {
        "pickset": [
          [
            "mieszkanie",
            "jedzenie",
            "transport",
            "sport",
            "rozrywka",
            "inne"
          ],
          6
        ]
      }
    },
    "favouritecategories": {
      "type": "array",
      "chance": {
        "pickset": [
          [
            "mieszkanie",
            "jedzenie",
            "transport",
            "inne"
          ],
          4
        ]
      }
    }
  },
  "required": ["spendings", "categories", "favouritecategories"]
};
