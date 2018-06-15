I once needed a list of the top 1 million domains so I made this wonderful piece of art.

It uses http://s3.amazonaws.com/alexa-static/top-1m.csv.zip

I wrote this in javascript because it is the language I feel most comfortable in when quickly prototyping something.

However, an equivalent to this repo can be written in a 4 line bash script:

```
wget http://s3.amazonaws.com/alexa-static/top-1m.csv.zip
unzip top-1m.csv.zip
sort --key 2  --field-separator "," -d top-1m.csv > sorted-top-1m.csv
rm -f top-1m.csv.zip top-1m.csv
```

> Written courtesy of (Dolondro)[https://github.com/Dolondro]

Anywhoo... If you want to use this madness (why - why would you)

```
git clone https://github.com/alexmorleyfinch/top1mil.git
npm install
npm run start
```

To sort the output in alphabetical order then run

```bash
npm run start -- -s
```
