// KaleoJWT
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
