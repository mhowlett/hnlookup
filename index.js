/*
    hnlookup - lookup URL in hn URLs table.
    Copyright (C) 2015 Matt Howlett

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

"use strict"

var levelup = require('levelup');
var http = require('http');
var querystring = require('querystring');


var db = levelup('/data/hnlink');
const PORT=8601; 

function parseInfo(infoStr) {
  let bits = infoStr.split(' ');
  return { urlType: bits[0], id: parseInt(bits[1]), score: parseInt(bits[2]) };
}

function handleRequest(request, response) {
  let url = querystring.unescape(request.url);
  if (url.length == 0) {
    response.end('-1');
  }
  url = url.substring(1);
	
  db.get(url, function(err, value) {
    if (err) {
      response.end('-1');
      return;
    }
	  
    let existingInfo = parseInfo(value);
    response.end("" + existingInfo.id);
  });
}

var server = http.createServer(handleRequest);
server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:%s", PORT);
});
