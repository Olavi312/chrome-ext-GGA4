import "react-app-polyfill/ie11";

import React from "react";
import { createRoot } from "react-dom/client";
import Panel from "./contentScript/Panel";
import $ from "jquery";
import {
  APP_COLLAPSE_WIDTH,
  APP_EXTEND_WIDTH,
  SHADOW_ROOT_ID,
} from "./core/constants";
import { render } from "react-dom";

const injectFont = () => {
  const inject = document.createElement("link");
  inject.setAttribute("href", "https://fonts.cdnfonts.com/css/satoshi");
  inject.setAttribute("rel", "stylesheet");
  document.head.appendChild(inject);
};

const prepare = () => {
  if ($(`.${SHADOW_ROOT_ID}`).length > 0) {
    $(`.${SHADOW_ROOT_ID}`).remove();
  }
  injectFont();
};

async function init() {
  prepare();
  // const initialEnabled = await loadChromeStorage();

  const body = document.body;

  // create react app
  const app = document.createElement("div");
  app.id = SHADOW_ROOT_ID;
  app.id = "aa";

  body.appendChild(app);
  const root = document.getElementById(app.id);
  root.attachShadow({ mode: "open" });
  render(<Panel />, root.shadowRoot);
}

init();
