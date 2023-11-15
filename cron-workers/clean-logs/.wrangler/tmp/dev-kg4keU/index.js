// .wrangler/tmp/bundle-ngXuF8/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// C:/Users/dhruv/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// node_modules/bson/dist/bson.browser.esm.js
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var byteLength_1 = byteLength;
var toByteArray_1 = toByteArray;
var fromByteArray_1 = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}
var i;
var len;
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var validLen = b64.indexOf("=");
  if (validLen === -1)
    validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0;
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;
  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 255;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
  }
  return parts.join("");
}
var base64Js = {
  byteLength: byteLength_1,
  toByteArray: toByteArray_1,
  fromByteArray: fromByteArray_1
};
var read = function read2(buffer2, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer2[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer2[offset + i], i += d, nBits -= 8) {
  }
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer2[offset + i], i += d, nBits -= 8) {
  }
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
var write = function write2(buffer2, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer2[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
  }
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer2[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
  }
  buffer2[offset + i - d] |= s * 128;
};
var ieee754 = {
  read,
  write
};
var buffer$1 = createCommonjsModule(function(module, exports) {
  var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? (
    // eslint-disable-line dot-notation
    Symbol["for"]("nodejs.util.inspect.custom")
  ) : null;
  exports.Buffer = Buffer2;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;
  var K_MAX_LENGTH = 2147483647;
  exports.kMaxLength = K_MAX_LENGTH;
  Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
  if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
    console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  }
  function typedArraySupport() {
    try {
      var arr = new Uint8Array(1);
      var proto = {
        foo: function foo() {
          return 42;
        }
      };
      Object.setPrototypeOf(proto, Uint8Array.prototype);
      Object.setPrototypeOf(arr, proto);
      return arr.foo() === 42;
    } catch (e) {
      return false;
    }
  }
  Object.defineProperty(Buffer2.prototype, "parent", {
    enumerable: true,
    get: function get() {
      if (!Buffer2.isBuffer(this))
        return void 0;
      return this.buffer;
    }
  });
  Object.defineProperty(Buffer2.prototype, "offset", {
    enumerable: true,
    get: function get() {
      if (!Buffer2.isBuffer(this))
        return void 0;
      return this.byteOffset;
    }
  });
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    var buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function Buffer2(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new TypeError('The "string" argument must be of type string. Received type number');
      }
      return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
  }
  Buffer2.poolSize = 8192;
  function from(value, encodingOrOffset, length) {
    if (typeof value === "string") {
      return fromString(value, encodingOrOffset);
    }
    if (ArrayBuffer.isView(value)) {
      return fromArrayView(value);
    }
    if (value == null) {
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + babelHelpers["typeof"](value));
    }
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === "number") {
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    }
    var valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
      return Buffer2.from(valueOf, encodingOrOffset, length);
    }
    var b = fromObject(value);
    if (b)
      return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
      return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    }
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + babelHelpers["typeof"](value));
  }
  Buffer2.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
  };
  Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(Buffer2, Uint8Array);
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be of type number');
    } else if (size < 0) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }
  }
  function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(size);
    }
    if (fill !== void 0) {
      return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
  }
  Buffer2.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
  };
  function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
  }
  Buffer2.allocUnsafe = function(size) {
    return allocUnsafe(size);
  };
  Buffer2.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer2.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    var length = byteLength2(string, encoding) | 0;
    var buf = createBuffer(length);
    var actual = buf.write(string, encoding);
    if (actual !== length) {
      buf = buf.slice(0, actual);
    }
    return buf;
  }
  function fromArrayLike(array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    var buf = createBuffer(length);
    for (var i = 0; i < length; i += 1) {
      buf[i] = array[i] & 255;
    }
    return buf;
  }
  function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
      var copy = new Uint8Array(arrayView);
      return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
  }
  function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('"length" is outside of buffer bounds');
    }
    var buf;
    if (byteOffset === void 0 && length === void 0) {
      buf = new Uint8Array(array);
    } else if (length === void 0) {
      buf = new Uint8Array(array, byteOffset);
    } else {
      buf = new Uint8Array(array, byteOffset, length);
    }
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function fromObject(obj) {
    if (Buffer2.isBuffer(obj)) {
      var len = checked(obj.length) | 0;
      var buf = createBuffer(len);
      if (buf.length === 0) {
        return buf;
      }
      obj.copy(buf, 0, 0, len);
      return buf;
    }
    if (obj.length !== void 0) {
      if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
        return createBuffer(0);
      }
      return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data);
    }
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer2.alloc(+length);
  }
  Buffer2.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer2.prototype;
  };
  Buffer2.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array))
      a = Buffer2.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array))
      b = Buffer2.from(b, b.offset, b.byteLength);
    if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
      throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    }
    if (a === b)
      return 0;
    var x = a.length;
    var y = b.length;
    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  Buffer2.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer2.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
      return Buffer2.alloc(0);
    }
    var i;
    if (length === void 0) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }
    var buffer2 = Buffer2.allocUnsafe(length);
    var pos = 0;
    for (i = 0; i < list.length; ++i) {
      var buf = list[i];
      if (isInstance(buf, Uint8Array)) {
        if (pos + buf.length > buffer2.length) {
          Buffer2.from(buf).copy(buffer2, pos);
        } else {
          Uint8Array.prototype.set.call(buffer2, buf, pos);
        }
      } else if (!Buffer2.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      } else {
        buf.copy(buffer2, pos);
      }
      pos += buf.length;
    }
    return buffer2;
  };
  function byteLength2(string, encoding) {
    if (Buffer2.isBuffer(string)) {
      return string.length;
    }
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + babelHelpers["typeof"](string));
    }
    var len = string.length;
    var mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0)
      return 0;
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase) {
            return mustMatch ? -1 : utf8ToBytes(string).length;
          }
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.byteLength = byteLength2;
  function slowToString(encoding, start, end) {
    var loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding)
      encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.prototype._isBuffer = true;
  function swap(b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }
  Buffer2.prototype.swap16 = function swap16() {
    var len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (var i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this;
  };
  Buffer2.prototype.swap32 = function swap32() {
    var len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this;
  };
  Buffer2.prototype.swap64 = function swap64() {
    var len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this;
  };
  Buffer2.prototype.toString = function toString() {
    var length = this.length;
    if (length === 0)
      return "";
    if (arguments.length === 0)
      return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
  Buffer2.prototype.equals = function equals(b) {
    if (!Buffer2.isBuffer(b))
      throw new TypeError("Argument must be a Buffer");
    if (this === b)
      return true;
    return Buffer2.compare(this, b) === 0;
  };
  Buffer2.prototype.inspect = function inspect() {
    var str = "";
    var max = exports.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max)
      str += " ... ";
    return "<Buffer " + str + ">";
  };
  if (customInspectSymbol) {
    Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
  }
  Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) {
      target = Buffer2.from(target, target.offset, target.byteLength);
    }
    if (!Buffer2.isBuffer(target)) {
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + babelHelpers["typeof"](target));
    }
    if (start === void 0) {
      start = 0;
    }
    if (end === void 0) {
      end = target ? target.length : 0;
    }
    if (thisStart === void 0) {
      thisStart = 0;
    }
    if (thisEnd === void 0) {
      thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target)
      return 0;
    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);
    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);
    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
    if (buffer2.length === 0)
      return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (numberIsNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer2.length - 1;
    }
    if (byteOffset < 0)
      byteOffset = buffer2.length + byteOffset;
    if (byteOffset >= buffer2.length) {
      if (dir)
        return -1;
      else
        byteOffset = buffer2.length - 1;
    } else if (byteOffset < 0) {
      if (dir)
        byteOffset = 0;
      else
        return -1;
    }
    if (typeof val === "string") {
      val = Buffer2.from(val, encoding);
    }
    if (Buffer2.isBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read3(buf, i2) {
      if (indexSize === 1) {
        return buf[i2];
      } else {
        return buf.readUInt16BE(i2 * indexSize);
      }
    }
    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read3(arr, i) === read3(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1)
            foundIndex = i;
          if (i - foundIndex + 1 === valLength)
            return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1)
            i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength)
        byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) {
          if (read3(arr, i + j) !== read3(val, j)) {
            found = false;
            break;
          }
        }
        if (found)
          return i;
      }
    }
    return -1;
  }
  Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    var strLen = string.length;
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (numberIsNaN(parsed))
        return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer2.prototype.write = function write3(string, offset, length, encoding) {
    if (offset === void 0) {
      encoding = "utf8";
      length = this.length;
      offset = 0;
    } else if (length === void 0 && typeof offset === "string") {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === void 0)
          encoding = "utf8";
      } else {
        encoding = length;
        length = void 0;
      }
    } else {
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    }
    var remaining = this.length - offset;
    if (length === void 0 || length > remaining)
      length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding)
      encoding = "utf8";
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, string, offset, length);
        case "base64":
          return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer2.prototype.toJSON = function toJSON() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64Js.fromByteArray(buf);
    } else {
      return base64Js.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];
    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  var MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    var res = "";
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0)
      start = 0;
    if (!end || end < 0 || end > len)
      end = len;
    var out = "";
    for (var i = start; i < end; ++i) {
      out += hexSliceLookupTable[buf[i]];
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = "";
    for (var i = 0; i < bytes.length - 1; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  Buffer2.prototype.slice = function slice(start, end) {
    var len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0)
        start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0)
        end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start)
      end = start;
    var newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer2.prototype);
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0)
      throw new RangeError("offset is not uint");
    if (offset + ext > length)
      throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength3, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength3 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    return val;
  };
  Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      checkOffset(offset, byteLength3, this.length);
    }
    var val = this[offset + --byteLength3];
    var mul = 1;
    while (byteLength3 > 0 && (mul *= 256)) {
      val += this[offset + --byteLength3] * mul;
    }
    return val;
  };
  Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };
  Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };
  Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
  };
  Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };
  Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength3, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength3 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength3);
    return val;
  };
  Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength3, this.length);
    var i = byteLength3;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 256)) {
      val += this[offset + --i] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength3);
    return val;
  };
  Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128))
      return this[offset];
    return (255 - this[offset] + 1) * -1;
  };
  Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    var val = this[offset] | this[offset + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | this[offset] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };
  Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };
  Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
  };
  Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
  };
  Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
  };
  Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer2.isBuffer(buf))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
  }
  Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
      checkInt(this, value, offset, byteLength3, maxBytes, 0);
    }
    var mul = 1;
    var i = 0;
    this[offset] = value & 255;
    while (++i < byteLength3 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
      checkInt(this, value, offset, byteLength3, maxBytes, 0);
    }
    var i = byteLength3 - 1;
    var mul = 1;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 255, 0);
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
    return offset + 4;
  };
  Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength3 - 1);
      checkInt(this, value, offset, byteLength3, limit - 1, -limit);
    }
    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 255;
    while (++i < byteLength3 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength3 - 1);
      checkInt(this, value, offset, byteLength3, limit - 1, -limit);
    }
    var i = byteLength3 - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 127, -128);
    if (value < 0)
      value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 2147483647, -2147483648);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
  };
  Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0)
      value = 4294967295 + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
    if (offset < 0)
      throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer2.isBuffer(target))
      throw new TypeError("argument should be a Buffer");
    if (!start)
      start = 0;
    if (!end && end !== 0)
      end = this.length;
    if (targetStart >= target.length)
      targetStart = target.length;
    if (!targetStart)
      targetStart = 0;
    if (end > 0 && end < start)
      end = start;
    if (end === start)
      return 0;
    if (target.length === 0 || this.length === 0)
      return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length)
      throw new RangeError("Index out of range");
    if (end < 0)
      throw new RangeError("sourceEnd out of bounds");
    if (end > this.length)
      end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    var len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
      this.copyWithin(targetStart, start, end);
    } else {
      Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    }
    return len;
  };
  Buffer2.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (encoding !== void 0 && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      if (val.length === 1) {
        var code2 = val.charCodeAt(0);
        if (encoding === "utf8" && code2 < 128 || encoding === "latin1") {
          val = code2;
        }
      }
    } else if (typeof val === "number") {
      val = val & 255;
    } else if (typeof val === "boolean") {
      val = Number(val);
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val)
      val = 0;
    var i;
    if (typeof val === "number") {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      var bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
      var len = bytes.length;
      if (len === 0) {
        throw new TypeError('The value "' + val + '" is invalid for argument "value"');
      }
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }
    return this;
  };
  var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2)
      return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0)
          break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0)
          break;
        bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0)
          break;
        bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0)
          break;
        bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0)
        break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64Js.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length)
        break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
  }
  function numberIsNaN(obj) {
    return obj !== obj;
  }
  var hexSliceLookupTable = function() {
    var alphabet = "0123456789abcdef";
    var table = new Array(256);
    for (var i = 0; i < 16; ++i) {
      var i16 = i * 16;
      for (var j = 0; j < 16; ++j) {
        table[i16 + j] = alphabet[i] + alphabet[j];
      }
    }
    return table;
  }();
});
var buffer_1 = buffer$1.Buffer;
buffer$1.SlowBuffer;
buffer$1.INSPECT_MAX_BYTES;
buffer$1.kMaxLength;
var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (b2.hasOwnProperty(p))
        d2[p] = b2[p];
    }
  };
  return _extendStatics(d, b);
};
function __extends(d, b) {
  _extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var BSONError = (
  /** @class */
  function(_super) {
    __extends(BSONError2, _super);
    function BSONError2(message) {
      var _this = _super.call(this, message) || this;
      Object.setPrototypeOf(_this, BSONError2.prototype);
      return _this;
    }
    Object.defineProperty(BSONError2.prototype, "name", {
      get: function() {
        return "BSONError";
      },
      enumerable: false,
      configurable: true
    });
    return BSONError2;
  }(Error)
);
var BSONTypeError = (
  /** @class */
  function(_super) {
    __extends(BSONTypeError2, _super);
    function BSONTypeError2(message) {
      var _this = _super.call(this, message) || this;
      Object.setPrototypeOf(_this, BSONTypeError2.prototype);
      return _this;
    }
    Object.defineProperty(BSONTypeError2.prototype, "name", {
      get: function() {
        return "BSONTypeError";
      },
      enumerable: false,
      configurable: true
    });
    return BSONTypeError2;
  }(TypeError)
);
function checkForMath(potentialGlobal) {
  return potentialGlobal && potentialGlobal.Math == Math && potentialGlobal;
}
function getGlobal() {
  return checkForMath(typeof globalThis === "object" && globalThis) || checkForMath(typeof window === "object" && window) || checkForMath(typeof self === "object" && self) || checkForMath(typeof global === "object" && global) || // eslint-disable-next-line @typescript-eslint/no-implied-eval
  Function("return this")();
}
function isReactNative() {
  var g = getGlobal();
  return typeof g.navigator === "object" && g.navigator.product === "ReactNative";
}
var insecureRandomBytes = function insecureRandomBytes2(size) {
  var insecureWarning = isReactNative() ? "BSON: For React Native please polyfill crypto.getRandomValues, e.g. using: https://www.npmjs.com/package/react-native-get-random-values." : "BSON: No cryptographic implementation for random bytes present, falling back to a less secure implementation.";
  console.warn(insecureWarning);
  var result = buffer_1.alloc(size);
  for (var i = 0; i < size; ++i)
    result[i] = Math.floor(Math.random() * 256);
  return result;
};
var detectRandomBytes = function() {
  {
    if (typeof window !== "undefined") {
      var target_1 = window.crypto || window.msCrypto;
      if (target_1 && target_1.getRandomValues) {
        return function(size) {
          return target_1.getRandomValues(buffer_1.alloc(size));
        };
      }
    }
    if (typeof global !== "undefined" && global.crypto && global.crypto.getRandomValues) {
      return function(size) {
        return global.crypto.getRandomValues(buffer_1.alloc(size));
      };
    }
    return insecureRandomBytes;
  }
};
var randomBytes = detectRandomBytes();
function isAnyArrayBuffer(value) {
  return ["[object ArrayBuffer]", "[object SharedArrayBuffer]"].includes(Object.prototype.toString.call(value));
}
function isUint8Array(value) {
  return Object.prototype.toString.call(value) === "[object Uint8Array]";
}
function isRegExp(d) {
  return Object.prototype.toString.call(d) === "[object RegExp]";
}
function isDate(d) {
  return isObjectLike(d) && Object.prototype.toString.call(d) === "[object Date]";
}
function isObjectLike(candidate) {
  return typeof candidate === "object" && candidate !== null;
}
function deprecate(fn, message) {
  var warned = false;
  function deprecated() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (!warned) {
      console.warn(message);
      warned = true;
    }
    return fn.apply(this, args);
  }
  return deprecated;
}
function ensureBuffer(potentialBuffer) {
  if (ArrayBuffer.isView(potentialBuffer)) {
    return buffer_1.from(potentialBuffer.buffer, potentialBuffer.byteOffset, potentialBuffer.byteLength);
  }
  if (isAnyArrayBuffer(potentialBuffer)) {
    return buffer_1.from(potentialBuffer);
  }
  throw new BSONTypeError("Must use either Buffer or TypedArray");
}
var VALIDATION_REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|[0-9a-f]{12}4[0-9a-f]{3}[89ab][0-9a-f]{15})$/i;
var uuidValidateString = function(str) {
  return typeof str === "string" && VALIDATION_REGEX.test(str);
};
var uuidHexStringToBuffer = function(hexString) {
  if (!uuidValidateString(hexString)) {
    throw new BSONTypeError('UUID string representations must be a 32 or 36 character hex string (dashes excluded/included). Format: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" or "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".');
  }
  var sanitizedHexString = hexString.replace(/-/g, "");
  return buffer_1.from(sanitizedHexString, "hex");
};
var bufferToUuidHexString = function(buffer2, includeDashes) {
  if (includeDashes === void 0) {
    includeDashes = true;
  }
  return includeDashes ? buffer2.toString("hex", 0, 4) + "-" + buffer2.toString("hex", 4, 6) + "-" + buffer2.toString("hex", 6, 8) + "-" + buffer2.toString("hex", 8, 10) + "-" + buffer2.toString("hex", 10, 16) : buffer2.toString("hex");
};
var BSON_INT64_MAX$1 = Math.pow(2, 63) - 1;
var BSON_INT64_MIN$1 = -Math.pow(2, 63);
var JS_INT_MAX = Math.pow(2, 53);
var JS_INT_MIN = -Math.pow(2, 53);
var BSON_BINARY_SUBTYPE_UUID_NEW = 4;
var Binary = (
  /** @class */
  function() {
    function Binary2(buffer2, subType) {
      if (!(this instanceof Binary2))
        return new Binary2(buffer2, subType);
      if (!(buffer2 == null) && !(typeof buffer2 === "string") && !ArrayBuffer.isView(buffer2) && !(buffer2 instanceof ArrayBuffer) && !Array.isArray(buffer2)) {
        throw new BSONTypeError("Binary can only be constructed from string, Buffer, TypedArray, or Array<number>");
      }
      this.sub_type = subType !== null && subType !== void 0 ? subType : Binary2.BSON_BINARY_SUBTYPE_DEFAULT;
      if (buffer2 == null) {
        this.buffer = buffer_1.alloc(Binary2.BUFFER_SIZE);
        this.position = 0;
      } else {
        if (typeof buffer2 === "string") {
          this.buffer = buffer_1.from(buffer2, "binary");
        } else if (Array.isArray(buffer2)) {
          this.buffer = buffer_1.from(buffer2);
        } else {
          this.buffer = ensureBuffer(buffer2);
        }
        this.position = this.buffer.byteLength;
      }
    }
    Binary2.prototype.put = function(byteValue) {
      if (typeof byteValue === "string" && byteValue.length !== 1) {
        throw new BSONTypeError("only accepts single character String");
      } else if (typeof byteValue !== "number" && byteValue.length !== 1)
        throw new BSONTypeError("only accepts single character Uint8Array or Array");
      var decodedByte;
      if (typeof byteValue === "string") {
        decodedByte = byteValue.charCodeAt(0);
      } else if (typeof byteValue === "number") {
        decodedByte = byteValue;
      } else {
        decodedByte = byteValue[0];
      }
      if (decodedByte < 0 || decodedByte > 255) {
        throw new BSONTypeError("only accepts number in a valid unsigned byte range 0-255");
      }
      if (this.buffer.length > this.position) {
        this.buffer[this.position++] = decodedByte;
      } else {
        var buffer2 = buffer_1.alloc(Binary2.BUFFER_SIZE + this.buffer.length);
        this.buffer.copy(buffer2, 0, 0, this.buffer.length);
        this.buffer = buffer2;
        this.buffer[this.position++] = decodedByte;
      }
    };
    Binary2.prototype.write = function(sequence, offset) {
      offset = typeof offset === "number" ? offset : this.position;
      if (this.buffer.length < offset + sequence.length) {
        var buffer2 = buffer_1.alloc(this.buffer.length + sequence.length);
        this.buffer.copy(buffer2, 0, 0, this.buffer.length);
        this.buffer = buffer2;
      }
      if (ArrayBuffer.isView(sequence)) {
        this.buffer.set(ensureBuffer(sequence), offset);
        this.position = offset + sequence.byteLength > this.position ? offset + sequence.length : this.position;
      } else if (typeof sequence === "string") {
        this.buffer.write(sequence, offset, sequence.length, "binary");
        this.position = offset + sequence.length > this.position ? offset + sequence.length : this.position;
      }
    };
    Binary2.prototype.read = function(position, length) {
      length = length && length > 0 ? length : this.position;
      return this.buffer.slice(position, position + length);
    };
    Binary2.prototype.value = function(asRaw) {
      asRaw = !!asRaw;
      if (asRaw && this.buffer.length === this.position) {
        return this.buffer;
      }
      if (asRaw) {
        return this.buffer.slice(0, this.position);
      }
      return this.buffer.toString("binary", 0, this.position);
    };
    Binary2.prototype.length = function() {
      return this.position;
    };
    Binary2.prototype.toJSON = function() {
      return this.buffer.toString("base64");
    };
    Binary2.prototype.toString = function(format) {
      return this.buffer.toString(format);
    };
    Binary2.prototype.toExtendedJSON = function(options) {
      options = options || {};
      var base64String = this.buffer.toString("base64");
      var subType = Number(this.sub_type).toString(16);
      if (options.legacy) {
        return {
          $binary: base64String,
          $type: subType.length === 1 ? "0" + subType : subType
        };
      }
      return {
        $binary: {
          base64: base64String,
          subType: subType.length === 1 ? "0" + subType : subType
        }
      };
    };
    Binary2.prototype.toUUID = function() {
      if (this.sub_type === Binary2.SUBTYPE_UUID) {
        return new UUID(this.buffer.slice(0, this.position));
      }
      throw new BSONError('Binary sub_type "'.concat(this.sub_type, '" is not supported for converting to UUID. Only "').concat(Binary2.SUBTYPE_UUID, '" is currently supported.'));
    };
    Binary2.fromExtendedJSON = function(doc, options) {
      options = options || {};
      var data;
      var type;
      if ("$binary" in doc) {
        if (options.legacy && typeof doc.$binary === "string" && "$type" in doc) {
          type = doc.$type ? parseInt(doc.$type, 16) : 0;
          data = buffer_1.from(doc.$binary, "base64");
        } else {
          if (typeof doc.$binary !== "string") {
            type = doc.$binary.subType ? parseInt(doc.$binary.subType, 16) : 0;
            data = buffer_1.from(doc.$binary.base64, "base64");
          }
        }
      } else if ("$uuid" in doc) {
        type = 4;
        data = uuidHexStringToBuffer(doc.$uuid);
      }
      if (!data) {
        throw new BSONTypeError("Unexpected Binary Extended JSON format ".concat(JSON.stringify(doc)));
      }
      return type === BSON_BINARY_SUBTYPE_UUID_NEW ? new UUID(data) : new Binary2(data, type);
    };
    Binary2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return this.inspect();
    };
    Binary2.prototype.inspect = function() {
      var asBuffer = this.value(true);
      return 'new Binary(Buffer.from("'.concat(asBuffer.toString("hex"), '", "hex"), ').concat(this.sub_type, ")");
    };
    Binary2.BSON_BINARY_SUBTYPE_DEFAULT = 0;
    Binary2.BUFFER_SIZE = 256;
    Binary2.SUBTYPE_DEFAULT = 0;
    Binary2.SUBTYPE_FUNCTION = 1;
    Binary2.SUBTYPE_BYTE_ARRAY = 2;
    Binary2.SUBTYPE_UUID_OLD = 3;
    Binary2.SUBTYPE_UUID = 4;
    Binary2.SUBTYPE_MD5 = 5;
    Binary2.SUBTYPE_ENCRYPTED = 6;
    Binary2.SUBTYPE_COLUMN = 7;
    Binary2.SUBTYPE_USER_DEFINED = 128;
    return Binary2;
  }()
);
Object.defineProperty(Binary.prototype, "_bsontype", { value: "Binary" });
var UUID_BYTE_LENGTH = 16;
var UUID = (
  /** @class */
  function(_super) {
    __extends(UUID2, _super);
    function UUID2(input) {
      var _this = this;
      var bytes;
      var hexStr;
      if (input == null) {
        bytes = UUID2.generate();
      } else if (input instanceof UUID2) {
        bytes = buffer_1.from(input.buffer);
        hexStr = input.__id;
      } else if (ArrayBuffer.isView(input) && input.byteLength === UUID_BYTE_LENGTH) {
        bytes = ensureBuffer(input);
      } else if (typeof input === "string") {
        bytes = uuidHexStringToBuffer(input);
      } else {
        throw new BSONTypeError("Argument passed in UUID constructor must be a UUID, a 16 byte Buffer or a 32/36 character hex string (dashes excluded/included, format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).");
      }
      _this = _super.call(this, bytes, BSON_BINARY_SUBTYPE_UUID_NEW) || this;
      _this.__id = hexStr;
      return _this;
    }
    Object.defineProperty(UUID2.prototype, "id", {
      /**
       * The UUID bytes
       * @readonly
       */
      get: function() {
        return this.buffer;
      },
      set: function(value) {
        this.buffer = value;
        if (UUID2.cacheHexString) {
          this.__id = bufferToUuidHexString(value);
        }
      },
      enumerable: false,
      configurable: true
    });
    UUID2.prototype.toHexString = function(includeDashes) {
      if (includeDashes === void 0) {
        includeDashes = true;
      }
      if (UUID2.cacheHexString && this.__id) {
        return this.__id;
      }
      var uuidHexString = bufferToUuidHexString(this.id, includeDashes);
      if (UUID2.cacheHexString) {
        this.__id = uuidHexString;
      }
      return uuidHexString;
    };
    UUID2.prototype.toString = function(encoding) {
      return encoding ? this.id.toString(encoding) : this.toHexString();
    };
    UUID2.prototype.toJSON = function() {
      return this.toHexString();
    };
    UUID2.prototype.equals = function(otherId) {
      if (!otherId) {
        return false;
      }
      if (otherId instanceof UUID2) {
        return otherId.id.equals(this.id);
      }
      try {
        return new UUID2(otherId).id.equals(this.id);
      } catch (_a) {
        return false;
      }
    };
    UUID2.prototype.toBinary = function() {
      return new Binary(this.id, Binary.SUBTYPE_UUID);
    };
    UUID2.generate = function() {
      var bytes = randomBytes(UUID_BYTE_LENGTH);
      bytes[6] = bytes[6] & 15 | 64;
      bytes[8] = bytes[8] & 63 | 128;
      return buffer_1.from(bytes);
    };
    UUID2.isValid = function(input) {
      if (!input) {
        return false;
      }
      if (input instanceof UUID2) {
        return true;
      }
      if (typeof input === "string") {
        return uuidValidateString(input);
      }
      if (isUint8Array(input)) {
        if (input.length !== UUID_BYTE_LENGTH) {
          return false;
        }
        return (input[6] & 240) === 64 && (input[8] & 128) === 128;
      }
      return false;
    };
    UUID2.createFromHexString = function(hexString) {
      var buffer2 = uuidHexStringToBuffer(hexString);
      return new UUID2(buffer2);
    };
    UUID2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return this.inspect();
    };
    UUID2.prototype.inspect = function() {
      return 'new UUID("'.concat(this.toHexString(), '")');
    };
    return UUID2;
  }(Binary)
);
var Code = (
  /** @class */
  function() {
    function Code2(code2, scope) {
      if (!(this instanceof Code2))
        return new Code2(code2, scope);
      this.code = code2;
      this.scope = scope;
    }
    Code2.prototype.toJSON = function() {
      return { code: this.code, scope: this.scope };
    };
    Code2.prototype.toExtendedJSON = function() {
      if (this.scope) {
        return { $code: this.code, $scope: this.scope };
      }
      return { $code: this.code };
    };
    Code2.fromExtendedJSON = function(doc) {
      return new Code2(doc.$code, doc.$scope);
    };
    Code2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return this.inspect();
    };
    Code2.prototype.inspect = function() {
      var codeJson = this.toJSON();
      return 'new Code("'.concat(String(codeJson.code), '"').concat(codeJson.scope ? ", ".concat(JSON.stringify(codeJson.scope)) : "", ")");
    };
    return Code2;
  }()
);
Object.defineProperty(Code.prototype, "_bsontype", { value: "Code" });
function isDBRefLike(value) {
  return isObjectLike(value) && value.$id != null && typeof value.$ref === "string" && (value.$db == null || typeof value.$db === "string");
}
var DBRef = (
  /** @class */
  function() {
    function DBRef2(collection, oid, db, fields) {
      if (!(this instanceof DBRef2))
        return new DBRef2(collection, oid, db, fields);
      var parts = collection.split(".");
      if (parts.length === 2) {
        db = parts.shift();
        collection = parts.shift();
      }
      this.collection = collection;
      this.oid = oid;
      this.db = db;
      this.fields = fields || {};
    }
    Object.defineProperty(DBRef2.prototype, "namespace", {
      // Property provided for compatibility with the 1.x parser
      // the 1.x parser used a "namespace" property, while 4.x uses "collection"
      /** @internal */
      get: function() {
        return this.collection;
      },
      set: function(value) {
        this.collection = value;
      },
      enumerable: false,
      configurable: true
    });
    DBRef2.prototype.toJSON = function() {
      var o = Object.assign({
        $ref: this.collection,
        $id: this.oid
      }, this.fields);
      if (this.db != null)
        o.$db = this.db;
      return o;
    };
    DBRef2.prototype.toExtendedJSON = function(options) {
      options = options || {};
      var o = {
        $ref: this.collection,
        $id: this.oid
      };
      if (options.legacy) {
        return o;
      }
      if (this.db)
        o.$db = this.db;
      o = Object.assign(o, this.fields);
      return o;
    };
    DBRef2.fromExtendedJSON = function(doc) {
      var copy = Object.assign({}, doc);
      delete copy.$ref;
      delete copy.$id;
      delete copy.$db;
      return new DBRef2(doc.$ref, doc.$id, doc.$db, copy);
    };
    DBRef2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return this.inspect();
    };
    DBRef2.prototype.inspect = function() {
      var oid = this.oid === void 0 || this.oid.toString === void 0 ? this.oid : this.oid.toString();
      return 'new DBRef("'.concat(this.namespace, '", new ObjectId("').concat(String(oid), '")').concat(this.db ? ', "'.concat(this.db, '"') : "", ")");
    };
    return DBRef2;
  }()
);
Object.defineProperty(DBRef.prototype, "_bsontype", { value: "DBRef" });
var wasm = void 0;
try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(
    // prettier-ignore
    new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])
  ), {}).exports;
} catch (_a) {
}
var TWO_PWR_16_DBL = 1 << 16;
var TWO_PWR_24_DBL = 1 << 24;
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
var INT_CACHE = {};
var UINT_CACHE = {};
var Long = (
  /** @class */
  function() {
    function Long2(low, high, unsigned) {
      if (low === void 0) {
        low = 0;
      }
      if (!(this instanceof Long2))
        return new Long2(low, high, unsigned);
      if (typeof low === "bigint") {
        Object.assign(this, Long2.fromBigInt(low, !!high));
      } else if (typeof low === "string") {
        Object.assign(this, Long2.fromString(low, !!high));
      } else {
        this.low = low | 0;
        this.high = high | 0;
        this.unsigned = !!unsigned;
      }
      Object.defineProperty(this, "__isLong__", {
        value: true,
        configurable: false,
        writable: false,
        enumerable: false
      });
    }
    Long2.fromBits = function(lowBits, highBits, unsigned) {
      return new Long2(lowBits, highBits, unsigned);
    };
    Long2.fromInt = function(value, unsigned) {
      var obj, cachedObj, cache;
      if (unsigned) {
        value >>>= 0;
        if (cache = 0 <= value && value < 256) {
          cachedObj = UINT_CACHE[value];
          if (cachedObj)
            return cachedObj;
        }
        obj = Long2.fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
          UINT_CACHE[value] = obj;
        return obj;
      } else {
        value |= 0;
        if (cache = -128 <= value && value < 128) {
          cachedObj = INT_CACHE[value];
          if (cachedObj)
            return cachedObj;
        }
        obj = Long2.fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
          INT_CACHE[value] = obj;
        return obj;
      }
    };
    Long2.fromNumber = function(value, unsigned) {
      if (isNaN(value))
        return unsigned ? Long2.UZERO : Long2.ZERO;
      if (unsigned) {
        if (value < 0)
          return Long2.UZERO;
        if (value >= TWO_PWR_64_DBL)
          return Long2.MAX_UNSIGNED_VALUE;
      } else {
        if (value <= -TWO_PWR_63_DBL)
          return Long2.MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
          return Long2.MAX_VALUE;
      }
      if (value < 0)
        return Long2.fromNumber(-value, unsigned).neg();
      return Long2.fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
    };
    Long2.fromBigInt = function(value, unsigned) {
      return Long2.fromString(value.toString(), unsigned);
    };
    Long2.fromString = function(str, unsigned, radix) {
      if (str.length === 0)
        throw Error("empty string");
      if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return Long2.ZERO;
      if (typeof unsigned === "number") {
        radix = unsigned, unsigned = false;
      } else {
        unsigned = !!unsigned;
      }
      radix = radix || 10;
      if (radix < 2 || 36 < radix)
        throw RangeError("radix");
      var p;
      if ((p = str.indexOf("-")) > 0)
        throw Error("interior hyphen");
      else if (p === 0) {
        return Long2.fromString(str.substring(1), unsigned, radix).neg();
      }
      var radixToPower = Long2.fromNumber(Math.pow(radix, 8));
      var result = Long2.ZERO;
      for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
          var power = Long2.fromNumber(Math.pow(radix, size));
          result = result.mul(power).add(Long2.fromNumber(value));
        } else {
          result = result.mul(radixToPower);
          result = result.add(Long2.fromNumber(value));
        }
      }
      result.unsigned = unsigned;
      return result;
    };
    Long2.fromBytes = function(bytes, unsigned, le) {
      return le ? Long2.fromBytesLE(bytes, unsigned) : Long2.fromBytesBE(bytes, unsigned);
    };
    Long2.fromBytesLE = function(bytes, unsigned) {
      return new Long2(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24, unsigned);
    };
    Long2.fromBytesBE = function(bytes, unsigned) {
      return new Long2(bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7], bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], unsigned);
    };
    Long2.isLong = function(value) {
      return isObjectLike(value) && value["__isLong__"] === true;
    };
    Long2.fromValue = function(val, unsigned) {
      if (typeof val === "number")
        return Long2.fromNumber(val, unsigned);
      if (typeof val === "string")
        return Long2.fromString(val, unsigned);
      return Long2.fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
    };
    Long2.prototype.add = function(addend) {
      if (!Long2.isLong(addend))
        addend = Long2.fromValue(addend);
      var a48 = this.high >>> 16;
      var a32 = this.high & 65535;
      var a16 = this.low >>> 16;
      var a00 = this.low & 65535;
      var b48 = addend.high >>> 16;
      var b32 = addend.high & 65535;
      var b16 = addend.low >>> 16;
      var b00 = addend.low & 65535;
      var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
      c00 += a00 + b00;
      c16 += c00 >>> 16;
      c00 &= 65535;
      c16 += a16 + b16;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c32 += a32 + b32;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c48 += a48 + b48;
      c48 &= 65535;
      return Long2.fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
    };
    Long2.prototype.and = function(other) {
      if (!Long2.isLong(other))
        other = Long2.fromValue(other);
      return Long2.fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };
    Long2.prototype.compare = function(other) {
      if (!Long2.isLong(other))
        other = Long2.fromValue(other);
      if (this.eq(other))
        return 0;
      var thisNeg = this.isNegative(), otherNeg = other.isNegative();
      if (thisNeg && !otherNeg)
        return -1;
      if (!thisNeg && otherNeg)
        return 1;
      if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
      return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
    };
    Long2.prototype.comp = function(other) {
      return this.compare(other);
    };
    Long2.prototype.divide = function(divisor) {
      if (!Long2.isLong(divisor))
        divisor = Long2.fromValue(divisor);
      if (divisor.isZero())
        throw Error("division by zero");
      if (wasm) {
        if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
          return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(this.low, this.high, divisor.low, divisor.high);
        return Long2.fromBits(low, wasm.get_high(), this.unsigned);
      }
      if (this.isZero())
        return this.unsigned ? Long2.UZERO : Long2.ZERO;
      var approx, rem, res;
      if (!this.unsigned) {
        if (this.eq(Long2.MIN_VALUE)) {
          if (divisor.eq(Long2.ONE) || divisor.eq(Long2.NEG_ONE))
            return Long2.MIN_VALUE;
          else if (divisor.eq(Long2.MIN_VALUE))
            return Long2.ONE;
          else {
            var halfThis = this.shr(1);
            approx = halfThis.div(divisor).shl(1);
            if (approx.eq(Long2.ZERO)) {
              return divisor.isNegative() ? Long2.ONE : Long2.NEG_ONE;
            } else {
              rem = this.sub(divisor.mul(approx));
              res = approx.add(rem.div(divisor));
              return res;
            }
          }
        } else if (divisor.eq(Long2.MIN_VALUE))
          return this.unsigned ? Long2.UZERO : Long2.ZERO;
        if (this.isNegative()) {
          if (divisor.isNegative())
            return this.neg().div(divisor.neg());
          return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
          return this.div(divisor.neg()).neg();
        res = Long2.ZERO;
      } else {
        if (!divisor.unsigned)
          divisor = divisor.toUnsigned();
        if (divisor.gt(this))
          return Long2.UZERO;
        if (divisor.gt(this.shru(1)))
          return Long2.UONE;
        res = Long2.UZERO;
      }
      rem = this;
      while (rem.gte(divisor)) {
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
        var log2 = Math.ceil(Math.log(approx) / Math.LN2);
        var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
        var approxRes = Long2.fromNumber(approx);
        var approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
          approx -= delta;
          approxRes = Long2.fromNumber(approx, this.unsigned);
          approxRem = approxRes.mul(divisor);
        }
        if (approxRes.isZero())
          approxRes = Long2.ONE;
        res = res.add(approxRes);
        rem = rem.sub(approxRem);
      }
      return res;
    };
    Long2.prototype.div = function(divisor) {
      return this.divide(divisor);
    };
    Long2.prototype.equals = function(other) {
      if (!Long2.isLong(other))
        other = Long2.fromValue(other);
      if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
        return false;
      return this.high === other.high && this.low === other.low;
    };
    Long2.prototype.eq = function(other) {
      return this.equals(other);
    };
    Long2.prototype.getHighBits = function() {
      return this.high;
    };
    Long2.prototype.getHighBitsUnsigned = function() {
      return this.high >>> 0;
    };
    Long2.prototype.getLowBits = function() {
      return this.low;
    };
    Long2.prototype.getLowBitsUnsigned = function() {
      return this.low >>> 0;
    };
    Long2.prototype.getNumBitsAbs = function() {
      if (this.isNegative()) {
        return this.eq(Long2.MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
      }
      var val = this.high !== 0 ? this.high : this.low;
      var bit;
      for (bit = 31; bit > 0; bit--)
        if ((val & 1 << bit) !== 0)
          break;
      return this.high !== 0 ? bit + 33 : bit + 1;
    };
    Long2.prototype.greaterThan = function(other) {
      return this.comp(other) > 0;
    };
    Long2.prototype.gt = function(other) {
      return this.greaterThan(other);
    };
    Long2.prototype.greaterThanOrEqual = function(other) {
      return this.comp(other) >= 0;
    };
    Long2.prototype.gte = function(other) {
      return this.greaterThanOrEqual(other);
    };
    Long2.prototype.ge = function(other) {
      return this.greaterThanOrEqual(other);
    };
    Long2.prototype.isEven = function() {
      return (this.low & 1) === 0;
    };
    Long2.prototype.isNegative = function() {
      return !this.unsigned && this.high < 0;
    };
    Long2.prototype.isOdd = function() {
      return (this.low & 1) === 1;
    };
    Long2.prototype.isPositive = function() {
      return this.unsigned || this.high >= 0;
    };
    Long2.prototype.isZero = function() {
      return this.high === 0 && this.low === 0;
    };
    Long2.prototype.lessThan = function(other) {
      return this.comp(other) < 0;
    };
    Long2.prototype.lt = function(other) {
      return this.lessThan(other);
    };
    Long2.prototype.lessThanOrEqual = function(other) {
      return this.comp(other) <= 0;
    };
    Long2.prototype.lte = function(other) {
      return this.lessThanOrEqual(other);
    };
    Long2.prototype.modulo = function(divisor) {
      if (!Long2.isLong(divisor))
        divisor = Long2.fromValue(divisor);
      if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(this.low, this.high, divisor.low, divisor.high);
        return Long2.fromBits(low, wasm.get_high(), this.unsigned);
      }
      return this.sub(this.div(divisor).mul(divisor));
    };
    Long2.prototype.mod = function(divisor) {
      return this.modulo(divisor);
    };
    Long2.prototype.rem = function(divisor) {
      return this.modulo(divisor);
    };
    Long2.prototype.multiply = function(multiplier) {
      if (this.isZero())
        return Long2.ZERO;
      if (!Long2.isLong(multiplier))
        multiplier = Long2.fromValue(multiplier);
      if (wasm) {
        var low = wasm.mul(this.low, this.high, multiplier.low, multiplier.high);
        return Long2.fromBits(low, wasm.get_high(), this.unsigned);
      }
      if (multiplier.isZero())
        return Long2.ZERO;
      if (this.eq(Long2.MIN_VALUE))
        return multiplier.isOdd() ? Long2.MIN_VALUE : Long2.ZERO;
      if (multiplier.eq(Long2.MIN_VALUE))
        return this.isOdd() ? Long2.MIN_VALUE : Long2.ZERO;
      if (this.isNegative()) {
        if (multiplier.isNegative())
          return this.neg().mul(multiplier.neg());
        else
          return this.neg().mul(multiplier).neg();
      } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();
      if (this.lt(Long2.TWO_PWR_24) && multiplier.lt(Long2.TWO_PWR_24))
        return Long2.fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
      var a48 = this.high >>> 16;
      var a32 = this.high & 65535;
      var a16 = this.low >>> 16;
      var a00 = this.low & 65535;
      var b48 = multiplier.high >>> 16;
      var b32 = multiplier.high & 65535;
      var b16 = multiplier.low >>> 16;
      var b00 = multiplier.low & 65535;
      var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
      c00 += a00 * b00;
      c16 += c00 >>> 16;
      c00 &= 65535;
      c16 += a16 * b00;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c16 += a00 * b16;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c32 += a32 * b00;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c32 += a16 * b16;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c32 += a00 * b32;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
      c48 &= 65535;
      return Long2.fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
    };
    Long2.prototype.mul = function(multiplier) {
      return this.multiply(multiplier);
    };
    Long2.prototype.negate = function() {
      if (!this.unsigned && this.eq(Long2.MIN_VALUE))
        return Long2.MIN_VALUE;
      return this.not().add(Long2.ONE);
    };
    Long2.prototype.neg = function() {
      return this.negate();
    };
    Long2.prototype.not = function() {
      return Long2.fromBits(~this.low, ~this.high, this.unsigned);
    };
    Long2.prototype.notEquals = function(other) {
      return !this.equals(other);
    };
    Long2.prototype.neq = function(other) {
      return this.notEquals(other);
    };
    Long2.prototype.ne = function(other) {
      return this.notEquals(other);
    };
    Long2.prototype.or = function(other) {
      if (!Long2.isLong(other))
        other = Long2.fromValue(other);
      return Long2.fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };
    Long2.prototype.shiftLeft = function(numBits) {
      if (Long2.isLong(numBits))
        numBits = numBits.toInt();
      if ((numBits &= 63) === 0)
        return this;
      else if (numBits < 32)
        return Long2.fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);
      else
        return Long2.fromBits(0, this.low << numBits - 32, this.unsigned);
    };
    Long2.prototype.shl = function(numBits) {
      return this.shiftLeft(numBits);
    };
    Long2.prototype.shiftRight = function(numBits) {
      if (Long2.isLong(numBits))
        numBits = numBits.toInt();
      if ((numBits &= 63) === 0)
        return this;
      else if (numBits < 32)
        return Long2.fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);
      else
        return Long2.fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
    };
    Long2.prototype.shr = function(numBits) {
      return this.shiftRight(numBits);
    };
    Long2.prototype.shiftRightUnsigned = function(numBits) {
      if (Long2.isLong(numBits))
        numBits = numBits.toInt();
      numBits &= 63;
      if (numBits === 0)
        return this;
      else {
        var high = this.high;
        if (numBits < 32) {
          var low = this.low;
          return Long2.fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
        } else if (numBits === 32)
          return Long2.fromBits(high, 0, this.unsigned);
        else
          return Long2.fromBits(high >>> numBits - 32, 0, this.unsigned);
      }
    };
    Long2.prototype.shr_u = function(numBits) {
      return this.shiftRightUnsigned(numBits);
    };
    Long2.prototype.shru = function(numBits) {
      return this.shiftRightUnsigned(numBits);
    };
    Long2.prototype.subtract = function(subtrahend) {
      if (!Long2.isLong(subtrahend))
        subtrahend = Long2.fromValue(subtrahend);
      return this.add(subtrahend.neg());
    };
    Long2.prototype.sub = function(subtrahend) {
      return this.subtract(subtrahend);
    };
    Long2.prototype.toInt = function() {
      return this.unsigned ? this.low >>> 0 : this.low;
    };
    Long2.prototype.toNumber = function() {
      if (this.unsigned)
        return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
      return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };
    Long2.prototype.toBigInt = function() {
      return BigInt(this.toString());
    };
    Long2.prototype.toBytes = function(le) {
      return le ? this.toBytesLE() : this.toBytesBE();
    };
    Long2.prototype.toBytesLE = function() {
      var hi = this.high, lo = this.low;
      return [
        lo & 255,
        lo >>> 8 & 255,
        lo >>> 16 & 255,
        lo >>> 24,
        hi & 255,
        hi >>> 8 & 255,
        hi >>> 16 & 255,
        hi >>> 24
      ];
    };
    Long2.prototype.toBytesBE = function() {
      var hi = this.high, lo = this.low;
      return [
        hi >>> 24,
        hi >>> 16 & 255,
        hi >>> 8 & 255,
        hi & 255,
        lo >>> 24,
        lo >>> 16 & 255,
        lo >>> 8 & 255,
        lo & 255
      ];
    };
    Long2.prototype.toSigned = function() {
      if (!this.unsigned)
        return this;
      return Long2.fromBits(this.low, this.high, false);
    };
    Long2.prototype.toString = function(radix) {
      radix = radix || 10;
      if (radix < 2 || 36 < radix)
        throw RangeError("radix");
      if (this.isZero())
        return "0";
      if (this.isNegative()) {
        if (this.eq(Long2.MIN_VALUE)) {
          var radixLong = Long2.fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
          return div.toString(radix) + rem1.toInt().toString(radix);
        } else
          return "-" + this.neg().toString(radix);
      }
      var radixToPower = Long2.fromNumber(Math.pow(radix, 6), this.unsigned);
      var rem = this;
      var result = "";
      while (true) {
        var remDiv = rem.div(radixToPower);
        var intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0;
        var digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero()) {
          return digits + result;
        } else {
          while (digits.length < 6)
            digits = "0" + digits;
          result = "" + digits + result;
        }
      }
    };
    Long2.prototype.toUnsigned = function() {
      if (this.unsigned)
        return this;
      return Long2.fromBits(this.low, this.high, true);
    };
    Long2.prototype.xor = function(other) {
      if (!Long2.isLong(other))
        other = Long2.fromValue(other);
      return Long2.fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };
    Long2.prototype.eqz = function() {
      return this.isZero();
    };
    Long2.prototype.le = function(other) {
      return this.lessThanOrEqual(other);
    };
    Long2.prototype.toExtendedJSON = function(options) {
      if (options && options.relaxed)
        return this.toNumber();
      return { $numberLong: this.toString() };
    };
    Long2.fromExtendedJSON = function(doc, options) {
      var result = Long2.fromString(doc.$numberLong);
      return options && options.relaxed ? result.toNumber() : result;
    };
    Long2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return this.inspect();
    };
    Long2.prototype.inspect = function() {
      return 'new Long("'.concat(this.toString(), '"').concat(this.unsigned ? ", true" : "", ")");
    };
    Long2.TWO_PWR_24 = Long2.fromInt(TWO_PWR_24_DBL);
    Long2.MAX_UNSIGNED_VALUE = Long2.fromBits(4294967295 | 0, 4294967295 | 0, true);
    Long2.ZERO = Long2.fromInt(0);
    Long2.UZERO = Long2.fromInt(0, true);
    Long2.ONE = Long2.fromInt(1);
    Long2.UONE = Long2.fromInt(1, true);
    Long2.NEG_ONE = Long2.fromInt(-1);
    Long2.MAX_VALUE = Long2.fromBits(4294967295 | 0, 2147483647 | 0, false);
    Long2.MIN_VALUE = Long2.fromBits(0, 2147483648 | 0, false);
    return Long2;
  }()
);
Object.defineProperty(Long.prototype, "__isLong__", { value: true });
Object.defineProperty(Long.prototype, "_bsontype", { value: "Long" });
var PARSE_STRING_REGEXP = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/;
var PARSE_INF_REGEXP = /^(\+|-)?(Infinity|inf)$/i;
var PARSE_NAN_REGEXP = /^(\+|-)?NaN$/i;
var EXPONENT_MAX = 6111;
var EXPONENT_MIN = -6176;
var EXPONENT_BIAS = 6176;
var MAX_DIGITS = 34;
var NAN_BUFFER = [
  124,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
].reverse();
var INF_NEGATIVE_BUFFER = [
  248,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
].reverse();
var INF_POSITIVE_BUFFER = [
  120,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
].reverse();
var EXPONENT_REGEX = /^([-+])?(\d+)?$/;
var COMBINATION_MASK = 31;
var EXPONENT_MASK = 16383;
var COMBINATION_INFINITY = 30;
var COMBINATION_NAN = 31;
function isDigit(value) {
  return !isNaN(parseInt(value, 10));
}
function divideu128(value) {
  var DIVISOR = Long.fromNumber(1e3 * 1e3 * 1e3);
  var _rem = Long.fromNumber(0);
  if (!value.parts[0] && !value.parts[1] && !value.parts[2] && !value.parts[3]) {
    return { quotient: value, rem: _rem };
  }
  for (var i = 0; i <= 3; i++) {
    _rem = _rem.shiftLeft(32);
    _rem = _rem.add(new Long(value.parts[i], 0));
    value.parts[i] = _rem.div(DIVISOR).low;
    _rem = _rem.modulo(DIVISOR);
  }
  return { quotient: value, rem: _rem };
}
function multiply64x2(left, right) {
  if (!left && !right) {
    return { high: Long.fromNumber(0), low: Long.fromNumber(0) };
  }
  var leftHigh = left.shiftRightUnsigned(32);
  var leftLow = new Long(left.getLowBits(), 0);
  var rightHigh = right.shiftRightUnsigned(32);
  var rightLow = new Long(right.getLowBits(), 0);
  var productHigh = leftHigh.multiply(rightHigh);
  var productMid = leftHigh.multiply(rightLow);
  var productMid2 = leftLow.multiply(rightHigh);
  var productLow = leftLow.multiply(rightLow);
  productHigh = productHigh.add(productMid.shiftRightUnsigned(32));
  productMid = new Long(productMid.getLowBits(), 0).add(productMid2).add(productLow.shiftRightUnsigned(32));
  productHigh = productHigh.add(productMid.shiftRightUnsigned(32));
  productLow = productMid.shiftLeft(32).add(new Long(productLow.getLowBits(), 0));
  return { high: productHigh, low: productLow };
}
function lessThan(left, right) {
  var uhleft = left.high >>> 0;
  var uhright = right.high >>> 0;
  if (uhleft < uhright) {
    return true;
  } else if (uhleft === uhright) {
    var ulleft = left.low >>> 0;
    var ulright = right.low >>> 0;
    if (ulleft < ulright)
      return true;
  }
  return false;
}
function invalidErr(string, message) {
  throw new BSONTypeError('"'.concat(string, '" is not a valid Decimal128 string - ').concat(message));
}
var Decimal128 = (
  /** @class */
  function() {
    function Decimal1282(bytes) {
      if (!(this instanceof Decimal1282))
        return new Decimal1282(bytes);
      if (typeof bytes === "string") {
        this.bytes = Decimal1282.fromString(bytes).bytes;
      } else if (isUint8Array(bytes)) {
        if (bytes.byteLength !== 16) {
          throw new BSONTypeError("Decimal128 must take a Buffer of 16 bytes");
        }
        this.bytes = bytes;
      } else {
        throw new BSONTypeError("Decimal128 must take a Buffer or string");
      }
    }
    Decimal1282.fromString = function(representation) {
      var isNegative = false;
      var sawRadix = false;
      var foundNonZero = false;
      var significantDigits = 0;
      var nDigitsRead = 0;
      var nDigits = 0;
      var radixPosition = 0;
      var firstNonZero = 0;
      var digits = [0];
      var nDigitsStored = 0;
      var digitsInsert = 0;
      var firstDigit = 0;
      var lastDigit = 0;
      var exponent = 0;
      var i = 0;
      var significandHigh = new Long(0, 0);
      var significandLow = new Long(0, 0);
      var biasedExponent = 0;
      var index = 0;
      if (representation.length >= 7e3) {
        throw new BSONTypeError("" + representation + " not a valid Decimal128 string");
      }
      var stringMatch = representation.match(PARSE_STRING_REGEXP);
      var infMatch = representation.match(PARSE_INF_REGEXP);
      var nanMatch = representation.match(PARSE_NAN_REGEXP);
      if (!stringMatch && !infMatch && !nanMatch || representation.length === 0) {
        throw new BSONTypeError("" + representation + " not a valid Decimal128 string");
      }
      if (stringMatch) {
        var unsignedNumber = stringMatch[2];
        var e = stringMatch[4];
        var expSign = stringMatch[5];
        var expNumber = stringMatch[6];
        if (e && expNumber === void 0)
          invalidErr(representation, "missing exponent power");
        if (e && unsignedNumber === void 0)
          invalidErr(representation, "missing exponent base");
        if (e === void 0 && (expSign || expNumber)) {
          invalidErr(representation, "missing e before exponent");
        }
      }
      if (representation[index] === "+" || representation[index] === "-") {
        isNegative = representation[index++] === "-";
      }
      if (!isDigit(representation[index]) && representation[index] !== ".") {
        if (representation[index] === "i" || representation[index] === "I") {
          return new Decimal1282(buffer_1.from(isNegative ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
        } else if (representation[index] === "N") {
          return new Decimal1282(buffer_1.from(NAN_BUFFER));
        }
      }
      while (isDigit(representation[index]) || representation[index] === ".") {
        if (representation[index] === ".") {
          if (sawRadix)
            invalidErr(representation, "contains multiple periods");
          sawRadix = true;
          index = index + 1;
          continue;
        }
        if (nDigitsStored < 34) {
          if (representation[index] !== "0" || foundNonZero) {
            if (!foundNonZero) {
              firstNonZero = nDigitsRead;
            }
            foundNonZero = true;
            digits[digitsInsert++] = parseInt(representation[index], 10);
            nDigitsStored = nDigitsStored + 1;
          }
        }
        if (foundNonZero)
          nDigits = nDigits + 1;
        if (sawRadix)
          radixPosition = radixPosition + 1;
        nDigitsRead = nDigitsRead + 1;
        index = index + 1;
      }
      if (sawRadix && !nDigitsRead)
        throw new BSONTypeError("" + representation + " not a valid Decimal128 string");
      if (representation[index] === "e" || representation[index] === "E") {
        var match = representation.substr(++index).match(EXPONENT_REGEX);
        if (!match || !match[2])
          return new Decimal1282(buffer_1.from(NAN_BUFFER));
        exponent = parseInt(match[0], 10);
        index = index + match[0].length;
      }
      if (representation[index])
        return new Decimal1282(buffer_1.from(NAN_BUFFER));
      firstDigit = 0;
      if (!nDigitsStored) {
        firstDigit = 0;
        lastDigit = 0;
        digits[0] = 0;
        nDigits = 1;
        nDigitsStored = 1;
        significantDigits = 0;
      } else {
        lastDigit = nDigitsStored - 1;
        significantDigits = nDigits;
        if (significantDigits !== 1) {
          while (digits[firstNonZero + significantDigits - 1] === 0) {
            significantDigits = significantDigits - 1;
          }
        }
      }
      if (exponent <= radixPosition && radixPosition - exponent > 1 << 14) {
        exponent = EXPONENT_MIN;
      } else {
        exponent = exponent - radixPosition;
      }
      while (exponent > EXPONENT_MAX) {
        lastDigit = lastDigit + 1;
        if (lastDigit - firstDigit > MAX_DIGITS) {
          var digitsString = digits.join("");
          if (digitsString.match(/^0+$/)) {
            exponent = EXPONENT_MAX;
            break;
          }
          invalidErr(representation, "overflow");
        }
        exponent = exponent - 1;
      }
      while (exponent < EXPONENT_MIN || nDigitsStored < nDigits) {
        if (lastDigit === 0 && significantDigits < nDigitsStored) {
          exponent = EXPONENT_MIN;
          significantDigits = 0;
          break;
        }
        if (nDigitsStored < nDigits) {
          nDigits = nDigits - 1;
        } else {
          lastDigit = lastDigit - 1;
        }
        if (exponent < EXPONENT_MAX) {
          exponent = exponent + 1;
        } else {
          var digitsString = digits.join("");
          if (digitsString.match(/^0+$/)) {
            exponent = EXPONENT_MAX;
            break;
          }
          invalidErr(representation, "overflow");
        }
      }
      if (lastDigit - firstDigit + 1 < significantDigits) {
        var endOfString = nDigitsRead;
        if (sawRadix) {
          firstNonZero = firstNonZero + 1;
          endOfString = endOfString + 1;
        }
        if (isNegative) {
          firstNonZero = firstNonZero + 1;
          endOfString = endOfString + 1;
        }
        var roundDigit = parseInt(representation[firstNonZero + lastDigit + 1], 10);
        var roundBit = 0;
        if (roundDigit >= 5) {
          roundBit = 1;
          if (roundDigit === 5) {
            roundBit = digits[lastDigit] % 2 === 1 ? 1 : 0;
            for (i = firstNonZero + lastDigit + 2; i < endOfString; i++) {
              if (parseInt(representation[i], 10)) {
                roundBit = 1;
                break;
              }
            }
          }
        }
        if (roundBit) {
          var dIdx = lastDigit;
          for (; dIdx >= 0; dIdx--) {
            if (++digits[dIdx] > 9) {
              digits[dIdx] = 0;
              if (dIdx === 0) {
                if (exponent < EXPONENT_MAX) {
                  exponent = exponent + 1;
                  digits[dIdx] = 1;
                } else {
                  return new Decimal1282(buffer_1.from(isNegative ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
                }
              }
            }
          }
        }
      }
      significandHigh = Long.fromNumber(0);
      significandLow = Long.fromNumber(0);
      if (significantDigits === 0) {
        significandHigh = Long.fromNumber(0);
        significandLow = Long.fromNumber(0);
      } else if (lastDigit - firstDigit < 17) {
        var dIdx = firstDigit;
        significandLow = Long.fromNumber(digits[dIdx++]);
        significandHigh = new Long(0, 0);
        for (; dIdx <= lastDigit; dIdx++) {
          significandLow = significandLow.multiply(Long.fromNumber(10));
          significandLow = significandLow.add(Long.fromNumber(digits[dIdx]));
        }
      } else {
        var dIdx = firstDigit;
        significandHigh = Long.fromNumber(digits[dIdx++]);
        for (; dIdx <= lastDigit - 17; dIdx++) {
          significandHigh = significandHigh.multiply(Long.fromNumber(10));
          significandHigh = significandHigh.add(Long.fromNumber(digits[dIdx]));
        }
        significandLow = Long.fromNumber(digits[dIdx++]);
        for (; dIdx <= lastDigit; dIdx++) {
          significandLow = significandLow.multiply(Long.fromNumber(10));
          significandLow = significandLow.add(Long.fromNumber(digits[dIdx]));
        }
      }
      var significand = multiply64x2(significandHigh, Long.fromString("100000000000000000"));
      significand.low = significand.low.add(significandLow);
      if (lessThan(significand.low, significandLow)) {
        significand.high = significand.high.add(Long.fromNumber(1));
      }
      biasedExponent = exponent + EXPONENT_BIAS;
      var dec = { low: Long.fromNumber(0), high: Long.fromNumber(0) };
      if (significand.high.shiftRightUnsigned(49).and(Long.fromNumber(1)).equals(Long.fromNumber(1))) {
        dec.high = dec.high.or(Long.fromNumber(3).shiftLeft(61));
        dec.high = dec.high.or(Long.fromNumber(biasedExponent).and(Long.fromNumber(16383).shiftLeft(47)));
        dec.high = dec.high.or(significand.high.and(Long.fromNumber(140737488355327)));
      } else {
        dec.high = dec.high.or(Long.fromNumber(biasedExponent & 16383).shiftLeft(49));
        dec.high = dec.high.or(significand.high.and(Long.fromNumber(562949953421311)));
      }
      dec.low = significand.low;
      if (isNegative) {
        dec.high = dec.high.or(Long.fromString("9223372036854775808"));
      }
      var buffer2 = buffer_1.alloc(16);
      index = 0;
      buffer2[index++] = dec.low.low & 255;
      buffer2[index++] = dec.low.low >> 8 & 255;
      buffer2[index++] = dec.low.low >> 16 & 255;
      buffer2[index++] = dec.low.low >> 24 & 255;
      buffer2[index++] = dec.low.high & 255;
      buffer2[index++] = dec.low.high >> 8 & 255;
      buffer2[index++] = dec.low.high >> 16 & 255;
      buffer2[index++] = dec.low.high >> 24 & 255;
      buffer2[index++] = dec.high.low & 255;
      buffer2[index++] = dec.high.low >> 8 & 255;
      buffer2[index++] = dec.high.low >> 16 & 255;
      buffer2[index++] = dec.high.low >> 24 & 255;
      buffer2[index++] = dec.high.high & 255;
      buffer2[index++] = dec.high.high >> 8 & 255;
      buffer2[index++] = dec.high.high >> 16 & 255;
      buffer2[index++] = dec.high.high >> 24 & 255;
      return new Decimal1282(buffer2);
    };
    Decimal1282.prototype.toString = function() {
      var biased_exponent;
      var significand_digits = 0;
      var significand = new Array(36);
      for (var i = 0; i < significand.length; i++)
        significand[i] = 0;
      var index = 0;
      var is_zero = false;
      var significand_msb;
      var significand128 = { parts: [0, 0, 0, 0] };
      var j, k;
      var string = [];
      index = 0;
      var buffer2 = this.bytes;
      var low = buffer2[index++] | buffer2[index++] << 8 | buffer2[index++] << 16 | buffer2[index++] << 24;
      var midl = buffer2[index++] | buffer2[index++] << 8 | buffer2[index++] << 16 | buffer2[index++] << 24;
      var midh = buffer2[index++] | buffer2[index++] << 8 | buffer2[index++] << 16 | buffer2[index++] << 24;
      var high = buffer2[index++] | buffer2[index++] << 8 | buffer2[index++] << 16 | buffer2[index++] << 24;
      index = 0;
      var dec = {
        low: new Long(low, midl),
        high: new Long(midh, high)
      };
      if (dec.high.lessThan(Long.ZERO)) {
        string.push("-");
      }
      var combination = high >> 26 & COMBINATION_MASK;
      if (combination >> 3 === 3) {
        if (combination === COMBINATION_INFINITY) {
          return string.join("") + "Infinity";
        } else if (combination === COMBINATION_NAN) {
          return "NaN";
        } else {
          biased_exponent = high >> 15 & EXPONENT_MASK;
          significand_msb = 8 + (high >> 14 & 1);
        }
      } else {
        significand_msb = high >> 14 & 7;
        biased_exponent = high >> 17 & EXPONENT_MASK;
      }
      var exponent = biased_exponent - EXPONENT_BIAS;
      significand128.parts[0] = (high & 16383) + ((significand_msb & 15) << 14);
      significand128.parts[1] = midh;
      significand128.parts[2] = midl;
      significand128.parts[3] = low;
      if (significand128.parts[0] === 0 && significand128.parts[1] === 0 && significand128.parts[2] === 0 && significand128.parts[3] === 0) {
        is_zero = true;
      } else {
        for (k = 3; k >= 0; k--) {
          var least_digits = 0;
          var result = divideu128(significand128);
          significand128 = result.quotient;
          least_digits = result.rem.low;
          if (!least_digits)
            continue;
          for (j = 8; j >= 0; j--) {
            significand[k * 9 + j] = least_digits % 10;
            least_digits = Math.floor(least_digits / 10);
          }
        }
      }
      if (is_zero) {
        significand_digits = 1;
        significand[index] = 0;
      } else {
        significand_digits = 36;
        while (!significand[index]) {
          significand_digits = significand_digits - 1;
          index = index + 1;
        }
      }
      var scientific_exponent = significand_digits - 1 + exponent;
      if (scientific_exponent >= 34 || scientific_exponent <= -7 || exponent > 0) {
        if (significand_digits > 34) {
          string.push("".concat(0));
          if (exponent > 0)
            string.push("E+".concat(exponent));
          else if (exponent < 0)
            string.push("E".concat(exponent));
          return string.join("");
        }
        string.push("".concat(significand[index++]));
        significand_digits = significand_digits - 1;
        if (significand_digits) {
          string.push(".");
        }
        for (var i = 0; i < significand_digits; i++) {
          string.push("".concat(significand[index++]));
        }
        string.push("E");
        if (scientific_exponent > 0) {
          string.push("+".concat(scientific_exponent));
        } else {
          string.push("".concat(scientific_exponent));
        }
      } else {
        if (exponent >= 0) {
          for (var i = 0; i < significand_digits; i++) {
            string.push("".concat(significand[index++]));
          }
        } else {
          var radix_position = significand_digits + exponent;
          if (radix_position > 0) {
            for (var i = 0; i < radix_position; i++) {
              string.push("".concat(significand[index++]));
            }
          } else {
            string.push("0");
          }
          string.push(".");
          while (radix_position++ < 0) {
            string.push("0");
          }
          for (var i = 0; i < significand_digits - Math.max(radix_position - 1, 0); i++) {
            string.push("".concat(significand[index++]));
          }
        }
      }
      return string.join("");
    };
    Decimal1282.prototype.toJSON = function() {
      return { $numberDecimal: this.toString() };
    };
    Decimal1282.prototype.toExtendedJSON = function() {
      return { $numberDecimal: this.toString() };
    };
    Decimal1282.fromExtendedJSON = function(doc) {
      return Decimal1282.fromString(doc.$numberDecimal);
    };
    Decimal1282.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return this.inspect();
    };
    Decimal1282.prototype.inspect = function() {
      return 'new Decimal128("'.concat(this.toString(), '")');
    };
    return Decimal1282;
  }()
);
Object.defineProperty(Decimal128.prototype, "_bsontype", { value: "Decimal128" });
var Double = (
  /** @class */
  function() {
    function Double2(value) {
      if (!(this instanceof Double2))
        return new Double2(value);
      if (value instanceof Number) {
        value = value.valueOf();
      }
      this.value = +value;
    }
    Double2.prototype.valueOf = function() {
      return this.value;
    };
    Double2.prototype.toJSON = function() {
      return this.value;
    };
    Double2.prototype.toString = function(radix) {
      return this.value.toString(radix);
    };
    Double2.prototype.toExtendedJSON = function(options) {
      if (options && (options.legacy || options.relaxed && isFinite(this.value))) {
        return this.value;
      }
      if (Object.is(Math.sign(this.value), -0)) {
        return { $numberDouble: "-".concat(this.value.toFixed(1)) };
      }
      return {
        $numberDouble: Number.isInteger(this.value) ? this.value.toFixed(1) : this.value.toString()
      };
    };
    Double2.fromExtendedJSON = function(doc, options) {
      var doubleValue = parseFloat(doc.$numberDouble);
      return options && options.relaxed ? doubleValue : new Double2(doubleValue);
    };
    Double2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return this.inspect();
    };
    Double2.prototype.inspect = function() {
      var eJSON = this.toExtendedJSON();
      return "new Double(".concat(eJSON.$numberDouble, ")");
    };
    return Double2;
  }()
);
Object.defineProperty(Double.prototype, "_bsontype", { value: "Double" });
var Int32 = (
  /** @class */
  function() {
    function Int322(value) {
      if (!(this instanceof Int322))
        return new Int322(value);
      if (value instanceof Number) {
        value = value.valueOf();
      }
      this.value = +value | 0;
    }
    Int322.prototype.valueOf = function() {
      return this.value;
    };
    Int322.prototype.toString = function(radix) {
      return this.value.toString(radix);
    };
    Int322.prototype.toJSON = function() {
      return this.value;
    };
    Int322.prototype.toExtendedJSON = function(options) {
      if (options && (options.relaxed || options.legacy))
        return this.value;
      return { $numberInt: this.value.toString() };
    };
    Int322.fromExtendedJSON = function(doc, options) {
      return options && options.relaxed ? parseInt(doc.$numberInt, 10) : new Int322(doc.$numberInt);
    };
    Int322.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return this.inspect();
    };
    Int322.prototype.inspect = function() {
      return "new Int32(".concat(this.valueOf(), ")");
    };
    return Int322;
  }()
);
Object.defineProperty(Int32.prototype, "_bsontype", { value: "Int32" });
var MaxKey = (
  /** @class */
  function() {
    function MaxKey2() {
      if (!(this instanceof MaxKey2))
        return new MaxKey2();
    }
    MaxKey2.prototype.toExtendedJSON = function() {
      return { $maxKey: 1 };
    };
    MaxKey2.fromExtendedJSON = function() {
      return new MaxKey2();
    };
    MaxKey2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return this.inspect();
    };
    MaxKey2.prototype.inspect = function() {
      return "new MaxKey()";
    };
    return MaxKey2;
  }()
);
Object.defineProperty(MaxKey.prototype, "_bsontype", { value: "MaxKey" });
var MinKey = (
  /** @class */
  function() {
    function MinKey2() {
      if (!(this instanceof MinKey2))
        return new MinKey2();
    }
    MinKey2.prototype.toExtendedJSON = function() {
      return { $minKey: 1 };
    };
    MinKey2.fromExtendedJSON = function() {
      return new MinKey2();
    };
    MinKey2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return this.inspect();
    };
    MinKey2.prototype.inspect = function() {
      return "new MinKey()";
    };
    return MinKey2;
  }()
);
Object.defineProperty(MinKey.prototype, "_bsontype", { value: "MinKey" });
var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
var PROCESS_UNIQUE = null;
var kId = Symbol("id");
var ObjectId = (
  /** @class */
  function() {
    function ObjectId2(inputId) {
      if (!(this instanceof ObjectId2))
        return new ObjectId2(inputId);
      var workingId;
      if (typeof inputId === "object" && inputId && "id" in inputId) {
        if (typeof inputId.id !== "string" && !ArrayBuffer.isView(inputId.id)) {
          throw new BSONTypeError("Argument passed in must have an id that is of type string or Buffer");
        }
        if ("toHexString" in inputId && typeof inputId.toHexString === "function") {
          workingId = buffer_1.from(inputId.toHexString(), "hex");
        } else {
          workingId = inputId.id;
        }
      } else {
        workingId = inputId;
      }
      if (workingId == null || typeof workingId === "number") {
        this[kId] = ObjectId2.generate(typeof workingId === "number" ? workingId : void 0);
      } else if (ArrayBuffer.isView(workingId) && workingId.byteLength === 12) {
        this[kId] = workingId instanceof buffer_1 ? workingId : ensureBuffer(workingId);
      } else if (typeof workingId === "string") {
        if (workingId.length === 12) {
          var bytes = buffer_1.from(workingId);
          if (bytes.byteLength === 12) {
            this[kId] = bytes;
          } else {
            throw new BSONTypeError("Argument passed in must be a string of 12 bytes");
          }
        } else if (workingId.length === 24 && checkForHexRegExp.test(workingId)) {
          this[kId] = buffer_1.from(workingId, "hex");
        } else {
          throw new BSONTypeError("Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
        }
      } else {
        throw new BSONTypeError("Argument passed in does not match the accepted types");
      }
      if (ObjectId2.cacheHexString) {
        this.__id = this.id.toString("hex");
      }
    }
    Object.defineProperty(ObjectId2.prototype, "id", {
      /**
       * The ObjectId bytes
       * @readonly
       */
      get: function() {
        return this[kId];
      },
      set: function(value) {
        this[kId] = value;
        if (ObjectId2.cacheHexString) {
          this.__id = value.toString("hex");
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ObjectId2.prototype, "generationTime", {
      /**
       * The generation time of this ObjectId instance
       * @deprecated Please use getTimestamp / createFromTime which returns an int32 epoch
       */
      get: function() {
        return this.id.readInt32BE(0);
      },
      set: function(value) {
        this.id.writeUInt32BE(value, 0);
      },
      enumerable: false,
      configurable: true
    });
    ObjectId2.prototype.toHexString = function() {
      if (ObjectId2.cacheHexString && this.__id) {
        return this.__id;
      }
      var hexString = this.id.toString("hex");
      if (ObjectId2.cacheHexString && !this.__id) {
        this.__id = hexString;
      }
      return hexString;
    };
    ObjectId2.getInc = function() {
      return ObjectId2.index = (ObjectId2.index + 1) % 16777215;
    };
    ObjectId2.generate = function(time) {
      if ("number" !== typeof time) {
        time = Math.floor(Date.now() / 1e3);
      }
      var inc = ObjectId2.getInc();
      var buffer2 = buffer_1.alloc(12);
      buffer2.writeUInt32BE(time, 0);
      if (PROCESS_UNIQUE === null) {
        PROCESS_UNIQUE = randomBytes(5);
      }
      buffer2[4] = PROCESS_UNIQUE[0];
      buffer2[5] = PROCESS_UNIQUE[1];
      buffer2[6] = PROCESS_UNIQUE[2];
      buffer2[7] = PROCESS_UNIQUE[3];
      buffer2[8] = PROCESS_UNIQUE[4];
      buffer2[11] = inc & 255;
      buffer2[10] = inc >> 8 & 255;
      buffer2[9] = inc >> 16 & 255;
      return buffer2;
    };
    ObjectId2.prototype.toString = function(format) {
      if (format)
        return this.id.toString(format);
      return this.toHexString();
    };
    ObjectId2.prototype.toJSON = function() {
      return this.toHexString();
    };
    ObjectId2.prototype.equals = function(otherId) {
      if (otherId === void 0 || otherId === null) {
        return false;
      }
      if (otherId instanceof ObjectId2) {
        return this[kId][11] === otherId[kId][11] && this[kId].equals(otherId[kId]);
      }
      if (typeof otherId === "string" && ObjectId2.isValid(otherId) && otherId.length === 12 && isUint8Array(this.id)) {
        return otherId === buffer_1.prototype.toString.call(this.id, "latin1");
      }
      if (typeof otherId === "string" && ObjectId2.isValid(otherId) && otherId.length === 24) {
        return otherId.toLowerCase() === this.toHexString();
      }
      if (typeof otherId === "string" && ObjectId2.isValid(otherId) && otherId.length === 12) {
        return buffer_1.from(otherId).equals(this.id);
      }
      if (typeof otherId === "object" && "toHexString" in otherId && typeof otherId.toHexString === "function") {
        var otherIdString = otherId.toHexString();
        var thisIdString = this.toHexString().toLowerCase();
        return typeof otherIdString === "string" && otherIdString.toLowerCase() === thisIdString;
      }
      return false;
    };
    ObjectId2.prototype.getTimestamp = function() {
      var timestamp = /* @__PURE__ */ new Date();
      var time = this.id.readUInt32BE(0);
      timestamp.setTime(Math.floor(time) * 1e3);
      return timestamp;
    };
    ObjectId2.createPk = function() {
      return new ObjectId2();
    };
    ObjectId2.createFromTime = function(time) {
      var buffer2 = buffer_1.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      buffer2.writeUInt32BE(time, 0);
      return new ObjectId2(buffer2);
    };
    ObjectId2.createFromHexString = function(hexString) {
      if (typeof hexString === "undefined" || hexString != null && hexString.length !== 24) {
        throw new BSONTypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
      }
      return new ObjectId2(buffer_1.from(hexString, "hex"));
    };
    ObjectId2.isValid = function(id) {
      if (id == null)
        return false;
      try {
        new ObjectId2(id);
        return true;
      } catch (_a) {
        return false;
      }
    };
    ObjectId2.prototype.toExtendedJSON = function() {
      if (this.toHexString)
        return { $oid: this.toHexString() };
      return { $oid: this.toString("hex") };
    };
    ObjectId2.fromExtendedJSON = function(doc) {
      return new ObjectId2(doc.$oid);
    };
    ObjectId2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return this.inspect();
    };
    ObjectId2.prototype.inspect = function() {
      return 'new ObjectId("'.concat(this.toHexString(), '")');
    };
    ObjectId2.index = Math.floor(Math.random() * 16777215);
    return ObjectId2;
  }()
);
Object.defineProperty(ObjectId.prototype, "generate", {
  value: deprecate(function(time) {
    return ObjectId.generate(time);
  }, "Please use the static `ObjectId.generate(time)` instead")
});
Object.defineProperty(ObjectId.prototype, "getInc", {
  value: deprecate(function() {
    return ObjectId.getInc();
  }, "Please use the static `ObjectId.getInc()` instead")
});
Object.defineProperty(ObjectId.prototype, "get_inc", {
  value: deprecate(function() {
    return ObjectId.getInc();
  }, "Please use the static `ObjectId.getInc()` instead")
});
Object.defineProperty(ObjectId, "get_inc", {
  value: deprecate(function() {
    return ObjectId.getInc();
  }, "Please use the static `ObjectId.getInc()` instead")
});
Object.defineProperty(ObjectId.prototype, "_bsontype", { value: "ObjectID" });
function alphabetize(str) {
  return str.split("").sort().join("");
}
var BSONRegExp = (
  /** @class */
  function() {
    function BSONRegExp2(pattern, options) {
      if (!(this instanceof BSONRegExp2))
        return new BSONRegExp2(pattern, options);
      this.pattern = pattern;
      this.options = alphabetize(options !== null && options !== void 0 ? options : "");
      if (this.pattern.indexOf("\0") !== -1) {
        throw new BSONError("BSON Regex patterns cannot contain null bytes, found: ".concat(JSON.stringify(this.pattern)));
      }
      if (this.options.indexOf("\0") !== -1) {
        throw new BSONError("BSON Regex options cannot contain null bytes, found: ".concat(JSON.stringify(this.options)));
      }
      for (var i = 0; i < this.options.length; i++) {
        if (!(this.options[i] === "i" || this.options[i] === "m" || this.options[i] === "x" || this.options[i] === "l" || this.options[i] === "s" || this.options[i] === "u")) {
          throw new BSONError("The regular expression option [".concat(this.options[i], "] is not supported"));
        }
      }
    }
    BSONRegExp2.parseOptions = function(options) {
      return options ? options.split("").sort().join("") : "";
    };
    BSONRegExp2.prototype.toExtendedJSON = function(options) {
      options = options || {};
      if (options.legacy) {
        return { $regex: this.pattern, $options: this.options };
      }
      return { $regularExpression: { pattern: this.pattern, options: this.options } };
    };
    BSONRegExp2.fromExtendedJSON = function(doc) {
      if ("$regex" in doc) {
        if (typeof doc.$regex !== "string") {
          if (doc.$regex._bsontype === "BSONRegExp") {
            return doc;
          }
        } else {
          return new BSONRegExp2(doc.$regex, BSONRegExp2.parseOptions(doc.$options));
        }
      }
      if ("$regularExpression" in doc) {
        return new BSONRegExp2(doc.$regularExpression.pattern, BSONRegExp2.parseOptions(doc.$regularExpression.options));
      }
      throw new BSONTypeError("Unexpected BSONRegExp EJSON object form: ".concat(JSON.stringify(doc)));
    };
    return BSONRegExp2;
  }()
);
Object.defineProperty(BSONRegExp.prototype, "_bsontype", { value: "BSONRegExp" });
var BSONSymbol = (
  /** @class */
  function() {
    function BSONSymbol2(value) {
      if (!(this instanceof BSONSymbol2))
        return new BSONSymbol2(value);
      this.value = value;
    }
    BSONSymbol2.prototype.valueOf = function() {
      return this.value;
    };
    BSONSymbol2.prototype.toString = function() {
      return this.value;
    };
    BSONSymbol2.prototype.inspect = function() {
      return 'new BSONSymbol("'.concat(this.value, '")');
    };
    BSONSymbol2.prototype.toJSON = function() {
      return this.value;
    };
    BSONSymbol2.prototype.toExtendedJSON = function() {
      return { $symbol: this.value };
    };
    BSONSymbol2.fromExtendedJSON = function(doc) {
      return new BSONSymbol2(doc.$symbol);
    };
    BSONSymbol2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return this.inspect();
    };
    return BSONSymbol2;
  }()
);
Object.defineProperty(BSONSymbol.prototype, "_bsontype", { value: "Symbol" });
var LongWithoutOverridesClass = Long;
var Timestamp = (
  /** @class */
  function(_super) {
    __extends(Timestamp2, _super);
    function Timestamp2(low, high) {
      var _this = this;
      if (!(_this instanceof Timestamp2))
        return new Timestamp2(low, high);
      if (Long.isLong(low)) {
        _this = _super.call(this, low.low, low.high, true) || this;
      } else if (isObjectLike(low) && typeof low.t !== "undefined" && typeof low.i !== "undefined") {
        _this = _super.call(this, low.i, low.t, true) || this;
      } else {
        _this = _super.call(this, low, high, true) || this;
      }
      Object.defineProperty(_this, "_bsontype", {
        value: "Timestamp",
        writable: false,
        configurable: false,
        enumerable: false
      });
      return _this;
    }
    Timestamp2.prototype.toJSON = function() {
      return {
        $timestamp: this.toString()
      };
    };
    Timestamp2.fromInt = function(value) {
      return new Timestamp2(Long.fromInt(value, true));
    };
    Timestamp2.fromNumber = function(value) {
      return new Timestamp2(Long.fromNumber(value, true));
    };
    Timestamp2.fromBits = function(lowBits, highBits) {
      return new Timestamp2(lowBits, highBits);
    };
    Timestamp2.fromString = function(str, optRadix) {
      return new Timestamp2(Long.fromString(str, true, optRadix));
    };
    Timestamp2.prototype.toExtendedJSON = function() {
      return { $timestamp: { t: this.high >>> 0, i: this.low >>> 0 } };
    };
    Timestamp2.fromExtendedJSON = function(doc) {
      return new Timestamp2(doc.$timestamp);
    };
    Timestamp2.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
      return this.inspect();
    };
    Timestamp2.prototype.inspect = function() {
      return "new Timestamp({ t: ".concat(this.getHighBits(), ", i: ").concat(this.getLowBits(), " })");
    };
    Timestamp2.MAX_VALUE = Long.MAX_UNSIGNED_VALUE;
    return Timestamp2;
  }(LongWithoutOverridesClass)
);
function isBSONType(value) {
  return isObjectLike(value) && Reflect.has(value, "_bsontype") && typeof value._bsontype === "string";
}
var BSON_INT32_MAX = 2147483647;
var BSON_INT32_MIN = -2147483648;
var BSON_INT64_MAX = 9223372036854776e3;
var BSON_INT64_MIN = -9223372036854776e3;
var keysToCodecs = {
  $oid: ObjectId,
  $binary: Binary,
  $uuid: Binary,
  $symbol: BSONSymbol,
  $numberInt: Int32,
  $numberDecimal: Decimal128,
  $numberDouble: Double,
  $numberLong: Long,
  $minKey: MinKey,
  $maxKey: MaxKey,
  $regex: BSONRegExp,
  $regularExpression: BSONRegExp,
  $timestamp: Timestamp
};
function deserializeValue(value, options) {
  if (options === void 0) {
    options = {};
  }
  if (typeof value === "number") {
    if (options.relaxed || options.legacy) {
      return value;
    }
    if (Math.floor(value) === value) {
      if (value >= BSON_INT32_MIN && value <= BSON_INT32_MAX)
        return new Int32(value);
      if (value >= BSON_INT64_MIN && value <= BSON_INT64_MAX)
        return Long.fromNumber(value);
    }
    return new Double(value);
  }
  if (value == null || typeof value !== "object")
    return value;
  if (value.$undefined)
    return null;
  var keys = Object.keys(value).filter(function(k) {
    return k.startsWith("$") && value[k] != null;
  });
  for (var i = 0; i < keys.length; i++) {
    var c = keysToCodecs[keys[i]];
    if (c)
      return c.fromExtendedJSON(value, options);
  }
  if (value.$date != null) {
    var d = value.$date;
    var date = /* @__PURE__ */ new Date();
    if (options.legacy) {
      if (typeof d === "number")
        date.setTime(d);
      else if (typeof d === "string")
        date.setTime(Date.parse(d));
    } else {
      if (typeof d === "string")
        date.setTime(Date.parse(d));
      else if (Long.isLong(d))
        date.setTime(d.toNumber());
      else if (typeof d === "number" && options.relaxed)
        date.setTime(d);
    }
    return date;
  }
  if (value.$code != null) {
    var copy = Object.assign({}, value);
    if (value.$scope) {
      copy.$scope = deserializeValue(value.$scope);
    }
    return Code.fromExtendedJSON(value);
  }
  if (isDBRefLike(value) || value.$dbPointer) {
    var v = value.$ref ? value : value.$dbPointer;
    if (v instanceof DBRef)
      return v;
    var dollarKeys = Object.keys(v).filter(function(k) {
      return k.startsWith("$");
    });
    var valid_1 = true;
    dollarKeys.forEach(function(k) {
      if (["$ref", "$id", "$db"].indexOf(k) === -1)
        valid_1 = false;
    });
    if (valid_1)
      return DBRef.fromExtendedJSON(v);
  }
  return value;
}
function serializeArray(array, options) {
  return array.map(function(v, index) {
    options.seenObjects.push({ propertyName: "index ".concat(index), obj: null });
    try {
      return serializeValue(v, options);
    } finally {
      options.seenObjects.pop();
    }
  });
}
function getISOString(date) {
  var isoStr = date.toISOString();
  return date.getUTCMilliseconds() !== 0 ? isoStr : isoStr.slice(0, -5) + "Z";
}
function serializeValue(value, options) {
  if ((typeof value === "object" || typeof value === "function") && value !== null) {
    var index = options.seenObjects.findIndex(function(entry) {
      return entry.obj === value;
    });
    if (index !== -1) {
      var props = options.seenObjects.map(function(entry) {
        return entry.propertyName;
      });
      var leadingPart = props.slice(0, index).map(function(prop) {
        return "".concat(prop, " -> ");
      }).join("");
      var alreadySeen = props[index];
      var circularPart = " -> " + props.slice(index + 1, props.length - 1).map(function(prop) {
        return "".concat(prop, " -> ");
      }).join("");
      var current = props[props.length - 1];
      var leadingSpace = " ".repeat(leadingPart.length + alreadySeen.length / 2);
      var dashes = "-".repeat(circularPart.length + (alreadySeen.length + current.length) / 2 - 1);
      throw new BSONTypeError("Converting circular structure to EJSON:\n" + "    ".concat(leadingPart).concat(alreadySeen).concat(circularPart).concat(current, "\n") + "    ".concat(leadingSpace, "\\").concat(dashes, "/"));
    }
    options.seenObjects[options.seenObjects.length - 1].obj = value;
  }
  if (Array.isArray(value))
    return serializeArray(value, options);
  if (value === void 0)
    return null;
  if (value instanceof Date || isDate(value)) {
    var dateNum = value.getTime(), inRange = dateNum > -1 && dateNum < 2534023188e5;
    if (options.legacy) {
      return options.relaxed && inRange ? { $date: value.getTime() } : { $date: getISOString(value) };
    }
    return options.relaxed && inRange ? { $date: getISOString(value) } : { $date: { $numberLong: value.getTime().toString() } };
  }
  if (typeof value === "number" && (!options.relaxed || !isFinite(value))) {
    if (Math.floor(value) === value) {
      var int32Range = value >= BSON_INT32_MIN && value <= BSON_INT32_MAX, int64Range = value >= BSON_INT64_MIN && value <= BSON_INT64_MAX;
      if (int32Range)
        return { $numberInt: value.toString() };
      if (int64Range)
        return { $numberLong: value.toString() };
    }
    return { $numberDouble: value.toString() };
  }
  if (value instanceof RegExp || isRegExp(value)) {
    var flags = value.flags;
    if (flags === void 0) {
      var match = value.toString().match(/[gimuy]*$/);
      if (match) {
        flags = match[0];
      }
    }
    var rx = new BSONRegExp(value.source, flags);
    return rx.toExtendedJSON(options);
  }
  if (value != null && typeof value === "object")
    return serializeDocument(value, options);
  return value;
}
var BSON_TYPE_MAPPINGS = {
  Binary: function(o) {
    return new Binary(o.value(), o.sub_type);
  },
  Code: function(o) {
    return new Code(o.code, o.scope);
  },
  DBRef: function(o) {
    return new DBRef(o.collection || o.namespace, o.oid, o.db, o.fields);
  },
  Decimal128: function(o) {
    return new Decimal128(o.bytes);
  },
  Double: function(o) {
    return new Double(o.value);
  },
  Int32: function(o) {
    return new Int32(o.value);
  },
  Long: function(o) {
    return Long.fromBits(
      // underscore variants for 1.x backwards compatibility
      o.low != null ? o.low : o.low_,
      o.low != null ? o.high : o.high_,
      o.low != null ? o.unsigned : o.unsigned_
    );
  },
  MaxKey: function() {
    return new MaxKey();
  },
  MinKey: function() {
    return new MinKey();
  },
  ObjectID: function(o) {
    return new ObjectId(o);
  },
  ObjectId: function(o) {
    return new ObjectId(o);
  },
  BSONRegExp: function(o) {
    return new BSONRegExp(o.pattern, o.options);
  },
  Symbol: function(o) {
    return new BSONSymbol(o.value);
  },
  Timestamp: function(o) {
    return Timestamp.fromBits(o.low, o.high);
  }
};
function serializeDocument(doc, options) {
  if (doc == null || typeof doc !== "object")
    throw new BSONError("not an object instance");
  var bsontype = doc._bsontype;
  if (typeof bsontype === "undefined") {
    var _doc = {};
    for (var name in doc) {
      options.seenObjects.push({ propertyName: name, obj: null });
      try {
        var value = serializeValue(doc[name], options);
        if (name === "__proto__") {
          Object.defineProperty(_doc, name, {
            value,
            writable: true,
            enumerable: true,
            configurable: true
          });
        } else {
          _doc[name] = value;
        }
      } finally {
        options.seenObjects.pop();
      }
    }
    return _doc;
  } else if (isBSONType(doc)) {
    var outDoc = doc;
    if (typeof outDoc.toExtendedJSON !== "function") {
      var mapper = BSON_TYPE_MAPPINGS[doc._bsontype];
      if (!mapper) {
        throw new BSONTypeError("Unrecognized or invalid _bsontype: " + doc._bsontype);
      }
      outDoc = mapper(outDoc);
    }
    if (bsontype === "Code" && outDoc.scope) {
      outDoc = new Code(outDoc.code, serializeValue(outDoc.scope, options));
    } else if (bsontype === "DBRef" && outDoc.oid) {
      outDoc = new DBRef(serializeValue(outDoc.collection, options), serializeValue(outDoc.oid, options), serializeValue(outDoc.db, options), serializeValue(outDoc.fields, options));
    }
    return outDoc.toExtendedJSON(options);
  } else {
    throw new BSONError("_bsontype must be a string, but was: " + typeof bsontype);
  }
}
var EJSON;
(function(EJSON2) {
  function parse(text, options) {
    var finalOptions = Object.assign({}, { relaxed: true, legacy: false }, options);
    if (typeof finalOptions.relaxed === "boolean")
      finalOptions.strict = !finalOptions.relaxed;
    if (typeof finalOptions.strict === "boolean")
      finalOptions.relaxed = !finalOptions.strict;
    return JSON.parse(text, function(key, value) {
      if (key.indexOf("\0") !== -1) {
        throw new BSONError("BSON Document field names cannot contain null bytes, found: ".concat(JSON.stringify(key)));
      }
      return deserializeValue(value, finalOptions);
    });
  }
  EJSON2.parse = parse;
  function stringify(value, replacer, space, options) {
    if (space != null && typeof space === "object") {
      options = space;
      space = 0;
    }
    if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
      options = replacer;
      replacer = void 0;
      space = 0;
    }
    var serializeOptions = Object.assign({ relaxed: true, legacy: false }, options, {
      seenObjects: [{ propertyName: "(root)", obj: null }]
    });
    var doc = serializeValue(value, serializeOptions);
    return JSON.stringify(doc, replacer, space);
  }
  EJSON2.stringify = stringify;
  function serialize2(value, options) {
    options = options || {};
    return JSON.parse(stringify(value, options));
  }
  EJSON2.serialize = serialize2;
  function deserialize2(ejson, options) {
    options = options || {};
    return parse(JSON.stringify(ejson), options);
  }
  EJSON2.deserialize = deserialize2;
})(EJSON || (EJSON = {}));
var bsonMap;
var bsonGlobal = getGlobal();
if (bsonGlobal.Map) {
  bsonMap = bsonGlobal.Map;
} else {
  bsonMap = /** @class */
  function() {
    function Map(array) {
      if (array === void 0) {
        array = [];
      }
      this._keys = [];
      this._values = {};
      for (var i = 0; i < array.length; i++) {
        if (array[i] == null)
          continue;
        var entry = array[i];
        var key = entry[0];
        var value = entry[1];
        this._keys.push(key);
        this._values[key] = { v: value, i: this._keys.length - 1 };
      }
    }
    Map.prototype.clear = function() {
      this._keys = [];
      this._values = {};
    };
    Map.prototype.delete = function(key) {
      var value = this._values[key];
      if (value == null)
        return false;
      delete this._values[key];
      this._keys.splice(value.i, 1);
      return true;
    };
    Map.prototype.entries = function() {
      var _this = this;
      var index = 0;
      return {
        next: function() {
          var key = _this._keys[index++];
          return {
            value: key !== void 0 ? [key, _this._values[key].v] : void 0,
            done: key !== void 0 ? false : true
          };
        }
      };
    };
    Map.prototype.forEach = function(callback, self2) {
      self2 = self2 || this;
      for (var i = 0; i < this._keys.length; i++) {
        var key = this._keys[i];
        callback.call(self2, this._values[key].v, key, self2);
      }
    };
    Map.prototype.get = function(key) {
      return this._values[key] ? this._values[key].v : void 0;
    };
    Map.prototype.has = function(key) {
      return this._values[key] != null;
    };
    Map.prototype.keys = function() {
      var _this = this;
      var index = 0;
      return {
        next: function() {
          var key = _this._keys[index++];
          return {
            value: key !== void 0 ? key : void 0,
            done: key !== void 0 ? false : true
          };
        }
      };
    };
    Map.prototype.set = function(key, value) {
      if (this._values[key]) {
        this._values[key].v = value;
        return this;
      }
      this._keys.push(key);
      this._values[key] = { v: value, i: this._keys.length - 1 };
      return this;
    };
    Map.prototype.values = function() {
      var _this = this;
      var index = 0;
      return {
        next: function() {
          var key = _this._keys[index++];
          return {
            value: key !== void 0 ? _this._values[key].v : void 0,
            done: key !== void 0 ? false : true
          };
        }
      };
    };
    Object.defineProperty(Map.prototype, "size", {
      get: function() {
        return this._keys.length;
      },
      enumerable: false,
      configurable: true
    });
    return Map;
  }();
}
var JS_INT_MAX_LONG = Long.fromNumber(JS_INT_MAX);
var JS_INT_MIN_LONG = Long.fromNumber(JS_INT_MIN);
var SPACE_FOR_FLOAT64 = new Uint8Array(8);
var DV_FOR_FLOAT64 = new DataView(SPACE_FOR_FLOAT64.buffer, SPACE_FOR_FLOAT64.byteOffset, SPACE_FOR_FLOAT64.byteLength);
var MAXSIZE = 1024 * 1024 * 17;
var buffer = buffer_1.alloc(MAXSIZE);

// node_modules/realm-web/dist/bundle.dom.es.js
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var BrowserInfo = (
  /** @class */
  function() {
    function BrowserInfo2(name, version2, os) {
      this.name = name;
      this.version = version2;
      this.os = os;
      this.type = "browser";
    }
    return BrowserInfo2;
  }()
);
var NodeInfo = (
  /** @class */
  function() {
    function NodeInfo2(version2) {
      this.version = version2;
      this.type = "node";
      this.name = "node";
      this.os = process.platform;
    }
    return NodeInfo2;
  }()
);
var SearchBotDeviceInfo = (
  /** @class */
  function() {
    function SearchBotDeviceInfo2(name, version2, os, bot) {
      this.name = name;
      this.version = version2;
      this.os = os;
      this.bot = bot;
      this.type = "bot-device";
    }
    return SearchBotDeviceInfo2;
  }()
);
var BotInfo = (
  /** @class */
  function() {
    function BotInfo2() {
      this.type = "bot";
      this.bot = true;
      this.name = "bot";
      this.version = null;
      this.os = null;
    }
    return BotInfo2;
  }()
);
var ReactNativeInfo = (
  /** @class */
  function() {
    function ReactNativeInfo2() {
      this.type = "react-native";
      this.name = "react-native";
      this.version = null;
      this.os = null;
    }
    return ReactNativeInfo2;
  }()
);
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", SEARCHBOX_UA_REGEX]
];
var operatingSystemRules = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function detect(userAgent) {
  if (!!userAgent) {
    return parseUserAgent(userAgent);
  }
  if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return new ReactNativeInfo();
  }
  if (typeof navigator !== "undefined") {
    return parseUserAgent(navigator.userAgent);
  }
  return getNodeVersion();
}
function matchUserAgent(ua) {
  return ua !== "" && userAgentRules.reduce(function(matched, _a) {
    var browser2 = _a[0], regex = _a[1];
    if (matched) {
      return matched;
    }
    var uaMatch = regex.exec(ua);
    return !!uaMatch && [browser2, uaMatch];
  }, false);
}
function parseUserAgent(ua) {
  var matchedRule = matchUserAgent(ua);
  if (!matchedRule) {
    return null;
  }
  var name = matchedRule[0], match = matchedRule[1];
  if (name === "searchbot") {
    return new BotInfo();
  }
  var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
    }
  } else {
    versionParts = [];
  }
  var version2 = versionParts.join(".");
  var os = detectOS(ua);
  var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo(name, version2, os, searchBotMatch[1]);
  }
  return new BrowserInfo(name, version2, os);
}
function detectOS(ua) {
  for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
    var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
    var match = regex.exec(ua);
    if (match) {
      return os;
    }
  }
  return null;
}
function getNodeVersion() {
  var isNode = typeof process !== "undefined" && process.version;
  return isNode ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
  var output = [];
  for (var ii = 0; ii < count; ii++) {
    output.push("0");
  }
  return output;
}
var DefaultNetworkTransport = class {
  constructor() {
    if (!DefaultNetworkTransport.fetch) {
      throw new Error("DefaultNetworkTransport.fetch must be set before it's used");
    }
    if (!DefaultNetworkTransport.AbortController) {
      throw new Error("DefaultNetworkTransport.AbortController must be set before it's used");
    }
  }
  fetchWithCallbacks(request, handler) {
    this.fetch(request).then(async (response) => {
      const decodedBody = await response.text();
      const responseHeaders = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      return {
        statusCode: response.status,
        headers: responseHeaders,
        body: decodedBody
      };
    }).then((r) => handler.onSuccess(r)).catch((e) => handler.onError(e));
  }
  async fetch(request) {
    const { timeoutMs, url, ...rest } = request;
    const { signal, cancelTimeout } = this.createTimeoutSignal(timeoutMs);
    try {
      return await DefaultNetworkTransport.fetch(url, {
        ...DefaultNetworkTransport.extraFetchOptions,
        signal,
        ...rest
      });
    } finally {
      cancelTimeout();
    }
  }
  createTimeoutSignal(timeoutMs) {
    if (typeof timeoutMs === "number") {
      const controller = new DefaultNetworkTransport.AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
      }, timeoutMs);
      return {
        signal: controller.signal,
        cancelTimeout: () => {
          clearTimeout(timeout);
        }
      };
    } else {
      return {
        signal: void 0,
        cancelTimeout: () => {
        }
      };
    }
  }
};
DefaultNetworkTransport.DEFAULT_HEADERS = {
  "Content-Type": "application/json"
};
var setIsDevelopmentMode = (state) => {
};
var check = function(it) {
  return it && it.Math == Math && it;
};
var safeGlobalThis = (
  // eslint-disable-next-line no-restricted-globals
  check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore allow `self`
  check(typeof self == "object" && self) || // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore allow `global`
  check(typeof global == "object" && global) || // eslint-disable-next-line no-new-func -- fallback
  function() {
    return this;
  }() || Function("return this")()
);
setIsDevelopmentMode(typeof __DEV__ !== "undefined" && __DEV__);
DefaultNetworkTransport.fetch = safeGlobalThis.fetch.bind(safeGlobalThis);
DefaultNetworkTransport.AbortController = safeGlobalThis.AbortController.bind(safeGlobalThis);
var version = "3.7.2";
var VERSION = version;
var _hasatob = typeof atob === "function";
var _hasbtoa = typeof btoa === "function";
var _hasBuffer = typeof Buffer === "function";
var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64chs = Array.prototype.slice.call(b64ch);
var b64tab = ((a) => {
  let tab = {};
  a.forEach((c, i) => tab[c] = i);
  return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
var _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, "");
var btoaPolyfill = (bin) => {
  let u32, c0, c1, c2, asc = "";
  const pad = bin.length % 3;
  for (let i = 0; i < bin.length; ) {
    if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255)
      throw new TypeError("invalid character found");
    u32 = c0 << 16 | c1 << 8 | c2;
    asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
  }
  return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
var _btoa = _hasbtoa ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
  const maxargs = 4096;
  let strs = [];
  for (let i = 0, l = u8a.length; i < l; i += maxargs) {
    strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
  }
  return _btoa(strs.join(""));
};
var fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
var cb_utob = (c) => {
  if (c.length < 2) {
    var cc = c.charCodeAt(0);
    return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  } else {
    var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
    return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  }
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = (u) => u.replace(re_utob, cb_utob);
var _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
var encodeURI = (src) => encode(src, true);
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = (cccc) => {
  switch (cccc.length) {
    case 4:
      var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
      return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
    case 3:
      return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
    default:
      return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
  }
};
var btou = (b) => b.replace(re_btou, cb_btou);
var atobPolyfill = (asc) => {
  asc = asc.replace(/\s+/g, "");
  if (!b64re.test(asc))
    throw new TypeError("malformed base64.");
  asc += "==".slice(2 - (asc.length & 3));
  let u24, bin = "", r1, r2;
  for (let i = 0; i < asc.length; ) {
    u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
    bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
  }
  return bin;
};
var _atob = _hasatob ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
var _toUint8Array = _hasBuffer ? (a) => _U8Afrom(Buffer.from(a, "base64")) : (a) => _U8Afrom(_atob(a), (c) => c.charCodeAt(0));
var toUint8Array = (a) => _toUint8Array(_unURI(a));
var _decode = _hasBuffer ? (a) => Buffer.from(a, "base64").toString("utf8") : _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
var _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
var decode = (src) => _decode(_unURI(src));
var isValid = (src) => {
  if (typeof src !== "string")
    return false;
  const s = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
  return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
};
var _noEnum = (v) => {
  return {
    value: v,
    enumerable: false,
    writable: true,
    configurable: true
  };
};
var extendString = function() {
  const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
  _add("fromBase64", function() {
    return decode(this);
  });
  _add("toBase64", function(urlsafe) {
    return encode(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return encode(this, true);
  });
  _add("toBase64URL", function() {
    return encode(this, true);
  });
  _add("toUint8Array", function() {
    return toUint8Array(this);
  });
};
var extendUint8Array = function() {
  const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
  _add("toBase64", function(urlsafe) {
    return fromUint8Array(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return fromUint8Array(this, true);
  });
  _add("toBase64URL", function() {
    return fromUint8Array(this, true);
  });
};
var extendBuiltins = () => {
  extendString();
  extendUint8Array();
};
var gBase64 = {
  version,
  VERSION,
  atob: _atob,
  atobPolyfill,
  btoa: _btoa,
  btoaPolyfill,
  fromBase64: decode,
  toBase64: encode,
  encode,
  encodeURI,
  encodeURL: encodeURI,
  utob,
  btou,
  decode,
  isValid,
  fromUint8Array,
  toUint8Array,
  extendString,
  extendUint8Array,
  extendBuiltins
};
var SERIALIZATION_OPTIONS = {
  relaxed: false
  // Ensure Canonical mode
};
function serialize(obj) {
  return EJSON.serialize(obj, SERIALIZATION_OPTIONS);
}
function deserialize(obj) {
  if (Array.isArray(obj)) {
    return obj.map((doc) => EJSON.deserialize(doc));
  } else {
    return EJSON.deserialize(obj);
  }
}
var UserType;
(function(UserType2) {
  UserType2["Normal"] = "normal";
  UserType2["Server"] = "server";
})(UserType || (UserType = {}));
var DataKey;
(function(DataKey2) {
  DataKey2["NAME"] = "name";
  DataKey2["EMAIL"] = "email";
  DataKey2["PICTURE"] = "picture";
  DataKey2["FIRST_NAME"] = "first_name";
  DataKey2["LAST_NAME"] = "last_name";
  DataKey2["GENDER"] = "gender";
  DataKey2["BIRTHDAY"] = "birthday";
  DataKey2["MIN_AGE"] = "min_age";
  DataKey2["MAX_AGE"] = "max_age";
})(DataKey || (DataKey = {}));
var DATA_MAPPING = {
  [DataKey.NAME]: "name",
  [DataKey.EMAIL]: "email",
  [DataKey.PICTURE]: "pictureUrl",
  [DataKey.FIRST_NAME]: "firstName",
  [DataKey.LAST_NAME]: "lastName",
  [DataKey.GENDER]: "gender",
  [DataKey.BIRTHDAY]: "birthday",
  [DataKey.MIN_AGE]: "minAge",
  [DataKey.MAX_AGE]: "maxAge"
};
var UserProfile = class {
  /**
   * @param response The response of a call fetching the users profile.
   */
  constructor(response) {
    this.type = UserType.Normal;
    this.identities = [];
    if (typeof response === "object" && response !== null) {
      const { type, identities, data } = response;
      if (typeof type === "string") {
        this.type = type;
      } else {
        throw new Error("Expected 'type' in the response body");
      }
      if (Array.isArray(identities)) {
        this.identities = identities.map((identity) => {
          const { id, provider_type: providerType } = identity;
          return { id, providerType };
        });
      } else {
        throw new Error("Expected 'identities' in the response body");
      }
      if (typeof data === "object" && data !== null) {
        const mappedData = Object.fromEntries(Object.entries(data).map(([key, value]) => {
          if (key in DATA_MAPPING) {
            return [DATA_MAPPING[key], value];
          } else {
            return [key, value];
          }
        }));
        this.data = deserialize(mappedData);
      } else {
        throw new Error("Expected 'data' in the response body");
      }
    } else {
      this.data = {};
    }
  }
};
var PrefixedStorage = class {
  /**
   * Construct a `Storage` which will prefix a key part to every operation.
   *
   * @param storage The underlying storage to use for operations.
   * @param keyPart The part of the key to prefix when performing operations.
   */
  constructor(storage, keyPart) {
    this.storage = storage;
    this.keyPart = keyPart;
  }
  /** @inheritdoc */
  get(key) {
    return this.storage.get(this.keyPart + PrefixedStorage.PART_SEPARATOR + key);
  }
  /** @inheritdoc */
  set(key, value) {
    return this.storage.set(this.keyPart + PrefixedStorage.PART_SEPARATOR + key, value);
  }
  /** @inheritdoc */
  remove(key) {
    return this.storage.remove(this.keyPart + PrefixedStorage.PART_SEPARATOR + key);
  }
  /** @inheritdoc */
  prefix(keyPart) {
    return new PrefixedStorage(this, keyPart);
  }
  /** @inheritdoc */
  clear(prefix = "") {
    return this.storage.clear(this.keyPart + PrefixedStorage.PART_SEPARATOR + prefix);
  }
  /** @inheritdoc */
  addListener(listener) {
    return this.storage.addListener(listener);
  }
  /** @inheritdoc */
  removeListener(listener) {
    return this.storage.addListener(listener);
  }
};
PrefixedStorage.PART_SEPARATOR = ":";
var MemoryStorage = class {
  constructor() {
    this.storage = {};
    this.listeners = /* @__PURE__ */ new Set();
  }
  /** @inheritdoc */
  get(key) {
    if (key in this.storage) {
      return this.storage[key];
    } else {
      return null;
    }
  }
  /** @inheritdoc */
  set(key, value) {
    this.storage[key] = value;
    this.fireListeners();
  }
  /** @inheritdoc */
  remove(key) {
    delete this.storage[key];
    this.fireListeners();
  }
  /** @inheritdoc */
  prefix(keyPart) {
    return new PrefixedStorage(this, keyPart);
  }
  /** @inheritdoc */
  clear(prefix) {
    for (const key of Object.keys(this.storage)) {
      if (!prefix || key.startsWith(prefix)) {
        delete this.storage[key];
      }
    }
    this.fireListeners();
  }
  /** @inheritdoc */
  addListener(listener) {
    this.listeners.add(listener);
  }
  /** @inheritdoc */
  removeListener(listener) {
    this.listeners.delete(listener);
  }
  /**
   * Tell the listeners that a change occurred.
   */
  fireListeners() {
    this.listeners.forEach((listener) => listener());
  }
};
var ACCESS_TOKEN_STORAGE_KEY = "accessToken";
var REFRESH_TOKEN_STORAGE_KEY = "refreshToken";
var PROFILE_STORAGE_KEY = "profile";
var PROVIDER_TYPE_STORAGE_KEY = "providerType";
var UserStorage = class extends PrefixedStorage {
  /**
   * Construct a storage for a `User`.
   *
   * @param storage The underlying storage to wrap.
   * @param userId The id of the user.
   */
  constructor(storage, userId) {
    super(storage, `user(${userId})`);
  }
  /**
   * Get the access token from storage.
   *
   * @returns Access token (null if unknown).
   */
  get accessToken() {
    return this.get(ACCESS_TOKEN_STORAGE_KEY);
  }
  /**
   * Set the access token in storage.
   *
   * @param value Access token (null if unknown).
   */
  set accessToken(value) {
    if (value === null) {
      this.remove(ACCESS_TOKEN_STORAGE_KEY);
    } else {
      this.set(ACCESS_TOKEN_STORAGE_KEY, value);
    }
  }
  /**
   * Get the refresh token from storage.
   *
   * @returns Refresh token (null if unknown and user is logged out).
   */
  get refreshToken() {
    return this.get(REFRESH_TOKEN_STORAGE_KEY);
  }
  /**
   * Set the refresh token in storage.
   *
   * @param value Refresh token (null if unknown and user is logged out).
   */
  set refreshToken(value) {
    if (value === null) {
      this.remove(REFRESH_TOKEN_STORAGE_KEY);
    } else {
      this.set(REFRESH_TOKEN_STORAGE_KEY, value);
    }
  }
  /**
   * Get the user profile from storage.
   *
   * @returns User profile (undefined if its unknown).
   */
  get profile() {
    const value = this.get(PROFILE_STORAGE_KEY);
    if (value) {
      const profile = new UserProfile();
      Object.assign(profile, JSON.parse(value));
      return profile;
    }
  }
  /**
   * Set the user profile in storage.
   *
   * @param value User profile (undefined if its unknown).
   */
  set profile(value) {
    if (value) {
      this.set(PROFILE_STORAGE_KEY, JSON.stringify(value));
    } else {
      this.remove(PROFILE_STORAGE_KEY);
    }
  }
  /**
   * Get the type of authentication provider used to authenticate
   *
   * @returns User profile (undefined if its unknown).
   */
  get providerType() {
    const value = this.get(PROVIDER_TYPE_STORAGE_KEY);
    if (value) {
      return value;
    }
  }
  /**
   * Set the type of authentication provider used to authenticate
   *
   * @param value Type of authentication provider.
   */
  set providerType(value) {
    if (value) {
      this.set(PROVIDER_TYPE_STORAGE_KEY, value);
    } else {
      this.remove(PROVIDER_TYPE_STORAGE_KEY);
    }
  }
};
function removeKeysWithUndefinedValues(obj) {
  return Object.fromEntries(Object.entries(obj).filter((entry) => typeof entry[1] !== "undefined"));
}
function generateRandomString(length, alphabet) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return result;
}
function encodeQueryString(params, prefixed = true) {
  const cleanedParams = removeKeysWithUndefinedValues(params);
  const prefix = prefixed && Object.keys(cleanedParams).length > 0 ? "?" : "";
  return prefix + Object.entries(cleanedParams).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&");
}
function decodeQueryString(str) {
  const cleanStr = str[0] === "?" ? str.substr(1) : str;
  return Object.fromEntries(cleanStr.split("&").filter((s) => s.length > 0).map((kvp) => kvp.split("=")).map(([k, v]) => [k, decodeURIComponent(v)]));
}
var RESERVED_NAMES = [
  "inspect",
  "callFunction",
  "callFunctionStreaming",
  // Methods defined on the Object.prototype might be "typeof probed" and called by libraries and runtime environments.
  ...Object.getOwnPropertyNames(Object.prototype)
];
function cleanArgs(args) {
  for (const arg of args) {
    if (typeof arg === "object" && arg) {
      for (const [key, value] of Object.entries(arg)) {
        if (value === void 0) {
          delete arg[key];
        }
      }
    }
  }
  return args;
}
function cleanArgsAndSerialize(args) {
  const cleaned = cleanArgs(args);
  return cleaned.map((arg) => typeof arg === "object" ? serialize(arg) : arg);
}
var FunctionsFactory = class {
  /**
   * @param fetcher The underlying fetcher to use when sending requests.
   * @param config Additional configuration parameters.
   */
  constructor(fetcher, config = {}) {
    this.fetcher = fetcher;
    this.serviceName = config.serviceName;
    this.argsTransformation = config.argsTransformation || cleanArgsAndSerialize;
  }
  /**
   * Create a factory of functions, wrapped in a Proxy that returns bound copies of `callFunction` on any property.
   *
   * @param fetcher The underlying fetcher to use when requesting.
   * @param config Additional configuration parameters.
   * @returns The newly created factory of functions.
   */
  static create(fetcher, config = {}) {
    const factory = new FunctionsFactory(fetcher, config);
    return new Proxy(factory, {
      get(target, p, receiver) {
        if (typeof p === "string" && RESERVED_NAMES.indexOf(p) === -1) {
          return target.callFunction.bind(target, p);
        } else {
          const prop = Reflect.get(target, p, receiver);
          return typeof prop === "function" ? prop.bind(target) : prop;
        }
      }
    });
  }
  /**
   * Call a remote function by it's name.
   *
   * @param name Name of the remote function.
   * @param args Arguments to pass to the remote function.
   * @returns A promise of the value returned when executing the remote function.
   */
  async callFunction(name, ...args) {
    const body = {
      name,
      arguments: this.argsTransformation ? this.argsTransformation(args) : args
    };
    if (this.serviceName) {
      body.service = this.serviceName;
    }
    const appRoute = this.fetcher.appRoute;
    return this.fetcher.fetchJSON({
      method: "POST",
      path: appRoute.functionsCall().path,
      body
    });
  }
  /**
   * Call a remote function by it's name.
   *
   * @param name Name of the remote function.
   * @param args Arguments to pass to the remote function.
   * @returns A promise of the value returned when executing the remote function.
   */
  callFunctionStreaming(name, ...args) {
    const body = {
      name,
      arguments: this.argsTransformation ? this.argsTransformation(args) : args
    };
    if (this.serviceName) {
      body.service = this.serviceName;
    }
    const appRoute = this.fetcher.appRoute;
    const qs = encodeQueryString({
      ["baas_request"]: gBase64.encode(JSON.stringify(body))
    });
    return this.fetcher.fetchStream({
      method: "GET",
      path: appRoute.functionsCall().path + qs
    });
  }
};
var EmailPasswordAuth = class {
  /**
   * Construct an interface to the email / password authentication provider.
   *
   * @param fetcher The underlying fetcher used to request the services.
   * @param providerName Optional custom name of the authentication provider.
   */
  constructor(fetcher, providerName = "local-userpass") {
    this.fetcher = fetcher;
    this.providerName = providerName;
  }
  /** @inheritdoc */
  async registerUser(details) {
    const appRoute = this.fetcher.appRoute;
    await this.fetcher.fetchJSON({
      method: "POST",
      path: appRoute.emailPasswordAuth(this.providerName).register().path,
      body: details
    });
  }
  /** @inheritdoc */
  async confirmUser(details) {
    const appRoute = this.fetcher.appRoute;
    await this.fetcher.fetchJSON({
      method: "POST",
      path: appRoute.emailPasswordAuth(this.providerName).confirm().path,
      body: details
    });
  }
  /** @inheritdoc */
  async resendConfirmationEmail(details) {
    const appRoute = this.fetcher.appRoute;
    await this.fetcher.fetchJSON({
      method: "POST",
      path: appRoute.emailPasswordAuth(this.providerName).confirmSend().path,
      body: details
    });
  }
  /** @inheritdoc */
  async retryCustomConfirmation(details) {
    const appRoute = this.fetcher.appRoute;
    await this.fetcher.fetchJSON({
      method: "POST",
      path: appRoute.emailPasswordAuth(this.providerName).confirmCall().path,
      body: details
    });
  }
  /** @inheritdoc */
  async resetPassword(details) {
    const appRoute = this.fetcher.appRoute;
    await this.fetcher.fetchJSON({
      method: "POST",
      path: appRoute.emailPasswordAuth(this.providerName).reset().path,
      body: details
    });
  }
  /** @inheritdoc */
  async sendResetPasswordEmail(details) {
    const appRoute = this.fetcher.appRoute;
    await this.fetcher.fetchJSON({
      method: "POST",
      path: appRoute.emailPasswordAuth(this.providerName).resetSend().path,
      body: details
    });
  }
  /** @inheritdoc */
  async callResetPasswordFunction(details, ...args) {
    const appRoute = this.fetcher.appRoute;
    await this.fetcher.fetchJSON({
      method: "POST",
      path: appRoute.emailPasswordAuth(this.providerName).resetCall().path,
      body: { ...details, arguments: args }
    });
  }
};
function api() {
  return {
    path: "/api/client/v2.0",
    /**
     * @param appId The id of the app.
     * @returns The URL of the app endpoint.
     */
    app(appId) {
      return {
        path: this.path + `/app/${appId}`,
        /**
         * @returns The URL of the app location endpoint.
         */
        location() {
          return {
            path: this.path + "/location"
          };
        },
        /**
         * @param providerName The name of the provider.
         * @returns The app url concatinated with the /auth/providers/{providerName}
         */
        authProvider(providerName) {
          return {
            path: this.path + `/auth/providers/${providerName}`,
            /**
             * @returns Get the URL of an authentication provider.
             */
            login() {
              return { path: this.path + "/login" };
            }
          };
        },
        /**
         * @param providerName The name of the provider.
         * @returns The app url concatinated with the /auth/providers/{providerName}
         */
        emailPasswordAuth(providerName) {
          const authProviderRoutes = this.authProvider(providerName);
          return {
            ...authProviderRoutes,
            register() {
              return { path: this.path + "/register" };
            },
            confirm() {
              return { path: this.path + "/confirm" };
            },
            confirmSend() {
              return { path: this.path + "/confirm/send" };
            },
            confirmCall() {
              return { path: this.path + "/confirm/call" };
            },
            reset() {
              return { path: this.path + "/reset" };
            },
            resetSend() {
              return { path: this.path + "/reset/send" };
            },
            resetCall() {
              return { path: this.path + "/reset/call" };
            }
          };
        },
        functionsCall() {
          return {
            path: this.path + "/functions/call"
          };
        }
      };
    },
    auth() {
      return {
        path: this.path + "/auth",
        apiKeys() {
          return {
            path: this.path + "/api_keys",
            key(id) {
              return {
                path: this.path + `/${id}`,
                enable() {
                  return { path: this.path + "/enable" };
                },
                disable() {
                  return { path: this.path + "/disable" };
                }
              };
            }
          };
        },
        profile() {
          return { path: this.path + "/profile" };
        },
        session() {
          return { path: this.path + "/session" };
        },
        delete() {
          return { path: this.path + "/delete" };
        }
      };
    }
  };
}
var routes = { api };
var ApiKeyAuth = class {
  /**
   * Construct an interface to the API-key authentication provider.
   *
   * @param fetcher The fetcher used to send requests to services.
   */
  constructor(fetcher) {
    this.fetcher = fetcher;
  }
  /** @inheritdoc */
  create(name) {
    return this.fetcher.fetchJSON({
      method: "POST",
      body: { name },
      path: routes.api().auth().apiKeys().path,
      tokenType: "refresh"
    });
  }
  /** @inheritdoc */
  fetch(keyId) {
    return this.fetcher.fetchJSON({
      method: "GET",
      path: routes.api().auth().apiKeys().key(keyId).path,
      tokenType: "refresh"
    });
  }
  /** @inheritdoc */
  fetchAll() {
    return this.fetcher.fetchJSON({
      method: "GET",
      tokenType: "refresh",
      path: routes.api().auth().apiKeys().path
    });
  }
  /** @inheritdoc */
  async delete(keyId) {
    await this.fetcher.fetchJSON({
      method: "DELETE",
      path: routes.api().auth().apiKeys().key(keyId).path,
      tokenType: "refresh"
    });
  }
  /** @inheritdoc */
  async enable(keyId) {
    await this.fetcher.fetchJSON({
      method: "PUT",
      path: routes.api().auth().apiKeys().key(keyId).enable().path,
      tokenType: "refresh"
    });
  }
  /** @inheritdoc */
  async disable(keyId) {
    await this.fetcher.fetchJSON({
      method: "PUT",
      path: routes.api().auth().apiKeys().key(keyId).disable().path,
      tokenType: "refresh"
    });
  }
};
var environment = null;
function setEnvironment(e) {
  environment = e;
}
function getEnvironment() {
  if (environment) {
    return environment;
  } else {
    throw new Error("Cannot get environment before it's set");
  }
}
var WatchError = class extends Error {
  constructor({ message, code: code2 }) {
    super(message);
    this.name = "WatchError";
    this.code = code2;
  }
};
var WatchStreamState;
(function(WatchStreamState2) {
  WatchStreamState2["NEED_DATA"] = "NEED_DATA";
  WatchStreamState2["HAVE_EVENT"] = "HAVE_EVENT";
  WatchStreamState2["HAVE_ERROR"] = "HAVE_ERROR";
})(WatchStreamState || (WatchStreamState = {}));
var WatchStream = class {
  constructor() {
    this._state = WatchStreamState.NEED_DATA;
    this._error = null;
    this._textDecoder = new (getEnvironment()).TextDecoder();
    this._buffer = "";
    this._bufferOffset = 0;
    this._eventType = "";
    this._dataBuffer = "";
  }
  // Call these when you have data, in whatever shape is easiest for your SDK to get.
  // Pick one, mixing and matching on a single instance isn't supported.
  // These can only be called in NEED_DATA state, which is the initial state.
  feedBuffer(buffer2) {
    this.assertState(WatchStreamState.NEED_DATA);
    this._buffer += this._textDecoder.decode(buffer2, { stream: true });
    this.advanceBufferState();
  }
  feedLine(line) {
    this.assertState(WatchStreamState.NEED_DATA);
    if (line.endsWith("\n"))
      line = line.substr(0, line.length - 1);
    if (line.endsWith("\r"))
      line = line.substr(0, line.length - 1);
    if (line.length === 0) {
      if (this._dataBuffer.length === 0) {
        this._eventType = "";
        return;
      }
      if (this._dataBuffer.endsWith("\n"))
        this._dataBuffer = this._dataBuffer.substr(0, this._dataBuffer.length - 1);
      this.feedSse({
        data: this._dataBuffer,
        eventType: this._eventType
      });
      this._dataBuffer = "";
      this._eventType = "";
    }
    if (line[0] === ":")
      return;
    const colon = line.indexOf(":");
    const field = line.substr(0, colon);
    let value = colon === -1 ? "" : line.substr(colon + 1);
    if (value.startsWith(" "))
      value = value.substr(1);
    if (field === "event") {
      this._eventType = value;
    } else if (field === "data") {
      this._dataBuffer += value;
      this._dataBuffer += "\n";
    } else
      ;
  }
  feedSse(sse) {
    this.assertState(WatchStreamState.NEED_DATA);
    const firstPercentIndex = sse.data.indexOf("%");
    if (firstPercentIndex !== -1) {
      let buffer2 = "";
      let start = 0;
      for (let percentIndex = firstPercentIndex; percentIndex !== -1; percentIndex = sse.data.indexOf("%", start)) {
        buffer2 += sse.data.substr(start, percentIndex - start);
        const encoded = sse.data.substr(percentIndex, 3);
        if (encoded === "%25") {
          buffer2 += "%";
        } else if (encoded === "%0A") {
          buffer2 += "\n";
        } else if (encoded === "%0D") {
          buffer2 += "\r";
        } else {
          buffer2 += encoded;
        }
        start = percentIndex + encoded.length;
      }
      buffer2 += sse.data.substr(start);
      sse.data = buffer2;
    }
    if (!sse.eventType || sse.eventType === "message") {
      try {
        const parsed = EJSON.parse(sse.data);
        if (typeof parsed === "object") {
          this._nextEvent = parsed;
          this._state = WatchStreamState.HAVE_EVENT;
          return;
        }
      } catch {
      }
      this._state = WatchStreamState.HAVE_ERROR;
      this._error = new WatchError({
        message: "server returned malformed event: " + sse.data,
        code: "bad bson parse"
      });
    } else if (sse.eventType === "error") {
      this._state = WatchStreamState.HAVE_ERROR;
      this._error = new WatchError({
        message: sse.data,
        code: "unknown"
      });
      try {
        const { error_code: errorCode, error } = EJSON.parse(sse.data);
        if (typeof errorCode !== "string")
          return;
        if (typeof error !== "string")
          return;
        this._error = new WatchError({
          message: error,
          code: errorCode
        });
      } catch {
        return;
      }
    } else
      ;
  }
  get state() {
    return this._state;
  }
  // Consumes the returned event. If you used feedBuffer(), there may be another event or error after this one,
  // so you need to call state() again to see what to do next.
  nextEvent() {
    this.assertState(WatchStreamState.HAVE_EVENT);
    const out = this._nextEvent;
    this._state = WatchStreamState.NEED_DATA;
    this.advanceBufferState();
    return out;
  }
  // Once this enters the error state, it stays that way. You should not feed any more data.
  get error() {
    return this._error;
  }
  ////////////////////////////////////////////
  advanceBufferState() {
    this.assertState(WatchStreamState.NEED_DATA);
    while (this.state === WatchStreamState.NEED_DATA) {
      if (this._bufferOffset === this._buffer.length) {
        this._buffer = "";
        this._bufferOffset = 0;
        return;
      }
      const nextNewlineIndex = this._buffer.indexOf("\n", this._bufferOffset);
      if (nextNewlineIndex === -1) {
        if (this._bufferOffset !== 0) {
          this._buffer = this._buffer.substr(this._bufferOffset, this._buffer.length - this._bufferOffset);
          this._bufferOffset = 0;
        }
        return;
      }
      this.feedLine(this._buffer.substr(this._bufferOffset, nextNewlineIndex - this._bufferOffset));
      this._bufferOffset = nextNewlineIndex + 1;
    }
  }
  assertState(state) {
    if (this._state !== state) {
      throw Error(`Expected WatchStream to be in state ${state}, but in state ${this._state}`);
    }
  }
};
var MongoDBCollection = class {
  /**
   * Construct a remote collection of documents.
   *
   * @param fetcher The fetcher to use when requesting the service.
   * @param serviceName The name of the remote service.
   * @param databaseName The name of the database.
   * @param collectionName The name of the remote collection.
   */
  constructor(fetcher, serviceName, databaseName, collectionName) {
    this.functions = FunctionsFactory.create(fetcher, {
      serviceName
    });
    this.databaseName = databaseName;
    this.collectionName = collectionName;
    this.serviceName = serviceName;
    this.fetcher = fetcher;
  }
  /** @inheritdoc */
  find(filter = {}, options = {}) {
    return this.functions.find({
      database: this.databaseName,
      collection: this.collectionName,
      query: filter,
      project: options.projection,
      sort: options.sort,
      limit: options.limit
    });
  }
  /** @inheritdoc */
  findOne(filter = {}, options = {}) {
    return this.functions.findOne({
      database: this.databaseName,
      collection: this.collectionName,
      query: filter,
      project: options.projection,
      sort: options.sort
    });
  }
  /** @inheritdoc */
  findOneAndUpdate(filter = {}, update, options = {}) {
    return this.functions.findOneAndUpdate({
      database: this.databaseName,
      collection: this.collectionName,
      filter,
      update,
      sort: options.sort,
      projection: options.projection,
      upsert: options.upsert,
      returnNewDocument: options.returnNewDocument
    });
  }
  /** @inheritdoc */
  findOneAndReplace(filter = {}, replacement, options = {}) {
    return this.functions.findOneAndReplace({
      database: this.databaseName,
      collection: this.collectionName,
      filter,
      update: replacement,
      sort: options.sort,
      projection: options.projection,
      upsert: options.upsert,
      returnNewDocument: options.returnNewDocument
    });
  }
  /** @inheritdoc */
  findOneAndDelete(filter = {}, options = {}) {
    return this.functions.findOneAndReplace({
      database: this.databaseName,
      collection: this.collectionName,
      filter,
      sort: options.sort,
      projection: options.projection
    });
  }
  /** @inheritdoc */
  aggregate(pipeline) {
    return this.functions.aggregate({
      database: this.databaseName,
      collection: this.collectionName,
      pipeline
    });
  }
  /** @inheritdoc */
  count(filter = {}, options = {}) {
    return this.functions.count({
      database: this.databaseName,
      collection: this.collectionName,
      query: filter,
      limit: options.limit
    });
  }
  /** @inheritdoc */
  insertOne(document2) {
    return this.functions.insertOne({
      database: this.databaseName,
      collection: this.collectionName,
      document: document2
    });
  }
  /** @inheritdoc */
  insertMany(documents) {
    return this.functions.insertMany({
      database: this.databaseName,
      collection: this.collectionName,
      documents
    });
  }
  /** @inheritdoc */
  deleteOne(filter = {}) {
    return this.functions.deleteOne({
      database: this.databaseName,
      collection: this.collectionName,
      query: filter
    });
  }
  /** @inheritdoc */
  deleteMany(filter = {}) {
    return this.functions.deleteMany({
      database: this.databaseName,
      collection: this.collectionName,
      query: filter
    });
  }
  /** @inheritdoc */
  updateOne(filter, update, options = {}) {
    return this.functions.updateOne({
      database: this.databaseName,
      collection: this.collectionName,
      query: filter,
      update,
      upsert: options.upsert,
      arrayFilters: options.arrayFilters
    });
  }
  /** @inheritdoc */
  updateMany(filter, update, options = {}) {
    return this.functions.updateMany({
      database: this.databaseName,
      collection: this.collectionName,
      query: filter,
      update,
      upsert: options.upsert,
      arrayFilters: options.arrayFilters
    });
  }
  watch({ ids, filter } = {}) {
    const iterable = this.functions.callFunctionStreaming("watch", {
      database: this.databaseName,
      collection: this.collectionName,
      ids,
      filter
    });
    const iterator = iterable.then((i) => i[Symbol.asyncIterator]());
    const stream = this.watchImpl(iterator);
    const originalReturn = stream.return;
    return Object.assign(stream, {
      return(value) {
        iterator.then((i) => i.return ? i.return(value) : void 0);
        return originalReturn.call(stream, value);
      }
    });
  }
  /**
   * @param iterator An async iterator of the response body of a watch request.
   * @yields Change events.
   * Note: We had to split this from the `watch` method above to enable manually calling `return` on the response body iterator.
   */
  async *watchImpl(iterator) {
    const watchStream = new WatchStream();
    const iterable = iterator.then((i) => ({ [Symbol.asyncIterator]: () => i }));
    for await (const chunk of await iterable) {
      if (!chunk)
        continue;
      watchStream.feedBuffer(chunk);
      while (watchStream.state == WatchStreamState.HAVE_EVENT) {
        yield watchStream.nextEvent();
      }
      if (watchStream.state == WatchStreamState.HAVE_ERROR)
        throw watchStream.error;
    }
  }
};
function createCollection(fetcher, serviceName, databaseName, collectionName) {
  return new MongoDBCollection(fetcher, serviceName, databaseName, collectionName);
}
function createDatabase(fetcher, serviceName, databaseName) {
  return {
    collection: createCollection.bind(null, fetcher, serviceName, databaseName)
  };
}
function createService(fetcher, serviceName = "mongo-db") {
  return { db: createDatabase.bind(null, fetcher, serviceName) };
}
var DEFAULT_DEVICE_ID = "000000000000000000000000";
var UserState;
(function(UserState2) {
  UserState2["Active"] = "active";
  UserState2["LoggedOut"] = "logged-out";
  UserState2["Removed"] = "removed";
})(UserState || (UserState = {}));
var UserType$1;
(function(UserType2) {
  UserType2["Normal"] = "normal";
  UserType2["Server"] = "server";
})(UserType$1 || (UserType$1 = {}));
var User = class {
  /**
   * @param parameters Parameters of the user.
   */
  constructor(parameters) {
    this.app = parameters.app;
    this.id = parameters.id;
    this.storage = new UserStorage(this.app.storage, this.id);
    if ("accessToken" in parameters && "refreshToken" in parameters && "providerType" in parameters) {
      this._accessToken = parameters.accessToken;
      this._refreshToken = parameters.refreshToken;
      this.providerType = parameters.providerType;
      this.storage.accessToken = parameters.accessToken;
      this.storage.refreshToken = parameters.refreshToken;
      this.storage.providerType = parameters.providerType;
    } else {
      this._accessToken = this.storage.accessToken;
      this._refreshToken = this.storage.refreshToken;
      const providerType = this.storage.providerType;
      this._profile = this.storage.profile;
      if (providerType) {
        this.providerType = providerType;
      } else {
        throw new Error("Storage is missing a provider type");
      }
    }
    this.fetcher = this.app.fetcher.clone({
      userContext: { currentUser: this }
    });
    this.apiKeys = new ApiKeyAuth(this.fetcher);
    this.functions = FunctionsFactory.create(this.fetcher);
  }
  /**
   * @returns The access token used to authenticate the user towards Atlas App Services.
   */
  get accessToken() {
    return this._accessToken;
  }
  /**
   * @param token The new access token.
   */
  set accessToken(token) {
    this._accessToken = token;
    this.storage.accessToken = token;
  }
  /**
   * @returns The refresh token used to issue new access tokens.
   */
  get refreshToken() {
    return this._refreshToken;
  }
  /**
   * @param token The new refresh token.
   */
  set refreshToken(token) {
    this._refreshToken = token;
    this.storage.refreshToken = token;
  }
  /**
   * @returns The current state of the user.
   */
  get state() {
    if (this.id in this.app.allUsers) {
      return this.refreshToken === null ? UserState.LoggedOut : UserState.Active;
    } else {
      return UserState.Removed;
    }
  }
  /**
   * @returns The logged in state of the user.
   */
  get isLoggedIn() {
    return this.state === UserState.Active;
  }
  get customData() {
    if (this.accessToken) {
      const decodedToken = this.decodeAccessToken();
      return decodedToken.userData;
    } else {
      throw new Error("Cannot read custom data without an access token");
    }
  }
  /**
   * @returns Profile containing detailed information about the user.
   */
  get profile() {
    if (this._profile) {
      return this._profile.data;
    } else {
      throw new Error("A profile was never fetched for this user");
    }
  }
  get identities() {
    if (this._profile) {
      return this._profile.identities;
    } else {
      throw new Error("A profile was never fetched for this user");
    }
  }
  get deviceId() {
    if (this.accessToken) {
      const payload = this.accessToken.split(".")[1];
      if (payload) {
        const parsedPayload = JSON.parse(gBase64.decode(payload));
        const deviceId = parsedPayload["baas_device_id"];
        if (typeof deviceId === "string" && deviceId !== DEFAULT_DEVICE_ID) {
          return deviceId;
        }
      }
    }
    return null;
  }
  /**
   * Refresh the users profile data.
   */
  async refreshProfile() {
    const response = await this.fetcher.fetchJSON({
      method: "GET",
      path: routes.api().auth().profile().path
    });
    this._profile = new UserProfile(response);
    this.storage.profile = this._profile;
  }
  /**
   * Log out the user, invalidating the session (and its refresh token).
   */
  async logOut() {
    try {
      if (this._refreshToken !== null) {
        await this.fetcher.fetchJSON({
          method: "DELETE",
          path: routes.api().auth().session().path,
          tokenType: "refresh"
        });
      }
    } catch (err) {
      if (!(err instanceof Error) || !err.message.includes("failed to find refresh token")) {
        throw err;
      }
    } finally {
      this.accessToken = null;
      this.refreshToken = null;
    }
  }
  /** @inheritdoc */
  async linkCredentials(credentials) {
    const response = await this.app.authenticator.authenticate(credentials, this);
    if (this.id !== response.userId) {
      const details = `got user id ${response.userId} expected ${this.id}`;
      throw new Error(`Link response ment for another user (${details})`);
    }
    this.accessToken = response.accessToken;
    await this.refreshProfile();
  }
  /**
   * Request a new access token, using the refresh token.
   */
  async refreshAccessToken() {
    const response = await this.fetcher.fetchJSON({
      method: "POST",
      path: routes.api().auth().session().path,
      tokenType: "refresh"
    });
    const { access_token: accessToken } = response;
    if (typeof accessToken === "string") {
      this.accessToken = accessToken;
    } else {
      throw new Error("Expected an 'access_token' in the response");
    }
  }
  /** @inheritdoc */
  async refreshCustomData() {
    await this.refreshAccessToken();
    return this.customData;
  }
  /**
   * @inheritdoc
   */
  addListener() {
    throw new Error("Not yet implemented");
  }
  /**
   * @inheritdoc
   */
  removeListener() {
    throw new Error("Not yet implemented");
  }
  /**
   * @inheritdoc
   */
  removeAllListeners() {
    throw new Error("Not yet implemented");
  }
  /** @inheritdoc */
  callFunction(name, ...args) {
    return this.functions.callFunction(name, ...args);
  }
  /**
   * @returns A plain ol' JavaScript object representation of the user.
   */
  toJSON() {
    return {
      id: this.id,
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      profile: this._profile,
      state: this.state,
      customData: this.customData
    };
  }
  /** @inheritdoc */
  push() {
    throw new Error("Not yet implemented");
  }
  /** @inheritdoc */
  mongoClient(serviceName) {
    return createService(this.fetcher, serviceName);
  }
  decodeAccessToken() {
    if (this.accessToken) {
      const parts = this.accessToken.split(".");
      if (parts.length !== 3) {
        throw new Error("Expected an access token with three parts");
      }
      const encodedPayload = parts[1];
      const decodedPayload = gBase64.decode(encodedPayload);
      const parsedPayload = JSON.parse(decodedPayload);
      const { exp: expires, iat: issuedAt, sub: subject, user_data: userData = {} } = parsedPayload;
      if (typeof expires !== "number") {
        throw new Error("Failed to decode access token 'exp'");
      } else if (typeof issuedAt !== "number") {
        throw new Error("Failed to decode access token 'iat'");
      }
      return { expires, issuedAt, subject, userData };
    } else {
      throw new Error("Missing an access token");
    }
  }
};
var Credentials = class {
  /**
   * Constructs an instance of credentials.
   *
   * @param providerName The name of the authentication provider used when authenticating.
   * @param providerType The type of the authentication provider used when authenticating.
   * @param payload The data being sent to the service when authenticating.
   */
  constructor(providerName, providerType, payload) {
    this.providerName = providerName;
    this.providerType = providerType;
    this.payload = payload;
  }
  /**
   * Creates credentials that logs in using the [Anonymous Provider](https://docs.mongodb.com/realm/authentication/anonymous/).
   *
   * @returns The credentials instance, which can be passed to `app.logIn`.
   */
  static anonymous() {
    return new Credentials("anon-user", "anon-user", {});
  }
  /**
   * Creates credentials that logs in using the [API Key Provider](https://docs.mongodb.com/realm/authentication/api-key/).
   *
   * @param key The secret content of the API key.
   * @returns The credentials instance, which can be passed to `app.logIn`.
   */
  static apiKey(key) {
    return new Credentials("api-key", "api-key", { key });
  }
  /**
   * Creates credentials that logs in using the [Email/Password Provider](https://docs.mongodb.com/realm/authentication/email-password/).
   * Note: This was formerly known as the "Username/Password" provider.
   *
   * @param email The end-users email address.
   * @param password The end-users password.
   * @returns The credentials instance, which can be passed to `app.logIn`.
   */
  static emailPassword(email, password) {
    return new Credentials("local-userpass", "local-userpass", {
      username: email,
      password
    });
  }
  /**
   * Creates credentials that logs in using the [Custom Function Provider](https://docs.mongodb.com/realm/authentication/custom-function/).
   *
   * @param payload The custom payload as expected by the server.
   * @returns The credentials instance, which can be passed to `app.logIn`.
   */
  static function(payload) {
    return new Credentials("custom-function", "custom-function", payload);
  }
  /**
   * Creates credentials that logs in using the [Custom JWT Provider](https://docs.mongodb.com/realm/authentication/custom-jwt/).
   *
   * @param token The JSON Web Token (JWT).
   * @returns The credentials instance, which can be passed to `app.logIn`.
   */
  static jwt(token) {
    return new Credentials("custom-token", "custom-token", {
      token
    });
  }
  /**
   * Creates credentials that logs in using the [Google Provider](https://docs.mongodb.com/realm/authentication/google/).
   *
   * @param payload The URL that users should be redirected to, the auth code or id token from Google.
   * @returns The credentials instance, which can be passed to `app.logIn`.
   */
  static google(payload) {
    return new Credentials("oauth2-google", "oauth2-google", Credentials.derivePayload(payload));
  }
  /**
   * @param payload The payload string.
   * @returns A payload object based on the string.
   */
  static derivePayload(payload) {
    if (typeof payload === "string") {
      throw new Error("`google(<tokenString>)` has been deprecated.  Please use `google(<authCodeObject>).");
    } else if (Object.keys(payload).length === 1) {
      if ("authCode" in payload || "redirectUrl" in payload) {
        return payload;
      } else if ("idToken" in payload) {
        return { id_token: payload.idToken };
      } else {
        throw new Error("Unexpected payload: " + JSON.stringify(payload));
      }
    } else {
      throw new Error("Expected only one property in payload, got " + JSON.stringify(payload));
    }
  }
  /**
   * Creates credentials that logs in using the [Facebook Provider](https://docs.mongodb.com/realm/authentication/facebook/).
   *
   * @param redirectUrlOrAccessToken The URL that users should be redirected to or the auth code returned from Facebook.
   * @returns The credentials instance, which can be passed to `app.logIn`.
   */
  static facebook(redirectUrlOrAccessToken) {
    return new Credentials("oauth2-facebook", "oauth2-facebook", redirectUrlOrAccessToken.includes("://") ? { redirectUrl: redirectUrlOrAccessToken } : { accessToken: redirectUrlOrAccessToken });
  }
  /**
   * Creates credentials that logs in using the [Apple ID Provider](https://docs.mongodb.com/realm/authentication/apple/).
   *
   * @param redirectUrlOrIdToken The URL that users should be redirected to or the id_token returned from Apple.
   * @returns The credentials instance, which can be passed to `app.logIn`.
   */
  static apple(redirectUrlOrIdToken) {
    return new Credentials("oauth2-apple", "oauth2-apple", redirectUrlOrIdToken.includes("://") ? { redirectUrl: redirectUrlOrIdToken } : { id_token: redirectUrlOrIdToken });
  }
};
var USER_IDS_STORAGE_KEY = "userIds";
var DEVICE_ID_STORAGE_KEY = "deviceId";
var AppStorage = class extends PrefixedStorage {
  /**
   * @param storage The underlying storage to wrap.
   * @param appId The id of the app.
   */
  constructor(storage, appId) {
    super(storage, `app(${appId})`);
  }
  /**
   * Reads out the list of user ids from storage.
   *
   * @returns A list of user ids.
   */
  getUserIds() {
    const userIdsString = this.get(USER_IDS_STORAGE_KEY);
    const userIds = userIdsString ? JSON.parse(userIdsString) : [];
    if (Array.isArray(userIds)) {
      return [...new Set(userIds)];
    } else {
      throw new Error("Expected the user ids to be an array");
    }
  }
  /**
   * Sets the list of ids in storage.
   * Optionally merging with existing ids stored in the storage, by prepending these while voiding duplicates.
   *
   * @param userIds The list of ids to store.
   * @param mergeWithExisting Prepend existing ids to avoid data-races with other apps using this storage.
   */
  setUserIds(userIds, mergeWithExisting) {
    if (mergeWithExisting) {
      const existingIds = this.getUserIds();
      for (const id of existingIds) {
        if (userIds.indexOf(id) === -1) {
          userIds.push(id);
        }
      }
    }
    this.set(USER_IDS_STORAGE_KEY, JSON.stringify(userIds));
  }
  /**
   * Remove an id from the list of ids.
   *
   * @param userId The id of a User to be removed.
   */
  removeUserId(userId) {
    const existingIds = this.getUserIds();
    const userIds = existingIds.filter((id) => id !== userId);
    this.setUserIds(userIds, false);
  }
  /**
   * @returns id of this device (if any exists)
   */
  getDeviceId() {
    return this.get(DEVICE_ID_STORAGE_KEY);
  }
  /**
   * @param deviceId The id of this device, to send on subsequent authentication requests.
   */
  setDeviceId(deviceId) {
    this.set(DEVICE_ID_STORAGE_KEY, deviceId);
  }
};
var LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
var CLOSE_CHECK_INTERVAL = 100;
var REDIRECT_HASH_TO_RESULT = {
  _stitch_client_app_id: "appId",
  _baas_client_app_id: "appId",
  _stitch_ua: "userAuth",
  _baas_ua: "userAuth",
  _stitch_link: "link",
  _baas_link: "link",
  _stitch_error: "error",
  _baas_error: "error",
  _stitch_state: "state",
  _baas_state: "state"
};
var OAuth2Helper = class {
  /**
   * @param storage The underlying storage to use when storing and retriving secrets.
   * @param openWindow An optional function called when a browser window needs to open.
   */
  constructor(storage, openWindow2 = getEnvironment().openWindow) {
    this.storage = storage.prefix("oauth2");
    this.openWindow = openWindow2;
  }
  /**
   * Parses the query string from the final step of the OAuth flow.
   *
   * @param queryString The query string passed through in location.hash.
   * @returns The result of the OAuth flow.
   */
  static parseRedirectLocation(queryString) {
    const params = decodeQueryString(queryString);
    const result = {};
    for (const [p, r] of Object.entries(REDIRECT_HASH_TO_RESULT)) {
      const value = params[p];
      if (value) {
        result[r] = value;
      }
    }
    return result;
  }
  /**
   * Handle the redirect querystring by parsing it and storing it for others to consume.
   *
   * @param queryString The query string containing the encoded result from the OAuth provider.
   * @param storage The underlying storage used to persist the result.
   */
  static handleRedirect(queryString, storage = getEnvironment().defaultStorage) {
    const result = OAuth2Helper.parseRedirectLocation(queryString);
    const { state, error } = result;
    if (typeof state === "string") {
      const oauth2Storage = storage.prefix("oauth2");
      const stateStorage = OAuth2Helper.getStateStorage(oauth2Storage, state);
      stateStorage.set("result", JSON.stringify(result));
    } else if (error) {
      throw new Error(`Failed to handle OAuth 2.0 redirect: ${error}`);
    } else {
      throw new Error("Failed to handle OAuth 2.0 redirect.");
    }
  }
  /**
   * Decodes the authInfo string into its seperate parts.
   *
   * @param authInfo An authInfo string returned from the server.
   * @returns An object containing the separate parts of the authInfo string.
   */
  static decodeAuthInfo(authInfo) {
    const parts = (authInfo || "").split("$");
    if (parts.length === 4) {
      const [accessToken, refreshToken, userId, deviceId] = parts;
      return { accessToken, refreshToken, userId, deviceId };
    } else {
      throw new Error("Failed to decode 'authInfo' into ids and tokens");
    }
  }
  /**
   * Get the storage key associated of an secret associated with a state.
   *
   * @param storage The root storage used to derive a "state namespaced" storage.
   * @param state The random state.
   * @returns The storage associated with a particular state.
   */
  static getStateStorage(storage, state) {
    return storage.prefix(`state(${state})`);
  }
  /**
   * Open a window and wait for the redirect to be handled.
   *
   * @param url The URL to open.
   * @param state The state which will be used to listen for storage updates.
   * @returns The result passed through the redirect.
   */
  openWindowAndWaitForRedirect(url, state) {
    const stateStorage = OAuth2Helper.getStateStorage(this.storage, state);
    return new Promise((resolve, reject) => {
      let redirectWindow = null;
      let windowClosedInterval;
      const handleStorageUpdate = () => {
        const result = stateStorage.get("result");
        if (result) {
          const parsedResult = JSON.parse(result);
          stateStorage.removeListener(handleStorageUpdate);
          stateStorage.clear();
          try {
            if (redirectWindow) {
              clearInterval(windowClosedInterval);
              redirectWindow.close();
            }
          } catch (err) {
            console.warn(`Failed closing redirect window: ${err}`);
          } finally {
            resolve(parsedResult);
          }
        }
      };
      stateStorage.addListener(handleStorageUpdate);
      redirectWindow = this.openWindow(url);
      windowClosedInterval = setInterval(() => {
        if (!redirectWindow) {
          clearInterval(windowClosedInterval);
        } else if (redirectWindow.closed) {
          clearInterval(windowClosedInterval);
          stateStorage.removeListener(handleStorageUpdate);
          const err = new Error("Window closed");
          reject(err);
        }
      }, CLOSE_CHECK_INTERVAL);
    });
  }
  /**
   * Generate a random state string.
   *
   * @returns The random state string.
   */
  generateState() {
    return generateRandomString(12, LOWERCASE_LETTERS);
  }
};
var REDIRECT_LOCATION_HEADER = "x-baas-location";
var Authenticator = class {
  /**
   * @param fetcher The fetcher used to fetch responses from the server.
   * @param storage The storage used when completing OAuth 2.0 flows (should not be scoped to a specific app).
   * @param getDeviceInformation Called to get device information to be sent to the server.
   */
  constructor(fetcher, storage, getDeviceInformation) {
    this.fetcher = fetcher;
    this.oauth2 = new OAuth2Helper(storage);
    this.getDeviceInformation = getDeviceInformation;
  }
  /**
   * @param credentials Credentials to use when logging in.
   * @param linkingUser A user requesting to link.
   * @returns A promise resolving to the response from the server.
   */
  async authenticate(credentials, linkingUser) {
    const deviceInformation = this.getDeviceInformation();
    const isLinking = typeof linkingUser === "object";
    if (credentials.providerType.startsWith("oauth2") && typeof credentials.payload.redirectUrl === "string") {
      const state = this.oauth2.generateState();
      const url = await this.getLogInUrl(credentials, isLinking, {
        state,
        redirect: credentials.payload.redirectUrl,
        // Ensure redirects are communicated in a header different from "Location" and status remains 200 OK
        providerRedirectHeader: isLinking ? true : void 0,
        // Add the device information, only if we're not linking - since that request won't have a body of its own.
        device: !isLinking ? deviceInformation.encode() : void 0
      });
      if (isLinking) {
        const response = await this.fetcher.fetch({
          method: "GET",
          url,
          tokenType: isLinking ? "access" : "none",
          user: linkingUser,
          // The response will set a cookie that we need to tell the browser to store
          mode: "cors",
          credentials: "include"
        });
        const redirectUrl = response.headers.get(REDIRECT_LOCATION_HEADER);
        if (redirectUrl) {
          return this.openWindowAndWaitForAuthResponse(redirectUrl, state);
        } else {
          throw new Error(`Missing ${REDIRECT_LOCATION_HEADER} header`);
        }
      } else {
        return this.openWindowAndWaitForAuthResponse(url, state);
      }
    } else {
      const logInUrl = await this.getLogInUrl(credentials, isLinking);
      const response = await this.fetcher.fetchJSON({
        method: "POST",
        url: logInUrl,
        body: {
          ...credentials.payload,
          options: {
            device: deviceInformation.toJSON()
          }
        },
        tokenType: isLinking ? "access" : "none",
        user: linkingUser
      });
      const { user_id: userId, access_token: accessToken, refresh_token: refreshToken = null, device_id: deviceId } = response;
      if (typeof userId !== "string") {
        throw new Error("Expected a user id in the response");
      }
      if (typeof accessToken !== "string") {
        throw new Error("Expected an access token in the response");
      }
      if (typeof refreshToken !== "string" && refreshToken !== null) {
        throw new Error("Expected refresh token to be a string or null");
      }
      if (typeof deviceId !== "string") {
        throw new Error("Expected device id to be a string");
      }
      return { userId, accessToken, refreshToken, deviceId };
    }
  }
  /**
   * @param credentials Credentials to use when logging in.
   * @param link Should the request link with the current user?
   * @param extraQueryParams Any extra parameters to include in the query string
   * @returns A promise resolving to the url to be used when logging in.
   */
  async getLogInUrl(credentials, link = false, extraQueryParams = {}) {
    const appRoute = this.fetcher.appRoute;
    const loginRoute = appRoute.authProvider(credentials.providerName).login();
    const qs = encodeQueryString({
      link: link ? "true" : void 0,
      ...extraQueryParams
    });
    const locationUrl = await this.fetcher.locationUrl;
    return locationUrl + loginRoute.path + qs;
  }
  async openWindowAndWaitForAuthResponse(redirectUrl, state) {
    const redirectResult = await this.oauth2.openWindowAndWaitForRedirect(redirectUrl, state);
    return OAuth2Helper.decodeAuthInfo(redirectResult.userAuth);
  }
};
var MongoDBRealmError = class extends Error {
  constructor(method, url, statusCode, statusText, error, errorCode, link) {
    const summary = statusText ? `status ${statusCode} ${statusText}` : `status ${statusCode}`;
    if (typeof error === "string") {
      super(`Request failed (${method} ${url}): ${error} (${summary})`);
    } else {
      super(`Request failed (${method} ${url}): (${summary})`);
    }
    this.method = method;
    this.url = url;
    this.statusText = statusText;
    this.statusCode = statusCode;
    this.error = error;
    this.errorCode = errorCode;
    this.link = link;
  }
  /**
   * Constructs and returns an error from a request and a response.
   * Note: The caller must throw this error themselves.
   *
   * @param request The request sent to the server.
   * @param response A raw response, as returned from the server.
   * @returns An error from a request and a response.
   */
  static async fromRequestAndResponse(request, response) {
    var _a;
    const { url, method } = request;
    const { status, statusText } = response;
    if ((_a = response.headers.get("content-type")) === null || _a === void 0 ? void 0 : _a.startsWith("application/json")) {
      const body = await response.json();
      if (typeof body === "object" && body) {
        const { error, error_code: errorCode, link } = body;
        return new MongoDBRealmError(method, url, status, statusText, typeof error === "string" ? error : void 0, typeof errorCode === "string" ? errorCode : void 0, typeof link === "string" ? link : void 0);
      }
    }
    return new MongoDBRealmError(method, url, status, statusText);
  }
};
function asyncIteratorFromResponseBody(body) {
  if (typeof body !== "object" || body === null) {
    throw new Error("Expected a non-null object");
  } else if (Symbol.asyncIterator in body) {
    return body;
  } else if ("getReader" in body) {
    const stream = body;
    return {
      [Symbol.asyncIterator]() {
        const reader = stream.getReader();
        return {
          next() {
            return reader.read();
          },
          async return() {
            await reader.cancel();
            return { done: true, value: null };
          }
        };
      }
    };
  } else {
    throw new Error("Expected an AsyncIterable or a ReadableStream");
  }
}
var Fetcher = class {
  /**
   * @param config A configuration of the fetcher.
   * @param config.appId The application id.
   * @param config.transport The transport used when fetching.
   * @param config.userContext An object used to determine the requesting user.
   * @param config.locationUrlContext An object used to determine the location / base URL.
   */
  constructor({ appId, transport, userContext, locationUrlContext }) {
    this.appId = appId;
    this.transport = transport;
    this.userContext = userContext;
    this.locationUrlContext = locationUrlContext;
  }
  /**
   * @param user An optional user to generate the header for.
   * @param tokenType The type of token (access or refresh).
   * @returns An object containing the user's token as "Authorization" header or undefined if no user is given.
   */
  static buildAuthorizationHeader(user, tokenType) {
    if (!user || tokenType === "none") {
      return {};
    } else if (tokenType === "access") {
      return { Authorization: `Bearer ${user.accessToken}` };
    } else if (tokenType === "refresh") {
      return { Authorization: `Bearer ${user.refreshToken}` };
    } else {
      throw new Error(`Unexpected token type (${tokenType})`);
    }
  }
  /**
   * @param body The body string or object passed from a request.
   * @returns An object optionally specifying the "Content-Type" header.
   */
  static buildBody(body) {
    if (!body) {
      return;
    } else if (typeof body === "object" && body !== null) {
      return JSON.stringify(serialize(body));
    } else if (typeof body === "string") {
      return body;
    } else {
      console.log("body is", body);
      throw new Error("Unexpected type of body");
    }
  }
  /**
   * @param body The body string or object passed from a request.
   * @returns An object optionally specifying the "Content-Type" header.
   */
  static buildJsonHeader(body) {
    if (body && body.length > 0) {
      return { "Content-Type": "application/json" };
    } else {
      return {};
    }
  }
  clone(config) {
    return new Fetcher({
      appId: this.appId,
      transport: this.transport,
      userContext: this.userContext,
      locationUrlContext: this.locationUrlContext,
      ...config
    });
  }
  /**
   * Fetch a network resource as an authenticated user.
   *
   * @param request The request which should be sent to the server.
   * @returns The response from the server.
   */
  async fetch(request) {
    const { path, url, tokenType = "access", user = this.userContext.currentUser, ...restOfRequest } = request;
    if (typeof path === "string" && typeof url === "string") {
      throw new Error("Use of 'url' and 'path' mutually exclusive");
    } else if (typeof path === "string") {
      const url2 = await this.locationUrlContext.locationUrl + path;
      return this.fetch({ ...request, path: void 0, url: url2 });
    } else if (typeof url === "string") {
      const response = await this.transport.fetch({
        ...restOfRequest,
        url,
        headers: {
          ...Fetcher.buildAuthorizationHeader(user, tokenType),
          ...request.headers
        }
      });
      if (response.ok) {
        return response;
      } else if (user && response.status === 401 && tokenType === "access") {
        await user.refreshAccessToken();
        return this.fetch({ ...request, user });
      } else {
        if (user && response.status === 401 && tokenType === "refresh") {
          user.accessToken = null;
          user.refreshToken = null;
        }
        throw await MongoDBRealmError.fromRequestAndResponse(request, response);
      }
    } else {
      throw new Error("Expected either 'url' or 'path'");
    }
  }
  /**
   * Fetch a network resource as an authenticated user and parse the result as extended JSON.
   *
   * @param request The request which should be sent to the server.
   * @returns The response from the server, parsed as extended JSON.
   */
  async fetchJSON(request) {
    const { body } = request;
    const serializedBody = Fetcher.buildBody(body);
    const contentTypeHeaders = Fetcher.buildJsonHeader(serializedBody);
    const response = await this.fetch({
      ...request,
      body: serializedBody,
      headers: {
        Accept: "application/json",
        ...contentTypeHeaders,
        ...request.headers
      }
    });
    const contentType = response.headers.get("content-type");
    if (contentType === null || contentType === void 0 ? void 0 : contentType.startsWith("application/json")) {
      const responseBody = await response.json();
      return deserialize(responseBody);
    } else if (contentType === null) {
      return null;
    } else {
      throw new Error(`Expected JSON response, got "${contentType}"`);
    }
  }
  /**
   * Fetch an "event-stream" resource as an authenticated user.
   *
   * @param request The request which should be sent to the server.
   * @returns An async iterator over the response body.
   */
  async fetchStream(request) {
    const { body } = await this.fetch({
      ...request,
      headers: {
        Accept: "text/event-stream",
        ...request.headers
      }
    });
    return asyncIteratorFromResponseBody(body);
  }
  /**
   * @returns The path of the app route.
   */
  get appRoute() {
    return routes.api().app(this.appId);
  }
  /**
   * @returns A promise of the location URL of the app.
   */
  get locationUrl() {
    return this.locationUrlContext.locationUrl;
  }
};
var DEVICE_ID_STORAGE_KEY$1 = "deviceId";
var DeviceFields;
(function(DeviceFields2) {
  DeviceFields2["DEVICE_ID"] = "deviceId";
  DeviceFields2["APP_ID"] = "appId";
  DeviceFields2["APP_VERSION"] = "appVersion";
  DeviceFields2["PLATFORM"] = "platform";
  DeviceFields2["PLATFORM_VERSION"] = "platformVersion";
  DeviceFields2["SDK_VERSION"] = "sdkVersion";
})(DeviceFields || (DeviceFields = {}));
var DeviceInformation = class {
  /**
   * @param params Construct the device information from these parameters.
   * @param params.appId A user-defined application id.
   * @param params.appVersion A user-defined application version.
   * @param params.deviceId An unique id for the end-users device.
   */
  constructor({ appId, appVersion, deviceId }) {
    this.sdkVersion = "2.0.0";
    const environment2 = getEnvironment();
    this.platform = environment2.platform;
    this.platformVersion = environment2.platformVersion;
    this.appId = appId;
    this.appVersion = appVersion;
    this.deviceId = deviceId;
  }
  /**
   * @returns An base64 URI encoded representation of the device information.
   */
  encode() {
    const obj = removeKeysWithUndefinedValues(this);
    return gBase64.encode(JSON.stringify(obj));
  }
  /**
   * @returns The defaults
   */
  toJSON() {
    return removeKeysWithUndefinedValues(this);
  }
};
var DEFAULT_BASE_URL = "https://realm.mongodb.com";
var App = class {
  /**
   * Construct a Realm App, either from the Realm App id visible from the Atlas App Services UI or a configuration.
   *
   * @param idOrConfiguration The Realm App id or a configuration to use for this app.
   */
  constructor(idOrConfiguration) {
    this.users = [];
    this._locationUrl = null;
    const configuration = typeof idOrConfiguration === "string" ? { id: idOrConfiguration } : idOrConfiguration;
    if (typeof configuration === "object" && typeof configuration.id === "string") {
      this.id = configuration.id;
    } else {
      throw new Error("Missing an Atlas App Services app-id");
    }
    this.baseUrl = configuration.baseUrl || DEFAULT_BASE_URL;
    if (configuration.skipLocationRequest) {
      this._locationUrl = Promise.resolve(this.baseUrl);
    }
    this.localApp = configuration.app;
    const { storage, transport = new DefaultNetworkTransport() } = configuration;
    this.fetcher = new Fetcher({
      appId: this.id,
      userContext: this,
      locationUrlContext: this,
      transport
    });
    this.emailPasswordAuth = new EmailPasswordAuth(this.fetcher);
    const baseStorage = storage || getEnvironment().defaultStorage;
    this.storage = new AppStorage(baseStorage, this.id);
    this.authenticator = new Authenticator(this.fetcher, baseStorage, () => this.deviceInformation);
    try {
      this.hydrate();
    } catch (err) {
      this.storage.clear();
      console.warn("Realm app hydration failed:", err instanceof Error ? err.message : err);
    }
  }
  /**
   * Get or create a singleton Realm App from an id.
   * Calling this function multiple times with the same id will return the same instance.
   *
   * @param id The Realm App id visible from the Atlas App Services UI or a configuration.
   * @returns The Realm App instance.
   */
  static getApp(id) {
    if (id in App.appCache) {
      return App.appCache[id];
    } else {
      const instance = new App(id);
      App.appCache[id] = instance;
      return instance;
    }
  }
  /**
   * Switch user.
   *
   * @param nextUser The user or id of the user to switch to.
   */
  switchUser(nextUser) {
    const index = this.users.findIndex((u) => u === nextUser);
    if (index === -1) {
      throw new Error("The user was never logged into this app");
    }
    const [user] = this.users.splice(index, 1);
    this.users.unshift(user);
  }
  /**
   * Log in a user.
   *
   * @param credentials Credentials to use when logging in.
   * @param fetchProfile Should the users profile be fetched? (default: true)
   * @returns A promise resolving to the newly logged in user.
   */
  async logIn(credentials, fetchProfile = true) {
    const response = await this.authenticator.authenticate(credentials);
    const user = this.createOrUpdateUser(response, credentials.providerType);
    this.switchUser(user);
    if (fetchProfile) {
      await user.refreshProfile();
    }
    this.storage.setUserIds(this.users.map((u) => u.id), true);
    const deviceId = response.deviceId;
    if (deviceId && deviceId !== "000000000000000000000000") {
      this.storage.set(DEVICE_ID_STORAGE_KEY$1, deviceId);
    }
    return user;
  }
  /**
   * @inheritdoc
   */
  async removeUser(user) {
    const index = this.users.findIndex((u) => u === user);
    if (index === -1) {
      throw new Error("The user was never logged into this app");
    }
    this.users.splice(index, 1);
    await user.logOut();
    this.storage.remove(`user(${user.id}):profile`);
    this.storage.removeUserId(user.id);
  }
  /**
   * @inheritdoc
   */
  async deleteUser(user) {
    await this.fetcher.fetchJSON({
      method: "DELETE",
      path: routes.api().auth().delete().path
    });
    await this.removeUser(user);
  }
  /**
   * @inheritdoc
   */
  addListener() {
    throw new Error("Not yet implemented");
  }
  /**
   * @inheritdoc
   */
  removeListener() {
    throw new Error("Not yet implemented");
  }
  /**
   * @inheritdoc
   */
  removeAllListeners() {
    throw new Error("Not yet implemented");
  }
  /**
   * The currently active user (or null if no active users exists).
   *
   * @returns the currently active user or null.
   */
  get currentUser() {
    const activeUsers = this.users.filter((user) => user.state === UserState.Active);
    if (activeUsers.length === 0) {
      return null;
    } else {
      return activeUsers[0];
    }
  }
  /**
   * All active and logged-out users:
   *  - First in the list are active users (ordered by most recent call to switchUser or login)
   *  - Followed by logged out users (also ordered by most recent call to switchUser or login).
   *
   * @returns An array of users active or logged out users (current user being the first).
   */
  get allUsers() {
    return Object.fromEntries(this.users.map((user) => [user.id, user]));
  }
  /**
   * @returns A promise of the app URL, with the app location resolved.
   */
  get locationUrl() {
    if (!this._locationUrl) {
      const path = routes.api().app(this.id).location().path;
      this._locationUrl = this.fetcher.fetchJSON({
        method: "GET",
        url: this.baseUrl + path,
        tokenType: "none"
      }).then((body) => {
        if (typeof body !== "object") {
          throw new Error("Expected response body be an object");
        } else {
          return body;
        }
      }).then(({ hostname }) => {
        if (typeof hostname !== "string") {
          throw new Error("Expected response to contain a 'hostname'");
        } else {
          return hostname;
        }
      }).catch((err) => {
        this._locationUrl = null;
        throw err;
      });
    }
    return this._locationUrl;
  }
  /**
   * @returns Information about the current device, sent to the server when authenticating.
   */
  get deviceInformation() {
    const deviceIdStr = this.storage.getDeviceId();
    const deviceId = typeof deviceIdStr === "string" && deviceIdStr !== "000000000000000000000000" ? new ObjectId(deviceIdStr) : void 0;
    return new DeviceInformation({
      appId: this.localApp ? this.localApp.name : void 0,
      appVersion: this.localApp ? this.localApp.version : void 0,
      deviceId
    });
  }
  /**
   * Create (and store) a new user or update an existing user's access and refresh tokens.
   * This helps de-duplicating users in the list of users known to the app.
   *
   * @param response A response from the Authenticator.
   * @param providerType The type of the authentication provider used.
   * @returns A new or an existing user.
   */
  createOrUpdateUser(response, providerType) {
    const existingUser = this.users.find((u) => u.id === response.userId);
    if (existingUser) {
      existingUser.accessToken = response.accessToken;
      existingUser.refreshToken = response.refreshToken;
      return existingUser;
    } else {
      if (!response.refreshToken) {
        throw new Error("No refresh token in response from server");
      }
      const user = new User({
        app: this,
        id: response.userId,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        providerType
      });
      this.users.unshift(user);
      return user;
    }
  }
  /**
   * Restores the state of the app (active and logged-out users) from the storage
   */
  hydrate() {
    const userIds = this.storage.getUserIds();
    this.users = userIds.map((id) => new User({ app: this, id }));
  }
};
App.appCache = {};
App.Credentials = Credentials;
var setIsDevelopmentMode$1 = (state) => {
};
var check$1 = function(it) {
  return it && it.Math == Math && it;
};
var safeGlobalThis$1 = (
  // eslint-disable-next-line no-restricted-globals
  check$1(typeof globalThis == "object" && globalThis) || check$1(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore allow `self`
  check$1(typeof self == "object" && self) || // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore allow `global`
  check$1(typeof global == "object" && global) || // eslint-disable-next-line no-new-func -- fallback
  function() {
    return this;
  }() || Function("return this")()
);
setIsDevelopmentMode$1(typeof __DEV__ !== "undefined" && __DEV__);
var LocalStorage = class {
  /**
   * Constructs a LocalStorage using the global window.
   */
  constructor() {
    if (typeof safeGlobalThis$1.localStorage === "object") {
      this.global = safeGlobalThis$1;
    } else {
      throw new Error("Cannot use LocalStorage without a global localStorage object");
    }
  }
  /** @inheritdoc */
  get(key) {
    return this.global.localStorage.getItem(key);
  }
  /** @inheritdoc */
  set(key, value) {
    return this.global.localStorage.setItem(key, value);
  }
  /** @inheritdoc */
  remove(key) {
    return this.global.localStorage.removeItem(key);
  }
  /** @inheritdoc */
  prefix(keyPart) {
    return new PrefixedStorage(this, keyPart);
  }
  /** @inheritdoc */
  clear(prefix) {
    const keys = [];
    for (let i = 0; i < this.global.localStorage.length; i++) {
      const key = this.global.localStorage.key(i);
      if (key && (!prefix || key.startsWith(prefix))) {
        keys.push(key);
      }
    }
    for (const key of keys) {
      this.global.localStorage.removeItem(key);
    }
  }
  /** @inheritdoc */
  addListener(listener) {
    return this.global.addEventListener("storage", listener);
  }
  /** @inheritdoc */
  removeListener(listener) {
    return this.global.removeEventListener("storage", listener);
  }
};
var browser = detect();
var DefaultStorage = "localStorage" in safeGlobalThis$1 ? LocalStorage : MemoryStorage;
function openWindow(url) {
  if (typeof safeGlobalThis$1.open === "function") {
    return safeGlobalThis$1.open(url);
  } else {
    console.log(`Please open ${url}`);
    return null;
  }
}
var environment$1 = {
  defaultStorage: new DefaultStorage().prefix("realm-web"),
  openWindow,
  platform: (browser === null || browser === void 0 ? void 0 : browser.name) || "web",
  platformVersion: (browser === null || browser === void 0 ? void 0 : browser.version) || "0.0.0",
  TextDecoder
};
setEnvironment(environment$1);

// src/index.js
var src_default = {
  async scheduled(controller, env, ctx) {
    try {
      console.log("Running clean-success-logs");
      let realm = new App({ id: "ninjachefs-cron-rekou" });
      let credentials = Credentials.apiKey("vDoTvnjym2d4VM80mpnHsNp1UGuWKnp3cQ97xRTSlRH1FcPOYkOHaP4JgS9IVrPh");
      let user = await realm.logIn(credentials);
      let client = user.mongoClient("mongodb-atlas");
      const collection = client.db("ninjarecipies").collection("pendingsubmissions");
      let result = await collection.deleteMany({ success: "true", is_pending: false });
      console.log(result);
      console.log("Running clean-partial-submissions");
      result = await collection.find({ success: "true", is_pending: true });
      for (let doc of result) {
        if (doc.img_url) {
          let imageID = doc.img_url.split("/").pop();
          console.log(`Deleting image ${imageID}`);
          console.log(env.CLOUDFLARE_ID);
          let url = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ID}/images/v1/${imageID}`;
          let rex = await fetch(url, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${env.CLOUDFLARE_TOKEN}`
            }
          });
          console.log(rex);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
};

// C:/Users/dhruv/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;
var wrap = void 0;

// .wrangler/tmp/bundle-ngXuF8/middleware-insertion-facade.js
var envWrappers = [wrap].filter(Boolean);
var facade = {
  ...src_default,
  envWrappers,
  middleware: [
    middleware_miniflare3_json_error_default,
    ...src_default.middleware ? src_default.middleware : []
  ].filter(Boolean)
};
var middleware_insertion_facade_default = facade;

// .wrangler/tmp/bundle-ngXuF8/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
var __facade_modules_fetch__ = function(request, env, ctx) {
  if (middleware_insertion_facade_default.fetch === void 0)
    throw new Error("Handler does not export a fetch() function.");
  return middleware_insertion_facade_default.fetch(request, env, ctx);
};
function getMaskedEnv(rawEnv) {
  let env = rawEnv;
  if (middleware_insertion_facade_default.envWrappers && middleware_insertion_facade_default.envWrappers.length > 0) {
    for (const wrapFn of middleware_insertion_facade_default.envWrappers) {
      env = wrapFn(env);
    }
  }
  return env;
}
var registeredMiddleware = false;
var facade2 = {
  ...middleware_insertion_facade_default.tail && {
    tail: maskHandlerEnv(middleware_insertion_facade_default.tail)
  },
  ...middleware_insertion_facade_default.trace && {
    trace: maskHandlerEnv(middleware_insertion_facade_default.trace)
  },
  ...middleware_insertion_facade_default.scheduled && {
    scheduled: maskHandlerEnv(middleware_insertion_facade_default.scheduled)
  },
  ...middleware_insertion_facade_default.queue && {
    queue: maskHandlerEnv(middleware_insertion_facade_default.queue)
  },
  ...middleware_insertion_facade_default.test && {
    test: maskHandlerEnv(middleware_insertion_facade_default.test)
  },
  ...middleware_insertion_facade_default.email && {
    email: maskHandlerEnv(middleware_insertion_facade_default.email)
  },
  fetch(request, rawEnv, ctx) {
    const env = getMaskedEnv(rawEnv);
    if (middleware_insertion_facade_default.middleware && middleware_insertion_facade_default.middleware.length > 0) {
      if (!registeredMiddleware) {
        registeredMiddleware = true;
        for (const middleware of middleware_insertion_facade_default.middleware) {
          __facade_register__(middleware);
        }
      }
      const __facade_modules_dispatch__ = function(type, init) {
        if (type === "scheduled" && middleware_insertion_facade_default.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return middleware_insertion_facade_default.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(
        request,
        env,
        ctx,
        __facade_modules_dispatch__,
        __facade_modules_fetch__
      );
    } else {
      return __facade_modules_fetch__(request, env, ctx);
    }
  }
};
function maskHandlerEnv(handler) {
  return (data, env, ctx) => handler(data, getMaskedEnv(env), ctx);
}
var middleware_loader_entry_default = facade2;
export {
  middleware_loader_entry_default as default
};
/*! Bundled license information:

bson/dist/bson.browser.esm.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=index.js.map
