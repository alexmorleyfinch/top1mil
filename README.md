I once needed a list of the top 1 million domains so I made this wonderful piece of art.

It uses http://s3.amazonaws.com/alexa-static/top-1m.csv.zip

It has a very specific use case but then again it's just another repo to have.

```
git clone https://github.com/alexmorleyfinch/top1mil.git
npm install
npm run start
```

To sort the output in alphabetical order then run

```bash
npm run start -- -s
```
