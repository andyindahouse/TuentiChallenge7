// fuente: https://github.com/molnarg/node-http2/blob/master/example/client.js

var fs = require('fs');
var path = require('path');
var http2 = require('http2');
var options = {
  hostname: '52.49.91.111',
  port: 8443,
  path: '/ghost',
  method: 'GET',
  headers: {
    'Range': 'bytes=4017-8120'
  }
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var request = http2.get(options);

// Receiving the response
request.on('response', function(response) {
  response.pipe(process.stdout);
  response.on('end', finish);
});

// Receiving push streams
request.on('push', function(pushRequest) {
  var filename = path.join(__dirname, '/push-' + push_count);
  push_count += 1;
  console.error('Receiving pushed resource: ' + pushRequest.url + ' -> ' + filename);
  pushRequest.on('response', function(pushResponse) {
    pushResponse.pipe(fs.createWriteStream(filename)).on('finish', finish);
  });
});

// Quitting after both the response and the associated pushed resources have arrived
var push_count = 0;
var finished = 0;
function finish() {
  finished += 1;
  if (finished === (1 + push_count)) {
    process.exit();
  }
}