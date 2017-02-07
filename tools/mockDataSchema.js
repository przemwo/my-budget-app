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
            "type": "integer",
            "chance": "timestamp"
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
          },
          "status": {
           "type": "string",
           "enum": ["active"]
          }
        },
        "required": ["id", "timestamp", "year", "month", "day", "amount", "category", "description", "status"]
      }
    },
    "incomings": {
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
            "type": "integer",
            "chance": "timestamp"
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
          "expected": {
           "type": "integer",
           "minimum": 0,
           "maximum": 500
          },
          "actual": {
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
          },
          "status": {
           "type": "string",
           "enum": ["active"]
          }
        },
        "required": ["id", "timestamp", "year", "month", "day", "expected", "actual", "category", "description", "status"]
      }
    },
    "categories": {
      "type": "array",
      "chance": {
        "pickset": [
          [
            {
              "id": "123",
              "name": "mieszkanie",
              "status": "active",
              "favourite": true
            },
            {
              "id": "234",
              "name": "jedzenie",
              "status": "active",
              "favourite": false
            },
            {
              "id": "345",
              "name": "transport",
              "status": "active",
              "favourite": true
            }
          ],
          3
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
    },
    "incomingsCategories": {
      "type": "array",
      "chance": {
        "pickset": [
          [
            "Powel",
            "Adsense",
            "DF",
            "Inne"
          ],
          4
        ]
      }
    }
  },
  "required": ["spendings", "incomings", "categories", "favouritecategories", "incomingsCategories"]
};
