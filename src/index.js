var request = require('request');
var unzip = require('unzip');
var csv2 = require('csv2');
var fs = require('fs');
var mkdirp = require('mkdirp');


var domains = [];

mkdirp.sync('output');

request
  .get('http://s3.amazonaws.com/alexa-static/top-1m.csv.zip')
  .pipe(unzip.Parse())
  .on('entry', function(entry) {
    entry
      .pipe(csv2())
      .on('data', function(data) {
        var progress = Math.round(parseInt(data[0], 10) / 10000);
        domains.push(data[1]);
        process.stdout.write('Progress: ' + progress + '%\r');
      })
      .on('end', function() {
        var file = fs.createWriteStream('output/domains.txt');

        domains.sort();

        file.on('error', function(err) {
          console.error(err);
        });

        domains.forEach(function(domain) {
          file.write(domain + '\n');
        });

        file.end();
      });
});