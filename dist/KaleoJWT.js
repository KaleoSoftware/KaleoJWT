(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.KaleoJWT = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=this._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=this._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

},{}],2:[function(require,module,exports){
module.exports={encode:function(s){s=s.replace(/=+$/,'');s=s.replace(/\+/g,'-');s=s.replace(/\//g,'_');return s;},decode:function(s){s=(s+'===').slice(0,s.length+(s.length % 4));s.replace(/-/g,'+').replace(/_/g,'/');return s;}};

},{}],3:[function(require,module,exports){
/**
 * jshashes - https://github.com/h2non/jshashes
 * Released under the "New BSD" license
 *
 * KALEO MODIFICATIONS
 * Stripped out everything we dont need, only includes SHA256 algo
 * Useage: var Hashes = require("hashes-hs256.js")
 */
module.exports = (function() {
  var Hashes;

  function utf8Encode(str) {
    var x, y, output = '',
      i = -1,
      l;

    if (str && str.length) {
      l = str.length;
      while ((i += 1) < l) {
        /* Decode utf-16 surrogate pairs */
        x = str.charCodeAt(i);
        y = i + 1 < l ? str.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
          x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
          i += 1;
        }
        /* Encode output as utf-8 */
        if (x <= 0x7F) {
          output += String.fromCharCode(x);
        } else if (x <= 0x7FF) {
          output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
            0x80 | (x & 0x3F));
        } else if (x <= 0xFFFF) {
          output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
            0x80 | ((x >>> 6) & 0x3F),
            0x80 | (x & 0x3F));
        } else if (x <= 0x1FFFFF) {
          output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
            0x80 | ((x >>> 12) & 0x3F),
            0x80 | ((x >>> 6) & 0x3F),
            0x80 | (x & 0x3F));
        }
      }
    }
    return output;
  }

  function utf8Decode(str) {
    var i, ac, c1, c2, c3, arr = [],
      l;
    i = ac = c1 = c2 = c3 = 0;

    if (str && str.length) {
      l = str.length;
      str += '';

      while (i < l) {
        c1 = str.charCodeAt(i);
        ac += 1;
        if (c1 < 128) {
          arr[ac] = String.fromCharCode(c1);
          i += 1;
        } else if (c1 > 191 && c1 < 224) {
          c2 = str.charCodeAt(i + 1);
          arr[ac] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = str.charCodeAt(i + 1);
          c3 = str.charCodeAt(i + 2);
          arr[ac] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
    }
    return arr.join('');
  }

  /**
   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
   * to work around bugs in some JS interpreters.
   */

  function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }

  /**
   * Bitwise rotate a 32-bit number to the left.
   */

  function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }

  /**
   * Convert a raw string to a hex string
   */

  function rstr2hex(input, hexcase) {
    var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef',
      output = '',
      x, i = 0,
      l = input.length;
    for (; i < l; i += 1) {
      x = input.charCodeAt(i);
      output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F);
    }
    return output;
  }

  /**
   * Encode a string as utf-16
   */

  function str2rstr_utf16le(input) {
    var i, l = input.length,
      output = '';
    for (i = 0; i < l; i += 1) {
      output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
    }
    return output;
  }

  function str2rstr_utf16be(input) {
    var i, l = input.length,
      output = '';
    for (i = 0; i < l; i += 1) {
      output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
    }
    return output;
  }

  /**
   * Convert an array of big-endian words to a string
   */

  function binb2rstr(input) {
    var i, l = input.length * 32,
      output = '';
    for (i = 0; i < l; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
    }
    return output;
  }

  /**
   * Convert a raw string to an array of big-endian words
   * Characters >255 have their high-byte silently ignored.
   */

  function rstr2binb(input) {
    var i, l = input.length * 8,
      output = Array(input.length >> 2),
      lo = output.length;
    for (i = 0; i < lo; i += 1) {
      output[i] = 0;
    }
    for (i = 0; i < l; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
    }
    return output;
  }

  /**
   * Convert a raw string to an arbitrary string encoding
   */

  function rstr2any(input, encoding) {
    var divisor = encoding.length,
      remainders = Array(),
      i, q, x, ld, quotient, dividend, output, full_length;

    /* Convert to an array of 16-bit big-endian values, forming the dividend */
    dividend = Array(Math.ceil(input.length / 2));
    ld = dividend.length;
    for (i = 0; i < ld; i += 1) {
      dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
    }

    /**
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. We stop when the dividend is zerHashes.
     * All remainders are stored for later use.
     */
    while (dividend.length > 0) {
      quotient = Array();
      x = 0;
      for (i = 0; i < dividend.length; i += 1) {
        x = (x << 16) + dividend[i];
        q = Math.floor(x / divisor);
        x -= q * divisor;
        if (quotient.length > 0 || q > 0) {
          quotient[quotient.length] = q;
        }
      }
      remainders[remainders.length] = x;
      dividend = quotient;
    }

    /* Convert the remainders to the output string */
    output = '';
    for (i = remainders.length - 1; i >= 0; i--) {
      output += encoding.charAt(remainders[i]);
    }

    /* Append leading zero equivalents */
    full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)));
    for (i = output.length; i < full_length; i += 1) {
      output = encoding[0] + output;
    }
    return output;
  }

  /**
   * Convert a raw string to a base-64 string
   */

  function rstr2b64(input, b64pad) {
    var tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      output = '',
      len = input.length,
      i, j, triplet;
    b64pad = b64pad || '=';
    for (i = 0; i < len; i += 3) {
      triplet = (input.charCodeAt(i) << 16) | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
      for (j = 0; j < 4; j += 1) {
        if (i * 8 + j * 6 > input.length * 8) {
          output += b64pad;
        } else {
          output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
        }
      }
    }
    return output;
  }

  Hashes = {
    /**
     * @property {String} version
     * @readonly
     */
    VERSION: '1.0.5',
    /**
     * @class Hashes.SHA256
     * @param {config}
     *
     * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined in FIPS 180-2
     * Version 2.2 Copyright Angel Marin, Paul Johnston 2000 - 2009.
     * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
     * See http://pajhome.org.uk/crypt/md5 for details.
     * Also http://anmar.eu.org/projects/jssha2/
     */
    SHA256: function(options) {
      /**
       * Private properties configuration variables. You may need to tweak these to be compatible with
       * the server-side, but the defaults work in most cases.
       * @see this.setUpperCase() method
       * @see this.setPad() method
       */
      var hexcase = (options && typeof options.uppercase === 'boolean') ? options.uppercase : false, // hexadecimal output case format. false - lowercase; true - uppercase  */
        b64pad = (options && typeof options.pad === 'string') ? options.pda : '=',
        /* base-64 pad character. Default '=' for strict RFC compliance   */
        utf8 = (options && typeof options.utf8 === 'boolean') ? options.utf8 : true,
        /* enable/disable utf8 encoding */
        sha256_K;

      /* privileged (public) methods */
      this.hex = function(s) {
        return rstr2hex(rstr(s, utf8));
      };
      this.b64 = function(s) {
        return rstr2b64(rstr(s, utf8), b64pad);
      };
      this.any = function(s, e) {
        return rstr2any(rstr(s, utf8), e);
      };
      this.raw = function(s) {
        return rstr(s, utf8);
      };
      this.hex_hmac = function(k, d) {
        return rstr2hex(rstr_hmac(k, d));
      };
      this.b64_hmac = function(k, d) {
        return rstr2b64(rstr_hmac(k, d), b64pad);
      };
      this.any_hmac = function(k, d, e) {
        return rstr2any(rstr_hmac(k, d), e);
      };
      /**
       * Perform a simple self-test to see if the VM is working
       * @return {String} Hexadecimal hash sample
       * @public
       */
      this.vm_test = function() {
        return hex('abc').toLowerCase() === '900150983cd24fb0d6963f7d28e17f72';
      };
      /**
       * Enable/disable uppercase hexadecimal returned string
       * @param {boolean}
       * @return {Object} this
       * @public
       */
      this.setUpperCase = function(a) {
        if (typeof a === 'boolean') {
          hexcase = a;
        }
        return this;
      };
      /**
       * @description Defines a base64 pad string
       * @param {string} Pad
       * @return {Object} this
       * @public
       */
      this.setPad = function(a) {
        b64pad = a || b64pad;
        return this;
      };
      /**
       * Defines a base64 pad string
       * @param {boolean}
       * @return {Object} this
       * @public
       */
      this.setUTF8 = function(a) {
        if (typeof a === 'boolean') {
          utf8 = a;
        }
        return this;
      };

      // private methods

      /**
       * Calculate the SHA-512 of a raw string
       */

      function rstr(s, utf8) {
        s = (utf8) ? utf8Encode(s) : s;
        return binb2rstr(binb(rstr2binb(s), s.length * 8));
      }

      /**
       * Calculate the HMAC-sha256 of a key and some data (raw strings)
       */

      function rstr_hmac(key, data) {
        key = (utf8) ? utf8Encode(key) : key;
        data = (utf8) ? utf8Encode(data) : data;
        var hash, i = 0,
          bkey = rstr2binb(key),
          ipad = Array(16),
          opad = Array(16);

        if (bkey.length > 16) {
          bkey = binb(bkey, key.length * 8);
        }

        for (; i < 16; i += 1) {
          ipad[i] = bkey[i] ^ 0x36363636;
          opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }

        hash = binb(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
        return binb2rstr(binb(opad.concat(hash), 512 + 256));
      }

      /*
       * Main sha256 function, with its support functions
       */

      function sha256_S(X, n) {
        return (X >>> n) | (X << (32 - n));
      }

      function sha256_R(X, n) {
        return (X >>> n);
      }

      function sha256_Ch(x, y, z) {
        return ((x & y) ^ ((~x) & z));
      }

      function sha256_Maj(x, y, z) {
        return ((x & y) ^ (x & z) ^ (y & z));
      }

      function sha256_Sigma0256(x) {
        return (sha256_S(x, 2) ^ sha256_S(x, 13) ^ sha256_S(x, 22));
      }

      function sha256_Sigma1256(x) {
        return (sha256_S(x, 6) ^ sha256_S(x, 11) ^ sha256_S(x, 25));
      }

      function sha256_Gamma0256(x) {
        return (sha256_S(x, 7) ^ sha256_S(x, 18) ^ sha256_R(x, 3));
      }

      function sha256_Gamma1256(x) {
        return (sha256_S(x, 17) ^ sha256_S(x, 19) ^ sha256_R(x, 10));
      }

      function sha256_Sigma0512(x) {
        return (sha256_S(x, 28) ^ sha256_S(x, 34) ^ sha256_S(x, 39));
      }

      function sha256_Sigma1512(x) {
        return (sha256_S(x, 14) ^ sha256_S(x, 18) ^ sha256_S(x, 41));
      }

      function sha256_Gamma0512(x) {
        return (sha256_S(x, 1) ^ sha256_S(x, 8) ^ sha256_R(x, 7));
      }

      function sha256_Gamma1512(x) {
        return (sha256_S(x, 19) ^ sha256_S(x, 61) ^ sha256_R(x, 6));
      }

      sha256_K = [
        1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987,
        1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522,
        264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585,
        113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
        1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344,
        430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
        1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998
      ];

      function binb(m, l) {
        var HASH = [1779033703, -1150833019, 1013904242, -1521486534,
          1359893119, -1694144372, 528734635, 1541459225
        ];
        var W = new Array(64);
        var a, b, c, d, e, f, g, h;
        var i, j, T1, T2;

        /* append padding */
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for (i = 0; i < m.length; i += 16) {
          a = HASH[0];
          b = HASH[1];
          c = HASH[2];
          d = HASH[3];
          e = HASH[4];
          f = HASH[5];
          g = HASH[6];
          h = HASH[7];

          for (j = 0; j < 64; j += 1) {
            if (j < 16) {
              W[j] = m[j + i];
            } else {
              W[j] = safe_add(safe_add(safe_add(sha256_Gamma1256(W[j - 2]), W[j - 7]),
                sha256_Gamma0256(W[j - 15])), W[j - 16]);
            }

            T1 = safe_add(safe_add(safe_add(safe_add(h, sha256_Sigma1256(e)), sha256_Ch(e, f, g)),
              sha256_K[j]), W[j]);
            T2 = safe_add(sha256_Sigma0256(a), sha256_Maj(a, b, c));
            h = g;
            g = f;
            f = e;
            e = safe_add(d, T1);
            d = c;
            c = b;
            b = a;
            a = safe_add(T1, T2);
          }

          HASH[0] = safe_add(a, HASH[0]);
          HASH[1] = safe_add(b, HASH[1]);
          HASH[2] = safe_add(c, HASH[2]);
          HASH[3] = safe_add(d, HASH[3]);
          HASH[4] = safe_add(e, HASH[4]);
          HASH[5] = safe_add(f, HASH[5]);
          HASH[6] = safe_add(g, HASH[6]);
          HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
      }

    }
  };

  return Hashes;
}()); // IIFE

},{}],4:[function(require,module,exports){
// KaleoJWT
//
// Useage:
// var KaleoJWT = require("KaleoJWT.js")
// or
// <script src="KaleoJWT.js"></script> will expose KaleoJWT on window
module.exports = (function(){

  /*! jshashes - New BSD License - https://github.com/h2non/jshashes */
  var Hashes = require("./hashes-hs256.js");
  var SHA256 = new Hashes.SHA256();
  var Base64 = require("./Base64.js");
  var Base64url = require("./Base64url");

  var HEADER = {alg: "HS256", typ: "JWT"};

  function parseToken(token) {
    if (token.match(/^([^.]+)\.([^.]+)\.([^.]+)$/) == null) {
      throw "JWT token is not a form of 'Head.Payload.SigValue'.";
    }
    return {
      header: RegExp.$1,
      payload: RegExp.$2,
      sig: RegExp.$3
    }
  }

  function generateSignedToken(header, payload, secret) {
    var encodedHeader  = Base64url.encode(Base64.encode(JSON.stringify(header)));
    var encodedPayload = Base64url.encode(Base64.encode(JSON.stringify(payload)));
    var sig = Base64url.encode(SHA256.b64_hmac(secret, encodedHeader+"."+encodedPayload));
    return encodedHeader+"."+encodedPayload+"."+sig;
  }

  function verifySignedToken(token, secret) {
    var parts = parseToken(token);
    var sig = Base64url.encode(SHA256.b64_hmac(secret, parts.header+"."+parts.payload));
    return sig === parts.sig;
  }

  // Public API
  return {
    sign: function(data, secret) {
      // Default to expire in one hour
      data.exp = data.exp || (Math.floor(Date.now() / 1000)+3600);
      return generateSignedToken(HEADER, data, secret);
    },
    decode: function(token) {
      var obj = parseToken(token);
      return Base64.decode(Base64url.decode(obj.payload));
    },
    verify: function(token, secret) {
      return verifySignedToken(token, secret);
    }
  }
})()

},{"./Base64.js":1,"./Base64url":2,"./hashes-hs256.js":3}]},{},[4])(4)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQmFzZTY0LmpzIiwic3JjL0Jhc2U2NHVybC5qcyIsInNyYy9oYXNoZXMtaHMyNTYuanMiLCJzcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cz17X2tleVN0cjpcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XCIsZW5jb2RlOmZ1bmN0aW9uKGUpe3ZhciB0PVwiXCI7dmFyIG4scixpLHMsbyx1LGE7dmFyIGY9MDtlPXRoaXMuX3V0ZjhfZW5jb2RlKGUpO3doaWxlKGY8ZS5sZW5ndGgpe249ZS5jaGFyQ29kZUF0KGYrKyk7cj1lLmNoYXJDb2RlQXQoZisrKTtpPWUuY2hhckNvZGVBdChmKyspO3M9bj4+MjtvPShuJjMpPDw0fHI+PjQ7dT0ociYxNSk8PDJ8aT4+NjthPWkmNjM7aWYoaXNOYU4ocikpe3U9YT02NH1lbHNlIGlmKGlzTmFOKGkpKXthPTY0fXQ9dCt0aGlzLl9rZXlTdHIuY2hhckF0KHMpK3RoaXMuX2tleVN0ci5jaGFyQXQobykrdGhpcy5fa2V5U3RyLmNoYXJBdCh1KSt0aGlzLl9rZXlTdHIuY2hhckF0KGEpfXJldHVybiB0fSxkZWNvZGU6ZnVuY3Rpb24oZSl7dmFyIHQ9XCJcIjt2YXIgbixyLGk7dmFyIHMsbyx1LGE7dmFyIGY9MDtlPWUucmVwbGFjZSgvW15BLVphLXowLTkrLz1dL2csXCJcIik7d2hpbGUoZjxlLmxlbmd0aCl7cz10aGlzLl9rZXlTdHIuaW5kZXhPZihlLmNoYXJBdChmKyspKTtvPXRoaXMuX2tleVN0ci5pbmRleE9mKGUuY2hhckF0KGYrKykpO3U9dGhpcy5fa2V5U3RyLmluZGV4T2YoZS5jaGFyQXQoZisrKSk7YT10aGlzLl9rZXlTdHIuaW5kZXhPZihlLmNoYXJBdChmKyspKTtuPXM8PDJ8bz4+NDtyPShvJjE1KTw8NHx1Pj4yO2k9KHUmMyk8PDZ8YTt0PXQrU3RyaW5nLmZyb21DaGFyQ29kZShuKTtpZih1IT02NCl7dD10K1N0cmluZy5mcm9tQ2hhckNvZGUocil9aWYoYSE9NjQpe3Q9dCtTdHJpbmcuZnJvbUNoYXJDb2RlKGkpfX10PXRoaXMuX3V0ZjhfZGVjb2RlKHQpO3JldHVybiB0fSxfdXRmOF9lbmNvZGU6ZnVuY3Rpb24oZSl7ZT1lLnJlcGxhY2UoL3JuL2csXCJuXCIpO3ZhciB0PVwiXCI7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWUuY2hhckNvZGVBdChuKTtpZihyPDEyOCl7dCs9U3RyaW5nLmZyb21DaGFyQ29kZShyKX1lbHNlIGlmKHI+MTI3JiZyPDIwNDgpe3QrPVN0cmluZy5mcm9tQ2hhckNvZGUocj4+NnwxOTIpO3QrPVN0cmluZy5mcm9tQ2hhckNvZGUociY2M3wxMjgpfWVsc2V7dCs9U3RyaW5nLmZyb21DaGFyQ29kZShyPj4xMnwyMjQpO3QrPVN0cmluZy5mcm9tQ2hhckNvZGUocj4+NiY2M3wxMjgpO3QrPVN0cmluZy5mcm9tQ2hhckNvZGUociY2M3wxMjgpfX1yZXR1cm4gdH0sX3V0ZjhfZGVjb2RlOmZ1bmN0aW9uKGUpe3ZhciB0PVwiXCI7dmFyIG49MDt2YXIgcj1jMT1jMj0wO3doaWxlKG48ZS5sZW5ndGgpe3I9ZS5jaGFyQ29kZUF0KG4pO2lmKHI8MTI4KXt0Kz1TdHJpbmcuZnJvbUNoYXJDb2RlKHIpO24rK31lbHNlIGlmKHI+MTkxJiZyPDIyNCl7YzI9ZS5jaGFyQ29kZUF0KG4rMSk7dCs9U3RyaW5nLmZyb21DaGFyQ29kZSgociYzMSk8PDZ8YzImNjMpO24rPTJ9ZWxzZXtjMj1lLmNoYXJDb2RlQXQobisxKTtjMz1lLmNoYXJDb2RlQXQobisyKTt0Kz1TdHJpbmcuZnJvbUNoYXJDb2RlKChyJjE1KTw8MTJ8KGMyJjYzKTw8NnxjMyY2Myk7bis9M319cmV0dXJuIHR9fTtcbiIsIm1vZHVsZS5leHBvcnRzPXtlbmNvZGU6ZnVuY3Rpb24ocyl7cz1zLnJlcGxhY2UoLz0rJC8sJycpO3M9cy5yZXBsYWNlKC9cXCsvZywnLScpO3M9cy5yZXBsYWNlKC9cXC8vZywnXycpO3JldHVybiBzO30sZGVjb2RlOmZ1bmN0aW9uKHMpe3M9KHMrJz09PScpLnNsaWNlKDAscy5sZW5ndGgrKHMubGVuZ3RoICUgNCkpO3MucmVwbGFjZSgvLS9nLCcrJykucmVwbGFjZSgvXy9nLCcvJyk7cmV0dXJuIHM7fX07XG4iLCIvKipcbiAqIGpzaGFzaGVzIC0gaHR0cHM6Ly9naXRodWIuY29tL2gybm9uL2pzaGFzaGVzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgXCJOZXcgQlNEXCIgbGljZW5zZVxuICpcbiAqIEtBTEVPIE1PRElGSUNBVElPTlNcbiAqIFN0cmlwcGVkIG91dCBldmVyeXRoaW5nIHdlIGRvbnQgbmVlZCwgb25seSBpbmNsdWRlcyBTSEEyNTYgYWxnb1xuICogVXNlYWdlOiB2YXIgSGFzaGVzID0gcmVxdWlyZShcImhhc2hlcy1oczI1Ni5qc1wiKVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgdmFyIEhhc2hlcztcblxuICBmdW5jdGlvbiB1dGY4RW5jb2RlKHN0cikge1xuICAgIHZhciB4LCB5LCBvdXRwdXQgPSAnJyxcbiAgICAgIGkgPSAtMSxcbiAgICAgIGw7XG5cbiAgICBpZiAoc3RyICYmIHN0ci5sZW5ndGgpIHtcbiAgICAgIGwgPSBzdHIubGVuZ3RoO1xuICAgICAgd2hpbGUgKChpICs9IDEpIDwgbCkge1xuICAgICAgICAvKiBEZWNvZGUgdXRmLTE2IHN1cnJvZ2F0ZSBwYWlycyAqL1xuICAgICAgICB4ID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIHkgPSBpICsgMSA8IGwgPyBzdHIuY2hhckNvZGVBdChpICsgMSkgOiAwO1xuICAgICAgICBpZiAoMHhEODAwIDw9IHggJiYgeCA8PSAweERCRkYgJiYgMHhEQzAwIDw9IHkgJiYgeSA8PSAweERGRkYpIHtcbiAgICAgICAgICB4ID0gMHgxMDAwMCArICgoeCAmIDB4MDNGRikgPDwgMTApICsgKHkgJiAweDAzRkYpO1xuICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICAvKiBFbmNvZGUgb3V0cHV0IGFzIHV0Zi04ICovXG4gICAgICAgIGlmICh4IDw9IDB4N0YpIHtcbiAgICAgICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh4KTtcbiAgICAgICAgfSBlbHNlIGlmICh4IDw9IDB4N0ZGKSB7XG4gICAgICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhDMCB8ICgoeCA+Pj4gNikgJiAweDFGKSxcbiAgICAgICAgICAgIDB4ODAgfCAoeCAmIDB4M0YpKTtcbiAgICAgICAgfSBlbHNlIGlmICh4IDw9IDB4RkZGRikge1xuICAgICAgICAgIG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RTAgfCAoKHggPj4+IDEyKSAmIDB4MEYpLFxuICAgICAgICAgICAgMHg4MCB8ICgoeCA+Pj4gNikgJiAweDNGKSxcbiAgICAgICAgICAgIDB4ODAgfCAoeCAmIDB4M0YpKTtcbiAgICAgICAgfSBlbHNlIGlmICh4IDw9IDB4MUZGRkZGKSB7XG4gICAgICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGMCB8ICgoeCA+Pj4gMTgpICYgMHgwNyksXG4gICAgICAgICAgICAweDgwIHwgKCh4ID4+PiAxMikgJiAweDNGKSxcbiAgICAgICAgICAgIDB4ODAgfCAoKHggPj4+IDYpICYgMHgzRiksXG4gICAgICAgICAgICAweDgwIHwgKHggJiAweDNGKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHV0ZjhEZWNvZGUoc3RyKSB7XG4gICAgdmFyIGksIGFjLCBjMSwgYzIsIGMzLCBhcnIgPSBbXSxcbiAgICAgIGw7XG4gICAgaSA9IGFjID0gYzEgPSBjMiA9IGMzID0gMDtcblxuICAgIGlmIChzdHIgJiYgc3RyLmxlbmd0aCkge1xuICAgICAgbCA9IHN0ci5sZW5ndGg7XG4gICAgICBzdHIgKz0gJyc7XG5cbiAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICBjMSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBhYyArPSAxO1xuICAgICAgICBpZiAoYzEgPCAxMjgpIHtcbiAgICAgICAgICBhcnJbYWNdID0gU3RyaW5nLmZyb21DaGFyQ29kZShjMSk7XG4gICAgICAgICAgaSArPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGMxID4gMTkxICYmIGMxIDwgMjI0KSB7XG4gICAgICAgICAgYzIgPSBzdHIuY2hhckNvZGVBdChpICsgMSk7XG4gICAgICAgICAgYXJyW2FjXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoKChjMSAmIDMxKSA8PCA2KSB8IChjMiAmIDYzKSk7XG4gICAgICAgICAgaSArPSAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGMyID0gc3RyLmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgICAgIGMzID0gc3RyLmNoYXJDb2RlQXQoaSArIDIpO1xuICAgICAgICAgIGFyclthY10gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCgoYzEgJiAxNSkgPDwgMTIpIHwgKChjMiAmIDYzKSA8PCA2KSB8IChjMyAmIDYzKSk7XG4gICAgICAgICAgaSArPSAzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnIuam9pbignJyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICAgKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICAgKi9cblxuICBmdW5jdGlvbiBzYWZlX2FkZCh4LCB5KSB7XG4gICAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKSxcbiAgICAgIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICAgIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAgICovXG5cbiAgZnVuY3Rpb24gYml0X3JvbChudW0sIGNudCkge1xuICAgIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgcmF3IHN0cmluZyB0byBhIGhleCBzdHJpbmdcbiAgICovXG5cbiAgZnVuY3Rpb24gcnN0cjJoZXgoaW5wdXQsIGhleGNhc2UpIHtcbiAgICB2YXIgaGV4X3RhYiA9IGhleGNhc2UgPyAnMDEyMzQ1Njc4OUFCQ0RFRicgOiAnMDEyMzQ1Njc4OWFiY2RlZicsXG4gICAgICBvdXRwdXQgPSAnJyxcbiAgICAgIHgsIGkgPSAwLFxuICAgICAgbCA9IGlucHV0Lmxlbmd0aDtcbiAgICBmb3IgKDsgaSA8IGw7IGkgKz0gMSkge1xuICAgICAgeCA9IGlucHV0LmNoYXJDb2RlQXQoaSk7XG4gICAgICBvdXRwdXQgKz0gaGV4X3RhYi5jaGFyQXQoKHggPj4+IDQpICYgMHgwRikgKyBoZXhfdGFiLmNoYXJBdCh4ICYgMHgwRik7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICAvKipcbiAgICogRW5jb2RlIGEgc3RyaW5nIGFzIHV0Zi0xNlxuICAgKi9cblxuICBmdW5jdGlvbiBzdHIycnN0cl91dGYxNmxlKGlucHV0KSB7XG4gICAgdmFyIGksIGwgPSBpbnB1dC5sZW5ndGgsXG4gICAgICBvdXRwdXQgPSAnJztcbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSArPSAxKSB7XG4gICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShpbnB1dC5jaGFyQ29kZUF0KGkpICYgMHhGRiwgKGlucHV0LmNoYXJDb2RlQXQoaSkgPj4+IDgpICYgMHhGRik7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICBmdW5jdGlvbiBzdHIycnN0cl91dGYxNmJlKGlucHV0KSB7XG4gICAgdmFyIGksIGwgPSBpbnB1dC5sZW5ndGgsXG4gICAgICBvdXRwdXQgPSAnJztcbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSArPSAxKSB7XG4gICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoaW5wdXQuY2hhckNvZGVBdChpKSA+Pj4gOCkgJiAweEZGLCBpbnB1dC5jaGFyQ29kZUF0KGkpICYgMHhGRik7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzIHRvIGEgc3RyaW5nXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGJpbmIycnN0cihpbnB1dCkge1xuICAgIHZhciBpLCBsID0gaW5wdXQubGVuZ3RoICogMzIsXG4gICAgICBvdXRwdXQgPSAnJztcbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSArPSA4KSB7XG4gICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoaW5wdXRbaSA+PiA1XSA+Pj4gKDI0IC0gaSAlIDMyKSkgJiAweEZGKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgcmF3IHN0cmluZyB0byBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzXG4gICAqIENoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpZ2gtYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICAgKi9cblxuICBmdW5jdGlvbiByc3RyMmJpbmIoaW5wdXQpIHtcbiAgICB2YXIgaSwgbCA9IGlucHV0Lmxlbmd0aCAqIDgsXG4gICAgICBvdXRwdXQgPSBBcnJheShpbnB1dC5sZW5ndGggPj4gMiksXG4gICAgICBsbyA9IG91dHB1dC5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxvOyBpICs9IDEpIHtcbiAgICAgIG91dHB1dFtpXSA9IDA7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpICs9IDgpIHtcbiAgICAgIG91dHB1dFtpID4+IDVdIHw9IChpbnB1dC5jaGFyQ29kZUF0KGkgLyA4KSAmIDB4RkYpIDw8ICgyNCAtIGkgJSAzMik7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIHJhdyBzdHJpbmcgdG8gYW4gYXJiaXRyYXJ5IHN0cmluZyBlbmNvZGluZ1xuICAgKi9cblxuICBmdW5jdGlvbiByc3RyMmFueShpbnB1dCwgZW5jb2RpbmcpIHtcbiAgICB2YXIgZGl2aXNvciA9IGVuY29kaW5nLmxlbmd0aCxcbiAgICAgIHJlbWFpbmRlcnMgPSBBcnJheSgpLFxuICAgICAgaSwgcSwgeCwgbGQsIHF1b3RpZW50LCBkaXZpZGVuZCwgb3V0cHV0LCBmdWxsX2xlbmd0aDtcblxuICAgIC8qIENvbnZlcnQgdG8gYW4gYXJyYXkgb2YgMTYtYml0IGJpZy1lbmRpYW4gdmFsdWVzLCBmb3JtaW5nIHRoZSBkaXZpZGVuZCAqL1xuICAgIGRpdmlkZW5kID0gQXJyYXkoTWF0aC5jZWlsKGlucHV0Lmxlbmd0aCAvIDIpKTtcbiAgICBsZCA9IGRpdmlkZW5kLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGQ7IGkgKz0gMSkge1xuICAgICAgZGl2aWRlbmRbaV0gPSAoaW5wdXQuY2hhckNvZGVBdChpICogMikgPDwgOCkgfCBpbnB1dC5jaGFyQ29kZUF0KGkgKiAyICsgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVwZWF0ZWRseSBwZXJmb3JtIGEgbG9uZyBkaXZpc2lvbi4gVGhlIGJpbmFyeSBhcnJheSBmb3JtcyB0aGUgZGl2aWRlbmQsXG4gICAgICogdGhlIGxlbmd0aCBvZiB0aGUgZW5jb2RpbmcgaXMgdGhlIGRpdmlzb3IuIE9uY2UgY29tcHV0ZWQsIHRoZSBxdW90aWVudFxuICAgICAqIGZvcm1zIHRoZSBkaXZpZGVuZCBmb3IgdGhlIG5leHQgc3RlcC4gV2Ugc3RvcCB3aGVuIHRoZSBkaXZpZGVuZCBpcyB6ZXJIYXNoZXMuXG4gICAgICogQWxsIHJlbWFpbmRlcnMgYXJlIHN0b3JlZCBmb3IgbGF0ZXIgdXNlLlxuICAgICAqL1xuICAgIHdoaWxlIChkaXZpZGVuZC5sZW5ndGggPiAwKSB7XG4gICAgICBxdW90aWVudCA9IEFycmF5KCk7XG4gICAgICB4ID0gMDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBkaXZpZGVuZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB4ID0gKHggPDwgMTYpICsgZGl2aWRlbmRbaV07XG4gICAgICAgIHEgPSBNYXRoLmZsb29yKHggLyBkaXZpc29yKTtcbiAgICAgICAgeCAtPSBxICogZGl2aXNvcjtcbiAgICAgICAgaWYgKHF1b3RpZW50Lmxlbmd0aCA+IDAgfHwgcSA+IDApIHtcbiAgICAgICAgICBxdW90aWVudFtxdW90aWVudC5sZW5ndGhdID0gcTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVtYWluZGVyc1tyZW1haW5kZXJzLmxlbmd0aF0gPSB4O1xuICAgICAgZGl2aWRlbmQgPSBxdW90aWVudDtcbiAgICB9XG5cbiAgICAvKiBDb252ZXJ0IHRoZSByZW1haW5kZXJzIHRvIHRoZSBvdXRwdXQgc3RyaW5nICovXG4gICAgb3V0cHV0ID0gJyc7XG4gICAgZm9yIChpID0gcmVtYWluZGVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgb3V0cHV0ICs9IGVuY29kaW5nLmNoYXJBdChyZW1haW5kZXJzW2ldKTtcbiAgICB9XG5cbiAgICAvKiBBcHBlbmQgbGVhZGluZyB6ZXJvIGVxdWl2YWxlbnRzICovXG4gICAgZnVsbF9sZW5ndGggPSBNYXRoLmNlaWwoaW5wdXQubGVuZ3RoICogOCAvIChNYXRoLmxvZyhlbmNvZGluZy5sZW5ndGgpIC8gTWF0aC5sb2coMikpKTtcbiAgICBmb3IgKGkgPSBvdXRwdXQubGVuZ3RoOyBpIDwgZnVsbF9sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgb3V0cHV0ID0gZW5jb2RpbmdbMF0gKyBvdXRwdXQ7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIHJhdyBzdHJpbmcgdG8gYSBiYXNlLTY0IHN0cmluZ1xuICAgKi9cblxuICBmdW5jdGlvbiByc3RyMmI2NChpbnB1dCwgYjY0cGFkKSB7XG4gICAgdmFyIHRhYiA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJyxcbiAgICAgIG91dHB1dCA9ICcnLFxuICAgICAgbGVuID0gaW5wdXQubGVuZ3RoLFxuICAgICAgaSwgaiwgdHJpcGxldDtcbiAgICBiNjRwYWQgPSBiNjRwYWQgfHwgJz0nO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykge1xuICAgICAgdHJpcGxldCA9IChpbnB1dC5jaGFyQ29kZUF0KGkpIDw8IDE2KSB8IChpICsgMSA8IGxlbiA/IGlucHV0LmNoYXJDb2RlQXQoaSArIDEpIDw8IDggOiAwKSB8IChpICsgMiA8IGxlbiA/IGlucHV0LmNoYXJDb2RlQXQoaSArIDIpIDogMCk7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgNDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChpICogOCArIGogKiA2ID4gaW5wdXQubGVuZ3RoICogOCkge1xuICAgICAgICAgIG91dHB1dCArPSBiNjRwYWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3V0cHV0ICs9IHRhYi5jaGFyQXQoKHRyaXBsZXQgPj4+IDYgKiAoMyAtIGopKSAmIDB4M0YpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICBIYXNoZXMgPSB7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IHZlcnNpb25cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBWRVJTSU9OOiAnMS4wLjUnLFxuICAgIC8qKlxuICAgICAqIEBjbGFzcyBIYXNoZXMuU0hBMjU2XG4gICAgICogQHBhcmFtIHtjb25maWd9XG4gICAgICpcbiAgICAgKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNlY3VyZSBIYXNoIEFsZ29yaXRobSwgU0hBLTI1NiwgYXMgZGVmaW5lZCBpbiBGSVBTIDE4MC0yXG4gICAgICogVmVyc2lvbiAyLjIgQ29weXJpZ2h0IEFuZ2VsIE1hcmluLCBQYXVsIEpvaG5zdG9uIDIwMDAgLSAyMDA5LlxuICAgICAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAgICAgKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgZGV0YWlscy5cbiAgICAgKiBBbHNvIGh0dHA6Ly9hbm1hci5ldS5vcmcvcHJvamVjdHMvanNzaGEyL1xuICAgICAqL1xuICAgIFNIQTI1NjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgLyoqXG4gICAgICAgKiBQcml2YXRlIHByb3BlcnRpZXMgY29uZmlndXJhdGlvbiB2YXJpYWJsZXMuIFlvdSBtYXkgbmVlZCB0byB0d2VhayB0aGVzZSB0byBiZSBjb21wYXRpYmxlIHdpdGhcbiAgICAgICAqIHRoZSBzZXJ2ZXItc2lkZSwgYnV0IHRoZSBkZWZhdWx0cyB3b3JrIGluIG1vc3QgY2FzZXMuXG4gICAgICAgKiBAc2VlIHRoaXMuc2V0VXBwZXJDYXNlKCkgbWV0aG9kXG4gICAgICAgKiBAc2VlIHRoaXMuc2V0UGFkKCkgbWV0aG9kXG4gICAgICAgKi9cbiAgICAgIHZhciBoZXhjYXNlID0gKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMudXBwZXJjYXNlID09PSAnYm9vbGVhbicpID8gb3B0aW9ucy51cHBlcmNhc2UgOiBmYWxzZSwgLy8gaGV4YWRlY2ltYWwgb3V0cHV0IGNhc2UgZm9ybWF0LiBmYWxzZSAtIGxvd2VyY2FzZTsgdHJ1ZSAtIHVwcGVyY2FzZSAgKi9cbiAgICAgICAgYjY0cGFkID0gKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMucGFkID09PSAnc3RyaW5nJykgPyBvcHRpb25zLnBkYSA6ICc9JyxcbiAgICAgICAgLyogYmFzZS02NCBwYWQgY2hhcmFjdGVyLiBEZWZhdWx0ICc9JyBmb3Igc3RyaWN0IFJGQyBjb21wbGlhbmNlICAgKi9cbiAgICAgICAgdXRmOCA9IChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLnV0ZjggPT09ICdib29sZWFuJykgPyBvcHRpb25zLnV0ZjggOiB0cnVlLFxuICAgICAgICAvKiBlbmFibGUvZGlzYWJsZSB1dGY4IGVuY29kaW5nICovXG4gICAgICAgIHNoYTI1Nl9LO1xuXG4gICAgICAvKiBwcml2aWxlZ2VkIChwdWJsaWMpIG1ldGhvZHMgKi9cbiAgICAgIHRoaXMuaGV4ID0gZnVuY3Rpb24ocykge1xuICAgICAgICByZXR1cm4gcnN0cjJoZXgocnN0cihzLCB1dGY4KSk7XG4gICAgICB9O1xuICAgICAgdGhpcy5iNjQgPSBmdW5jdGlvbihzKSB7XG4gICAgICAgIHJldHVybiByc3RyMmI2NChyc3RyKHMsIHV0ZjgpLCBiNjRwYWQpO1xuICAgICAgfTtcbiAgICAgIHRoaXMuYW55ID0gZnVuY3Rpb24ocywgZSkge1xuICAgICAgICByZXR1cm4gcnN0cjJhbnkocnN0cihzLCB1dGY4KSwgZSk7XG4gICAgICB9O1xuICAgICAgdGhpcy5yYXcgPSBmdW5jdGlvbihzKSB7XG4gICAgICAgIHJldHVybiByc3RyKHMsIHV0ZjgpO1xuICAgICAgfTtcbiAgICAgIHRoaXMuaGV4X2htYWMgPSBmdW5jdGlvbihrLCBkKSB7XG4gICAgICAgIHJldHVybiByc3RyMmhleChyc3RyX2htYWMoaywgZCkpO1xuICAgICAgfTtcbiAgICAgIHRoaXMuYjY0X2htYWMgPSBmdW5jdGlvbihrLCBkKSB7XG4gICAgICAgIHJldHVybiByc3RyMmI2NChyc3RyX2htYWMoaywgZCksIGI2NHBhZCk7XG4gICAgICB9O1xuICAgICAgdGhpcy5hbnlfaG1hYyA9IGZ1bmN0aW9uKGssIGQsIGUpIHtcbiAgICAgICAgcmV0dXJuIHJzdHIyYW55KHJzdHJfaG1hYyhrLCBkKSwgZSk7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBQZXJmb3JtIGEgc2ltcGxlIHNlbGYtdGVzdCB0byBzZWUgaWYgdGhlIFZNIGlzIHdvcmtpbmdcbiAgICAgICAqIEByZXR1cm4ge1N0cmluZ30gSGV4YWRlY2ltYWwgaGFzaCBzYW1wbGVcbiAgICAgICAqIEBwdWJsaWNcbiAgICAgICAqL1xuICAgICAgdGhpcy52bV90ZXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBoZXgoJ2FiYycpLnRvTG93ZXJDYXNlKCkgPT09ICc5MDAxNTA5ODNjZDI0ZmIwZDY5NjNmN2QyOGUxN2Y3Mic7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBFbmFibGUvZGlzYWJsZSB1cHBlcmNhc2UgaGV4YWRlY2ltYWwgcmV0dXJuZWQgc3RyaW5nXG4gICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59XG4gICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoaXNcbiAgICAgICAqIEBwdWJsaWNcbiAgICAgICAqL1xuICAgICAgdGhpcy5zZXRVcHBlckNhc2UgPSBmdW5jdGlvbihhKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgaGV4Y2FzZSA9IGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gRGVmaW5lcyBhIGJhc2U2NCBwYWQgc3RyaW5nXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gUGFkXG4gICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoaXNcbiAgICAgICAqIEBwdWJsaWNcbiAgICAgICAqL1xuICAgICAgdGhpcy5zZXRQYWQgPSBmdW5jdGlvbihhKSB7XG4gICAgICAgIGI2NHBhZCA9IGEgfHwgYjY0cGFkO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIERlZmluZXMgYSBiYXNlNjQgcGFkIHN0cmluZ1xuICAgICAgICogQHBhcmFtIHtib29sZWFufVxuICAgICAgICogQHJldHVybiB7T2JqZWN0fSB0aGlzXG4gICAgICAgKiBAcHVibGljXG4gICAgICAgKi9cbiAgICAgIHRoaXMuc2V0VVRGOCA9IGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICB1dGY4ID0gYTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH07XG5cbiAgICAgIC8vIHByaXZhdGUgbWV0aG9kc1xuXG4gICAgICAvKipcbiAgICAgICAqIENhbGN1bGF0ZSB0aGUgU0hBLTUxMiBvZiBhIHJhdyBzdHJpbmdcbiAgICAgICAqL1xuXG4gICAgICBmdW5jdGlvbiByc3RyKHMsIHV0ZjgpIHtcbiAgICAgICAgcyA9ICh1dGY4KSA/IHV0ZjhFbmNvZGUocykgOiBzO1xuICAgICAgICByZXR1cm4gYmluYjJyc3RyKGJpbmIocnN0cjJiaW5iKHMpLCBzLmxlbmd0aCAqIDgpKTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBDYWxjdWxhdGUgdGhlIEhNQUMtc2hhMjU2IG9mIGEga2V5IGFuZCBzb21lIGRhdGEgKHJhdyBzdHJpbmdzKVxuICAgICAgICovXG5cbiAgICAgIGZ1bmN0aW9uIHJzdHJfaG1hYyhrZXksIGRhdGEpIHtcbiAgICAgICAga2V5ID0gKHV0ZjgpID8gdXRmOEVuY29kZShrZXkpIDoga2V5O1xuICAgICAgICBkYXRhID0gKHV0ZjgpID8gdXRmOEVuY29kZShkYXRhKSA6IGRhdGE7XG4gICAgICAgIHZhciBoYXNoLCBpID0gMCxcbiAgICAgICAgICBia2V5ID0gcnN0cjJiaW5iKGtleSksXG4gICAgICAgICAgaXBhZCA9IEFycmF5KDE2KSxcbiAgICAgICAgICBvcGFkID0gQXJyYXkoMTYpO1xuXG4gICAgICAgIGlmIChia2V5Lmxlbmd0aCA+IDE2KSB7XG4gICAgICAgICAgYmtleSA9IGJpbmIoYmtleSwga2V5Lmxlbmd0aCAqIDgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICg7IGkgPCAxNjsgaSArPSAxKSB7XG4gICAgICAgICAgaXBhZFtpXSA9IGJrZXlbaV0gXiAweDM2MzYzNjM2O1xuICAgICAgICAgIG9wYWRbaV0gPSBia2V5W2ldIF4gMHg1QzVDNUM1QztcbiAgICAgICAgfVxuXG4gICAgICAgIGhhc2ggPSBiaW5iKGlwYWQuY29uY2F0KHJzdHIyYmluYihkYXRhKSksIDUxMiArIGRhdGEubGVuZ3RoICogOCk7XG4gICAgICAgIHJldHVybiBiaW5iMnJzdHIoYmluYihvcGFkLmNvbmNhdChoYXNoKSwgNTEyICsgMjU2KSk7XG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICAgKiBNYWluIHNoYTI1NiBmdW5jdGlvbiwgd2l0aCBpdHMgc3VwcG9ydCBmdW5jdGlvbnNcbiAgICAgICAqL1xuXG4gICAgICBmdW5jdGlvbiBzaGEyNTZfUyhYLCBuKSB7XG4gICAgICAgIHJldHVybiAoWCA+Pj4gbikgfCAoWCA8PCAoMzIgLSBuKSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNoYTI1Nl9SKFgsIG4pIHtcbiAgICAgICAgcmV0dXJuIChYID4+PiBuKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2hhMjU2X0NoKHgsIHksIHopIHtcbiAgICAgICAgcmV0dXJuICgoeCAmIHkpIF4gKCh+eCkgJiB6KSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNoYTI1Nl9NYWooeCwgeSwgeikge1xuICAgICAgICByZXR1cm4gKCh4ICYgeSkgXiAoeCAmIHopIF4gKHkgJiB6KSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNoYTI1Nl9TaWdtYTAyNTYoeCkge1xuICAgICAgICByZXR1cm4gKHNoYTI1Nl9TKHgsIDIpIF4gc2hhMjU2X1MoeCwgMTMpIF4gc2hhMjU2X1MoeCwgMjIpKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2hhMjU2X1NpZ21hMTI1Nih4KSB7XG4gICAgICAgIHJldHVybiAoc2hhMjU2X1MoeCwgNikgXiBzaGEyNTZfUyh4LCAxMSkgXiBzaGEyNTZfUyh4LCAyNSkpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzaGEyNTZfR2FtbWEwMjU2KHgpIHtcbiAgICAgICAgcmV0dXJuIChzaGEyNTZfUyh4LCA3KSBeIHNoYTI1Nl9TKHgsIDE4KSBeIHNoYTI1Nl9SKHgsIDMpKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2hhMjU2X0dhbW1hMTI1Nih4KSB7XG4gICAgICAgIHJldHVybiAoc2hhMjU2X1MoeCwgMTcpIF4gc2hhMjU2X1MoeCwgMTkpIF4gc2hhMjU2X1IoeCwgMTApKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2hhMjU2X1NpZ21hMDUxMih4KSB7XG4gICAgICAgIHJldHVybiAoc2hhMjU2X1MoeCwgMjgpIF4gc2hhMjU2X1MoeCwgMzQpIF4gc2hhMjU2X1MoeCwgMzkpKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2hhMjU2X1NpZ21hMTUxMih4KSB7XG4gICAgICAgIHJldHVybiAoc2hhMjU2X1MoeCwgMTQpIF4gc2hhMjU2X1MoeCwgMTgpIF4gc2hhMjU2X1MoeCwgNDEpKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2hhMjU2X0dhbW1hMDUxMih4KSB7XG4gICAgICAgIHJldHVybiAoc2hhMjU2X1MoeCwgMSkgXiBzaGEyNTZfUyh4LCA4KSBeIHNoYTI1Nl9SKHgsIDcpKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2hhMjU2X0dhbW1hMTUxMih4KSB7XG4gICAgICAgIHJldHVybiAoc2hhMjU2X1MoeCwgMTkpIF4gc2hhMjU2X1MoeCwgNjEpIF4gc2hhMjU2X1IoeCwgNikpO1xuICAgICAgfVxuXG4gICAgICBzaGEyNTZfSyA9IFtcbiAgICAgICAgMTExNjM1MjQwOCwgMTg5OTQ0NzQ0MSwgLTEyNDU2NDM4MjUsIC0zNzM5NTc3MjMsIDk2MTk4NzE2MywgMTUwODk3MDk5MywgLTE4NDEzMzE1NDgsIC0xNDI0MjA0MDc1LCAtNjcwNTg2MjE2LCAzMTA1OTg0MDEsIDYwNzIyNTI3OCwgMTQyNjg4MTk4NyxcbiAgICAgICAgMTkyNTA3ODM4OCwgLTIxMzI4ODkwOTAsIC0xNjgwMDc5MTkzLCAtMTA0Njc0NDcxNiwgLTQ1OTU3Njg5NSwgLTI3Mjc0MjUyMixcbiAgICAgICAgMjY0MzQ3MDc4LCA2MDQ4MDc2MjgsIDc3MDI1NTk4MywgMTI0OTE1MDEyMiwgMTU1NTA4MTY5MiwgMTk5NjA2NDk4NiwgLTE3NDA3NDY0MTQsIC0xNDczMTMyOTQ3LCAtMTM0MTk3MDQ4OCwgLTEwODQ2NTM2MjUsIC05NTgzOTU0MDUsIC03MTA0Mzg1ODUsXG4gICAgICAgIDExMzkyNjk5MywgMzM4MjQxODk1LCA2NjYzMDcyMDUsIDc3MzUyOTkxMiwgMTI5NDc1NzM3MiwgMTM5NjE4MjI5MSxcbiAgICAgICAgMTY5NTE4MzcwMCwgMTk4NjY2MTA1MSwgLTIxMTc5NDA5NDYsIC0xODM4MDExMjU5LCAtMTU2NDQ4MTM3NSwgLTE0NzQ2NjQ4ODUsIC0xMDM1MjM2NDk2LCAtOTQ5MjAyNTI1LCAtNzc4OTAxNDc5LCAtNjk0NjE0NDkyLCAtMjAwMzk1Mzg3LCAyNzU0MjMzNDQsXG4gICAgICAgIDQzMDIyNzczNCwgNTA2OTQ4NjE2LCA2NTkwNjA1NTYsIDg4Mzk5Nzg3NywgOTU4MTM5NTcxLCAxMzIyODIyMjE4LFxuICAgICAgICAxNTM3MDAyMDYzLCAxNzQ3ODczNzc5LCAxOTU1NTYyMjIyLCAyMDI0MTA0ODE1LCAtMjA2NzIzNjg0NCwgLTE5MzMxMTQ4NzIsIC0xODY2NTMwODIyLCAtMTUzODIzMzEwOSwgLTEwOTA5MzU4MTcsIC05NjU2NDE5OThcbiAgICAgIF07XG5cbiAgICAgIGZ1bmN0aW9uIGJpbmIobSwgbCkge1xuICAgICAgICB2YXIgSEFTSCA9IFsxNzc5MDMzNzAzLCAtMTE1MDgzMzAxOSwgMTAxMzkwNDI0MiwgLTE1MjE0ODY1MzQsXG4gICAgICAgICAgMTM1OTg5MzExOSwgLTE2OTQxNDQzNzIsIDUyODczNDYzNSwgMTU0MTQ1OTIyNVxuICAgICAgICBdO1xuICAgICAgICB2YXIgVyA9IG5ldyBBcnJheSg2NCk7XG4gICAgICAgIHZhciBhLCBiLCBjLCBkLCBlLCBmLCBnLCBoO1xuICAgICAgICB2YXIgaSwgaiwgVDEsIFQyO1xuXG4gICAgICAgIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gICAgICAgIG1bbCA+PiA1XSB8PSAweDgwIDw8ICgyNCAtIGwgJSAzMik7XG4gICAgICAgIG1bKChsICsgNjQgPj4gOSkgPDwgNCkgKyAxNV0gPSBsO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSArPSAxNikge1xuICAgICAgICAgIGEgPSBIQVNIWzBdO1xuICAgICAgICAgIGIgPSBIQVNIWzFdO1xuICAgICAgICAgIGMgPSBIQVNIWzJdO1xuICAgICAgICAgIGQgPSBIQVNIWzNdO1xuICAgICAgICAgIGUgPSBIQVNIWzRdO1xuICAgICAgICAgIGYgPSBIQVNIWzVdO1xuICAgICAgICAgIGcgPSBIQVNIWzZdO1xuICAgICAgICAgIGggPSBIQVNIWzddO1xuXG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IDY0OyBqICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChqIDwgMTYpIHtcbiAgICAgICAgICAgICAgV1tqXSA9IG1baiArIGldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgV1tqXSA9IHNhZmVfYWRkKHNhZmVfYWRkKHNhZmVfYWRkKHNoYTI1Nl9HYW1tYTEyNTYoV1tqIC0gMl0pLCBXW2ogLSA3XSksXG4gICAgICAgICAgICAgICAgc2hhMjU2X0dhbW1hMDI1NihXW2ogLSAxNV0pKSwgV1tqIC0gMTZdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgVDEgPSBzYWZlX2FkZChzYWZlX2FkZChzYWZlX2FkZChzYWZlX2FkZChoLCBzaGEyNTZfU2lnbWExMjU2KGUpKSwgc2hhMjU2X0NoKGUsIGYsIGcpKSxcbiAgICAgICAgICAgICAgc2hhMjU2X0tbal0pLCBXW2pdKTtcbiAgICAgICAgICAgIFQyID0gc2FmZV9hZGQoc2hhMjU2X1NpZ21hMDI1NihhKSwgc2hhMjU2X01haihhLCBiLCBjKSk7XG4gICAgICAgICAgICBoID0gZztcbiAgICAgICAgICAgIGcgPSBmO1xuICAgICAgICAgICAgZiA9IGU7XG4gICAgICAgICAgICBlID0gc2FmZV9hZGQoZCwgVDEpO1xuICAgICAgICAgICAgZCA9IGM7XG4gICAgICAgICAgICBjID0gYjtcbiAgICAgICAgICAgIGIgPSBhO1xuICAgICAgICAgICAgYSA9IHNhZmVfYWRkKFQxLCBUMik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgSEFTSFswXSA9IHNhZmVfYWRkKGEsIEhBU0hbMF0pO1xuICAgICAgICAgIEhBU0hbMV0gPSBzYWZlX2FkZChiLCBIQVNIWzFdKTtcbiAgICAgICAgICBIQVNIWzJdID0gc2FmZV9hZGQoYywgSEFTSFsyXSk7XG4gICAgICAgICAgSEFTSFszXSA9IHNhZmVfYWRkKGQsIEhBU0hbM10pO1xuICAgICAgICAgIEhBU0hbNF0gPSBzYWZlX2FkZChlLCBIQVNIWzRdKTtcbiAgICAgICAgICBIQVNIWzVdID0gc2FmZV9hZGQoZiwgSEFTSFs1XSk7XG4gICAgICAgICAgSEFTSFs2XSA9IHNhZmVfYWRkKGcsIEhBU0hbNl0pO1xuICAgICAgICAgIEhBU0hbN10gPSBzYWZlX2FkZChoLCBIQVNIWzddKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSEFTSDtcbiAgICAgIH1cblxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gSGFzaGVzO1xufSgpKTsgLy8gSUlGRVxuIiwiLy8gS2FsZW9KV1Rcbi8vXG4vLyBVc2VhZ2U6XG4vLyB2YXIgS2FsZW9KV1QgPSByZXF1aXJlKFwiS2FsZW9KV1QuanNcIilcbi8vIG9yXG4vLyA8c2NyaXB0IHNyYz1cIkthbGVvSldULmpzXCI+PC9zY3JpcHQ+IHdpbGwgZXhwb3NlIEthbGVvSldUIG9uIHdpbmRvd1xubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKXtcblxuICAvKiEganNoYXNoZXMgLSBOZXcgQlNEIExpY2Vuc2UgLSBodHRwczovL2dpdGh1Yi5jb20vaDJub24vanNoYXNoZXMgKi9cbiAgdmFyIEhhc2hlcyA9IHJlcXVpcmUoXCIuL2hhc2hlcy1oczI1Ni5qc1wiKTtcbiAgdmFyIFNIQTI1NiA9IG5ldyBIYXNoZXMuU0hBMjU2KCk7XG4gIHZhciBCYXNlNjQgPSByZXF1aXJlKFwiLi9CYXNlNjQuanNcIik7XG4gIHZhciBCYXNlNjR1cmwgPSByZXF1aXJlKFwiLi9CYXNlNjR1cmxcIik7XG5cbiAgdmFyIEhFQURFUiA9IHthbGc6IFwiSFMyNTZcIiwgdHlwOiBcIkpXVFwifTtcblxuICBmdW5jdGlvbiBwYXJzZVRva2VuKHRva2VuKSB7XG4gICAgaWYgKHRva2VuLm1hdGNoKC9eKFteLl0rKVxcLihbXi5dKylcXC4oW14uXSspJC8pID09IG51bGwpIHtcbiAgICAgIHRocm93IFwiSldUIHRva2VuIGlzIG5vdCBhIGZvcm0gb2YgJ0hlYWQuUGF5bG9hZC5TaWdWYWx1ZScuXCI7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBoZWFkZXI6IFJlZ0V4cC4kMSxcbiAgICAgIHBheWxvYWQ6IFJlZ0V4cC4kMixcbiAgICAgIHNpZzogUmVnRXhwLiQzXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVTaWduZWRUb2tlbihoZWFkZXIsIHBheWxvYWQsIHNlY3JldCkge1xuICAgIHZhciBlbmNvZGVkSGVhZGVyICA9IEJhc2U2NHVybC5lbmNvZGUoQmFzZTY0LmVuY29kZShKU09OLnN0cmluZ2lmeShoZWFkZXIpKSk7XG4gICAgdmFyIGVuY29kZWRQYXlsb2FkID0gQmFzZTY0dXJsLmVuY29kZShCYXNlNjQuZW5jb2RlKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKSk7XG4gICAgdmFyIHNpZyA9IEJhc2U2NHVybC5lbmNvZGUoU0hBMjU2LmI2NF9obWFjKHNlY3JldCwgZW5jb2RlZEhlYWRlcitcIi5cIitlbmNvZGVkUGF5bG9hZCkpO1xuICAgIHJldHVybiBlbmNvZGVkSGVhZGVyK1wiLlwiK2VuY29kZWRQYXlsb2FkK1wiLlwiK3NpZztcbiAgfVxuXG4gIGZ1bmN0aW9uIHZlcmlmeVNpZ25lZFRva2VuKHRva2VuLCBzZWNyZXQpIHtcbiAgICB2YXIgcGFydHMgPSBwYXJzZVRva2VuKHRva2VuKTtcbiAgICB2YXIgc2lnID0gQmFzZTY0dXJsLmVuY29kZShTSEEyNTYuYjY0X2htYWMoc2VjcmV0LCBwYXJ0cy5oZWFkZXIrXCIuXCIrcGFydHMucGF5bG9hZCkpO1xuICAgIHJldHVybiBzaWcgPT09IHBhcnRzLnNpZztcbiAgfVxuXG4gIC8vIFB1YmxpYyBBUElcbiAgcmV0dXJuIHtcbiAgICBzaWduOiBmdW5jdGlvbihkYXRhLCBzZWNyZXQpIHtcbiAgICAgIC8vIERlZmF1bHQgdG8gZXhwaXJlIGluIG9uZSBob3VyXG4gICAgICBkYXRhLmV4cCA9IGRhdGEuZXhwIHx8IChNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKSszNjAwKTtcbiAgICAgIHJldHVybiBnZW5lcmF0ZVNpZ25lZFRva2VuKEhFQURFUiwgZGF0YSwgc2VjcmV0KTtcbiAgICB9LFxuICAgIGRlY29kZTogZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgIHZhciBvYmogPSBwYXJzZVRva2VuKHRva2VuKTtcbiAgICAgIHJldHVybiBCYXNlNjQuZGVjb2RlKEJhc2U2NHVybC5kZWNvZGUob2JqLnBheWxvYWQpKTtcbiAgICB9LFxuICAgIHZlcmlmeTogZnVuY3Rpb24odG9rZW4sIHNlY3JldCkge1xuICAgICAgcmV0dXJuIHZlcmlmeVNpZ25lZFRva2VuKHRva2VuLCBzZWNyZXQpO1xuICAgIH1cbiAgfVxufSkoKVxuIl19
