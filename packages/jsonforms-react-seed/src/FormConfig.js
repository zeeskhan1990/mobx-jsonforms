

/* const schema = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "done": {
      "type": "boolean"
    },
    "due_date": {
      "type": "string",
      "format": "date"
    },
    "rating": {
      "type": "integer",
      "maximum": 5
    },
    "recurrence": {
      "type": "string",
      "enum": [
        "Never",
        "Daily",
        "Weekly",
        "Monthly"
      ]
    },
    "recurrence_interval": {
      "type": "integer"
    }
  },
  "required": [
    "name"
  ]
} */

export const schema = {
    "basic": {
      "title": "Basic",
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "done": {
          "type": "boolean"
        },
        "due_date": {
          "type": "string",
          "format": "date"
        },
        "rating": {
          "type": "integer",
          "maximum": 5
        },
        "recurrence": {
          "type": "string",
          "enum": [
            "Never",
            "Daily",
            "Weekly",
            "Monthly"
          ]
        },
        "recurrence_interval": {
          "type": "integer"
        }
      },
      "required": [
        "name"
      ]
    },
    "address": {
      "title": "Address",
      "type": "object",
      "properties": {
        "addressId": {
          "type": "string",
          "label": "Address Type",
          "enum": [
            "Home Address 1",
            "Home Address 2",
            "Workplace"
          ]
        },
        "street": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "zipCode": {
          "type": "string"
        }
      }
    }
  }
  
  /* const uischema = {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "label": false,
        "scope": "#/properties/done"
      },
      {
        "type": "Control",
        "scope": "#/properties/name"
      },
      {
        "type": "HorizontalLayout",
        "elements": [
          {
            "type": "Control",
            "scope": "#/properties/due_date"
          },
          {
            "type": "Control",
            "scope": "#/properties/rating"
          }
        ]
      },
      {
        "type": "Control",
        "scope": "#/properties/description",
        "options": {
            "multi": true
        }
      },
      {
        "type": "HorizontalLayout",
        "elements": [
          {
            "type": "Control",
            "scope": "#/properties/recurrence"
          },
          {
            "type": "Control",
            "scope": "#/properties/recurrence_interval",
            "rule": {
                "effect": "HIDE",
                "condition": {
                    "scope": "#/properties/recurrence",
                    "expectedValue": "Never"
                }
            }
          }
        ]
      }
    ]
  } */
  
  export const uischema = {
    "basic" : {
      "type":"Group",
      "label":"Basic",
      "elements": [
        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "Control",
              "label": false,
              "scope": "#/properties/done"
            },
            {
              "type": "Control",
              "scope": "#/properties/name"
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/due_date"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/rating"
                }
              ]
            },
            {
              "type": "Control",
              "scope": "#/properties/description",
              "options": {
                  "multi": true
              }
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/recurrence"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/recurrence_interval",
                  "rule": {
                      "effect": "HIDE",
                      "condition": {
                          "scope": "#/properties/recurrence",
                          "expectedValue": "Never"
                      }
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    "address": {
      "type": "Group",
      "label": "Address",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/addressId"
            },
            {
              "type": "Control",
              "scope": "#/properties/street"
            },
            {
              "type": "Control",
              "scope": "#/properties/city"
            },
            {
              "type": "Control",
              "scope": "#/properties/zipCode"
            }
          ]
        }
      ]
    }
  }
  
  export const data = {
    "basic": {
        "name": 'S',
        "description": 'Confirm if you have passed the subject\nHereby ...',
        "done": true,
        "recurrence": 'Daily',
        "rating": 3        
    },
    "address": {
        "city": 'Bengaluru'
    }
  };