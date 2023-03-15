import { getOcurrences } from "@/scripts/helpers/type/stringHelper"
// var i, l, leftChain, rightChain;
export const objectEquals = (aaas)  => {
var i, l, leftChain, rightChain;

function compare2Objects (x, y) {
  var p;

  // remember that NaN === NaN returns false
  // and isNaN(undefined) returns true
  if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
       return true;
  }

  // Compare primitives and functions.     
  // Check if both arguments link to the same object.
  // Especially useful on the step where we compare prototypes
  if (x === y) {
      return true;
  }

  // Works in case when functions are created in constructor.
  // Comparing dates is a common scenario. Another built-ins?
  // We can even handle functions passed across iframes
  if ((typeof x === 'function' && typeof y === 'function') ||
     (x instanceof Date && y instanceof Date) ||
     (x instanceof RegExp && y instanceof RegExp) ||
     (x instanceof String && y instanceof String) ||
     (x instanceof Number && y instanceof Number)) {
      return x.toString() === y.toString();
  }

  // At last checking prototypes as good as we can
  if (!(x instanceof Object && y instanceof Object)) {
      return false;
  }

  if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false;
  }

  if (x.constructor !== y.constructor) {
      return false;
  }

  if (x.prototype !== y.prototype) {
      return false;
  }

  // Check for infinitive linking loops
  if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
       return false;
  }

  // Quick checking of one object being a subset of another.
  // todo: cache the structure of arguments[0] for performance
  for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
          return false;
      }
      else if (typeof y[p] !== typeof x[p]) {
          return false;
      }
  }

  for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
          return false;
      }
      else if (typeof y[p] !== typeof x[p]) {
          return false;
      }

      switch (typeof (x[p])) {
          case 'object':
          case 'function':

              leftChain.push(x);
              rightChain.push(y);

              if (!compare2Objects (x[p], y[p])) {
                  return false;
              }

              leftChain.pop();
              rightChain.pop();
              break;

          default:
              if (x[p] !== y[p]) {
                  return false;
              }
              break;
      }
  }

  return true;
}

if (aaas.length < 1) {
  return true; //Die silently? Don't know how to handle such case, please help...
  // throw "Need two or more aaas to compare";
}

for (i = 1, l = aaas.length; i < l; i++) {

    leftChain = []; //Todo: this can be cached
    rightChain = [];

    if (!compare2Objects(aaas[0], aaas[i])) {
        return false;
    }
}

return true;
}

export const validateBigint = (newVal,prevVal,max) =>{
    return newVal.substring(0, max).replace(/[^\d]/g, "")
}
export const validateStringLength = (newVal,prevVal,max) =>{
    return newVal.substring(0, max)
}

export const validateInteger = (newVal,prevVal,min,max) =>{
    if (newVal === "") return ""
    if (isNaN(newVal) || !parseInt(newVal)) return prevVal
    let parsed = parseInt(newVal)
    if (parsed > max) return max
    if (parsed < min) return min
    return parsed
}

export const validateFloat = (newVal,prevVal,max,decimals=2) =>{
    if (newVal == "") return ""
    if (newVal == ".") return "."
    const lastChar = newVal.charAt(newVal.length-1)
    if (lastChar == ".")
    {
        if (isNaN(newVal.slice(0, -1))) return prevVal
        return `${parseInt(newVal.slice(0, -1))}.`
    }
    if (isNaN(newVal)) return prevVal

    const theLastChar = newVal.charAt(newVal.length-1)
    if (theLastChar == "0")
    {
        if (getOcurrences(newVal,"0") == newVal.length) return "0"

        let splittedParts = newVal.split(".")
        if (splittedParts.length > 1 && `${splittedParts[1]}`.length > decimals)
        {
            return `${splittedParts[0]}.${splittedParts[1].substring(0,decimals)}`
        }

        if (parseFloat(newVal) > max) { return max } else { return newVal }
    }

    let parsed = parseFloat(newVal) % 1 != 0 ?
                    parseFloat(parseFloat(newVal).toFixed(decimals+1).slice(0, -1)) :
                    parseFloat(newVal)
    parsed = Math.abs(parsed)
    if (parsed > max) return max
    return parsed
}
