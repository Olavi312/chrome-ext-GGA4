export function getURL(location) {
  // return "./" + location;
  return chrome.runtime.getURL(location);
}

export function generateShadowRootId(idLength) {
  const pattern =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012456789";
  var length = pattern.length;
  var result = "";
  for (var i = 0; i < idLength; i++) {
    result += pattern.charAt(Math.floor(Math.random() * length));
  }
  return result;
}
export function deepEqual(obj1, obj2) {
  // Check if both objects are of the same type
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // Check if both objects are null
  if (obj1 === null && obj2 === null) {
    return true;
  }

  // Check if both objects are arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }

    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) {
        return false;
      }
    }

    return true;
  }

  // Check if both objects are objects
  if (typeof obj1 === "object" && typeof obj2 === "object") {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (!deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  // Check if both objects are primitive values
  return obj1 === obj2;
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

export function formatDefaultLabel(str) {
  var rlt = "";
  const splits = str.split("_");
  splits.map((item) => {
    rlt += capitalizeFirstLetter(item) + " ";
  });
  return rlt.substring(0, rlt.length - 1);
}
