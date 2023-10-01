import { checkUrl, parseUrl } from "./lib";

var requestList = {};
var accounts = [];
var currentTabId = -1;
var now = 0,
  current = 0;
var side_panel_width = "33%";
var inject_time = 0;

function addRequestInfo(tab, request, parse) {
  if (
    parse.data.event_name == null ||
    parse.data.event_name == "user_engagement"
  )
    return;
  let info = new Object();
  let _key = request.initiator;
  // info["title"] = tab.title;
  info["page_url"] = tab?.url;
  info["method"] = request?.method;
  info["request_body"] = request?.requestBody;
  info["type"] = request.type;
  info["request_url"] = request?.url;
  info["parsed"] = parse.data;
  if (requestList[_key] == undefined) requestList[_key] = [];
  let requests = requestList[_key].filter((e) => e.timestamp === current);
  if (requests.length > 0) {
    requests[0].timestamp = current;
    requests[0].url = info["page_url"];
    requests[0].list.push(info);
  } else {
    requestList[_key].push({
      timestamp: current,
      list: [info],
      url: info["page_url"],
    });
  }
  chrome.storage.local.set({ updated_at: Date.now() });
}

function processWithUrl(_key, url) {
  const parse = parseUrl(url);
  if (accounts[_key] == undefined) accounts[_key] = [];
  if (
    parse.data["account"] !== "" &&
    parse.data["account"].startsWith("G-") &&
    !accounts[_key].includes(parse.data["account"])
  ) {
    accounts[_key].push(parse.data["account"]);
  }
  return parse;
}

chrome.webRequest.onBeforeRequest.addListener(
  function (info) {
    if (chrome.runtime.lastError) {
      return;
    }
    // if(info.tabId != currentTabId) return;
    const checked = checkUrl(info.url); // parse url with parsing libarary, state:false => check url error
    if (!checked) return;
    // if (info?.requestBody?.error) return;
    let add_urls = [];

    if (info.requestBody && info.requestBody.raw && info.requestBody.raw[0]) {
      const rawData = info.requestBody.raw[0].bytes;
      const payload = new TextDecoder("utf-8").decode(rawData);
      add_urls = payload.split("\n");
    }
    let tabId = info.tabId;
    let isGet = false;

    chrome.tabs.get(tabId, function (tab) {
      if (chrome.runtime.lastError) {
        return;
      }
      if (!isGet) {
        if (add_urls.length == 0)
          addRequestInfo(tab, info, processWithUrl(info.initiator, info.url));
        else {
          add_urls.map((url) => {
            addRequestInfo(
              tab,
              info,
              processWithUrl(info.initiator, info.url + "&" + url)
            );
          });
        }
        isGet = true;
      }
    });
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // console.log(tabId, changeInfo, tab);
  try {
    if (tab.url.startsWith("chrome://")) return;
    if (changeInfo?.status == "loading") {
      current = Date.now();
    }
    if (changeInfo?.status == "loading")
      try {
        chrome.scripting.executeScript(
          {
            files: ["contentScript.js"],
            target: {
              tabId: tabId,
            },
          },
          function (results) {
            if (chrome.runtime.lastError) {
              return;
            }
            chrome.storage.local.set({ is_complete: false });
          }
        );
      } catch (err) {}
    if (changeInfo?.status != "complete") {
      return;
    }
    chrome.storage.local.set({ is_complete: true });
    chrome.storage.local.set({ updated_at: Date.now() });
    if (currentTabId != tabId) {
      currentTabId = tabId;
      // Object.keys(requestList).map((key)=>{
      //   delete requestList[key]
      // })
      // accounts = [];
    }
  } catch (err) {}
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  try {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
      if (tab?.status == "complete") {
        if (tab.url.startsWith("chrome://")) return;
        current = Date.now();
        if (currentTabId != activeInfo.tabId) {
          currentTabId = activeInfo.tabId;
          // Object.keys(requestList).map((key)=>{
          //   delete requestList[key]
          // })
          // accounts = [];
        }
        try {
          chrome.scripting.executeScript(
            {
              files: ["contentScript.js"],
              target: {
                tabId: activeInfo.tabId,
              },
            },
            function (results) {
              if (chrome.runtime.lastError) {
                return;
              }
              chrome.storage.local.set({ updated_at: Date.now() });
            }
          );
        } catch (err) {}
      }
    });
  } catch (err) {}
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.code) {
    case "get-request-list":
      sendResponse({
        list: requestList[request.url] ?? [],
        accounts: accounts[request.url] ?? [],
      });
      break;
    case "remove-all":
      requestList[request.url] = [];
      accounts[request.url] = [];
      chrome.storage.local.set({ updated_at: Date.now() });
      break;
    case "set-panel-width":
      side_panel_width = request.width;
      break;
    case "get-panel-width":
      sendResponse({ width: side_panel_width });
      break;
  }
  setTimeout(() => {
    return true; //to tell the content script to look out for sendResponse
  }, 1000);
});

function injectPage(arg1) {
  try {
    var root = document.querySelector(".props-manager-root");
    var shadowRoot = root.shadowRoot;
    if (shadowRoot.querySelector("#draggable-button"))
      shadowRoot.querySelector("#draggable-button").click();
    else if (shadowRoot.querySelector(".closet"))
      shadowRoot.querySelector(".closet").click();
  } catch (err) {}
}

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.startsWith("chrome://")) return;
  try {
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        func: injectPage,
        args: ["This is argment"],
      })
      .then((injectionResults) => {
        if (chrome.runtime.lastError) {
          return;
        }
        console.log(injectionResults);
      });
  } catch (err) {}
});
