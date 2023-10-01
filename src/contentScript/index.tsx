import "react-app-polyfill/ie11";

import React from "react";
import { createRoot } from "react-dom/client";
import Panel from "./Panel";
import { SHADOW_ROOT_ID } from "../core/constants";
import { render } from "react-dom";
import $ from "jquery";
import { generateShadowRootId } from "../core/common";

// async function loadChromeStorage() {
//   let initialEnabled = true;
//   try {
//     // Loading chrome local setting, can be replace with sync
//     // for more information, see: https://developer.chrome.com/docs/extensions/reference/storage/
//     const result = await window['chrome'].storage.local.get();
//     console.log(result);
//     initialEnabled = !!result.enabled;
//   } catch (e) {
//     // Demo propose
//     initialEnabled = true;
//   }

//   return initialEnabled;
// }

const injectFont = () => {
  try{
    const inject = document.createElement("link");
    inject.setAttribute("href", "https://fonts.cdnfonts.com/css/satoshi");
    inject.setAttribute("rel", "stylesheet");
    document.head.appendChild(inject);
  }catch(err){}
};

const prepare = () => {
  // remove all shadow root with id is SHADWO_ROOT_ID 
  if ($(`.${SHADOW_ROOT_ID}`).length > 0) {
    $(`.${SHADOW_ROOT_ID}`).remove();
  }
  // add satoshi font inject
  injectFont();
};

async function init() {
  try{
    prepare();
    const body = document.body; 
    // create react app
    const app = document.createElement("div");
    app.id = generateShadowRootId(10);
    app.className = SHADOW_ROOT_ID;

    body.appendChild(app);
    const root = document.getElementById(app.id);
    // attach shadow root and insert Panel
    root.attachShadow({ mode: "open" });
    render(<Panel />, root.shadowRoot);
  }catch(err){

  }
}

init();
