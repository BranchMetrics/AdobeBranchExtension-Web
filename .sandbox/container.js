module.exports = {
  "extensions": {
    "branch-mobile-growth": {
      "displayName": "Branch Experiences and Measurement",
      "settings": {
        "branchKey": "key_live_hcnegAumkH7Kv18M8AOHhfgiohpXq5tB",
        "subscriptionStatus": true,
        "branchAPIURL": "https://api.branch.io"
      }
    }
  },
  "dataElements": {},
  "rules": [{
    "name": "Load and initialize Branch SDK",
    "events": [{
      "modulePath": "sandbox/pageTop.js",
      "settings": {}
    }],
    "actions": [{
      "modulePath": "branch-mobile-growth/src/lib/actions/initializeBranch.js"
    }]
  }, {
    "name": "Example Rule 1",
    "events": [{
      "modulePath": "sandbox/click.js",
      "settings": {}
    }],
    "actions": [{
      "modulePath": "branch-mobile-growth/src/lib/actions/logEvent.js",
      "settings": {
        "v2EventName": "ADD_TO_CART",
        "v2EventCategory": "commerce",
        "v2EventData": {
          "transaction_id": "id1",
          "revenue": 12
        },
        "customData": {
          "key1": "value1"
        }
      }
    }]
  }],
  "property": {
    "name": "Sandbox property",
    "settings": {
      "id": "PR12345",
      "domains": ["adobe.com", "example.com"],
      "undefinedVarsReturnEmpty": false
    }
  },
  "company": {
    "orgId": "ABCDEFGHIJKLMNOPQRSTUVWX@AdobeOrg"
  },
  "environment": {
    "id": "EN00000000000000000000000000000000",
    "stage": "development"
  },
  "buildInfo": {
    "turbineVersion": "27.5.0",
    "turbineBuildDate": "2024-05-02T19:56:48.644Z",
    "buildDate": "2024-05-02T19:56:48.644Z",
    "environment": "development"
  }
}