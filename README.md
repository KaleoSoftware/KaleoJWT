# KaleoJWT
Super simple, portable JWT implementation that supports only SHA256 algo.

The goal is to have an extremely small one-ish-liner that can be included into other systems like ServiceNow, etc, that will generate a JWT token with a minimum of fuss.

## Setup

### ServiceNow
In a Server Script, do this:

```
var KaleoJWT = function() {
  var global={};
  PASTE_MINIFIED_CODE_HERE
  return global.KaleoJWT;
}();
```

### Browser
Include the script in your page which will expose a `KaleoJWT` object.

`<script src="KaleoJWT.min.js"></script>`

### NPM
`var KaleoJWT = require("KaleoJWT.js")`


## Useage

```
var data = {email: "ned@thenorth.com"};
var token = KaleoJWT.sign(data, 'secret');
// token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5lZEB0aGVub3J0aC5jb20iLCJleHAiOjE0NzY3MzczMzJ9.YaN4ioWofianq5ipin0k1veBXIu11DTa4zXJoxVowZo
```

## Build

`npm install`
`npm run build`

## Test Harness

Open this web page to test the lib in the Browser

`open harness.html`

### Acknowledgements

The hard work was done by Tomas Aparicio, Paul Johnston, Angel Marin, Jeremy Lin from the https://github.com/h2non/jshashes repo.
