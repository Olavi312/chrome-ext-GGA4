export const ISDEBUG = false;

export const BOTTOM_MESSAGE_URL = "assets/files/ad.txt";

export const SHADOW_ROOT_ID = "props-manager-root";

export const APP_NAME = "Google Analytics 4 - Event Monitor";

export const GET_REQUEST_LIST = "get-request-list";
export const REMOVE_ALL = "remove-all";
export const SET_PANEL_WIDTH = "set-panel-width";
export const GET_PANEL_WIDTH = "get-panel-width";

export const PANEL_MIN_WIDTH = "33%"
export const BUTTON_BOTTOM = 150;
export const NOT_FOUND_TIME = 30; // seconds

export const convertDisplay = {
    page_view: "Page View",
    scroll: "Scroll", 
  };

export const sample_data = [
  {
      "url": "2",
      "list": [
          {
              "title": "$function (aggregation) — MongoDB Manual",
              "page_url": "https://www.mongodb.com/docs/manual/reference/operator/aggregation/function/",
              "method": "POST",
              "request_body": {
                  "error": "Unknown error."
              },
              "type": "ping",
              "request_url": "https://analytics.google.com/g/collect?v=2&tid=G-56KD6L3MDX&gtm=45je36s0&_p=1572672601&_gaz=1&cid=742890369.1681576592&ul=en-us&sr=1920x1080&uaa=x86&uab=64&uafvl=Not.A%252FBrand%3B8.0.0.0%7CChromium%3B114.0.5735.199%7CGoogle%2520Chrome%3B114.0.5735.199&uamb=0&uam=&uap=Windows&uapv=8.0.0&uaw=0&_s=3&sid=1688171255&sct=23&seg=1&dl=https%3A%2F%2Fwww.mongodb.com%2Fdocs%2Fmanual%2Freference%2Foperator%2Faggregation%2Ffunction%2F&dt=%24function%20(aggregation)%20%E2%80%94%20MongoDB%20Manual&en=user_engagement&_et=10474",
              "parsed": {
                  "event_name": "user_engagement",
                  "event_param": [],
                  "ecommerce_param": {
                      "items": [],
                      "transaction": []
                  },
                  "tech_param": [
                      {
                          "_key": "uaa",
                          "value": "x86"
                      },
                      {
                          "_key": "uab",
                          "value": "64"
                      },
                      {
                          "_key": "uafvl",
                          "value": "Not.A%2FBrand;8.0.0.0|Chromium;114.0.5735.199|Google%20Chrome;114.0.5735.199"
                      },
                      {
                          "_key": "uamb",
                          "value": "0"
                      },
                      {
                          "_key": "uam",
                          "value": ""
                      },
                      {
                          "_key": "uap",
                          "value": "Windows"
                      },
                      {
                          "_key": "uapv",
                          "value": "8.0.0"
                      },
                      {
                          "_key": "uaw",
                          "value": "0"
                      },
                      {
                          "_key": "sr",
                          "value": "1920x1080"
                      }
                  ],
                  "user_param": [
                      {
                          "_key": "ul",
                          "value": "en-us"
                      }
                  ],
                  "page_param": [
                      {
                          "_key": "dl",
                          "value": "https://www.mongodb.com/docs/manual/reference/operator/aggregation/function/"
                      },
                      {
                          "_key": "dt",
                          "value": "$function (aggregation) — MongoDB Manual"
                      }
                  ],
                  "session_param": [
                      {
                          "_key": "_et",
                          "value": "10474"
                      },
                      {
                          "_key": "_s",
                          "value": "3"
                      },
                      {
                          "_key": "sid",
                          "value": "1688171255"
                      },
                      {
                          "_key": "sct",
                          "value": "23"
                      },
                      {
                          "_key": "seg",
                          "value": "1"
                      }
                  ],
                  "marketing_param": [],
                  "config_param": [
                      {
                          "_key": "_gaz",
                          "value": "1"
                      }
                  ]
              }
          }
      ]
  },{
    "url": "2",
    "list": [
        {
            "title": "$function (aggregation) — MongoDB Manual",
            "page_url": "https://www.mongodb.com/docs/manual/reference/operator/aggregation/function/",
            "method": "POST",
            "request_body": {
                "error": "Unknown error."
            },
            "type": "ping",
            "request_url": "https://analytics.google.com/g/collect?v=2&tid=G-56KD6L3MDX&gtm=45je36s0&_p=1572672601&_gaz=1&cid=742890369.1681576592&ul=en-us&sr=1920x1080&uaa=x86&uab=64&uafvl=Not.A%252FBrand%3B8.0.0.0%7CChromium%3B114.0.5735.199%7CGoogle%2520Chrome%3B114.0.5735.199&uamb=0&uam=&uap=Windows&uapv=8.0.0&uaw=0&_s=3&sid=1688171255&sct=23&seg=1&dl=https%3A%2F%2Fwww.mongodb.com%2Fdocs%2Fmanual%2Freference%2Foperator%2Faggregation%2Ffunction%2F&dt=%24function%20(aggregation)%20%E2%80%94%20MongoDB%20Manual&en=user_engagement&_et=10474",
            "parsed": {
                "event_name": "user_engagement",
                "event_param": [],
                "ecommerce_param": {
                    "items": [],
                    "transaction": []
                },
                "tech_param": [
                    {
                        "_key": "uaa",
                        "value": "x86"
                    },
                    {
                        "_key": "uab",
                        "value": "64"
                    },
                    {
                        "_key": "uafvl",
                        "value": "Not.A%2FBrand;8.0.0.0|Chromium;114.0.5735.199|Google%20Chrome;114.0.5735.199"
                    },
                    {
                        "_key": "uamb",
                        "value": "0"
                    },
                    {
                        "_key": "uam",
                        "value": ""
                    },
                    {
                        "_key": "uap",
                        "value": "Windows"
                    },
                    {
                        "_key": "uapv",
                        "value": "8.0.0"
                    },
                    {
                        "_key": "uaw",
                        "value": "0"
                    },
                    {
                        "_key": "sr",
                        "value": "1920x1080"
                    }
                ],
                "user_param": [
                    {
                        "_key": "ul",
                        "value": "en-us"
                    }
                ],
                "page_param": [
                    {
                        "_key": "dl",
                        "value": "https://www.mongodb.com/docs/manual/reference/operator/aggregation/function/"
                    },
                    {
                        "_key": "dt",
                        "value": "$function (aggregation) — MongoDB Manual"
                    }
                ],
                "session_param": [
                    {
                        "_key": "_et",
                        "value": "10474"
                    },
                    {
                        "_key": "_s",
                        "value": "3"
                    },
                    {
                        "_key": "sid",
                        "value": "1688171255"
                    },
                    {
                        "_key": "sct",
                        "value": "23"
                    },
                    {
                        "_key": "seg",
                        "value": "1"
                    }
                ],
                "marketing_param": [],
                "config_param": [
                    {
                        "_key": "_gaz",
                        "value": "1"
                    }
                ]
            }
        }
    ]
}
]
