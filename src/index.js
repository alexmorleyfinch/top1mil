const request = require('request');
const unzip = require('unzip');
const csv2 = require('csv2');
const fs = require('fs');
const mkdirp = require('mkdirp');
const argv = require('yargs')
    .option('s', {
        alias : 'sort',
        describe: 'sorts the output in alphabetical order',
        type: 'boolean'
    })
    .argv;


let domains = [];

mkdirp.sync('output');

request
  .get('http://s3.amazonaws.com/alexa-static/top-1m.csv.zip')
  .pipe(unzip.Parse())
  .on('entry', entry => {
    entry
      .pipe(csv2())
      .on('data', data => {
        let progress = Math.round(parseInt(data[0], 10) / 10000);
        domains.push(data[1]);
        process.stdout.write('Progress: ' + progress + '%\r');
      })
      .on('end', () => {
        let file = fs.createWriteStream('output/domains.txt');

        if (argv.s) {
            domains.sort();
        }

        file.on('error', console.error);

        domains.forEach(domain => {
          file.write(domain + '\n');
        });

        file.end();
      });
  });
