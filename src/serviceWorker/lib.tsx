export function checkUrl(url) {
  const pattern = /^https:\/\/.*\/g\/collect\?/;
  const pattern1 = /^https:\/\/www.google-analytics.com\/collect\?v=2/;
  let result = false;
  if (pattern.test(url)) result = true;
  if (pattern1.test(url)) result = true;
  if (result) {
    const params = getSearchParams(url);
    if (params["v"] == 2 && params["tid"].startsWith("G-")) return true;
  }
  return false;
}

function getSearchParams(url_t) {
  const url = new URL(url_t);
  let params = [];
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

function parseUserParameter(obj) {
  const userKeys = Object.keys(obj).filter(
    (key) => key.startsWith("up.") || key.startsWith("upn.")
  );
  let userParams = new Array();
  userKeys.map((value, item) => {
    userParams.push({
      _key: value.replace(/^(up\.|upn\.)/, ""),
      value: obj[value],
      label: formatDefaultLabel(value.replace(/^(up\.|upn\.)/, "")),
    });
  });
  const user_keys = [
    { _key: "ul", label: "User Language" },
    { _key: "uid", label: "User Id" },
    { _key: "_fid", label: "Firebase Id" },
    { _key: "gdid", label: "Google Developer ID" },
    { _key: "_uc", label: "User Country" },
    { _key: "lo", label: "Location ID" },
  ];
  user_keys.map((key, index) => {
    if (Object.keys(obj).includes(key._key)) {
      userParams.push({
        _key: key._key,
        value: obj[key._key],
        label: key.label,
      });
    }
  });
  return userParams;
}

function parseTechParameter(obj) {
  const tech_keys = [
    { _key: "uaa", label: "User Agent Architecture" },
    { _key: "uab", label: "User Agent Bitness" },
    { _key: "uafvl", label: "User Agent Full Version List" },
    { _key: "uamb", label: "User Agent Mobile" },
    { _key: "uam", label: "User Agent Model" },
    { _key: "uap", label: "User Agent Platform" },
    { _key: "uapv", label: "User Agent Platform Version" },
    { _key: "uaw", label: "User Agent WOW64" },
    { _key: "sr", label: "Screen Resolution" },
  ];
  return parseParameter(obj, tech_keys);
}

function parseSessionParameter(obj) {
  const session_keys = [
    { _key: "_s", label: "Session number for current user" },
    { _key: "sid", label: "Session Id" },
    { _key: "sct", label: "Session Count" },
    { _key: "seg", label: "Session Engagement" },
    { _key: "_fv", label: "First Visit" },
    { _key: "_ss", label: "Session Start" },
    { _key: "_nsi", label: "New Session Id" },
  ];
  return parseParameter(obj, session_keys);
}

export function parseUrl(url) {
  if (!checkUrl(url)) {
    return { state: false, message: "Url check error!" };
  }
  const params = getSearchParams(url);
  let result = new Object();
  result = { ...parseEventName(params) };
  result["event_param"] = parseEventParameter(params);
  result["ecommerce_param"] = getEcommerceData(params);
  result["tech_param"] = parseTechParameter(params);
  result["user_param"] = parseUserParameter(params);
  result["page_param"] = parsePageParameter(params);
  result["session_param"] = parseSessionParameter(params);
  result["marketing_param"] = parseMarketingParameter(params);
  result["config_param"] = parseConfigParameter(params);
  result["server_side_params"] = parseServerSideParameter(params);
  result["other_params"] = {
    consent: parseConsentParameter(params),
    core_request: parseCoreRequestParameter(params),
    promotion: parsePromotionParameter(params),
    other: parseOtherParameter(params),
  };
  result["account"] = getAccount(params);

  return { state: true, data: result };
}

function getEventData(obj) {
  let obj_param = parseEventParameter(obj);
  let result = new Array();
  Object.keys(obj_param).map((key) => {
    result.push({
      _key: key,
      value: obj_param[key],
      type: typeof obj_param[key],
    });
  });
  return result;
}

function getEcommerceData(obj) {
  let itemParams = parseItemParameter(obj);
  let transactionParam = parseTransactionParameter(obj);
  return {
    items: itemParams,
    transaction: transactionParam,
  };
}

function parseTransactionParameter(obj) {
  let ecommerceParams = new Array();
  const transactionConvertData = [
    {
      _key: "ep.transaction_id",
      label: "Transaction Id",
    },
    {
      _key: "ep.affiliation",
      label: "Affiliation",
    },
    {
      _key: "epn.value",
      label: "Revenue",
    },
    {
      _key: "epn.tax",
      label: "Tax",
    },
    {
      _key: "epn.shipping",
      label: "Shipping",
    },
    {
      _key: "cu",
      label: "Currency",
    },
  ];
  let value;
  transactionConvertData.map((key, index) => {
    if (Object.keys(obj).includes(key._key)) {
      value = obj[key._key];
      if (key._key.startsWith("epn")) value = parseFloat(value);
      ecommerceParams.push({ _key: key._key, label: key.label, value });
    }
  });
  return ecommerceParams;
}

function parsePageParameter(obj) {
  const page_keys = [
    { _key: "dh", label: "Document Hostname" },
    { _key: "dl", label: "Shared Document Location" },
    { _key: "dt", label: "Document Title" },
    { _key: "dr", label: "Document Referrer" },
  ];
  return parseParameter(obj, page_keys);
}

function parseParameter(obj, keys) {
  let results = new Array();
  keys.map((key, index) => {
    if (Object.keys(obj).includes(key._key)) {
      results.push({
        _key: key._key,
        label: key.label,
        value: obj[key._key],
      });
    }
  });
  return results;
}

function parseMarketingParameter(obj) {
  const keys = [
    { _key: "cm", label: "Campagin Medium" },
    { _key: "cs", label: "Campagin Source" },
    { _key: "cn", label: "Campaign Name" },
    { _key: "cc", label: "Campaign Content" },
    { _key: "ck", label: "Campaign Term" },
    { _key: "ccf", label: "Campaign Creative Format" },
    { _key: "cmt", label: "Campaign Marketing Tactic" },
    { _key: "_rnd", label: "Gclid Deduper" },
  ];
  return parseParameter(obj, keys);
}

function parseConfigParameter(obj) {
  const keys = [
    { _key: "_dbg", label: "is Debug" },
    { _key: "ir", label: "Ignore Referrer" },
    { _key: "gtm_up", label: "gtm_up" },
    { _key: "_uei", label: "_uei" },
    { _key: "_gaz", label: "Create Google Join" },
    { _key: "_rdi", label: "Redact Device Info" },
    { _key: "_geo", label: "Geo Granularity" },
    { _key: "_fplc", label: "First Party Linker Cookie" },
    { _key: "tt", label: "Traffic Type" },
    { _key: "_glv", label: "is Google Linker Valid" },
    { _key: "richsstsse", label: "richsstsse" },
  ];
  return parseParameter(obj, keys);
}

function parseEventName(obj) {
  let eventName = new Object();
  const eventkey = "en";
  if (Object.keys(obj).includes(eventkey))
    eventName["event_name"] = obj[eventkey];
  return eventName;
}

function parseServerSideParameter(obj) {
  const keys = Object.keys(obj).filter((key) => key.startsWith("sst."));
  let server_keys = [];
  let replace_keys = [
    { _key: "sst.uc", val: "User County" },
    { _key: "sst.gd", val: "Gclid Deduper" },
    { _key: "sst.etld", val: "Effective top level domain" },
    { _key: "sst.gcd", val: "Google consent Default" },
  ];
  keys.map((val) => {
    let filter = replace_keys.filter((d) => d._key == val);
    if (filter.length > 0) {
      server_keys.push({ _key: val, label: filter[0].val });
    } else server_keys.push({ _key: val, label: val.replace("sst.", "") });
  });
  return parseParameter(obj, server_keys);
}

function parseEventParameter(obj) {
  const eventKeys = Object.keys(obj).filter(
    (key) => key.startsWith("ep.") || key.startsWith("epn.")
  );
  let eventParams = new Array();
  let value;
  eventKeys.map((key, item) => {
    value = obj[key];
    if (key.startsWith("epn")) value = parseFloat(value);
    eventParams.push({
      _key: key.replace(/^(ep\.|epn\.)/, ""),
      label: formatDefaultLabel(key.replace(/^(ep\.|epn\.)/, "")),
      value: value,
    });
  });

  const event_keys = [
    { _key: "_et", label: "Engagement Time" },
    { _key: "_eu", label: "Event Usage" },
    { _key: "edid", label: "Event Debug ID?" },
    { _key: "en", label: "Event Name" },
    { _key: "_c", label: "is Conversion" },
    { _key: "_ee", label: "External Event" },
  ];
  event_keys.map((key, index) => {
    if (Object.keys(obj).includes(key._key)) {
      eventParams.push({
        _key: key._key,
        label: key.label,
        value: obj[key._key],
      });
    }
  });
  return eventParams;
}

function parseItemParameter(obj) {
  const itemKeyPattern = /pr[0-9]/;
  const itemKeys = Object.keys(obj).filter((key) => itemKeyPattern.test(key));
  let results = new Array(),
    temp,
    item_id,
    product_name,
    price,
    coupon;
  itemKeys.map((value) => {
    temp = parseItemParameterFromString(obj[value]);
    item_id = temp.filter((e) => e._key === "item_id")[0].value;
    product_name = temp.filter((e) => e._key === "item_name")[0].value;
    price = temp.filter((e) => e._key === "item_price")[0].value;
    coupon = temp.filter((e) => e._key === "item_coupon")[0].value;
    results.push({
      list: temp,
      item_id,
      product_name,
      price,
      coupon,
    });
  });
  return results;
}

const constItemParameterConfig = {
  id: { _key: "item_id", label: "Item Id" },
  nm: { _key: "item_name", label: "Item Name" },
  ln: { _key: "list_name", label: "List Name" },
  br: { _key: "brand_name", label: "Brand Name" },
  ca: { _key: "item_category", label: "Item Category Hierarchy 1" },
  c2: { _key: "item_category2", label: "Item Category Hierarchy 2" },
  c3: { _key: "item_category3", label: "Item Category Hierarchy 3" },
  c4: { _key: "item_category4", label: "Item Category Hierarchy 4" },
  c5: { _key: "item_category5", label: "Item Category Hierarchy 5" },
  va: { _key: "item_variant", label: "Item Variant" },
  lp: { _key: "item_list_position", label: "Item List Position" },
  qt: { _key: "item_quantity", label: "Item Quantity" },
  pr: { _key: "item_price", label: "Item Price" },
  cp: { _key: "item_coupon", label: "Item Coupon" },
  ds: { _key: "item_discount", label: "Item Discount" },
  af: { _key: "item_affiliation", label: "Item Affiliation" },
  li: { _key: "item_list_id", label: "Item List Id" },
};
function parseItemParameterFromString(str) {
  const arr = str.split("~");
  let k0, k1, v0, v1;
  let result = new Array(),
    temp_key,
    label;
  arr.map((value, index) => {
    temp_key = value.substr(0, 2);
    if (Object.keys(constItemParameterConfig).includes(temp_key)) {
      label = temp_key;
      if (index == 0) label = label + "#";
      else label = "~" + label;
      result.push({
        _key: constItemParameterConfig[temp_key]._key,
        value: value.slice(2),
        label: constItemParameterConfig[temp_key].label,
      });
      return;
    }
    if (temp_key === "k0") {
      k0 = value.slice(2);
    }
    if (temp_key === "k1") {
      k1 = value.slice(2);
    }
    if (temp_key === "v0") {
      v0 = value.slice(2);
    }
    if (temp_key === "v1") {
      v1 = value.slice(2);
    }
  });
  if (k0 !== null && k0 !== undefined)
    result.push({ _key: k0, value: v0, label: k0 });
  if (k1 !== null && k1 !== undefined)
    result.push({ _key: k1, value: v1, label: k1 });
  if (result.filter((e) => e._key === "item_id").length == 0)
    result.push({ _key: "item_id", value: "Unknow", label: "Item Id" });
  if (result.filter((e) => e._key === "item_price").length == 0)
    result.push({ _key: "item_price", value: "Unknow", label: "Price" });
  if (result.filter((e) => e._key === "item_name").length == 0)
    result.push({ _key: "item_name", value: "Unknow", label: "Item Name" });
  if (result.filter((e) => e._key === "item_coupon").length == 0)
    result.push({
      _key: "item_coupon",
      value: "No Coupon",
      label: "Item Coupon",
    });
  return result;
}

function parseConsentParameter(obj) {
  const keys = [
    { _key: "gcs", label: "Google Consent Status" },
    { _key: "gcu", label: "Google Consent Update" },
    { _key: "gcut", label: "Google Consent Update Type" },
    { _key: "gcd", label: "Google Consent Default" },
    { _key: "_ecid", label: "European Consent Mode Enabled ID" },
    { _key: "us_privacy", label: "US Privacy Signal" },
    { _key: "gdpr", label: "GDPR applies or not (IAB TCFv2)" },
    {
      _key: "gdpr_consent",
      label: "GDPR Vendors Lists IDs (GVL ID)(IAB TCFv2)",
    },
  ];
  return parseParameter(obj, keys);
}

function getAccount(obj) {
  const key = "tid";
  if (Object.keys(obj).includes(key)) return obj[key];
  return "";
}

function parseCoreRequestParameter(obj) {
  const keys = [
    { _key: "v", label: "Protocol Version" },
    { _key: "tid", label: "Tracking ID" },
    { _key: "gtm", label: "GTM Hash Info" },
    { _key: "_p", label: "Random Page Load Hash" },
    { _key: "cid", label: "client Id" },
    { _key: "_z", label: "_z" },
  ];
  return parseParameter(obj, keys);
}

function parsePromotionParameter(obj) {
  const keys = [
    { _key: "pi", label: "Promotion ID" },
    { _key: "pn", label: "Promotion Name" },
    { _key: "cn", label: "Creative Name" },
    { _key: "cs", label: "Creative Slot" },
  ];
  return parseParameter(obj, keys);
}

function parseOtherParameter(obj) {
  const keys = [];
  return parseParameter(obj, keys);
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

function formatDefaultLabel(str) {
  var rlt = "";
  const splits = str.split("_");
  splits.map((item) => {
    rlt += capitalizeFirstLetter(item) + " ";
  });
  return rlt.substring(0, rlt.length - 1);
}
